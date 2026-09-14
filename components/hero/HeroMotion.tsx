"use client";
import { useEffect } from "react";
import { mountQuoteCoreHero, type HeroController } from "./hero-controller";
import sequence from "./hero-sequence.json";

/** No markup, no per-frame React updates; cleaned up on route changes. */
export default function HeroMotion({ targetId }: { targetId: string }) {
  useEffect(() => {
    let cancelled = false;
    let controller: HeroController | undefined;
    const root = document.getElementById(targetId);
    if (!root || root.hasAttribute("data-qch-static")) return;
    const start = async () => {
      try {
        await document.fonts.ready;
        if (cancelled || root.hasAttribute("data-qch-static")) return;
        root.removeAttribute("data-qch-preparing");
        controller = mountQuoteCoreHero(root, sequence);
      } catch (error) {
        root.removeAttribute("data-qch-preparing");
        root.removeAttribute("data-qch-enhanced");
        console.error("QuoteCore hero: showing static fallback", error);
      }
    };
    void start();
    return () => { cancelled = true; controller?.destroy(); };
  }, [targetId]);
  return null;
}
