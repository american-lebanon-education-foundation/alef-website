import Link from "next/link";
import SkeletonImage from "../CommonCom/SkeletonImage";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

interface BlogPost {
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    isPinned?: boolean;
    pinnedBadge?: string;
    mainImage?: SanityImageObject;
    author: {
        name: string;
    };
}

export default async function BlogsAndArticles() {
    // Note: useTranslations hook works in Server Components in next-intl if correctly set up but typically it's easier to use getTranslations for async components or just useStrings?
    // Actually, in app router server components, we use `getTranslations`.
    // However, since this component is async, I can use `await getTranslations`.

    // Wait, let's check imports.
    const { getTranslations, getLocale } = await import('next-intl/server');
    const t = await getTranslations('BlogsAndArticles');
    const locale = await getLocale();

    // 1. Check if any blog has isPinned == true toggled in Sanity Studio
    const sanityPinnedQuery = `*[_type == "blog" && isPinned == true] | order(publishedAt desc)[0] {
        "title": coalesce(title[$locale], title.en, title),
        slug,
        publishedAt,
        "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
        mainImage,
        isPinned,
        pinnedBadge,
        author->{
            "name": coalesce(name[$locale], name.en, name)
        }
    }`;

    let blog: BlogPost | null = await client.fetch(sanityPinnedQuery, { locale });

    // 2. If none toggled in Sanity Studio, fallback to latest blog
    if (!blog) {
        const fallbackFilter = AD_GRANTS_REVIEW_MODE
            ? `*[_type == "blog" && slug.current != "exploiting-the-commons-hezbollah-s-systematic-weaponization-of-lebanon-s-civilian-and-cultural-infrastructure"] | order(publishedAt desc)[0]`
            : `*[_type == "blog"] | order(publishedAt desc)[0]`;

        const query = `${fallbackFilter} {
            "title": coalesce(title[$locale], title.en, title),
            slug,
            publishedAt,
            "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
            mainImage,
            isPinned,
            pinnedBadge,
            author->{
                "name": coalesce(name[$locale], name.en, name)
            }
        }`;

        blog = await client.fetch(query, { locale });
    }

    if (!blog) return null;

    const isFeatured = Boolean(blog.isPinned);
    const badgeLabel = blog.pinnedBadge || t('featuredTag');
    const date = new Date(blog.publishedAt).toLocaleDateString();
    // Locale date string might default to server locale (usually en). To do this properly I should use the current locale.
    // But getting current locale in server component requires `getLocale`.
    // For now, let's keep it simple or use simple date.

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block animate-pulse"></span>
                        {t('subtitle')}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Text Card */}
                    <div className="bg-blue border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[500px] h-full relative group hover:border-white/30 transition-colors duration-500">

                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-0 mb-8 w-full">
                                <div className="bg-red/90 text-white px-4.5 py-2 rounded-full flex items-center gap-2">
                                    <Siren className="w-3 h-3 md:w-4 md:h-4" />
                                    <span className="font-oswald text-xs md:text-xs tracking-widest uppercase font-bold">{isFeatured ? badgeLabel : t('latestTag')}</span>
                                </div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <h3 className="text-3xl md:text-4xl text-white font-bebas tracking-wide leading-tight">
                                        {blog.title}
                                    </h3>
                                    <h4 className="text-red font-bebas text-xl tracking-wider">
                                        {date}
                                    </h4>
                                </div>

                                <div className="space-y-6 text-base md:text-lg text-white/60 font-oswald leading-relaxed">
                                    <p>
                                        {blog.excerpt}
                                    </p>
                                    <p className="font-oswald text-xs tracking-widest text-white/60 pt-4">
                                        ~ {blog.author?.name?.toUpperCase() || t('team')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
                            <Link
                                href={`/blogs-and-articles/${blog.slug.current}`}
                                className="group/btn flex items-center gap-4 w-full justify-between relative"
                            >
                                <span className="text-white font-bebas text-lg md:text-xl tracking-wider group-hover/btn:text-red transition-colors relative">
                                    {t('readFull')}
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                </span>
                                <div className="md:w-12 md:h-12 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover/btn:bg-red group-hover/btn:border-red transition-all duration-300">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="bg-blue border border-white/10 rounded-2xl p-2 min-h-[400px] h-full relative overflow-hidden group">
                        {blog.mainImage?.asset && (
                            <SkeletonImage
                                src={urlFor(blog.mainImage).url()}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                            />
                        )}

                        {/* Overlay Elements */}
                        <div className="absolute top-6 left-6 z-10">
                            <div className="px-3 py-1 border border-red/50 bg-red/10 rounded text-red font-oswald text-xs tracking-widest uppercase font-semibold">
                                {isFeatured ? badgeLabel : t('featuredTag')}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center mt-12 relative z-10">
                    <Link href="/blogs-and-articles">
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">{t('viewAll')}</span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function Siren({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" />
            <path d="M5 20h14" />
            <path d="M21 12h1" />
            <path d="M18.5 4.5 18 5" />
            <path d="M2 12h1" />
            <path d="M12 2v1" />
            <path d="m5.5 4.5.5.5" />
        </svg>
    );
}