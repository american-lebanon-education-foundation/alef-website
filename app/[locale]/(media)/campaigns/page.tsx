"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Target, BookOpen } from "lucide-react";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";

interface CampaignItem {
  id: string;
  slug: string;
  image: string;
}

const ONGOING_CAMPAIGNS: CampaignItem[] = [
  {
    id: "alef-youth-sovereignty-academy",
    slug: "alef-youth-sovereignty-academy",
    image: "/home/children-of-hezbollah.png",
  },
];

const PAST_CAMPAIGNS: CampaignItem[] = [];

const CampaignCard = ({
  t,
  campaign,
}: {
  t: ReturnType<typeof useTranslations>;
  campaign: CampaignItem;
}) => (
  <div className="w-full bg-blue text-white relative overflow-hidden border border-red/30 rounded-xl transition-all">
    {/* Background Image with Smooth Gradient Overlay */}
    <div className="absolute inset-0 z-0 bg-blue">
      <SkeletonImage
        src={campaign.image}
        alt={t("card.titlePart1")}
        width={1200}
        height={600}
        style={{ width: "100%", height: "100%" }}
        className="object-cover object-right opacity-35 saturate-50 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-linear-to-r from-blue via-blue/85 to-blue/30 pointer-events-none" />
    </div>

    <div className="relative z-10 px-6 py-12 md:p-16 flex flex-col lg:flex-row items-center gap-12">
      {/* Content Side */}
      <div className="flex-1 space-y-6 md:space-y-8 w-full">
        <div className="inline-flex items-center gap-3 bg-red/20 px-4 py-2 border border-red/30 backdrop-blur-xs">
          <span className="w-2 h-2 bg-red rounded-full" />
          <span className="font-oswald text-red tracking-[0.3em] uppercase text-xs font-bold leading-none">
            {t("card.tag")}
          </span>
        </div>

        <div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bebas text-white leading-none mb-4">
            {t("card.titlePart1")} <span className="text-red">{t("card.titlePart2")}</span>
          </h2>
          <p className="font-oswald text-white/80 text-base md:text-xl leading-relaxed max-w-2xl border-l-2 border-red pl-4">
            {t("card.description")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 font-bebas text-lg md:text-2xl pt-2">
          <div className="flex items-center gap-3">
            <Target className="text-red w-5 h-5 md:w-6 md:h-6" />
            <span>{t("card.goal")}</span>
          </div>
          <div className="hidden sm:block text-red/50">•</div>
          <div className="flex items-center gap-3">
            <BookOpen className="text-red w-5 h-5 md:w-6 md:h-6" />
            <span>{t("card.secondaryNote")}</span>
          </div>
        </div>

        <div className="pt-6 md:pt-8 flex flex-wrap gap-4">
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="group/link relative bg-transparent border border-white/70 text-white px-6 py-4 md:px-8 md:py-5 text-lg md:text-xl font-bold tracking-[0.2em] font-bebas overflow-hidden transition-all hover:border-white/50 isolate cursor-pointer flex items-center gap-4 uppercase w-fit"
          >
            <span className="relative z-10 group-hover/link:text-blue transition-colors duration-300 flex items-center gap-4">
              {t("card.learnMore")}
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover/link:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover/link:scale-y-100 group-hover/link:origin-bottom transition-transform duration-500 ease-out -z-10" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function CampaignsPage() {
  const t = useTranslations("CampaignsPage");
  const [activeTab, setActiveTab] = useState<"ongoing" | "past">("ongoing");

  const ongoingCount = ONGOING_CAMPAIGNS.length;
  const pastCount = PAST_CAMPAIGNS.length;

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      
      {/* ── PAGE HEADER (Matching Media Archive UI) ── */}
      <div className="mb-16 text-center max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-2 h-2 bg-red rounded-full animate-pulse" />
          <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
            {t("pageSubtitle")}
          </span>
        </div>

        <AnimatedTitle
          text={t("pageTitle")}
          className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
        />

        <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto text-center">
          {t("pageDescription")}
        </p>
      </div>

      {/* ── TABS ── */}
      <div className="relative flex w-full max-w-xl mx-auto border-b border-foreground/10 mb-16">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`w-1/2 pb-4 text-2xl md:text-3xl font-bebas uppercase tracking-wider transition-colors z-10 text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "ongoing"
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/80"
          }`}
        >
          <span>{t("tabs.ongoing")}</span>
          <span
            className={`text-xs font-oswald px-2 py-0.5 rounded-full ${
              ongoingCount > 0 ? "bg-red text-white" : "bg-foreground/10 text-foreground/70"
            }`}
          >
            {ongoingCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`w-1/2 pb-4 text-2xl md:text-3xl font-bebas uppercase tracking-wider transition-colors z-10 text-center cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "past"
              ? "text-foreground"
              : "text-foreground/40 hover:text-foreground/80"
          }`}
        >
          <span>{t("tabs.past")}</span>
          <span
            className={`text-xs font-oswald px-2 py-0.5 rounded-full ${
              pastCount > 0 ? "bg-red text-white" : "bg-foreground/10 text-foreground/70"
            }`}
          >
            {pastCount}
          </span>
        </button>

        {/* Animated Underline */}
        <div
          className="absolute bottom-0 h-[3px] bg-red transition-all duration-300 ease-in-out w-1/2 transform translate-y-[1.5px]"
          style={{ left: activeTab === "ongoing" ? "0%" : "50%" }}
        />
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="w-full max-w-7xl mx-auto">
        {activeTab === "ongoing" ? (
          <div>
            {ongoingCount > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {ONGOING_CAMPAIGNS.map((campaign) => (
                  <CampaignCard key={campaign.id} t={t} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white/5 border border-foreground/10 rounded-xl">
                <p className="font-oswald text-foreground/70 text-lg uppercase tracking-widest">
                  {t("tabs.noOngoing")}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {pastCount > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {PAST_CAMPAIGNS.map((campaign) => (
                  <CampaignCard key={campaign.id} t={t} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white/5 border border-foreground/10 rounded-xl">
                <p className="font-oswald text-foreground/70 text-lg uppercase tracking-widest">
                  {t("tabs.noPast")}
                </p>
                <p className="font-oswald text-foreground/50 text-sm mt-2">
                  {t("tabs.stayTuned")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </main>
  );
}
