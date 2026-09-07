"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { sendGAEvent } from '@next/third-parties/google';
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
    type: "donate" | "subscribe" | "join";
}

export default function CTASection({ type }: CTASectionProps) {
    const t = useTranslations('CTASection');
    const containerRef = useRef<HTMLDivElement>(null);
    const content = {
        donate: {
            title: AD_GRANTS_REVIEW_MODE ? t('donate.reviewTitle') : t('donate.title'),
            subtitle: AD_GRANTS_REVIEW_MODE ? t('donate.reviewSubtitle') : t('donate.subtitle'),       
            buttonText: t('donate.button'),
            link: "/donate",
            bgGradient: "from-blue/10 to-transparent",
            borderColor: "border-red/20",
            tag: AD_GRANTS_REVIEW_MODE ? t('donate.reviewTag') : t('donate.tag')
        },
        subscribe: {
            title: t('subscribe.title'),
            subtitle: t('subscribe.subtitle'),
            buttonText: t('subscribe.button'),
            link: "#join-us",
            bgGradient: "from-foreground/5 to-transparent",
            borderColor: "border-foreground/10",
            tag: t('subscribe.tag')
        },
        join: {
            title: t('join.title'),
            subtitle: t('join.subtitle'),
            buttonText: t('join.button'),
            link: "#join-us",
            bgGradient: "from-red/5 to-transparent",
            borderColor: "border-blue/20",
            tag: t('join.tag')
        }
    }[type];

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(containerRef.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }
        );

    }, { scope: containerRef });

    const scrollToJoin = (e: React.MouseEvent) => {
        e.preventDefault();
        const joinSection = document.getElementById('join-us');
        if (joinSection) {
            joinSection.scrollIntoView({ behavior: 'smooth' });
        }
        sendGAEvent('event', `${type}_click`, { value: 'cta_section' });
    };

    return (
        <section ref={containerRef} className="py-16 md:py-20 px-6">
            <div className={`max-w-5xl mx-auto rounded-xl border ${content.borderColor} bg-linear-to-b ${content.bgGradient} backdrop-blur-sm p-8 md:p-12 relative overflow-hidden group`}>

                {/* Decorative background noise/texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] pointer-events-none mix-blend-overlay"></div>

                {/* Hover Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full bg-red ${type === 'donate' ? 'animate-pulse' : ''}`}></span>
                            <span className="font-oswald text-xs tracking-[0.2em] uppercase text-red">
                                {content.tag}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bebas text-foreground leading-none">
                            {content.title}
                        </h2>

                        <p className="font-oswald text-foreground/60 text-sm md:text-base tracking-wide max-w-xl">
                            {content.subtitle}
                        </p>
                    </div>

                    {type === 'donate' ? (
                        <Link href={content.link}>
                            <button 
                                onClick={() => sendGAEvent('event', 'donate_click', { value: 'cta_section' })}
                                className="group/btn relative overflow-hidden bg-red text-white px-8 py-4 font-oswald font-bold tracking-[0.15em] uppercase text-sm transition-all hover:bg-[#c4151c] hover:text-white shrink-0 min-w-[200px] cursor-pointer"
                            >
                                <span className="relative z-10">{content.buttonText}</span>
                            </button>
                        </Link>
                    ) : (
                        <button
                            onClick={scrollToJoin}
                            className="group/btn relative overflow-hidden bg-red text-white px-8 py-4 font-oswald font-bold tracking-[0.15em] uppercase text-sm transition-all hover:bg-[#c4151c] hover:text-white shrink-0 min-w-[200px] cursor-pointer"
                        >
                            <span className="relative z-10">{content.buttonText}</span>
                        </button>
                    )}

                </div>
            </div>
        </section>
    );
}