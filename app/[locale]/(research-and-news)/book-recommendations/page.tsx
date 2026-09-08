"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export default function BookRecommendationsPage() {
    const t = useTranslations("BookRecommendationsPage");
    const locale = useLocale();

    const allBookKeys = [
        "book1", "book2", "book3", "book4", "book5",
        "book6", "book7", "book8", "book9", "book10", "book11"
    ];

    const bookKeys = AD_GRANTS_REVIEW_MODE
        ? allBookKeys.filter(k => k !== "book3" && k !== "book7" && k !== "book11")
        : allBookKeys;

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">
                <div className="mb-20 text-center max-w-5xl mx-auto">

                    {/* Header Image */}
                    {/* Note: Ensure 'BookRecommendations.png' is placed in 'public/research/' folder */}
                    <div className="w-full max-w-3xl mx-auto mb-8 relative aspect-video md:aspect-21/9 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        {/* Fallback to simple styled container if image missing, but try to load it */}
                        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black flex items-center justify-center text-white/20 font-bebas text-4xl">
                        </div>
                        {/* Uncomment locally once file is moved: */}
                        <Image
                            src={
                                locale === 'ar' ? '/research/BookrecommendationsArabic.webp' :
                                    locale === 'fr' ? '/research/BookrecommendationsFrench.webp' :
                                        locale === 'es' ? '/research/BookrecommendationsSpanish.webp' :
                                            '/research/Bookrecommendations.webp'
                            }
                            alt="Book Recommendations"
                            fill
                            className="object-cover relative z-10"
                            onError={(e) => {
                                // Hide image if fails
                                const target = e.target as HTMLElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>

                    <p className="font-oswald text-foreground/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
                        {t('introDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {bookKeys.map((key, index) => {
                        const links: Record<string, string> = {
                            book1: "https://a.co/d/bLXMDWm",
                            book2: "https://a.co/d/bLXMDWm",
                            book3: "https://a.co/d/6lYzYqi",
                            book4: "https://a.co/d/1yhemDI",
                            book5: "https://a.co/d/gcF6XrM",
                            book6: "https://a.co/d/hUvg75P",
                            book7: "https://a.co/d/5XcpNfY",
                            book8: "https://a.co/d/7Oasu6s",
                            book9: "https://a.co/d/ccaNTG6",
                            book10: "https://a.co/d/8o2bfyw",
                            book11: "https://a.co/d/gMVZNIk"
                        };

                        return (
                            <Link
                                key={key}
                                href={links[key] || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-blue border border-white/10 p-8 rounded-xl transition-all duration-300 hover:bg-light-blue hover:shadow-lg hover:shadow-blue/10 flex flex-col justify-start"
                            >
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-red text-white text-xs font-oswald tracking-widest uppercase rounded-sm font-bold">
                                        Recommendation #{index + 1}
                                    </span>
                                </div>
                                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-3 leading-tight transition-colors">
                                    {t(`books.${key}.title`)}
                                </h3>
                                <div className="w-12 h-0.5 bg-white/10 my-4 group-hover:bg-red/50 transition-colors" />
                                <p className="font-oswald text-white/70 text-sm md:text-base tracking-wide uppercase">
                                    {t(`books.${key}.author`)}
                                </p>
                            </Link>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}
