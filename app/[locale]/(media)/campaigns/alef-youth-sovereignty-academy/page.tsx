"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Share2, Check } from "lucide-react";

export default function AlefYouthSovereigntyAcademyPage() {
  const t = useTranslations("CampaignsPage.academy");
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: "ALEF Youth Sovereignty Academy",
          text: "Support ALEF's newest project: The ALEF Youth Sovereignty Academy.",
          url: shareUrl,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 md:px-12 flex flex-col items-center">
      
      {/* ── CARD CONTAINER (Solid Blue, No Shadow, Exact Announcement Content) ── */}
      <article className="w-full max-w-4xl bg-blue border border-white/10 text-white rounded-sm overflow-hidden">
        
        {/* Top Announcement Bar (Centered) */}
        <div className="px-6 sm:px-10 pt-8 pb-4 border-b border-white/10">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red inline-block" />
            <span className="text-xs font-oswald text-white/70 uppercase tracking-[0.2em] font-semibold">
              {t("tag")}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Main Title */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bebas text-white leading-tight tracking-wide">
              {t("title1")}
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bebas text-red leading-tight tracking-wide">
              {t("title2")}
            </h2>
          </div>

          {/* Centered Book Cover Image */}
          <div className="flex justify-center pt-2 pb-4">
            <div className="relative max-w-[240px] sm:max-w-[280px] border border-white/15 overflow-hidden bg-neutral-900">
              <Image
                src="/home/children-of-hezbollah.png"
                alt="The Children of Hezbollah by Ali Khalife"
                width={360}
                height={540}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Exact Letter Content */}
          <div className="text-base sm:text-lg text-white/80 leading-relaxed space-y-5 font-oswald">
            <p className="font-bold text-white text-lg">
              {t("dearFriends")}
            </p>

            <p>
              {t("p1")}
            </p>

            <p>
              {t("p2")}
            </p>

            <p>
              {t("p3")}
            </p>

            <p>
              {t("p4")}
            </p>

            <p>
              {t("p5")}
            </p>

            <div>
              <p className="font-bold text-white mb-3">
                {t("participantsTitle")}
              </p>
              <ul className="space-y-2.5 pl-2 rtl:pr-2 rtl:pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                  <span>{t("bullet1")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                  <span>{t("bullet2")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                  <span>{t("bullet3")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                  <span>{t("bullet4")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                  <span>{t("bullet5")}</span>
                </li>
              </ul>
            </div>

            <p>
              {t("p6Part1")}
              <Link
                href="/webinars"
                className="text-white underline font-semibold hover:text-red transition-colors mx-1"
              >
                {t("speakerSeries")}
              </Link>
              {t("p6Part2")}
            </p>

            <p>
              {t("p7Part1")}
              <Link
                href="/donate"
                className="text-white underline font-semibold hover:text-red transition-colors mx-1"
              >
                {t("p7Link")}
              </Link>
            </p>

            <p>
              {t("p8")}
            </p>

            <p>
              {t("p9")}
            </p>

            <p>
              {t("p10")}
            </p>

            <p className="font-bold text-white pt-2">
              {t("thanks")}
            </p>
          </div>

          {/* Chairman Signature & Action Buttons Block */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left: Chairman Profile Info (Only Ziad Name and Position) */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 border border-white/20 overflow-hidden">
                <Image
                  src="/home/Ziad Abdelnour.jpg"
                  alt="Ziad K. Abdelnour"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-white tracking-wide leading-none">
                  {t("chairmanName")}
                </h3>
                <p className="font-oswald text-xs text-red uppercase tracking-widest font-semibold mt-1">
                  {t("chairmanRole")}
                </p>
              </div>
            </div>

            {/* Right: Buttons with Website Hover Animations */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Primary Button: Shimmer Swipe Animation */}
              <Link
                href="/donate"
                className="group relative overflow-hidden bg-red hover:bg-[#a00827] text-white font-bebas text-lg px-7 py-2.5 tracking-wider uppercase rounded-none transition-all cursor-pointer inline-flex items-center justify-center isolate"
              >
                <span className="relative z-10">{t("supportBtn")}</span>
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
              </Link>

              {/* Secondary Button: Curtain Slide-Up Animation */}
              <button
                type="button"
                onClick={handleShare}
                className="group relative overflow-hidden border border-white/70 hover:border-white text-white font-bebas text-lg px-5 py-2.5 tracking-wider uppercase rounded-none transition-colors duration-300 cursor-pointer inline-flex items-center gap-2 bg-transparent isolate"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-blue transition-colors duration-300">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400 group-hover:text-blue" />
                      <span>{t("copied")}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>{t("shareBtn")}</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 ease-out -z-10" />
              </button>
            </div>

          </div>

        </div>

      </article>

      {/* ── BACK TO CAMPAIGNS BUTTON (Matching Events Page Button Style & Animation) ── */}
      <div className="flex justify-center mt-12 relative z-10 w-full">
        <Link href="/campaigns">
          <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
              {t("backToCampaigns")}
            </span>
            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10" />
          </button>
        </Link>
      </div>

    </main>
  );
}
