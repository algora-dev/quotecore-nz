"use client";

import { useEffect, useState } from "react";
import BlogHeader from "@/components/BlogHeader";
import QuoteCoreRefinedHero from "./QuoteCoreRefinedHero";

/**
 * Refined text hero experience (v3) for the NZ homepage.
 *
 * - Landing view: ONLY the graphic animation, full screen. No menu, no chrome.
 * - On first scroll: the site menu fades in (fixed overlay at top).
 * - Scroll back to top: menu fades out again.
 * - Animation plays once and holds the final workflow (no loop).
 */
export default function RefinedHeroExperience() {
  const [menuVisible, setMenuVisible] = useState(false);

  // Hide MarketingHome's duplicate BlogHeader while hero is active
  useEffect(() => {
    document.body.classList.add("qc-refined-hero-active");
    return () => {
      document.body.classList.remove("qc-refined-hero-active");
    };
  }, []);

  // Fade menu in on first scroll, out again at the very top
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setMenuVisible(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed header overlay: hidden at top of page, fades in on scroll */}
      <div className={`qc-hero-header ${menuVisible ? "qc-hero-header--visible" : ""}`}>
        <BlogHeader />
      </div>

      {/* Full-screen graphic animation, plays once, holds final workflow */}
      <QuoteCoreRefinedHero id="quotecore-workflow-hero" />

      <style>{`
        /* Hide MarketingHome's duplicate BlogHeader while this hero is active */
        body.qc-refined-hero-active .hero-duplicate-header {
          display: none !important;
        }

        /* Header starts fully out of view (no layout space), fades/slides in on scroll */
        .qc-hero-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          opacity: 0;
          transform: translateY(-100%);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
        }
        .qc-hero-header--visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Hero starts at the very top of the page: 100svh, no header offset */
        body.qc-refined-hero-active #quotecore-workflow-hero {
          margin-top: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .qc-hero-header {
            transition: opacity 0.2s ease;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
