"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AlefInTheNewsPage() {
    const t = useTranslations("AlefInTheNewsPage");

    const newsArticles = [
        {
            id: 1,
            title: t("peaceCallNews.title"),
            date: t("peaceCallNews.date"),
            source: t("peaceCallNews.source"),
            description: t("peaceCallNews.description"),
            url: "https://www.einpresswire.com/article/908472264/alef-s-inaugural-gathering-for-a-new-lebanon-concludes-with-bold-call-for-peace-with-israel-major-reform-investment"
        },
        {
            id: 2,
            title: t("gatheringNews.title"),
            date: t("gatheringNews.date"),
            source: t("gatheringNews.source"),
            description: t("gatheringNews.description"),
            url: "https://www.einpresswire.com/article/901903375/alef-hosts-gathering-for-a-new-lebanon-leaders-convene-in-nyc-for-vision-of-a-sovereign-corruption-free-future"
        }
    ];

    return (
        <main className="min-h-screen bg-background overflow-hidden">
            {/* Animated background grid */}
            <div className="fixed inset-0 z-0 pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(rgba(196,21,28,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(196,21,28,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
            }} />

            {/* Floating decorative orbs */}
            <div className="fixed top-1/4 left-1/6 w-64 h-64 bg-red/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="fixed bottom-1/3 right-1/6 w-80 h-80 bg-red/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />

            {/* ─── HERO SECTION ─── */}
            <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-16">

                {/* Main headline */}
                <div className="relative z-10 text-center max-w-5xl mx-auto mb-6">
                    <h1 className="font-bebas text-[clamp(4rem,12vw,10rem)] leading-none text-foreground mb-2 tracking-tight">
                        ALEF{" "}
                        <span className="text-red">{t("titleInThe")}</span>{" "}
                        {t("titleNews")}
                    </h1>
                    <div className="flex items-center justify-center gap-6 mt-4 mb-8">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent to-red/40" />
                        <span className="font-oswald text-foreground/40 text-xs uppercase tracking-[0.4em]">{t("subtitle")}</span>
                        <div className="h-px flex-1 bg-linear-to-l from-transparent to-red/40" />
                    </div>
                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wide">
                        {t("description")}
                    </p>
                </div>
            </section>

            {/* ─── NEWS LATEST SECTION ─── */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
                <div className={`grid grid-cols-1 gap-8 ${
                    newsArticles.length === 1 ? 'max-w-4xl mx-auto' : 
                    newsArticles.length === 2 ? 'max-w-6xl mx-auto md:grid-cols-2' : 
                    'md:grid-cols-2 lg:grid-cols-3'
                }`}>
                    {newsArticles.map((article) => (
                        <div key={article.id} className="group bg-blue border border-white/10 p-8 md:p-10 rounded-xl flex flex-col justify-start relative overflow-hidden">
                            
                            {/* Subtle inner glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full" />
                            
                            <div className="flex justify-between items-center mb-6">
                                <span className="inline-block px-3 py-1 bg-red text-white text-xs font-oswald uppercase tracking-widest rounded-sm font-bold">
                                    {article.source}
                                </span>
                                <span className="text-white/50 text-xs font-oswald tracking-widest">{article.date}</span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-oswald text-white mb-4 leading-tight transition-colors line-clamp-3">
                                {article.title}
                            </h3>
                            
                            <p className="text-white/70 text-sm md:text-base line-clamp-4 grow mb-8">
                                {article.description}
                            </p>
                            
                            <div className="mt-auto">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link relative inline-flex items-center gap-2 text-white/80 hover:text-red font-oswald uppercase tracking-widest text-sm transition-colors pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-red after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                >
                                    {t("readFullNews", { fallback: "Read Full News" })}
                                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-16">
                    <Link href="/contact" className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300 flex items-center gap-2">
                            {t("pressInquiries")}
                            <span className="text-red group-hover:text-background transition-colors duration-300">→</span>
                        </span>
                        <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
