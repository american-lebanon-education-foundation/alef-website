import CardDetailsClient from "./CardDetailsClient";
import { CARD_DATA } from "@/app/[locale]/(research-and-news)/house-of-cards/card-data";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
    const { id, locale } = await params;
    const cardRef = CARD_DATA.find((c) => c.id === id);

    if (!cardRef) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: 'HouseOfCardsPage' });
    const name = t(`cards.${id}.name`);
    const role = t(`cards.${id}.role`);
    const summary = t(`cards.${id}.summary`);

    const title = `${name} — ${role} | House of Cards`;
    const description = summary || `Read the dossier of ${name} (${role}) in the House of Cards database.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: cardRef.image,
                    width: 800,
                    height: 1067,
                    alt: name,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [cardRef.image]
        }
    };
}

export default function CardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    return <CardDetailsClient params={params} />;
}