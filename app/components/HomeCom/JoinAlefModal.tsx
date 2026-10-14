"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import the modal content ONLY when triggered.
// Zero initial bundle weight, zero impact on LCP, TBT, or CLS during initial load.
const JoinAlefModalContent = dynamic(
  () => import("./JoinAlefModalContent"),
  { ssr: false }
);

// Module-level in-memory state:
// These variables reset ONLY when the page is full-reloaded / refreshed by the browser,
// and persist across Next.js client-side SPA navigations between pages.
let initialLoadedPath: string | null = null;
let hasTriggeredOnThisPageLoad = false;

if (typeof window !== "undefined" && initialLoadedPath === null) {
  initialLoadedPath = window.location.pathname;
}

export default function JoinAlefModal() {
  const [shouldMount, setShouldMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Smooth exit animation before unmounting
    setTimeout(() => {
      setShouldMount(false);
    }, 350);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (initialLoadedPath === null) {
      initialLoadedPath = window.location.pathname;
    }

    // 1. Permanently suppress if user has confirmed they already joined or submitted
    if (localStorage.getItem("alef_already_member") === "true") {
      return;
    }

    // 2. Do not show if the popup was already triggered on this browser page load
    if (hasTriggeredOnThisPageLoad) {
      return;
    }

    // 3. Do not show if user navigated to the homepage from another page (only show on homepage entry/refresh)
    const cleanInitial = (initialLoadedPath || "").replace(/^\/(en|fr|ar|es)(\/|$)/, "/");
    if (cleanInitial !== "/" && cleanInitial !== "") {
      return;
    }

    let isTriggered = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerModal = () => {
      if (isTriggered) return;
      isTriggered = true;
      hasTriggeredOnThisPageLoad = true;
      cleanup();

      setShouldMount(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsOpen(true);
        }, 50);
      });
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerModal);
      window.removeEventListener("wheel", triggerModal);
      window.removeEventListener("pointerdown", triggerModal);
      window.removeEventListener("touchstart", triggerModal);
      window.removeEventListener("keydown", triggerModal);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };

    // Trigger on first user interaction (scroll, touch, click, wheel, keypress)
    window.addEventListener("scroll", triggerModal, { passive: true, once: true });
    window.addEventListener("wheel", triggerModal, { passive: true, once: true });
    window.addEventListener("pointerdown", triggerModal, { passive: true, once: true });
    window.addEventListener("touchstart", triggerModal, { passive: true, once: true });
    window.addEventListener("keydown", triggerModal, { passive: true, once: true });

    // Fallback timer: trigger after 1.5s if no interaction has occurred
    fallbackTimer = setTimeout(() => {
      triggerModal();
    }, 1500);

    return cleanup;
  }, []);

  if (!shouldMount) return null;

  return <JoinAlefModalContent isOpen={isOpen} onClose={handleClose} />;
}
