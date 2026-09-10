"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * DeferredChatWidget
 * Defers loading the heavy LeadConnector (GoHighLevel) chat widget until:
 * 1. The user interacts with the page (scroll, click, touch, keypress, or mouse movement), OR
 * 2. 6 seconds after load if idle.
 *
 * This eliminates the 500-700ms Total Blocking Time (TBT) spike caused by
 * third-party chat widget evaluation on initial page load, without losing any functionality.
 */
export default function DeferredChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // If already loaded, nothing to do
    if (shouldLoad) return;

    const handleInteraction = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
    };

    // Listen for genuine user interaction (passive for zero scroll jank)
    window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });
    window.addEventListener("keydown", handleInteraction, { passive: true, once: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true, once: true });

    // Safety fallback: load after 6 seconds of idle time if no interaction occurred
    const timer = setTimeout(() => {
      setShouldLoad(true);
      cleanup();
    }, 6000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="69b5448351635e260d0a4878"
      strategy="lazyOnload"
    />
  );
}
