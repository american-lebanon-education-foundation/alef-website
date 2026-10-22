"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, Share2, Megaphone } from "lucide-react";

export default function CampaignAnnouncementButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll and isolate scrolling to modal only
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Share / Copy link handler
  const handleShare = useCallback(() => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/donate`;
      if (navigator.share) {
        navigator.share({
          title: "ALEF Youth Sovereignty Academy - Crowdfunding Campaign",
          text: "Support ALEF's newest initiative to educate and empower Lebanese American youth for a sovereign Lebanon.",
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
    <>
      {/* ── CSS Keyframe: ONLY SCALE (No up/down movement) ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scale-pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.09);
              }
            }
            .animate-scale-pulse {
              animation: scale-pulse 2.4s ease-in-out infinite;
            }
            .animate-scale-pulse:hover {
              animation-play-state: paused;
              transform: scale(1.12);
            }
          `,
        }}
      />

      {/* ── FLOATING ANNOUNCEMENT BUTTON WITH HOVER TOOLTIP ── */}
      <div 
        aria-label="Crowdfunding Campaign Announcement"
        className="fixed bottom-24 left-6 z-50 select-none print:hidden"
      >
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label="Open Campaign Announcement"
            className="
              w-14 h-14 rounded-full flex items-center justify-center 
              bg-red hover:bg-[#a00827] text-white 
              border border-white/20 shadow-xl 
              cursor-pointer animate-scale-pulse 
              transition-colors duration-200
            "
          >
            <Megaphone className="w-6 h-6 text-white" />
          </button>

          {/* Hover Tooltip (Matching UploadFAB style) */}
          <span 
            className="
              absolute left-full ml-3 top-1/2 -translate-y-1/2
              bg-[#141414] border border-white/10
              text-white text-[11px] font-oswald uppercase tracking-widest
              px-2.5 py-1.5 whitespace-nowrap shadow-xl rounded-none
              opacity-0 group-hover:opacity-100
              translate-x-1 group-hover:translate-x-0
              transition-all duration-200 pointer-events-none z-50
            "
          >
            Campaign Announcement
          </span>
        </div>
      </div>

      {/* ── UNIFORM WHITE ANNOUNCEMENT MODAL ── */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="campaign-modal-title"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 overscroll-contain"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container: Solid Pure White Background */}
          <div 
            data-lenis-prevent
            className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-neutral-300 flex flex-col overflow-hidden text-black shadow-2xl overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Small Announcement Title & Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red inline-block" />
                <span className="font-oswald text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-600 font-semibold">
                  Official Initiative Announcement
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Announcement"
                className="text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body - Isolated Scroll with data-lenis-prevent and overscroll-contain */}
            <div 
              data-lenis-prevent
              className="overflow-y-auto custom-scrollbar flex-1 p-6 sm:p-10 space-y-6 text-black bg-white overscroll-contain"
              onWheel={(e) => e.stopPropagation()}
            >
              
              {/* Main Title (Directly without 'American Lebanon Education Foundation' tag above) */}
              <div className="text-center pb-2">
                <h1 
                  id="campaign-modal-title"
                  className="text-3xl sm:text-5xl font-bebas text-black uppercase tracking-wide leading-tight"
                >
                  About our Latest Project: <br className="hidden sm:block" />
                  <span className="text-red">The ALEF Youth Sovereignty Academy</span>
                </h1>
              </div>

              {/* Centered Book Photo with Clean Gap Below to Next Paragraph */}
              <div className="flex justify-center mt-4 mb-8 sm:mb-10">
                <div className="max-w-[220px] sm:max-w-[260px] w-full border border-neutral-200 shadow-sm">
                  <Image
                    src="/home/children-of-hezbollah.png"
                    alt="The Children of Hezbollah by Ali Khalife - Book Cover"
                    width={500}
                    height={720}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
              </div>

              {/* Exact Letter Content (Font Oswald matching website) */}
              <div className="text-base sm:text-lg text-neutral-800 leading-relaxed space-y-5 font-oswald">
                <p className="font-bold text-black text-lg">
                  Dear Friends, Sponsors, Supporters and Partners
                </p>

                <p>
                  I wanted to reach out personally and share with you our latest.
                </p>

                <p>
                  The <a href="https://www.usalef.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">American Lebanon Education Foundation</a> is launching as of today a new project in New York: the ALEF Youth Sovereignty Academy.
                </p>

                <p>
                  The goal is simple. Give Lebanese American youth the knowledge and leadership skills they need to stand for a free and sovereign Lebanon.
                </p>

                <p>
                  That means workshops, digital learning modules, and practical civic education grounded in transparency, rule of law, and merit including but not limited to the English translation, publication, release and world distribution of the book <span className="text-red font-bold">&ldquo;Children of Hezbollah&rdquo;</span>
                </p>

                <p>
                  To that effect, we are raising $35,000 on Crowdfunder to launch the first cohort. Crowdfunder is fee-free, so every dollar goes to the program nowhere else..
                </p>

                <div>
                  <p className="font-bold text-black mb-3">
                    Through in-person workshops, high-quality digital modules, and mentorship, participants will :
                  </p>
                  <ul className="space-y-2 pl-2">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                      <span>Develop a complete, values-based curriculum and digital learning modules</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                      <span>Host 6 to 8 high-quality workshops and community events in New York City and elsewhere</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                      <span>Produce professional educational video content accessible to the global Lebanese diaspora</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                      <span>Provide materials, certificates, and modest support for participating youth</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-red inline-block mt-2.5 shrink-0" />
                      <span>Measure impact and publicly report results with full transparency</span>
                    </li>
                  </ul>
                </div>

                <p>
                  ALEF has already built a significant research capacity, launched a <Link href="/webinars" onClick={() => setIsOpen(false)} className="text-blue-600 underline font-semibold hover:text-blue-800">speaker series</Link>, and engaged policymakers at various levels as witnessed by our webinars conducted throughout the year
                </p>

                <p>
                  If this mission matters to you, check out campaign details as per <Link href="/donate" onClick={() => setIsOpen(false)} className="text-blue-600 underline font-semibold hover:text-blue-800">ALEF Youth Sovereignty Academy</Link>
                </p>

                <p>
                  Whether you give $100, 500. $1,000 or $5,000, your support helps ALEF expand its research, education, advocacy, and public-awareness efforts and reach the people and decisionmakers who can help shape Lebanon&apos;s future.
                </p>

                <p>
                  At the end of the day, and as we all know, there comes a time when philanthropy must go beyond helping people survive the problems of today—it must help build the conditions that allow an entire nation to thrive tomorrow.
                </p>

                <p>
                  That is the mission of the <span className="text-red font-bold">American Lebanon Education Foundation (ALEF)</span>.
                </p>

                <p className="font-bold text-black">
                  Thanks in advance for making a difference
                </p>
              </div>

              {/* ── CLEAN SIGNATURE & BUTTONS SECTION (Only Ziad Name & Position + Website Button Hover Effects) ── */}
              <div className="pt-6 border-t border-neutral-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: Chairman Profile Info (Only Ziad Name and Position) */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0 border border-neutral-200">
                    <Image
                      src="/home/Ziad Abdelnour.jpg"
                      alt="Ziad K. Abdelnour"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl text-black tracking-wide leading-none">
                      ZIAD K. ABDELNOUR
                    </h4>
                    <p className="font-oswald text-xs text-red uppercase tracking-widest font-semibold mt-1">
                      FOUNDING CHAIRMAN
                    </p>
                  </div>
                </div>

                {/* Right: Exact Image 4 Buttons with Website Hover Animations */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Primary Button: Shimmer Swipe Animation (as on Donate button) */}
                  <Link
                    href="/donate"
                    onClick={() => setIsOpen(false)}
                    className="group relative overflow-hidden bg-red hover:bg-[#a00827] text-white font-bebas text-lg px-7 py-2.5 tracking-wider uppercase rounded-none transition-all cursor-pointer inline-flex items-center justify-center isolate"
                  >
                    <span className="relative z-10">SUPPORT CAMPAIGN</span>
                    <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
                  </Link>

                  {/* Secondary Button: Curtain Slide-Up Animation (as on Navbar/Hero buttons) */}
                  <button
                    onClick={handleShare}
                    className="group relative overflow-hidden border border-neutral-300 hover:border-black text-black font-bebas text-lg px-5 py-2.5 tracking-wider uppercase rounded-none transition-colors duration-300 cursor-pointer inline-flex items-center gap-2 bg-white isolate"
                  >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600 group-hover:text-green-300" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>SHARE</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-black transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 ease-out -z-10" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Footer Bar */}
            <div className="px-6 py-3 border-t border-neutral-200 bg-white flex items-center justify-between text-xs text-neutral-600 font-sans shrink-0">
              <span>American Lebanon Education Foundation • 501(c)(3)</span>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-black uppercase tracking-wider font-bebas text-sm transition-colors cursor-pointer"
              >
                CLOSE (ESC)
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
