"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { X, ArrowDown, ArrowRight } from "lucide-react";

interface JoinAlefModalContentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinAlefModalContent({
  isOpen,
  onClose,
}: JoinAlefModalContentProps) {
  const t = useTranslations("JoinAlefModal");

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Scroll smoothly to the #join-us form on the page
  const handleJoinNow = () => {
    onClose();
    setTimeout(() => {
      const joinSection = document.getElementById("join-us");
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  // Permanently suppress popup when user confirms they're already a member
  const handleAlreadyMember = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("alef_already_member", "true");
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-alef-modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* CSS Keyframes for Constantly Rotating Red & Blue Border Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-border {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-border {
          animation: spin-border 6s linear infinite;
        }
      `,
        }}
      />

      {/* Card Wrapper with padding for the rotating border and overflow-hidden to clip it */}
      <div
        className={`relative max-w-md w-full bg-neutral-950 p-[1.5px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Constantly Rotating Red and Blue Gradient Border */}
        <div className="absolute top-1/2 left-1/2 w-[220%] h-[220%] bg-[conic-gradient(#BF0A30_0deg,transparent_90deg,#3b82f6_180deg,transparent_270deg,#BF0A30_360deg)] animate-spin-border pointer-events-none z-0" />

        {/* Core Card Container (Solid Dark Background overlaying the spinning gradient) */}
        <div className="relative w-full bg-linear-to-b from-[#18181b]/98 via-[#121214]/99 to-[#0c0c0e] rounded-[15px] p-6 sm:p-8 text-center overflow-hidden z-10">
          {/* Subtle diagonal sheen reflex overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/2 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white hover:rotate-90 transition-all duration-300 p-1.5 rounded-full hover:bg-white/10 cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            {/* Logo Badge */}
            <div className="relative mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full p-2.5 shadow-md border border-white/10">
              <Image
                src="/home/logo.webp"
                alt="ALEF Logo"
                width={50}
                height={50}
                className="object-contain"
                loading="eager"
              />
            </div>

            {/* Glowing Status Pill */}
            <div className="text-[10px] font-bold tracking-widest text-red uppercase bg-red/10 border border-red/20 px-3 py-1 rounded-full w-fit mx-auto mb-3 flex items-center gap-1.5 font-oswald">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red" />
              </span>
              <span>{t("badge")}</span>
            </div>

            {/* Title */}
            <h3
              id="join-alef-modal-title"
              className="text-3xl sm:text-4xl font-normal font-bebas text-white leading-tight tracking-wider uppercase"
            >
              {t("title")}
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto font-light mt-2 mb-6">
              {t("subtitle")}
            </p>

            {/* Primary CTA: Scroll to Join Us form */}
            <button
              type="button"
              onClick={handleJoinNow}
              className="group/btn w-full px-6 py-4 bg-red hover:bg-[#c4151c] text-white font-semibold font-oswald rounded-xl transition-all duration-300 shadow-lg shadow-red/25 hover:shadow-red/40 flex items-center justify-center gap-2.5 uppercase tracking-widest text-xs cursor-pointer"
            >
              <span>{t("submitButton")}</span>
              <ArrowDown className="w-4 h-4 transform group-hover/btn:translate-y-0.5 transition-transform duration-300" />
            </button>

            {/* Transparent Secondary Action Buttons: Already a Member & Maybe Later */}
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <button
                type="button"
                onClick={handleAlreadyMember}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-semibold font-oswald rounded-xl transition-all duration-300 uppercase tracking-wider text-[11px] cursor-pointer"
              >
                {t("alreadyMember")}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-semibold font-oswald rounded-xl transition-all duration-300 uppercase tracking-wider text-[11px] cursor-pointer"
              >
                {t("dismissButton")}
              </button>
            </div>

            {/* Centered Why Join Us Link: text turns red with bottom border animating in from left and out to right */}
            <div className="pt-4 mt-4 border-t border-white/5 flex justify-center">
              <Link
                href="/why-join-us"
                onClick={onClose}
                className="group relative inline-flex items-center gap-2 py-1 text-neutral-400 hover:text-red transition-colors duration-300 tracking-wider uppercase text-xs font-oswald cursor-pointer"
              >
                <span>{t("whyJoin")}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                {/* Border line below: animates in from left, animates out to right */}
                <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-red scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-out" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
