"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

export default function CampaignAnnouncementButton() {
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

      {/* ── FLOATING ANNOUNCEMENT BUTTON (Direct Link to /campaigns) ── */}
      <div 
        aria-label="Crowdfunding Campaign Announcement"
        className="fixed bottom-24 left-6 z-50 select-none print:hidden"
      >
        <div className="relative group">
          <Link
            href="/campaigns"
            aria-label="View ALEF Campaigns"
            className="
              w-14 h-14 rounded-full flex items-center justify-center 
              bg-red hover:bg-[#a00827] text-white 
              border border-white/20 shadow-xl 
              cursor-pointer animate-scale-pulse 
              transition-colors duration-200
            "
          >
            <Megaphone className="w-6 h-6 text-white" />
          </Link>

          {/* Hover Tooltip */}
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
            Campaigns &amp; Initiatives
          </span>
        </div>
      </div>
    </>
  );
}
