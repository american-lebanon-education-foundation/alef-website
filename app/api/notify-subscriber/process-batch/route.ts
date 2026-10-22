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

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 2): Promise<Response> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(url, options);
            if (res.status === 429 || res.status >= 500) {
                if (attempt < maxRetries) {
                    const retryAfter = parseInt(res.headers.get('retry-after') || '2', 10);
                    const waitMs = Math.max(isNaN(retryAfter) ? 2000 : retryAfter * 1000, (attempt + 1) * 1500);
                    console.warn(`GHL rate limited / error (${res.status}) on ${url}. Retrying in ${waitMs}ms (attempt ${attempt + 1}/${maxRetries})...`);
                    await new Promise((resolve) => setTimeout(resolve, waitMs));
                    continue;
                }
            }
            return res;
        } catch (err) {
            if (attempt < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * 1500));
                continue;
            }
            throw err;
        }
    }
    throw new Error(`Max retries exceeded for ${url}`);
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
        let hasTransientFailure = false;

        // Process contacts in micro-chunks of 5 with small spacing to stay comfortably under GHL's burst limit
        const CHUNK_SIZE = 5;
        for (let i = 0; i < contacts.length; i += CHUNK_SIZE) {
            const chunk = contacts.slice(i, i + CHUNK_SIZE);

            await Promise.allSettled(
                chunk.map(async (contact) => {
                    try {
                        const [, wfRes] = await Promise.all([
                            fetchWithRetry(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
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
                            fetchWithRetry(
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
                            if (wfRes.status === 429 || wfRes.status >= 500) {
                                hasTransientFailure = true;
                            }
                            const err = await wfRes.text();
                            console.error(`Failed to enroll contact ${contact.id}:`, wfRes.status, err);
                        }
                    } catch (contactErr) {
                        failCount++;
                        hasTransientFailure = true;
                        console.error(`Error processing contact ${contact.id}:`, contactErr);
                    }
                })
            );

            // Small 300ms pause between micro-chunks if more remain in this batch
            if (i + CHUNK_SIZE < contacts.length) {
                await new Promise((resolve) => setTimeout(resolve, 300));
            }
        }

        console.log(`QStash Batch processed: ${successCount}/${contacts.length} succeeded (${failCount} failed).`);

        // If rate-limited or server errors occurred even after retries, return 500 so QStash automatically retries the batch
        if (hasTransientFailure) {
            return NextResponse.json(
                {
                    error: 'Transient failures during batch processing (rate limit or GHL error)',
                    processed: contacts.length,
                    successCount,
                    failCount,
                },
                { status: 500 }
            );
        }

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
