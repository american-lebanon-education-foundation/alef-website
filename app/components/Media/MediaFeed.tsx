"use client";

import { useState, useMemo } from "react";
import FilterBar from "../CommonCom/FilterBar";
import VideoCard from "./VideoCard";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface MediaItem {
    _id: string;
    title: string;
    videoUrl: string;
    publishedAt: string;
    thumbnail?: SanityImageSource;
    mainImage?: SanityImageSource;
    platform?: string;
    transcriptUrl?: string;
}

interface MediaFeedProps {
    items: MediaItem[];
    type: "video" | "short" | "podcast" | "webinar";
}

export default function MediaFeed({ items, type }: MediaFeedProps) {
    const t = useTranslations("MediaFeed");
    const ITEMS_PER_PAGE = type === 'short' ? 8 : 6;
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [prevFilter, setPrevFilter] = useState(filter);
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    if (prevFilter !== filter || prevSearchQuery !== searchQuery) {
        setPrevFilter(filter);
        setPrevSearchQuery(searchQuery);
        setCurrentPage(1);
    }

    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(items.map(item =>
            new Date(item.publishedAt).getFullYear().toString()
        ))).sort((a, b) => b.localeCompare(a));

        return ["All", ...uniqueYears];
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const itemYear = new Date(item.publishedAt).getFullYear().toString();
            const matchesYear = filter === "All" || itemYear === filter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesYear && matchesSearch;
        });
    }, [filter, searchQuery, items]);

    // Number items chronologically (oldest item = #1, and so on)
    const itemNumberMap = useMemo(() => {
        const sorted = [...items].sort((a, b) => {
            const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            if (timeA !== timeB) return timeA - timeB;
            return a._id.localeCompare(b._id);
        });
        const map = new Map<string, number>();
        sorted.forEach((item, index) => {
            map.set(item._id, index + 1);
        });
        return map;
    }, [items]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const validCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
    const paginatedItems = filteredItems.slice(
        (validCurrentPage - 1) * ITEMS_PER_PAGE,
        validCurrentPage * ITEMS_PER_PAGE
    );

    // Grid config based on type
    const gridCols = type === 'short'
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    const highlightText = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={index} className="bg-red/70 text-white rounded px-0.5">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div>
            {/* Filters Row */}
            <FilterBar
                tabs={years.map(y => y === "All" ? t("all") : y)} // Translate "All" for display
                activeTab={filter === "All" ? t("all") : filter} // Match translated active tab
                onTabChange={(tab) => {
                    setFilter(tab === t("all") ? "All" : tab);
                    setCurrentPage(1);
                }}
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                    setSearchQuery(query);
                    setCurrentPage(1);
                }}
                searchPlaceholder={t("searchPlaceholder")}
            />

            {/* Grid */}
            <div className={`grid gap-8 mb-12 ${gridCols}`}>
                {paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => {
                        const itemNumber = itemNumberMap.get(item._id);
                        return (
                            <div key={item._id} className={type === 'short' ? 'w-full flex justify-center' : 'w-full'}>
                                <VideoCard
                                    title={highlightText(item.title, searchQuery)}
                                    videoUrl={item.videoUrl}
                                    thumbnail={item.thumbnail || item.mainImage}
                                    publishedAt={item.publishedAt}
                                    platform={item.platform}
                                    type={type}
                                    transcriptUrl={item.transcriptUrl}
                                    itemIndex={itemNumber}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                {t("noResults", { type: type, query: searchQuery })}
                            </p>
                            <button
                                onClick={() => {
                                    setFilter("All");
                                    setSearchQuery("");
                                    setCurrentPage(1);
                                }}
                                className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
                            >
                                {t("clearFilters")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mb-24 animate-in fade-in duration-500">
                    <button
                        onClick={() => {
                            setCurrentPage(p => Math.max(1, p - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={validCurrentPage === 1}
                        className="group flex items-center gap-2 px-4 py-2 border border-foreground/30 rounded-full hover:bg-red hover:border-red hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/30 disabled:hover:text-foreground transition-all duration-300 cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                        <span className="font-bebas text-lg tracking-wider hidden sm:inline">{t('previous')}</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-10 h-10 rounded-full font-bebas text-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${validCurrentPage === page
                                    ? "bg-red text-white scale-110 shadow-lg"
                                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setCurrentPage(p => Math.min(totalPages, p + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={validCurrentPage === totalPages}
                        className="group flex items-center gap-2 px-4 py-2 border border-foreground/30 rounded-full hover:bg-red hover:border-red hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/30 disabled:hover:text-foreground transition-all duration-300 cursor-pointer"
                    >
                        <span className="font-bebas text-lg tracking-wider hidden sm:inline">{t('next')}</span>
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                </div>
            )}
        </div>
    );
}