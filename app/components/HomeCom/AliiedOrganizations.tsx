"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

gsap.registerPlugin(useGSAP);

const ALLIES = [
    { key: "heritage", url: "https://www.heritage.org/" },
    { key: "aei", url: "https://www.aei.org/" },
    { key: "hudson", url: "https://www.hudson.org/" },
    { key: "csp", url: "https://centerforsecuritypolicy.org/" },
    { key: "fdd", url: "https://www.fdd.org/" },
    { key: "yaf", url: "https://yaf.org/" },
    { key: "livingston", url: "https://www.livingstongroupdc.com/" },
    { key: "tpusa", url: "https://tpusa.com/" },
    { key: "fpri", url: "https://www.fpri.org/" },
    { key: "transparency", url: "https://transparency.news/" },
    { key: "winep", url: "https://www.washingtoninstitute.org/" },
    { key: "blackhawk", url: "https://www.blackhawkpartners.com/" },
    { key: "guardians", url: "https://www.gotc.info/index.php/en/" },
    { key: "capitol", url: "https://capitolinstitute.org/" },
    { key: "nic", url: "https://iraniancongress.com/" }
];

const PARTISAN_KEYS = new Set(["heritage", "csp", "tpusa", "nic", "guardians"]);

export default function AlliedOrganizations() {
    const t = useTranslations('AlliedOrganizations');
    const trackRef = useRef<HTMLDivElement>(null);
    const displayAllies = AD_GRANTS_REVIEW_MODE
        ? ALLIES.filter((ally) => !PARTISAN_KEYS.has(ally.key))
        : ALLIES;

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
        });
    }, { scope: trackRef });

    return (
        <section className="py-12 md:py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16">

                <div className="flex flex-col items-center text-center gap-4">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        {t('subtitle')}
                    </div>
                </div>

            </div>

            <div className="relative w-full overflow-hidden" dir="ltr">
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-r from-background to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-linear-to-l from-background to-transparent"></div>

                <div
                    ref={trackRef}
                    className="flex gap-12 md:gap-24 w-fit px-12"
                    dir="ltr"
                >
                    {[...displayAllies, ...displayAllies].map((ally, index) => (
                        <Link
                            key={index}
                            href={ally.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 group cursor-pointer"
                        >
                            <h3 className="text-3xl md:text-4xl font-bebas text-foreground whitespace-nowrap group-hover:text-red transition-colors">
                                {t(ally.key)}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
