import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";
import { CARD_DATA } from "@/app/[locale]/(research-and-news)/house-of-cards/card-data";

const getAlternateUrls = (route: string) => {
  const cleanRoute = route === '/' ? '' : route;
  return {
    en: `https://www.usalef.org${cleanRoute}`,
    fr: `https://www.usalef.org/fr${cleanRoute}`,
    ar: `https://www.usalef.org/ar${cleanRoute}`,
    es: `https://www.usalef.org/es${cleanRoute}`,
  };
};

const makeSitemapItem = (
  route: string, 
  priority: number = 0.8, 
  changeFreq: 'daily' | 'weekly' | 'monthly' = 'weekly',
  lastMod?: string | Date
) => {
  const cleanRoute = route === '/' ? '' : route;
  return {
    url: `https://www.usalef.org${cleanRoute}`,
    lastModified: lastMod ? new Date(lastMod) : new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: getAlternateUrls(route),
    },
  };
};

const staticRoutes = [
  { path: '/', priority: 1.0 },
  { path: '/alef-profile', priority: 0.8 },
  { path: '/core-values', priority: 0.8 },
  { path: '/strategic-plan', priority: 0.8 },
  { path: '/experts-corner', priority: 0.8 },
  { path: '/why-join-us', priority: 0.8 },
  { path: '/sponsors', priority: 0.7 },
  { path: '/testimonials', priority: 0.7 },
  { path: '/congressional-advocacy', priority: 0.8 },
  { path: '/get-involved', priority: 0.8 },
  { path: '/blogs-and-articles', priority: 0.8 },
  { path: '/alef-in-the-news', priority: 0.8 },
  { path: '/house-of-corruption', priority: 0.8 },
  { path: '/house-of-cards', priority: 0.8 },
  { path: '/archives', priority: 0.7 },
  { path: '/book-recommendations', priority: 0.6 },
  { path: '/fallen-martyrs', priority: 0.7 },
  { path: '/videos', priority: 0.7 },
  { path: '/shorts', priority: 0.6 },
  { path: '/podcasts', priority: 0.7 },
  { path: '/webinars', priority: 0.7 },
  { path: '/events', priority: 0.7 },
  { path: '/events/gathering-for-a-new-lebanon', priority: 0.6 },
  { path: '/contact', priority: 0.7 },
  { path: '/faq', priority: 0.7 },
  { path: '/donate', priority: 0.8 },
  { path: '/hezbollah-accountability-act', priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Map static routes
  const staticItems = staticRoutes.map(route =>
    makeSitemapItem(route.path, route.priority, route.path === '/' ? 'daily' : 'weekly')
  );

  // 2. Query Sanity for all blog posts
  let blogItems: MetadataRoute.Sitemap = [];
  try {
    const blogsQuery = `*[_type == "blog"] { "slug": slug.current, _updatedAt }`;
    const blogs = await client.fetch<{ slug: string; _updatedAt: string }[]>(blogsQuery);
    blogItems = (blogs || []).map(blog => 
      makeSitemapItem(`/blogs-and-articles/${blog.slug}`, 0.6, 'weekly', blog._updatedAt)
    );
  } catch (error) {
    console.error("Sitemap generation error fetching blogs:", error);
  }

  // 3. Map House of Cards static data
  const cardItems = (CARD_DATA || []).map(card => 
    makeSitemapItem(`/house-of-cards/${card.id}`, 0.6, 'monthly')
  );

  return [
    ...staticItems,
    ...blogItems,
    ...cardItems,
  ];
}
