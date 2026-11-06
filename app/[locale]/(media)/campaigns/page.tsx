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
  <div className="w-full bg-blue text-white relative overflow-hidden border border-white/15 rounded-xl shadow-2xl transition-all group">
    {/* Full Card Background Image with Smooth Gradient Overlay */}
    <div className="absolute inset-0 z-0 bg-blue overflow-hidden pointer-events-none">
      <div className="w-full h-full relative transform transition-transform duration-1000 ease-out group-hover:scale-105">
        <SkeletonImage
          src={campaign.image}
          alt={t("card.titlePart1")}
          width={1200}
          height={600}
          style={{ width: "100%", height: "100%" }}
          className="object-cover object-right opacity-40 transition-opacity duration-700"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-blue via-blue/85 to-blue/20 pointer-events-none" />
    </div>

    {/* Content Side over Background */}
    <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:p-16 flex flex-col items-start space-y-6 md:space-y-7 max-w-4xl w-full">
      {/* Tag Badge: Clean subtle style matching events cards */}
      <div>
        <span className="inline-flex items-center gap-2 font-oswald text-xs uppercase tracking-[0.25em] font-medium px-3 py-1 rounded-sm bg-white/10 text-white border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
          {t("card.tag")}
        </span>
      </div>

      {/* Title: Pure crisp white, single line on tablet & desktop */}
      <div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide leading-none md:whitespace-nowrap">
          {t("card.titlePart1")} {t("card.titlePart2")}
        </h2>
      </div>

      {/* Description */}
      <p className="font-oswald text-white/80 text-base md:text-lg leading-relaxed max-w-2xl border-l-2 border-white/30 pl-4">
        {t("card.description")}
      </p>

      {/* Key Details Row */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 font-bebas text-base sm:text-lg pt-1 text-white/90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span>{t("card.goal")}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span>{t("card.secondaryNote")}</span>
        </div>
      </div>

      {/* CTA Action Button */}
      <div className="pt-2 flex flex-wrap items-center gap-4">
        <Link
          href={`/campaigns/${campaign.slug}`}
          className="group/link inline-flex items-center gap-3 bg-red hover:bg-[#a00827] text-white px-8 py-3.5 text-base font-bold tracking-[0.2em] font-bebas uppercase transition-all shadow-xl rounded-sm cursor-pointer"
        >
          <span>{t("card.learnMore")}</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
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
