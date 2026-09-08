import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { client } from "@/sanity/lib/client";
import BlogsFeed from "@/app/components/Blogs/BlogsFeed";
import SubmitBlog from "@/app/components/Blogs/SubmitBlog";
import { getTranslations, getLocale } from 'next-intl/server';

export const revalidate = 60;

export default async function BlogsPage() {
    const t = await getTranslations('BlogsPage');
    const locale = await getLocale();
    const query = `
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      "title": coalesce(title[$locale], title.en, title),
      slug,
      publishedAt,
      "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
      mainImage,
      isPinned,
      pinnedBadge,
      author->{
        "name": coalesce(name[$locale], name.en, name),
        discloseName,
        image
      }
    }
  `;

    const blogs = await client.fetch(query, { locale });

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text={t('title')}
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                        {t('desc')}
                    </p>
                </div>

                <BlogsFeed initialBlogs={blogs} />

                <SubmitBlog />

            </main>
        </div>
    );
}
