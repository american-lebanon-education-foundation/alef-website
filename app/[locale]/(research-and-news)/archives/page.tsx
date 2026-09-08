"use client";

import { useEffect } from "react";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

interface ArchiveItem {
    id: string;
    url: string;
    highlight?: boolean;
}

const archiveItems: ArchiveItem[] = [
    {
        id: "hezbollahAccountability",
        url: "https://docs.google.com/document/d/e/2PACX-1vS5f00Bza5q1dniXTU6VsUr61FZ0oMGjcOnTUQoKGWZXEYrkLjKbnkJER0qleXYIA/pub",
        highlight: true
    },
    {
        id: "res1559",
        url: "https://share.google/ByXPi7Vm2E4PcBYWF"
    },
    {
        id: "res1680",
        url: "https://share.google/m5vLi6FiZ8CVJyRpU"
    },
    {
        id: "res1701",
        url: "https://share.google/JbJxOtC9mdpip0Gif"
    },
    {
        id: "hr533",
        url: "https://www.congress.gov/bill/100th-congress/house-resolution/533"
    },
    {
        id: "resolution7311",
        url: "https://www.congress.gov/bill/119th-congress/house-bill/7311/text"
    },
    {
        id: "shreveBill",
        url: "https://shreve.house.gov/media/press-releases/representative-shreve-introduces-bill-counter-irans-regime-terror"
    },
    {
        id: "noHezbollahAct",
        url: "https://www.curtis.senate.gov/press-releases/curtis-rosen-introduce-bill-to-counter-hezbollahs-influence-in-latin-america/"
    },
    {
        id: "charlesMalik",
        url: "https://share.google/P1g2gs6pLw9EYt9gF"
    },
    {
        id: "cfrLebanon",
        url: "https://www.cfr.org/backgrounder/lebanon-how-israel-hezbollah-and-regional-powers-are-shaping-its-future?utm_medium=social_share&utm_source=emailfwd"
    },
    {
        id: "randHezbollah",
        url: "https://www.rand.org/pubs/perspectives/PEA3585-1.html"
    }
];

export default function ArchivesPage() {
    const router = useRouter();

    useEffect(() => {
        if (AD_GRANTS_REVIEW_MODE) {
            router.replace('/alef-profile');
        }
    }, [router]);

    if (AD_GRANTS_REVIEW_MODE) {
        return null;
    }

    const t = useTranslations("ArchivesPage");

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text={t("title")}
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                        {t("description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {archiveItems.map((item, index) => {
                        const titleKey = `items.${item.id}.title`;
                        const descKey = `items.${item.id}.description`;
                        const hasDesc = ["hezbollahAccountability", "hr533", "resolution7311", "noHezbollahAct", "cfrLebanon", "randHezbollah"].includes(item.id);

                        return (
                            <Link
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative bg-blue border border-white/10 p-8 hover:bg-light-blue transition-all duration-300 overflow-hidden rounded-lg ${item.highlight ? 'md:col-span-2' : ''}`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-3 transition-colors pr-8">
                                    {t(titleKey)}
                                </h3>

                                {hasDesc && (
                                    <p className="font-oswald text-white/70 text-sm md:text-base leading-relaxed">
                                        {t(descKey)}
                                    </p>
                                )}

                                <div className="mt-6 flex items-center gap-2 text-xs font-oswald tracking-widest text-white/50 group-hover:text-red transition-colors uppercase">
                                    <span>{t("readDocument")}</span>
                                    <span className="w-8 h-px bg-current transition-all group-hover:w-12" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}