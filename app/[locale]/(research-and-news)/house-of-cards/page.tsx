"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import FilterBar from "@/app/components/CommonCom/FilterBar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

gsap.registerPlugin(ScrollTrigger);

import { CARD_DATA } from "./card-data";

const BACK_IMAGE = "/home/card-back.webp";

export default function HouseOfCardsPage() {
    const router = useRouter();

    useEffect(() => {
        if (AD_GRANTS_REVIEW_MODE) {
            router.replace('/alef-profile');
        }
    }, [router]);

    if (AD_GRANTS_REVIEW_MODE) {
        return null;
    }

    const t = useTranslations("HouseOfCardsPage");
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState(() => t("filters.all"));
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(10);
    const CARDS_PER_PAGE = 10;

    const FULL_DECK = useMemo(() => {
        return CARD_DATA.map((dataRef, i) => {
            const tKey = `cards.${dataRef.id}`;
            let suit = dataRef.suit;

            // Map the data suit to the translated filter text
            const lowerSuit = dataRef.suit.toLowerCase();
            if (["spades", "hearts", "diamonds", "clubs"].includes(lowerSuit)) {
                suit = t(`filters.${lowerSuit}`);
            }

            return {
                id: `card-${i}`,
                slug: dataRef.id,
                front: dataRef.image,
                back: BACK_IMAGE,
                name: t(`${tKey}.name`),
                status: t(`${tKey}.tag`),
                stamp: t(`${tKey}.stamp`),
                suit: suit,
                revealed: false
            };
        });
    }, [t]);



    const activeFilterTabs = useMemo(() => [
        t("filters.all"),
        t("filters.spades"),
        t("filters.hearts"),
        t("filters.diamonds"),
        t("filters.clubs")
    ], [t]);


    const filteredCards = useMemo(() => {
        return FULL_DECK.filter(c => {
            const matchesSuit = filter === t("filters.all") || c.suit === filter;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSuit && matchesSearch;
        });
    }, [filter, searchQuery, FULL_DECK, t]);

    const visibleCards = useMemo(() => {
        return filteredCards.slice(0, visibleCount);
    }, [filteredCards, visibleCount]);

    const hasMore = visibleCount < filteredCards.length;

    const handleButtonClick = () => {
        if (hasMore) {
            setVisibleCount(prev => prev + CARDS_PER_PAGE);
        } else {
            setVisibleCount(CARDS_PER_PAGE);
            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setVisibleCount(CARDS_PER_PAGE);
    };

    const handleSearchChange = (newQuery: string) => {
        setSearchQuery(newQuery);
        setVisibleCount(CARDS_PER_PAGE);
    };

    useGSAP(() => {
        if (!gridRef.current) return;

        const cardContainers = gridRef.current.querySelectorAll(".card-container");

        gsap.fromTo(cardContainers,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: "auto"
            }
        );

        cardContainers.forEach((container) => {
            const inner = container.querySelector(".card-inner");
            if (!inner) return;

            const onMouseEnter = () => {
                gsap.to(inner, {
                    rotationY: 180,
                    duration: 1,
                    ease: "bounce.out"
                });
            };

            const onMouseLeave = () => {
                gsap.to(inner, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 1,
                    ease: "bounce.out"
                });
            };

            container.addEventListener("mouseenter", onMouseEnter);
            container.addEventListener("mouseleave", onMouseLeave);
        });

    }, { scope: containerRef, dependencies: [visibleCards] });

    return (
        <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-red selection:text-white pb-32">
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue/40 blur-[120px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-4">
                        <AnimatedTitle
                            text={t("hero.title")}
                            className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.85] uppercase tracking-tighter"
                        />
                        <p className="font-oswald text-xl text-foreground/50 max-w-2xl uppercase tracking-widest leading-relaxed">
                            {t("hero.desc")}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 border-l border-foreground/20 pl-8 h-fit">
                        <span className="font-bebas text-5xl text-red leading-none">{filteredCards.length}</span>
                        <span className="font-oswald text-xs tracking-[0.3em] uppercase text-foreground/40">{t("hero.visibleDossiers")}</span>
                    </div>
                </div>

                {/* Filters Row */}
                <FilterBar
                    tabs={activeFilterTabs}
                    activeTab={filter}
                    onTabChange={handleFilterChange}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder={t("filters.searchPlaceholder")}
                />

                {/* Cards Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-14"
                >
                    {visibleCards.map((card) => (
                        <div
                            key={card.id}
                            className="card-container group relative aspect-[2.5/3.6] cursor-pointer"
                            style={{ perspective: "2000px" }}
                        >
                            <div className="card-inner absolute inset-0 preserve-3d">
                                {/* Front (Pattern/Back) */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-white/10 bg-blue">
                                    <SkeletonImage
                                        src={card.back}
                                        alt="Card Back"
                                        fill
                                        className="object-cover opacity-90"
                                    />
                                </div>

                                {/* Back (Revealed Image) */}
                                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-black/10 bg-[#f0f0f0] rotate-y-180 shadow-xl shadow-black/5 cursor-pointer pointer-events-auto transition-all duration-300 hover:shadow-2xl hover:border-red/20">
                                    <Link href={`/house-of-cards/${card.slug}`} className="absolute inset-0 z-20 block w-full h-full">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <SkeletonImage
                                                src={card.front}
                                                alt={card.name}
                                                fill
                                                className="object-cover scale-90 transition-transform duration-700 group-hover:scale-95"
                                            />
                                        </div>

                                        {/* === STAMP UI === */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-12 border-4 border-red/80 px-2 py-1 rounded-sm backdrop-blur-sm pointer-events-none shadow-lg shadow-black/20 w-[90%] flex justify-center">
                                            <span
                                                className={`font-oswald font-bold text-red/90 uppercase tracking-widest whitespace-normal text-center leading-none ${card.stamp.length > 15 ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}
                                            >
                                                {card.stamp}
                                            </span>
                                        </div>

                                        {/* === NAME CONTAINER === */}
                                        <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center">
                                            <div className="bg-[#f0f0f0] px-3 py-1 rounded-sm max-w-[95%]">
                                                <p className={`font-bebas tracking-wide uppercase text-black/90 leading-none text-center truncate group-hover:scale-105 transition-transform duration-300 ${card.name.length > 15 ? 'text-2xl' : 'text-3xl'}`}>
                                                    {card.name}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(filteredCards.length > CARDS_PER_PAGE || !hasMore) && (
                    <div className="mt-24 flex flex-col items-center">
                        <div className="w-px h-24 bg-linear-to-b from-red to-transparent mb-10"></div>
                        <button
                            onClick={handleButtonClick}
                            className="group relative bg-transparent border border-foreground px-16 py-6 text-sm font-bold tracking-[0.3em] uppercase font-oswald overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-background transition-colors duration-500">
                                {hasMore ? t("hero.decryptMore") : t("hero.secureArchive")}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                        <p className="mt-8 font-oswald text-[10px] tracking-[0.5em] uppercase text-foreground/75">
                            {hasMore
                                ? t("hero.decrypting", { count: visibleCount, total: filteredCards.length })
                                : t("hero.fullArchive_accessible")}
                        </p>
                    </div>
                )}

                {/* Hidden links for crawlers and extractors to find all dynamic cards */}
                <div className="hidden pointer-events-none opacity-0 h-0 overflow-hidden" aria-hidden="true">
                    {(CARD_DATA || []).map((card) => (
                        <Link key={card.id} href={`/house-of-cards/${card.id}`}>
                            {card.name} — {card.role}
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}