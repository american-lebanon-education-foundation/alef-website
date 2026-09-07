"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skeleton } from "../CommonCom/SkeletonImage";
import { useTranslations } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const t = useTranslations('Hero');
    const heroRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVideoLoaded, setIsModalVideoLoaded] = useState(false);

    useGSAP(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }, { scope: heroRef });

    const scrollToJoin = (e: React.MouseEvent) => {
        e.preventDefault();
        const joinSection = document.getElementById('join-us');
        if (joinSection) {
            joinSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Lock body scroll when modal is open — use class toggle to avoid forced reflow
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
            setIsModalVideoLoaded(false); // Reset modal video loading state on close
        };
    }, [isModalOpen]);

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden bg-black">
            {/* Background Video */}
            <div ref={videoRef} className="absolute inset-0 z-0 hero-video pointer-events-none">
                <video
                    className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/home/hero-poster.webp"
                >
                    <source src="/home/Hero_Intro_Video_mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
                    <source src="/home/Hero_Intro_Video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center pt-12 px-6 md:px-12 lg:px-24 w-full max-w-[1920px] mx-auto text-center">
                <div className="max-w-5xl space-y-3 hero-content text-white">
                    <h1
                        className={`${AD_GRANTS_REVIEW_MODE ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : "text-4xl md:text-8xl"} font-bold uppercase tracking-wide font-bebas`}
                        style={AD_GRANTS_REVIEW_MODE ? { lineHeight: 1.1 } : undefined}
                        dangerouslySetInnerHTML={{ __html: AD_GRANTS_REVIEW_MODE ? t.raw('reviewTitle') : t.raw('title') }}
                    />

                    <p className="text-base md:text-2xl leading-relaxed font-oswald">
                        {AD_GRANTS_REVIEW_MODE ? t('reviewSubtitle') : t('subtitle')} <br />
                        <span>{t('tagline')}</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                        <button onClick={scrollToJoin} className="group bg-red hover:bg-[#c4151c] px-8 py-3 text-sm font-semibold transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-3 w-full sm:w-auto uppercase tracking-widest rounded-none font-oswald cursor-pointer text-white">
                            {t('joinUs')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative overflow-hidden group border border-white px-8 py-3 text-sm font-medium transition-all backdrop-blur-sm w-full sm:w-auto justify-center uppercase tracking-widest rounded-none font-oswald flex items-center gap-3 hover:text-black text-white isolate cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-white transition-transform duration-500 ease-out origin-top scale-y-0 group-hover:origin-bottom group-hover:scale-y-100 -z-10" />
                            <span className="relative z-10 flex items-center gap-3 cursor-pointer">
                                {t('watchVideo')}
                                <PlayCircleIcon className="w-5 h-5" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-10"
                    >
                        <CloseIcon className="w-8 h-8" />
                    </button>

                    <div
                        className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isModalVideoLoaded && <Skeleton className="absolute inset-0 w-full h-full z-20" />}
                        <video
                            className={`w-full h-full object-contain transition-opacity duration-500 ${isModalVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                            controls
                            autoPlay
                            playsInline
                            poster="/home/hero-detailed-poster.webp"
                            onLoadedData={() => setIsModalVideoLoaded(true)}
                        >
                            <source src="/home/hero-detailed-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsModalOpen(false)} />
                </div>
            )}
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function PlayCircleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            <polygon points="10 8 16 12 10 16 10 8" stroke="currentColor" fill="none" />
        </svg>
    );
}

function CloseIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}