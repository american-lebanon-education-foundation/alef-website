import { NextResponse } from 'next/server';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';

export const maxDuration = 60;

interface ContactItem {
    id: string;
    email?: string;
}

interface BatchRequestBody {
    contacts: ContactItem[];
    titleString: string;
    fullUrl: string;
    docType: string;
}

async function handler(req: Request) {
    try {
        const body = (await req.json()) as BatchRequestBody;
        const { contacts, titleString, fullUrl, docType } = body;

        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            return NextResponse.json({ message: 'No contacts provided in batch' }, { status: 400 });
        }

        const ghlApiKey = process.env.GHL_API_KEY;
        const ghlWorkflowId = process.env.GHL_NOTIFY_WORKFLOW_ID;

        if (!ghlApiKey || !ghlWorkflowId) {
            console.error('GHL credentials missing in process-batch');
            return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 });
        }

        const titleFieldId = process.env.GHL_FIELD_ID_POST_TITLE || 'lzi73m44OkRj4n88W0Sq';
        const urlFieldId = process.env.GHL_FIELD_ID_POST_URL || 'bD7A3udgLp5ShHtV24wb';
        const typeFieldId = process.env.GHL_FIELD_ID_POST_TYPE || 'TfZuyTZw5LYiZq2Siv5b';

        const customFieldsPayload = [
            { id: titleFieldId, field_value: titleString, value: titleString },
            { id: urlFieldId, field_value: fullUrl, value: fullUrl },
            { id: typeFieldId, field_value: docType.toUpperCase(), value: docType.toUpperCase() },
        ];

        let successCount = 0;
        let failCount = 0;

        // Process this single small batch of 25 contacts concurrently
        await Promise.allSettled(
            contacts.map(async (contact) => {
                try {
                    const [, wfRes] = await Promise.all([
                        fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${ghlApiKey}`,
                                Version: '2021-07-28',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                customFields: customFieldsPayload,
                            }),
                        }),
                        fetch(
                            `https://services.leadconnectorhq.com/contacts/${contact.id}/workflow/${ghlWorkflowId}`,
                            {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${ghlApiKey}`,
                                    Version: '2021-07-28',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({}),
                            }
                        ),
                    ]);

                    if (wfRes.ok) {
                        successCount++;
                    } else {
                        failCount++;
                        const err = await wfRes.text();
                        console.error(`Failed to enroll contact ${contact.id}:`, wfRes.status, err);
                    }
                } catch (contactErr) {
                    failCount++;
                    console.error(`Error processing contact ${contact.id}:`, contactErr);
                }
            })
        );

        console.log(`QStash Batch processed: ${successCount}/${contacts.length} succeeded (${failCount} failed).`);

        return NextResponse.json({
            success: true,
            processed: contacts.length,
            successCount,
            failCount,
        });
    } catch (error) {
        console.error('Error in notify-subscriber/process-batch:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

// In development, allow testing without signature check; in production, verify Upstash signature
export const POST =
    process.env.NODE_ENV === 'development'
        ? handler
        : verifySignatureAppRouter(handler);
