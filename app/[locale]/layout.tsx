import type { Metadata } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import LayoutWrapper from "../components/CommonCom/LayoutWrapper";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import DeferredChatWidget from "../components/CommonCom/DeferredChatWidget";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const headerList = await headers();
  const rawPathname = headerList.get("x-pathname") || "/";

  const alternateLocales = ['fr', 'ar', 'es'];
  const segments = rawPathname.split('/').filter(Boolean);

  const currentLocale = locale;
  let basePathSegments = [...segments];

  if (segments.length > 0 && alternateLocales.includes(segments[0])) {
    basePathSegments = segments.slice(1);
  }

  const basePath = '/' + basePathSegments.join('/');

  const formatUrl = (loc: string, path: string) => {
    const cleanPath = path === '/' ? '' : path;
    if (loc === 'en') {
      return `https://www.usalef.org${cleanPath}`;
    }
    return `https://www.usalef.org/${loc}${cleanPath}`;
  };

  const canonical = formatUrl(currentLocale, basePath);
  const alternates = {
    canonical,
    languages: {
      en: formatUrl('en', basePath),
      fr: formatUrl('fr', basePath),
      ar: formatUrl('ar', basePath),
      es: formatUrl('es', basePath),
      'x-default': formatUrl('en', basePath),
    }
  };

  const noIndexPatterns = [
    '/login',
    '/profile',
    '/donate/success',
    '/submit-article',
    '/submit-podcast',
    '/submit-webinar',
    '/submit-video',
    '/submit-short',
  ];

  const isNoIndex = noIndexPatterns.some(pattern => basePath.startsWith(pattern));
  const robots = isNoIndex ? { index: false, follow: false } : undefined;

  let title = "American Lebanon Education Foundation (ALEF)";
  let description = "ALEF is a global, non-partisan initiative advocating for a free, sovereign Lebanon — exposing corruption, combating Hezbollah, and driving policy reform.";

  try {
    const t = await getTranslations({ locale: currentLocale, namespace: 'Metadata' });
    const pageKey = basePathSegments.length > 0 ? basePathSegments.join('-') : 'home';

    if (t.has(`pages.${pageKey}.title`)) {
      title = t(`pages.${pageKey}.title`);
      description = t(`pages.${pageKey}.description`);
    } else {
      title = t('defaultTitle');
      description = t('defaultDescription');
    }
  } catch {
    // Fail-safe default fallback
  }

  return {
    title,
    description,
    robots,
    alternates,
    icons: {
      icon: "/home/profile-logo-2.png",
      shortcut: "/home/profile-logo-2.png",
      apple: "/home/profile-logo-2.png",
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "ALEF — American Lebanon Education Foundation",
      images: [
        {
          url: "https://www.usalef.org/home/logo.png",
          width: 1200,
          height: 630,
          alt: "American Lebanon Education Foundation (ALEF) Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.usalef.org/home/logo.png"],
    },
  };
}export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Build dynamic breadcrumbs
  const headerList = await headers();
  const rawPathname = headerList.get("x-pathname") || "/";
  const alternateLocales = ['fr', 'ar', 'es'];
  const segments = rawPathname.split('/').filter(Boolean);
  let basePathSegments = [...segments];

  if (segments.length > 0 && alternateLocales.includes(segments[0])) {
    basePathSegments = segments.slice(1);
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://www.usalef.org/${locale === 'en' ? '' : locale}`
      },
      ...basePathSegments.map((segment, index) => {
        const subPath = '/' + basePathSegments.slice(0, index + 1).join('/');
        const url = locale === 'en' ? `https://www.usalef.org${subPath}` : `https://www.usalef.org/${locale}${subPath}`;
        const name = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": url
        };
      })
    ]
  };

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Critical resource hints — must be first */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://widgets.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" as="image" href="/home/hero-poster.webp" type="image/webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NonprofitOrganization",
              "name": "American Lebanon Education Foundation (ALEF)",
              "url": "https://www.usalef.org",
              "logo": "https://www.usalef.org/home/logo.png",
              "sameAs": [
                "https://twitter.com/usalef",
                "https://www.facebook.com/usalef",
                "https://www.linkedin.com/company/usalef"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@usalef.org",
                "contactType": "general inquiries"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "American Lebanon Education Foundation (ALEF)",
              "url": "https://www.usalef.org"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbList)
          }}
        />
      </head>
      <body
        className={`${oswald.variable} ${bebas.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}

          {/* GoHighLevel Chat Widget — deferred to prevent TBT main-thread blocking */}
          <DeferredChatWidget />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
