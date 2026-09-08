"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/routing";
import SkeletonImage from "../CommonCom/SkeletonImage";
import { ArrowRight, User, ChevronLeft, ChevronRight, Sparkles, Flame } from "lucide-react";
import FilterBar from "../CommonCom/FilterBar";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations, useLocale } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

interface Sanityblog {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    isPinned?: boolean;
    pinnedBadge?: string;
    mainImage?: {
        asset: {
            _ref: string;
        };
    };
    author?: {
        name: string;
        discloseName?: boolean;
        image?: {
            asset: {
                _ref: string;
            };
        };
    };
}

interface BlogsFeedProps {
    initialBlogs: Sanityblog[];
}

export default function BlogsFeed({ initialBlogs }: BlogsFeedProps) {
    const t = useTranslations('BlogsPage');
    const locale = useLocale();
    const ITEMS_PER_PAGE = 9;
    const [filter, setFilter] = useState("All"); // Year filter
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter high-risk content in review mode and hoist pinned blogs to top based on Sanity Studio
    const baseBlogs = useMemo(() => {
        let list = initialBlogs || [];
        if (AD_GRANTS_REVIEW_MODE) {
            list = list.filter(blog =>
                blog.slug?.current !== "exploiting-the-commons-hezbollah-s-systematic-weaponization-of-lebanon-s-civilian-and-cultural-infrastructure"
            );
        }

        return [...list].sort((a, b) => {
            const isPinnedA = a.isPinned ? 1 : 0;
            const isPinnedB = b.isPinned ? 1 : 0;
            return isPinnedB - isPinnedA;
        });
    }, [initialBlogs]);

    // Extract unique years for horizontal tabs
    const years = useMemo(() => {
        const uniqueYears = Array.from(new Set(baseBlogs.map(blog =>
            blog.publishedAt ? new Date(blog.publishedAt).getFullYear().toString() : "N/A"
        ))).filter(y => y !== "N/A").sort((a, b) => b.localeCompare(a));
        return ["All", ...uniqueYears];
    }, [baseBlogs]);

    const filteredBlogs = useMemo(() => {
        return baseBlogs.filter(blog => {
            const blogYear = blog.publishedAt ? new Date(blog.publishedAt).getFullYear().toString() : "N/A";
            const blogAuthor = blog.author?.discloseName ? blog.author.name : t('anonymous');

            const matchesYear = filter === "All" || blogYear === filter;
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blogAuthor.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesYear && matchesSearch;
        });
    }, [baseBlogs, filter, searchQuery, t]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const highlightText = (text: string, query: string) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-red/70 text-white rounded px-0.5">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {/* Filters Row */}
            <FilterBar
                tabs={years.map(y => y === "All" ? t('all') : y)}
                activeTab={filter === "All" ? t('all') : filter}
                onTabChange={(tab) => setFilter(tab === t('all') ? "All" : tab)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder={t('searchPlaceholder')}
            />

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[50vh]">
                {paginatedBlogs && paginatedBlogs.length > 0 ? (
                    paginatedBlogs.map((blog: Sanityblog) => {
                        const pinnedBadge = blog.isPinned ? (blog.pinnedBadge || "FEATURED") : null;

                        return (
                            <Link
                                key={blog._id}
                                href={`/blogs-and-articles/${blog.slug.current}`}
                                className="group bg-blue flex flex-col h-full rounded-sm overflow-hidden relative"
                            >
                                {/* Blog Image */}
                                <div className="relative w-full h-52 overflow-hidden">
                                    {/* Pinned / Showcase Badge */}
                                    {pinnedBadge && (
                                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-red via-[#e3242b] to-red/80 text-white font-oswald text-xs uppercase tracking-widest font-semibold shadow-lg shadow-black/50 border border-white/20 backdrop-blur-xs">
                                            {pinnedBadge.toUpperCase() === "HOT" ? (
                                                <Flame className="w-3.5 h-3.5 fill-white text-white" />
                                            ) : (
                                                <Sparkles className="w-3.5 h-3.5 text-white" />
                                            )}
                                            <span>{pinnedBadge}</span>
                                        </div>
                                    )}

                                    {blog.mainImage?.asset ? (
                                        <SkeletonImage
                                            src={urlFor(blog.mainImage).width(600).height(400).url()}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-light-blue to-blue flex items-center justify-center">
                                            <span className="text-white/20 font-bebas text-4xl">ALEF</span>
                                        </div>
                                    )}
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-blue via-transparent to-transparent opacity-60"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col grow">
                                    <h3 className="text-2xl font-bebas text-white mb-3 leading-tight">
                                        {highlightText(blog.title, searchQuery)}
                                    </h3>

                                <p className="font-oswald text-white/70 text-sm leading-relaxed mb-4 line-clamp-3 grow">
                                    {highlightText(blog.excerpt, searchQuery)}
                                </p>

                                {/* Author and Date */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        {blog.author?.image?.asset ? (
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-red/30">
                                                <SkeletonImage
                                                    src={urlFor(blog.author.image).width(64).height(64).url()}
                                                    alt={blog.author.discloseName === true ? (blog.author.name || 'Author') : 'Author'}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ring-2 ring-white/10">
                                                <User className="w-4 h-4 text-white/30" />
                                            </div>
                                        )}
                                        <span className="font-oswald text-sm text-white/60">
                                            {highlightText(blog.author?.discloseName === true ? (blog.author?.name || t('anonymous')) : '★★★★★★', searchQuery)}
                                        </span>
                                    </div>

                                    <span className="font-oswald text-xs text-white/40 tracking-wider uppercase">
                                        {blog.publishedAt && new Date(blog.publishedAt).toLocaleDateString(locale, {
                                            year: "numeric", month: "short", day: "numeric"
                                        })}
                                    </span>
                                </div>

                                {/* Read More */}
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                                    <span className="text-white font-bebas text-lg tracking-wider group-hover:text-red transition-colors">
                                        {t('readFull')}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-white group-hover:text-red transition-colors transform group-hover:translate-x-1 duration-300" />
                                </div>
                            </div>
                        </Link>
                    );
                })
                ) : (
                    <div className="col-span-full text-center py-20 bg-blue/50 rounded-lg border border-white/5">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <p className="text-foreground/60 text-xl font-oswald tracking-widest uppercase">
                                {t('noResults')}
                            </p>
                            <button
                                onClick={() => {
                                    setFilter("All");
                                    setSearchQuery("");
                                }}
                                className="text-red font-oswald text-sm underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
                            >
                                {t('clearFilters')}
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
                        disabled={currentPage === 1}
                        className="group flex items-center gap-2 px-4 py-2 border border-foreground/30 rounded-full hover:bg-red hover:border-red hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/30 disabled:hover:text-foreground transition-all duration-300 cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
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
                                className={`w-10 h-10 rounded-full font-bebas text-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${currentPage === page
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
                        disabled={currentPage === totalPages}
                        className="group flex items-center gap-2 px-4 py-2 border border-foreground/30 rounded-full hover:bg-red hover:border-red hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-foreground/30 disabled:hover:text-foreground transition-all duration-300 cursor-pointer"
                    >
                        <span className="font-bebas text-lg tracking-wider hidden sm:inline">{t('next')}</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </>
    );
}
