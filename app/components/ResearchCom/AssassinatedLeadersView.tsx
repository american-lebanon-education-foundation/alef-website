import React from "react";
import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useTranslations } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

interface FallenAngel {
    id: string;
    image: string;
    hasRole?: boolean;
}

const fallenAngelsItems: FallenAngel[] = [
    {
        id: "kamalJoumblatt",
        image: "/fallenPatriots/Kamal_Joumblatt.jpg"
    },
    {
        id: "bachirGemayel",
        image: "/fallenPatriots/Bashir_Gemayel.png"
    },
    {
        id: "rashidKarami",
        image: "/fallenPatriots/Rachid_Karami.png"
    },
    {
        id: "reneMoawad",
        image: "/fallenPatriots/Rene_Moawad.jpg"
    },
    {
        id: "raficHariri",
        image: "/fallenPatriots/Rafic_Hariri.jpg",
        hasRole: true
    },
    {
        id: "samirKassir",
        image: "/fallenPatriots/Samir_Kassir.jpg"
    },
    {
        id: "gebranTueni",
        image: "/fallenPatriots/Gebran_Tuenijpg.jpg"
    },
    {
        id: "pierreGemayel",
        image: "/fallenPatriots/Pierre_Gemayel.jpg"
    },
    {
        id: "walidEido",
        image: "/fallenPatriots/walid_eido.jpg"
    },
    {
        id: "antoineGhanem",
        image: "/fallenPatriots/antoine_ghanem.jpg"
    },
    {
        id: "wissamAlHassan",
        image: "/fallenPatriots/wissam_al_hassan.jpg"
    },
    {
        id: "mohamadChatah",
        image: "/fallenPatriots/Mohamad_Chatah.jpg"
    }
];

export default function AssassinatedLeadersView() {
    const t = useTranslations("FallenAngelsPage");

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative pb-20">

                {/* Header Section */}
                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text={AD_GRANTS_REVIEW_MODE ? t("reviewTitle") : t("title")}
                        className="text-5xl mb-6 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto space-y-6">
                        <p>{t("description.p1")}</p>
                        <p>{t("description.p2")}</p>
                        <p className="text-foreground font-semibold pt-4">
                            {t("description.p3")}
                        </p>
                    </div>

                    {AD_GRANTS_REVIEW_MODE && (
                        <div className="mt-8 px-5 py-2.5 rounded-lg bg-background/80 border border-foreground/10 max-w-2xl mx-auto backdrop-blur-sm">
                            <p className="font-oswald text-xs text-foreground/60 leading-relaxed text-center">
                                <span className="font-bold text-foreground/80">{t('sourcingLabel')}: </span>
                                {t('sourcingNote')}
                            </p>
                        </div>
                    )}
                </div>

                {/* List Section */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {fallenAngelsItems.map((angel, index) => {
                        const nameKey = `angels.${angel.id}.name`;
                        const descKey = `angels.${angel.id}.desc`;
                        const roleKey = `angels.${angel.id}.role`;

                        return (
                            <React.Fragment key={index}>
                                {index === 5 && (
                                    <div className="py-8 md:py-12 text-center max-w-4xl mx-auto fallen-card">
                                        <p className="font-oswald text-lg md:text-xl text-foreground font-semibold leading-relaxed border-t border-b border-foreground/10 py-8">
                                            {t("triggerText")}
                                        </p>
                                    </div>
                                )}

                                <div className="fallen-card group relative bg-foreground/5 border border-white/10 rounded-xl overflow-hidden hover:bg-blue transition-all duration-500">
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start p-6 md:p-8">

                                        {/* Image Container */}
                                        <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 relative rounded-full md:rounded-lg overflow-hidden border-2 border-theme-accent/20 shadow-2xl">
                                            <SkeletonImage
                                                src={angel.image}
                                                alt={t(nameKey)}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-bebas text-3xl md:text-4xl text-red mb-3 tracking-wide">
                                                {angel.hasRole ? `${t(roleKey)} ${t(nameKey)}` : t(nameKey)}
                                            </h3>
                                            <p className="font-oswald text-foreground/80 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors">
                                                {t(descKey)}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="mt-24 mb-12 relative text-center">
                    {/* Decorative Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[3px] bg-linear-to-r from-transparent via-red to-transparent transform -translate-y-1/2" />

                    <div className="relative inline-block bg-background px-6 md:px-12">
                        <p className="font-bebas text-xl md:text-3xl text-foreground/60 uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto">
                            <span className="text-red/80">{t("footer.text1")}</span> <br className="hidden md:block" />
                            {t("footer.text2")}
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}
