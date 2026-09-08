"use client";

import { useRef, useState, useEffect } from "react";
import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useTranslations, useLocale } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

import {
    AlertTriangle,
    Banknote,
    Building2,
    Users,
    Zap,
    MoveRight,
    FileText,
    Siren,
    Globe,
    Scale,
    ShieldAlert,
    X,
    Maximize2,
    Car,
    Bomb,
    TrendingDown,
    HeartPulse
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Reusable Components
const SectionHeader = ({ subtitle, title, figure, text }: { subtitle: string, title: string, figure: string, text: string }) => (
    <div className="py-16 text-center">
        <span className="font-oswald text-[10px] tracking-[0.4em] text-red uppercase mb-4 block">{subtitle}</span>
        <h2 className="text-5xl md:text-8xl font-bebas text-foreground mb-6 leading-none">{title}</h2>
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bebas text-3xl md:text-5xl text-red">{figure}</div>
            <p className="font-oswald text-foreground/60 max-w-lg mx-auto text-base font-light tracking-wide">
                {text}
            </p>
        </div>
    </div>
);

export default function HouseOfCorruptionPage() {
    const t = useTranslations('HouseOfCorruptionPage');
    const locale = useLocale();
    const containerRef = useRef<HTMLDivElement>(null);
    const [counterValue, setCounterValue] = useState(0);
    const [selectedImage, setSelectedImage] = useState<{ id: string, src: string, alt: string, caption: string } | null>(null);

    const getGalleryTitle = (imgId: string) => {
        if (AD_GRANTS_REVIEW_MODE && imgId !== 'img6') {
            return t(`gallery.${imgId}.reviewTitle`);
        }
        return t(`gallery.${imgId}.title`);
    };

    const getGalleryCaption = (imgId: string) => {
        if (AD_GRANTS_REVIEW_MODE && imgId !== 'img6') {
            return t(`gallery.${imgId}.reviewCaption`);
        }
        return t(`gallery.${imgId}.caption`);
    };

    // --- 1. DATA ---
    const DIRECT_LOSSES = [
        {
            id: "DL-01",
            amount: "$150B - $180B",
            icon: <Banknote className="w-8 h-8" />
        },
        // ... (rest of DIRECT_LOSSES items remain the same, just showing structure for context)
        { id: "DL-02", amount: "$80B - $100B", icon: <Globe className="w-8 h-8" /> },
        { id: "DL-03", amount: "$70B - $85B", icon: <AlertTriangle className="w-8 h-8" /> },
        { id: "DL-04", amount: "$40B - $60B", icon: <Building2 className="w-8 h-8" /> },
        { id: "DL-05", amount: "$25B - $35B", icon: <Zap className="w-8 h-8" /> },
        { id: "DL-06", amount: "$15B - $25B", icon: <ShieldAlert className="w-8 h-8" /> },
        { id: "DL-07", amount: "$12B - $18B", icon: <Siren className="w-8 h-8" /> },
        { id: "DL-08", amount: "$10B - $15B", icon: <Scale className="w-8 h-8" /> }
    ];

    const getLocalizedImage = (id: string, defaultExt: string) => {
        let suffix = "";
        if (locale === 'ar') suffix = "-arabic";
        else if (locale === 'fr') suffix = "-french";
        else if (locale === 'es') suffix = "-spanish";

        let ext = defaultExt;
        if (suffix !== "") {
            ext = ".webp";
        }

        return `/houseOfCorruption/house-of-corruption-${id.replace('img', 'img-')}${suffix}${ext}`;
    };

    const GALLERY_IMAGES = [
        // Left Lane: 1, 2, 3
        { id: "img1", src: getLocalizedImage("img1", ".jpg"), side: "left" },
        { id: "img2", src: getLocalizedImage("img2", ".jpg"), side: "left" },
        { id: "img3", src: getLocalizedImage("img3", ".jpg"), side: "left" },

        // Right Lane: 4, 5, 6
        { id: "img4", src: getLocalizedImage("img4", ".jpg"), side: "right" },
        { id: "img5", src: getLocalizedImage("img5", ".jpg"), side: "right" },
        { id: "img6", src: getLocalizedImage("img6", ".webp"), side: "right" },
    ];

    const indirectStats = [
        {
            id: "IL-01",
            loss: "$200B - $250B",
            icon: <Users className="w-6 h-6" />
        },
        {
            id: "IL-02",
            loss: "$40B - $50B",
            icon: <Zap className="w-6 h-6" />
        },
        {
            id: "IL-03",
            loss: "$80B - $100B",
            icon: <Banknote className="w-6 h-6" />
        },
        {
            id: "IL-04",
            loss: "$30B - $40B",
            icon: <Car className="w-6 h-6" />
        },
        {
            id: "IL-05",
            loss: "$15B - $20B",
            icon: <Bomb className="w-6 h-6" />
        },
        {
            id: "IL-06",
            loss: "$50B - $70B",
            icon: <TrendingDown className="w-6 h-6" />
        },
        {
            id: "IL-07",
            loss: "$10B - $15B",
            icon: <HeartPulse className="w-6 h-6" />
        }
    ];

    // Lock body scroll when modal is open — use class toggle to avoid forced reflow
    useEffect(() => {
        if (selectedImage) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [selectedImage]);

    useGSAP(() => {
        // Set initial state
        setCounterValue(0);

        const mm = gsap.matchMedia();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".counter-section",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                onUpdate: (self) => setCounterValue(Math.floor(Math.max(0, self.progress) * 1000))
            }
        });

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

            if (isDesktop) {
                // Vertical Animation (Desktop)
                // Adjusted y values to -250vh to ensure images are fully off-screen at start/end
                gsap.set(".left-lane", { y: "100vh" });
                gsap.set(".right-lane", { y: "-250vh" });

                tl.to(".left-lane", { y: "-250vh", ease: "none", duration: 1 }, 0)
                    .to(".right-lane", { y: "100vh", ease: "none", duration: 1 }, 0);
            }

            if (isMobile) {
                tl.fromTo(".mobile-top-lane",
                    { x: "100vw", xPercent: 0 },
                    { x: 0, xPercent: -100, ease: "none", duration: 1 },
                    0
                );

                tl.fromTo(".mobile-bottom-lane",
                    { x: 0, xPercent: -100 },
                    { x: "100vw", xPercent: 0, ease: "none", duration: 1 },
                    0
                );
            }
        });

        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(".center-line",
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".indirect-list-container",
                        start: "top 75%",
                        end: "bottom center",
                        scrub: 0.1,
                        invalidateOnRefresh: true
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground font-sans selection:bg-red selection:text-white">

            {/* 1. HERO WRAPPER */}
            <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10">
                <div className="relative z-10 text-center px-4 max-w-7xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red text-white font-oswald text-xs tracking-[0.2em] uppercase">
                        <Siren className="w-3 h-3" />
                        {AD_GRANTS_REVIEW_MODE ? t('hero.reviewTag') : t('hero.tag')}
                    </div>
                    <div className="overflow-hidden">
                        <AnimatedTitle
                            text={AD_GRANTS_REVIEW_MODE ? t('hero.reviewTitle') : t('hero.title')}
                            className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold text-foreground flex flex-wrap justify-center gap-x-2 opacity-90 leading-tight"
                        />
                    </div>
                    <p className="font-oswald text-lg md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed text-center font-light tracking-wide">
                        {AD_GRANTS_REVIEW_MODE ? t('hero.reviewDesc') : t('hero.desc')}
                    </p>
                </div>
                <div className="absolute bottom-12">
                    <div className="text-foreground/80 font-oswald text-[10px] tracking-[0.3em] uppercase flex flex-col items-center gap-3 animate-bounce">
                        <span>{t('hero.scroll')}</span>
                        <MoveRight className="w-4 h-4 rotate-90" />
                    </div>
                </div>
            </div>

            {/* 2. COUNTER & FLOATING GALLERY WRAPPER */}
            <div className="counter-section h-screen flex flex-col items-center justify-center relative overflow-hidden z-20 bg-background">

                {/* Floating Images Container */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">

                    {/* DESKTOP: Vertical Lanes (md and up) */}
                    <div className="hidden md:block w-full h-full relative">
                        {/* Left Lane - Moves UP */}
                        <div className="left-lane absolute left-[8%] top-0 flex flex-col gap-[20vh]">
                            {GALLERY_IMAGES.filter(i => i.side === 'left').map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative pointer-events-auto cursor-pointer transition-all duration-500 group w-56 h-72 lg:w-72 lg:h-96"
                                    onClick={() => setSelectedImage({ ...img, alt: getGalleryTitle(img.id), caption: getGalleryCaption(img.id) })}
                                >
                                    <div className="absolute top-1/2 -left-8 w-8 h-px bg-foreground/20"></div>
                                    <div className="relative w-full h-full border border-light-blue rounded-sm overflow-hidden bg-blue shadow-2xl hover:border-red hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <SkeletonImage
                                            src={img.src}
                                            alt={getGalleryTitle(img.id)}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red/30">
                                            <p className="font-bebas text-white text-lg leading-none mb-1">{getGalleryTitle(img.id)}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/60 text-[9px] font-oswald uppercase tracking-wider">{getGalleryCaption(img.id)}</span>
                                                <Maximize2 className="w-3 h-3 text-red" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Lane - Moves DOWN */}
                        <div className="right-lane absolute right-[8%] top-0 flex flex-col gap-[20vh]">
                            {GALLERY_IMAGES.filter(i => i.side === 'right').map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative pointer-events-auto cursor-pointer transition-all duration-500 group w-56 h-72 lg:w-72 lg:h-96"
                                    onClick={() => setSelectedImage({ ...img, alt: getGalleryTitle(img.id), caption: getGalleryCaption(img.id) })}
                                >
                                    <div className="absolute top-1/2 -right-8 w-8 h-px bg-foreground/20"></div>
                                    <div className="relative w-full h-full border border-light-blue rounded-sm overflow-hidden bg-blue shadow-2xl hover:border-red hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                        <SkeletonImage
                                            src={img.src}
                                            alt={getGalleryTitle(img.id)}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red/30">
                                            <p className="font-bebas text-white text-lg leading-none mb-1">{getGalleryTitle(img.id)}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/60 text-[9px] font-oswald uppercase tracking-wider">{getGalleryCaption(img.id)}</span>
                                                <Maximize2 className="w-3 h-3 text-red" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE: Horizontal Lanes (sm only) */}
                    <div className="md:hidden w-full h-full relative flex flex-col justify-between py-12">
                        {/* Top Lane - Moves LEFT */}
                        <div className="mobile-top-lane flex gap-6 absolute top-20 left-0 whitespace-nowrap z-10 transform-gpu will-change-transform">
                            {GALLERY_IMAGES.filter(i => i.side === 'left').map((img, idx) => (
                                <div
                                    key={`top-${idx}`}
                                    className="relative shrink-0 w-36 h-52 rounded-md overflow-hidden border border-white/20 bg-blue shadow-lg pointer-events-auto active:scale-95 transition-transform"
                                    onClick={() => setSelectedImage({ ...img, alt: getGalleryTitle(img.id), caption: getGalleryCaption(img.id) })}
                                >
                                    <SkeletonImage
                                        src={img.src}
                                        alt={getGalleryTitle(img.id)}
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                    <div className="absolute bottom-2 right-2 p-1.5 bg-red/90 rounded-full text-white shadow-lg backdrop-blur-sm">
                                        <Maximize2 className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Lane - Moves RIGHT */}
                        <div className="mobile-bottom-lane flex gap-6 absolute bottom-24 left-0 whitespace-nowrap z-10 transform-gpu will-change-transform">
                            {GALLERY_IMAGES.filter(i => i.side === 'right').map((img, idx) => (
                                <div
                                    key={`bottom-${idx}`}
                                    className="relative shrink-0 w-36 h-52 rounded-md overflow-hidden border border-white/20 bg-blue shadow-lg pointer-events-auto active:scale-95 transition-transform"
                                    onClick={() => setSelectedImage({ ...img, alt: getGalleryTitle(img.id), caption: getGalleryCaption(img.id) })}
                                >
                                    <SkeletonImage
                                        src={img.src}
                                        alt={getGalleryTitle(img.id)}
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                    <div className="absolute bottom-2 right-2 p-1.5 bg-red/90 rounded-full text-white shadow-lg backdrop-blur-sm">
                                        <Maximize2 className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Centered Counter */}
                <div className="relative z-30 text-center px-4 pointer-events-none flex flex-col items-center justify-center h-full">
                    <div className="inline-block border border-red/30 bg-red/5 px-6 py-2 rounded-full mb-8 backdrop-blur-md">
                        <h3 className="font-oswald text-xs md:text-sm text-red tracking-[0.2em] uppercase">{AD_GRANTS_REVIEW_MODE ? t('counter.reviewLabel') : t('counter.label')}</h3>
                    </div>
                    <div className="flex items-baseline justify-center font-bebas text-foreground leading-none">
                        <span className="text-4xl md:text-7xl opacity-50 mr-2 md:mr-6 font-light">$</span>
                        <span className="text-[100px] md:text-[220px] tabular-nums tracking-tighter text-foreground">{counterValue}</span>
                        <span className="text-4xl md:text-7xl ml-2 md:ml-6 font-light">B</span>
                    </div>
                    <p className="font-oswald text-foreground/70 max-w-xl mx-auto mt-8 text-base md:text-lg leading-relaxed font-light tracking-wide bg-background/50 p-6 rounded-xl backdrop-blur-sm border border-foreground/5 hidden md:block">
                        <span dangerouslySetInnerHTML={{ __html: t.raw('counter.desc') }} />
                    </p>
                    {AD_GRANTS_REVIEW_MODE && (
                        <div className="mt-4 px-5 py-2.5 rounded-lg bg-background/80 border border-foreground/10 max-w-xl mx-auto backdrop-blur-sm hidden md:block">
                            <p className="font-oswald text-xs text-foreground/60 leading-relaxed text-center">
                                <span className="font-bold text-foreground/80">{t('counter.methodologyLabel')}: </span>
                                {t('counter.methodologyNote')}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. DIRECT LOSSES WRAPPER */}
            <div className="relative z-30">
                <SectionHeader
                    subtitle={t('directLosses.subtitle')}
                    title={t('directLosses.title')}
                    figure="$500B - $600B"
                    text={t('directLosses.text')}
                />

                {/* Grid View (Desktop) - Replaces Horizontal Scroll */}
                <div className="direct-losses-wrapper hidden lg:block py-24 bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto px-12">
                        {DIRECT_LOSSES.map((item, index) => (
                            <div
                                key={index}
                                className="dossier-card w-full h-[600px] bg-blue relative flex flex-col p-10 group shadow-2xl rounded-sm hover:-translate-y-2 transition-transform duration-300"
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="p-4 bg-linear-to-br from-red to-red/60 rounded-full text-white group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                        {item.icon}
                                    </div>
                                    <span className="font-oswald text-xs text-white/30 tracking-[0.2em] uppercase">{item.id}</span>
                                </div>

                                {/* Content */}
                                <div className="grow flex flex-col justify-center">
                                    <h3 className="font-bebas text-5xl text-white mb-4 leading-[0.85]">{t(`directLosses.items.${item.id}.title`)}</h3>
                                    <div className="h-px w-12 bg-red mb-6 group-hover:w-full transition-all duration-700"></div>

                                    <div className="font-bebas text-4xl text-red/90 mb-6">{item.amount}</div>

                                    <p className="font-oswald text-white/70 text-lg font-light leading-relaxed mb-8">
                                        {t(`directLosses.items.${item.id}.desc`)}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-oswald text-[9px] text-white/30 uppercase tracking-widest">{t('directLosses.sourceLabel')}</span>
                                        <span className="font-oswald text-xs text-white/60 uppercase tracking-wide">{t(`directLosses.items.${item.id}.source`)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile List View (Direct Losses) */}
                <div className="lg:hidden px-6 pb-24 space-y-8 bg-background">
                    {DIRECT_LOSSES.map((item, index) => (
                        <div key={index} className="bg-blue border border-light-blue p-8 rounded-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 text-white">
                                {item.icon}
                            </div>
                            <span className="font-oswald text-[10px] text-red uppercase tracking-widest mb-2 block">{item.id}</span>
                            <h3 className="font-bebas text-4xl text-white mb-2 leading-none">{t(`directLosses.items.${item.id}.title`)}</h3>
                            <div className="font-bebas text-3xl text-red mb-4">{item.amount}</div>
                            <p className="font-oswald text-white/70 text-sm font-light mb-6">{t(`directLosses.items.${item.id}.desc`)}</p>
                            <div className="pt-4 border-t border-white/10">
                                <span className="font-oswald text-[10px] text-white/40 uppercase tracking-wider">{t('directLosses.sourceLabel')}: {t(`directLosses.items.${item.id}.source`)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. INDIRECT LOSSES WRAPPER */}
            <div className="indirect-wrapper py-32 bg-background relative z-40 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 relative">
                    <SectionHeader
                        subtitle={t('indirectLosses.subtitle')}
                        title={t('indirectLosses.title')}
                        figure="$400B - $500B"
                        text={t('indirectLosses.text')}
                    />

                    <div className="indirect-list-container relative space-y-24 mb-32">
                        {/* Faded Background Line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-red/10 hidden md:block"></div>
                        {/* Animating Main Line */}
                        <div className="center-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-red hidden md:block origin-top"></div>

                        {indirectStats.map((stat, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-center gap-12 relative z-10 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                                        {/* Pulse Animations */}
                                        <div className="absolute inset-0 border border-red/40 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                                        <div className="absolute inset-8 border border-red/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] delay-150"></div>
                                        <div className="absolute inset-16 border border-red/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></div>

                                        <div className="w-32 h-32 md:w-40 md:h-40 bg-blue border border-light-blue rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.2)] relative z-20 group">
                                            <div className="text-red scale-150 group-hover:scale-125 transition-transform duration-500">
                                                {stat.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-full md:w-1/2 ${i % 2 === 1 ? 'md:text-right' : 'md:text-left'} text-center`}>
                                    <span className="font-oswald text-xs text-red uppercase tracking-[0.3em] mb-2 block">{t(`indirectLosses.items.${stat.id}.label`)}</span>
                                    <h3 className="font-bebas text-5xl md:text-7xl text-foreground mb-4 leading-[0.9]">{t(`indirectLosses.items.${stat.id}.title`)}</h3>
                                    <div className={`h-1 w-24 bg-foreground/10 mb-6 mx-auto ${i % 2 === 1 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}></div>
                                    <div className="font-bebas text-4xl md:text-5xl text-foreground/80 mb-6">{stat.loss}</div>
                                    <p className={`font-oswald text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-sm mx-auto ${i % 2 === 1 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                                        {t(`indirectLosses.items.${stat.id}.detail`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4.5. RECOMMENDED REFORM PATHWAYS */}
            <div className="py-24 bg-background border-t border-foreground/10 relative z-30">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="font-oswald text-xs md:text-sm tracking-[0.3em] text-red uppercase font-semibold block mb-3">
                            {t('recommendations.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bebas text-foreground tracking-wide">
                            {t('recommendations.title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(['card1', 'card2', 'card3'] as const).map((key, idx) => (
                            <div
                                key={key}
                                className="bg-blue border border-white/10 rounded-xl p-8 flex flex-col justify-between shadow-xl items-center sm:items-start text-center sm:text-left transition-all duration-300 hover:border-red/40"
                            >
                                <div className="space-y-4">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-red to-red/60 text-white flex items-center justify-center font-bebas text-xl shadow-md shadow-red/30">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">
                                        {t(`recommendations.items.${key}.title`)}
                                    </h3>
                                    <p className="font-oswald text-white/70 text-base font-light leading-relaxed">
                                        {t(`recommendations.items.${key}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. CTA WRAPPER */}
            <div className="relative py-40 border-t border-foreground/10 overflow-hidden bg-background">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-background"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <FileText className="w-12 h-12 text-red/80 mx-auto mb-8 opacity-80" />
                    <h2 className="text-5xl md:text-7xl font-bebas text-foreground mb-8 leading-[0.9]">
                        {AD_GRANTS_REVIEW_MODE ? (
                            <span>{t('cta.reviewTitle')}</span>
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: t.raw('cta.title') }} />
                        )}
                    </h2>
                    <p className="font-oswald text-lg text-foreground/60 mb-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                        {AD_GRANTS_REVIEW_MODE ? t('cta.reviewText') : t('cta.text')}
                    </p>
                    <Link
                        href="/houseOfCorruption/house-of-corruption-summary.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-foreground text-background px-10 py-4 md:py-3 font-bebas text-base md:text-lg tracking-[0.2em] uppercase overflow-hidden hover:bg-red hover:text-white transition-all duration-300 cursor-pointer">
                            <span className="relative z-10 flex items-center gap-4">
                                {t('cta.button')} <MoveRight className="w-4 h-4" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* IMAGE INSPECTION MODAL */}
            {selectedImage && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-red transition-colors p-2 z-50 bg-black/20 rounded-full"
                    >
                        <X className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <SkeletonImage
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4 md:mt-6 text-center px-4">
                            <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">{selectedImage.alt}</h3>
                            <p className="font-oswald text-red text-xs md:text-sm tracking-[0.2em] uppercase">{selectedImage.caption}</p>
                        </div>
                    </div>

                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)} />
                </div>
            )}

        </div>
    );
}