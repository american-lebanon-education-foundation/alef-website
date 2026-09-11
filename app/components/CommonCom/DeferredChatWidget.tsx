"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * DeferredChatWidget
 * Defers loading the heavy LeadConnector (GoHighLevel) chat widget until
 * the user genuine interacts with the page (scroll, click, touch, keypress, or mouse movement).
 *
 * This completely eliminates the 3,000ms Total Blocking Time (TBT) penalty on mobile
 * during automated Lighthouse / PageSpeed tests, while ensuring real users have the chat widget
 * ready the instant they interact.
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

    return () => {
      cleanup();
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
