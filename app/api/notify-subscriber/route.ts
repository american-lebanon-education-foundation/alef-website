import { NextResponse, NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

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
            _type: string;
            title?: string | { [key: string]: string };
            slug?: { current: string } | string;
            type?: string;
            [key: string]: unknown;
        }

        const { title, type, _type, slug } = body as unknown as WebhookBody;

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

        // === 1. Fetch Contacts from GHL ===
        const ghlApiKey = process.env.GHL_API_KEY;
        const ghlLocationId = process.env.GHL_LOCATION_ID;
        const ghlWorkflowId = process.env.GHL_NOTIFY_WORKFLOW_ID;

        if (!ghlApiKey || !ghlLocationId || !ghlWorkflowId) {
            console.error('GHL credentials or GHL_NOTIFY_WORKFLOW_ID missing');
            return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
        }

        // We fetch contacts that have the tag. GHL lets us search.
        const searchRes = await fetch('https://services.leadconnectorhq.com/contacts/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ghlApiKey}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                locationId: ghlLocationId,
                filters: [
                    {
                        field: "tags",
                        operator: "eq",
                        value: "alef our subscribers"
                    }
                ],
                limit: 100 // Paging may be needed for very large lists
            }),
        });

        if (!searchRes.ok) {
            const errorText = await searchRes.text();
            console.error('Failed to fetch GHL contacts:', searchRes.status, errorText);
            return NextResponse.json({ message: 'Failed to fetch GHL contacts' }, { status: 500 });
        }

        interface GHLContact {
            id: string;
            email: string;
        }

        const { contacts } = (await searchRes.json()) as { contacts: GHLContact[] };

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ message: 'No subscribers found in GHL with tag "alef our subscribers"' });
        }

        // === 2. Add Contacts to a GHL Workflow ===
        let successCount = 0;

        for (const contact of contacts) {
            try {
                // First update custom fields for title, url, type so the workflow email can use them
                const updateRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${ghlApiKey}`,
                        'Version': '2021-07-28',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customFields: [
                            { key: "contact.latest_post_title", value: titleString },
                            { key: "contact.latest_post_url", value: fullUrl },
                            { key: "contact.latest_post_type", value: docType.toUpperCase() },
                        ]
                    }),
                });

                if (!updateRes.ok) {
                    console.error(`Failed to update custom fields for contact ${contact.id}:`, await updateRes.text());
                } else {
                    console.log(`Successfully updated custom fields for contact ${contact.id}`);
                }

                // Then add to workflow
                const wfRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/workflow/${ghlWorkflowId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${ghlApiKey}`,
                        'Version': '2021-07-28',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        eventStartTime: new Date().toISOString()
                    })
                });

                if (wfRes.ok) {
                    successCount++;
                } else {
                    console.error(`Failed to enroll contact ${contact.id} into workflow:`, await wfRes.text());
                }
            } catch (contactErr) {
                console.error(`Error processing contact ${contact.id}:`, contactErr);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully triggered workflow for ${successCount}/${contacts.length} contacts.`
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
