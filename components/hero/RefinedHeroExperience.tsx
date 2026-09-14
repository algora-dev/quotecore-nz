"use client";

import { useEffect, useRef, useState } from "react";
import BlogHeader from "@/components/BlogHeader";
import HeroVideo from "@/components/HeroVideo";
import QuoteCoreRefinedHero from "./QuoteCoreRefinedHero";

/**
 * Refined text hero experience (v3) for the NZ homepage.
 *
 * - Landing view: ONLY the graphic animation, full screen. No menu, no chrome.
 * - On first scroll: the site menu fades in (fixed overlay at top).
 * - Scroll back to top: menu fades out again.
 * - Animation plays once (~40s). When it finishes, the hero fades out,
 *   the menu appears, and the original hero video takes its place so the
 *   user can continue browsing the site as before.
 */
export default function RefinedHeroExperience() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [heroGone, setHeroGone] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hide MarketingHome's duplicate BlogHeader while hero is active
  useEffect(() => {
    document.body.classList.add("qc-refined-hero-active");
    return () => {
      document.body.classList.remove("qc-refined-hero-active");
    };
  }, []);

  // Fade menu in on first scroll, out again at the very top
  useEffect(() => {
    if (animDone) return; // once the animation finishes the menu stays
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
  }, [animDone]);

  // When the animation completes (or is skipped), transition to video mode.
  // Note: the controller's 'quotecore:hero' event does NOT bubble,
  // so we listen directly on the hero section element.
  useEffect(() => {
    if (animDone) return;
    const root = heroRef.current?.querySelector("[data-qch-hero]") ?? document.getElementById("quotecore-workflow-hero");
    if (!root) return;
    const onHeroEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.type === "complete" || detail?.type === "skip") {
        // Hold the final frame for half a second, then fade out and swap to video
        window.setTimeout(() => {
          setAnimDone(true);
          setMenuVisible(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Let the fade-out finish, then unmount the hero and mount the video
          window.setTimeout(() => setHeroGone(true), 900);
        }, 500);
      }
    };
    root.addEventListener("quotecore:hero", onHeroEvent as EventListener);
    return () => root.removeEventListener("quotecore:hero", onHeroEvent as EventListener);
  }, [animDone]);

  return (
    <>
      {/* Fixed header overlay: hidden at top of page, fades in on scroll */}
      <div className={`qc-hero-header ${menuVisible ? "qc-hero-header--visible" : ""}`}>
        <BlogHeader />
      </div>

      <div ref={heroRef} className={heroGone ? "qc-video-mode" : ""}>
        {heroGone ? (
          /* Original hero video takes over once the animation has finished */
          <HeroVideo includeHeader={false} />
        ) : (
          /* Full-screen graphic animation, plays once, transitions out at the end */
          <div className={animDone ? "qc-anim-fade-out" : ""}>
            <QuoteCoreRefinedHero id="quotecore-workflow-hero" />
          </div>
        )}
      </div>

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

        /* Video mode: the fixed header overlays the page, so push the video
           frame down so its top sits at the bottom of the header (h-20 = 5rem) */
        .qc-video-mode {
          padding-top: 5rem;
        }

        /* Fade the animation out once finished, before the video swap */
        .qc-anim-fade-out {
          animation: qcHeroFadeOut 0.85s ease forwards;
        }
        @keyframes qcHeroFadeOut {
          to { opacity: 0; }
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
