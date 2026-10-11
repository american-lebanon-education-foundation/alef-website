import { NextResponse, NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const maxDuration = 60; // Allow Vercel up to 60 seconds for bulk notifications

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody(
            req,
            process.env.SANITY_WEBHOOK_SECRET
        );

        if (!isValidSignature) {
            console.error('Invalid Signature');
            return new Response('Invalid Signature', { status: 401 });
        }

        interface WebhookBody {
            _id?: string;
            _type: string;
            title?: string | { [key: string]: string };
            slug?: { current: string } | string;
            type?: string;
            [key: string]: unknown;
        }

        const { _id, title, type, _type, slug } = body as unknown as WebhookBody;

        // Guard: Skip drafts so in-progress studio edits do not trigger notifications
        if (_id && _id.startsWith('drafts.')) {
            console.log('Skipping draft document notification:', _id);
            return NextResponse.json({ message: 'Skipped draft document' }, { status: 200 });
        }

        // Handle slug if it's an object (common in Sanity) or string
        const slugString = typeof slug === 'object' && slug !== null && 'current' in slug
            ? slug.current
            : (typeof slug === 'string' ? slug : undefined);

        // Handle localized title (e.g. { en: "..." }) or string
        const titleString = typeof title === 'object' && title !== null
            ? (title.en || Object.values(title)[0] || 'New Update')
            : (typeof title === 'string' ? title : 'New Update');

        const docType = (type || _type || '').toLowerCase();

        if (!docType) {
            console.error('Missing document type in webhook body');
            return NextResponse.json({ message: 'Missing document type' }, { status: 400 });
        }

        const routeMap: Record<string, string> = {
            blog: 'blogs-and-articles',
            post: 'blogs-and-articles',
            video: 'videos',
            short: 'shorts',
            podcast: 'podcasts',
            webinar: 'webinars',
            event: 'events',
        };

        const isBlog = docType === 'blog' || docType === 'post';

        // For blogs, a slug is required to navigate to the individual article
        if (isBlog && !slugString) {
            console.error('Missing slug for blog post:', { titleString, docType });
            return NextResponse.json({ message: 'Missing slug for blog post' }, { status: 400 });
        }

        const folder = routeMap[docType] || docType;
        const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://usalef.org').replace(/\/$/, '');

        // Blogs have individual detail pages; media items (videos, shorts, podcasts, webinars) live on category feed pages
        const fullUrl = isBlog && slugString
            ? `${siteUrl}/en/${folder}/${slugString}`
            : `${siteUrl}/en/${folder}`;

        console.log('Sanity Webhook received:', { titleString, docType, slugString, fullUrl });

        // === 1. Fetch ALL Contacts from GHL (with Pagination) ===
        const ghlApiKey = process.env.GHL_API_KEY;
        const ghlLocationId = process.env.GHL_LOCATION_ID;
        const ghlWorkflowId = process.env.GHL_NOTIFY_WORKFLOW_ID;

        if (!ghlApiKey || !ghlLocationId || !ghlWorkflowId) {
            console.error('GHL credentials or GHL_NOTIFY_WORKFLOW_ID missing');
            return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
        }

        interface GHLContact {
            id: string;
            email: string;
            searchAfter?: unknown[];
        }

        const allContacts: GHLContact[] = [];
        let searchAfter: unknown = null;

        while (true) {
            const searchBody: Record<string, unknown> = {
                locationId: ghlLocationId,
                filters: [
                    {
                        field: "tags",
                        operator: "eq",
                        value: "alef our subscribers"
                    }
                ],
                pageLimit: 100
            };
            if (searchAfter) {
                searchBody.searchAfter = searchAfter;
            }

            const searchRes = await fetch('https://services.leadconnectorhq.com/contacts/search', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ghlApiKey}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchBody),
            });

            if (!searchRes.ok) {
                const errorText = await searchRes.text();
                console.error('Failed to fetch GHL contacts page:', searchRes.status, errorText);
                break;
            }

            const data = (await searchRes.json()) as { contacts: GHLContact[] };
            if (!data.contacts || data.contacts.length === 0) {
                break;
            }

            allContacts.push(...data.contacts);

            if (data.contacts.length < 100) {
                break;
            }

            searchAfter = data.contacts[data.contacts.length - 1].searchAfter;
        }

        console.log(`Fetched ${allContacts.length} subscribers from GHL`);

        if (allContacts.length === 0) {
            return NextResponse.json({ message: 'No subscribers found in GHL with tag "alef our subscribers"' });
        }

        // Custom Field IDs in your GHL account:
        // latest_post_title: 'lzi73m44OkRj4n88W0Sq'
        // latest_post_url:   'bD7A3udgLp5ShHtV24wb'
        // latest_post_type:  'TfZuyTZw5LYiZq2Siv5b'
        const titleFieldId = process.env.GHL_FIELD_ID_POST_TITLE || 'lzi73m44OkRj4n88W0Sq';
        const urlFieldId = process.env.GHL_FIELD_ID_POST_URL || 'bD7A3udgLp5ShHtV24wb';
        const typeFieldId = process.env.GHL_FIELD_ID_POST_TYPE || 'TfZuyTZw5LYiZq2Siv5b';

        const customFieldsPayload = [
            { id: titleFieldId, field_value: titleString, value: titleString },
            { id: urlFieldId, field_value: fullUrl, value: fullUrl },
            { id: typeFieldId, field_value: docType.toUpperCase(), value: docType.toUpperCase() },
        ];

        // === 2. Add Contacts to a GHL Workflow in Concurrent Batches ===
        let successCount = 0;
        const BATCH_SIZE = 20;

        for (let i = 0; i < allContacts.length; i += BATCH_SIZE) {
            const batch = allContacts.slice(i, i + BATCH_SIZE);
            await Promise.allSettled(batch.map(async (contact) => {
                try {
                    // Update custom fields on contact
                    await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${ghlApiKey}`,
                            'Version': '2021-07-28',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            customFields: customFieldsPayload
                        }),
                    });

                    // Enroll into workflow (empty body triggers immediately; do NOT send ISO string with 'Z' as GHL rejects it with 422)
                    const wfRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/workflow/${ghlWorkflowId}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${ghlApiKey}`,
                            'Version': '2021-07-28',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({})
                    });

                    if (wfRes.ok) {
                        successCount++;
                    } else {
                        const err = await wfRes.text();
                        console.error(`Failed to enroll contact ${contact.id} into workflow:`, wfRes.status, err);
                    }
                } catch (contactErr) {
                    console.error(`Error processing contact ${contact.id}:`, contactErr);
                }
            }));
        }

        return NextResponse.json({
            success: true,
            message: `Successfully triggered workflow for ${successCount}/${allContacts.length} contacts.`
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
