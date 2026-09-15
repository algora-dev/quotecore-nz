"use client";

import { useEffect, useRef, useState } from "react";
import BlogHeader from "@/components/BlogHeader";
import HeroVideo from "@/components/HeroVideo";

/**
 * Animated text hero (v4) for the NZ homepage — final brief 2026-09-15.
 *
 * 8 scenes: recognition ("Does any of this look familiar?") -> reveal
 * ("built around the way you already work") -> connected workflow bullets
 * that persist, closing with the done-for-you setup reassurance.
 *
 * Shell behaviour (matches the previous RefinedHeroExperience):
 * - Landing view: only the animation, full screen, no chrome
 * - Menu fades in as a fixed overlay on first scroll
 * - When the sequence finishes (or is skipped via reduced motion),
 *   hold the final state briefly, fade out, and swap to the hero video
 *
 * Craft: white bg, near-black text, temporary orange glow emphasis on
 * inline spans via text-shadow only (no scale => no reflow); scene stage
 * height equals the final scene height so there is no CLS; final text is
 * always rendered in HTML for crawlability.
 */

type SceneId = "s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s7" | "s8";

const SCENES: SceneId[] = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

// Per-scene timing (ms). Entrance ~550-600ms, glow begins after settle.
const TIMING: Record<
  Exclude<SceneId, "s8">,
  { settle: number; glowIn: number; glowHold: number; glowOut: number; exit: number }
> = {
  s1: { settle: 750, glowIn: 500, glowHold: 1100, glowOut: 350, exit: 450 },
  s2: { settle: 650, glowIn: 500, glowHold: 1100, glowOut: 350, exit: 450 },
  s3: { settle: 650, glowIn: 500, glowHold: 1000, glowOut: 350, exit: 450 },
  s4: { settle: 650, glowIn: 500, glowHold: 950, glowOut: 350, exit: 450 },
  s5: { settle: 650, glowIn: 500, glowHold: 1000, glowOut: 350, exit: 450 },
  s6: { settle: 650, glowIn: 500, glowHold: 1250, glowOut: 350, exit: 450 },
  s7: { settle: 800, glowIn: 550, glowHold: 1450, glowOut: 400, exit: 500 },
};

export default function AnimatedHero() {
  const [scene, setScene] = useState<SceneId | null>(null); // null = pre-start
  const [glow, setGlow] = useState<string | null>(null);
  const [bullets, setBullets] = useState(0); // scene 8 bullets revealed
  const [reassure, setReassure] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [heroGone, setHeroGone] = useState(false);
  const startedRef = useRef(false);

  // Hide the page's duplicate BlogHeader while the hero experience is active
  useEffect(() => {
    document.body.classList.add("qc-refined-hero-active");
    return () => {
      document.body.classList.remove("qc-refined-hero-active");
    };
  }, []);

  // Fade the menu in on first scroll; once done it stays
  useEffect(() => {
    if (animDone) return;
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

  // Transition to video mode once the sequence completes
  const finishToVideo = () => {
    // Hold the final state ~1.8s for comfortable reading, then crossfade.
    window.setTimeout(() => {
      setAnimDone(true);
      setMenuVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(() => setHeroGone(true), 900);
    }, 1800);
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      if (reduced) {
        // Simple fades only: show the final message, then move to the video.
        setScene("s8");
        setBullets(4);
        setReassure(true);
        finishToVideo();
        return;
      }
      await wait(350);
      if (cancelled) return;

      for (const id of SCENES.slice(0, 7)) {
        const t = TIMING[id as Exclude<SceneId, "s8">];
        setScene(id);
        await wait(t.settle);
        if (cancelled) return;

        if (id === "s4") {
          setGlow("s4a");
          await wait(t.glowHold);
          if (cancelled) return;
          setGlow("s4b");
          await wait(t.glowHold);
          if (cancelled) return;
        } else if (id === "s6") {
          setGlow("s6a");
          await wait(t.glowHold);
          if (cancelled) return;
          setGlow("s6b");
          await wait(650);
          if (cancelled) return;
          setGlow("s6c");
          await wait(650);
          if (cancelled) return;
        } else if (id !== "s1") {
          setGlow(id);
          await wait(t.glowIn + t.glowHold);
          if (cancelled) return;
        } else {
          await wait(1700);
          if (cancelled) return;
        }

        setGlow(null);
        await wait(t.glowOut + t.exit);
        if (cancelled) return;
      }

      // Scene 8: bullets build one by one, each briefly emphasised.
      setScene("s8");
      await wait(400);
      const bulletGlows = ["b1", "b2", "b3", "b4"];
      for (let i = 0; i < 4; i++) {
        if (cancelled) return;
        setBullets(i + 1);
        setGlow(bulletGlows[i]);
        await wait(950);
        if (cancelled) return;
        setGlow(null);
        await wait(250);
        if (cancelled) return;
      }
      await wait(500);
      if (cancelled) return;
      setReassure(true);
      finishToVideo();
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sceneClass = (id: SceneId) => {
    if (scene === null) return "nzah-scene";
    if (id === scene) return "nzah-scene nzah-active";
    const passed = SCENES.indexOf(id) < SCENES.indexOf(scene);
    return passed ? "nzah-scene nzah-exit" : "nzah-scene";
  };

  if (heroGone) {
    return (
      <>
        <div className={`nzah-hero-header ${menuVisible ? "nzah-hero-header--visible" : ""}`}>
          <BlogHeader />
        </div>
        <div className="nzah-video-mode">
          <HeroVideo includeHeader={false} />
        </div>
        <style>{nzahShellCss}</style>
      </>
    );
  }

  return (
    <>
      {/* Fixed header overlay: hidden at top, fades in on scroll */}
      <div className={`nzah-hero-header ${menuVisible ? "nzah-hero-header--visible" : ""}`}>
        <BlogHeader />
      </div>

      <div className={animDone ? "nzah-anim-fade-out" : ""}>
        <section
          className="nzah-hero relative flex min-h-[100svh] items-center overflow-hidden bg-white"
          aria-label="QuoteCore+ — measure, price and quote in one place"
        >
          {/* Very subtle warm ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_38%,rgba(255,107,53,0.05),transparent_70%)]"
          />

          {/* Stage: grid-stacked scenes; container height = final scene (no CLS) */}
          <div className="nzah-stage mx-auto grid w-full max-w-[1050px] place-items-center px-6 py-16">
            {/* Scene 1 — opening invitation */}
            <div className={sceneClass("s1")} aria-hidden={scene !== "s1"}>
              <p className="text-center text-sm font-medium tracking-wide text-zinc-500 sm:text-base">
                Faster measurement to quote. Built for roofers, builders and trades.
              </p>
              <h2 className="nzah-big mt-5 text-center">
                Does any of this look familiar?
              </h2>
            </div>

            {/* Scene 2 — printed plans */}
            <div className={sceneClass("s2")} aria-hidden={scene !== "s2"}>
              <p className="nzah-big text-center">Print the plans.</p>
              <p className="nzah-sub mt-4 text-center">
                Measure with ruler and pen.
                <br />
                <em className={glow === "s2" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  Record everything manually.
                </em>
              </p>
            </div>

            {/* Scene 3 — site measurements */}
            <div className={sceneClass("s3")} aria-hidden={scene !== "s3"}>
              <p className="nzah-big text-center">Drive to site to measure.</p>
              <p className="nzah-sub mt-4 text-center">
                <em className={glow === "s3" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  Back to the office
                </em>{" "}
                to price.
              </p>
            </div>

            {/* Scene 4 — satellite imagery */}
            <div className={sceneClass("s4")} aria-hidden={scene !== "s4"}>
              <p className="nzah-big text-center">
                Measure from{" "}
                <em className={glow === "s4a" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  satellite imagery
                </em>
                .
              </p>
              <p className="nzah-sub mt-4 text-center">
                Apply your{" "}
                <em className={glow === "s4b" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  square area rate
                </em>
                .
              </p>
            </div>

            {/* Scene 5 — pricing */}
            <div className={sceneClass("s5")} aria-hidden={scene !== "s5"}>
              <p className="nzah-big text-center">
                Transfer your measurements into a{" "}
                <em className={glow === "s5" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  spreadsheet or app
                </em>
                .
              </p>
              <p className="nzah-sub mt-4 text-center">Work out the price.</p>
            </div>

            {/* Scene 6 — quoting and documents */}
            <div className={sceneClass("s6")} aria-hidden={scene !== "s6"}>
              <p className="nzah-big text-center">
                Transfer your pricing into{" "}
                <em className={glow === "s6a" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  another app
                </em>{" "}
                for the quote.
              </p>
              <p className="nzah-sub mt-4 text-center">
                Then the{" "}
                <em className={glow === "s6b" ? "nzah-em nzah-em-on" : "nzah-em"}>order</em>.
                <br />
                Then the{" "}
                <em className={glow === "s6c" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  invoice
                </em>
                .
              </p>
            </div>

            {/* Scene 7 — turning point */}
            <div className={sceneClass("s7")} aria-hidden={scene !== "s7"}>
              <h2 className="nzah-big text-center">
                We built QuoteCore+ around{" "}
                <em className={glow === "s7" ? "nzah-em nzah-em-on" : "nzah-em"}>
                  the way you already work
                </em>
                .
              </h2>
            </div>

            {/* Scene 8 — connected workflow (final, persists) */}
            <div className={sceneClass("s8")} aria-hidden={scene !== "s8"}>
              <div className="w-full max-w-[780px]">
                <ul className="space-y-4 sm:space-y-5">
                  <li className={`nzah-bullet ${bullets >= 1 ? "nzah-bullet-on" : ""}`}>
                    Measure digitally or{" "}
                    <em className={glow === "b1" ? "nzah-em nzah-em-on" : "nzah-em"}>
                      add your measurements
                    </em>
                    .
                  </li>
                  <li className={`nzah-bullet ${bullets >= 2 ? "nzah-bullet-on" : ""}`}>
                    Your pricing is{" "}
                    <em className={glow === "b2" ? "nzah-em nzah-em-on" : "nzah-em"}>
                      calculated automatically
                    </em>
                    .
                    <span className="block text-sm font-normal text-zinc-500">
                      (Using your saved rates and rules.)
                    </span>
                  </li>
                  <li className={`nzah-bullet ${bullets >= 3 ? "nzah-bullet-on" : ""}`}>
                    <em className={glow === "b3" ? "nzah-em nzah-em-on" : "nzah-em"}>
                      Generate and send
                    </em>{" "}
                    the quote.
                  </li>
                  <li className={`nzah-bullet ${bullets >= 4 ? "nzah-bullet-on" : ""}`}>
                    Easily send an order or invoice from the{" "}
                    <em className={glow === "b4" ? "nzah-em nzah-em-on" : "nzah-em"}>
                      same job
                    </em>
                    .
                  </li>
                </ul>

                <div
                  className={`nzah-reassure mt-10 text-center ${reassure ? "nzah-reassure-on" : ""}`}
                >
                  <p className="text-base font-semibold text-zinc-900 sm:text-lg">
                    We can help you set it up around how you currently measure and
                    price jobs.
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">(See below.)</p>
                </div>
              </div>
            </div>
          </div>

          <style>{nzahSceneCss}</style>
        </section>
      </div>

      <style>{nzahShellCss}</style>
    </>
  );
}

const nzahShellCss = `
  /* Hide the page's duplicate BlogHeader while this hero is active */
  body.qc-refined-hero-active .hero-duplicate-header {
    display: none !important;
  }

  /* Fixed header: out of view at top, fades/slides in on scroll */
  .nzah-hero-header {
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
  .nzah-hero-header--visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Video mode: fixed header overlays the page, push video below it */
  .nzah-video-mode {
    padding-top: 5rem;
  }

  /* Fade the animation out before the video swap */
  .nzah-anim-fade-out {
    animation: nzahHeroFadeOut 0.85s ease forwards;
  }
  @keyframes nzahHeroFadeOut {
    to { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .nzah-hero-header {
      transition: opacity 0.2s ease;
      transform: none;
    }
  }
`;

const nzahSceneCss = `
  .nzah-hero {
    --nzah-shift: 28px;
  }
  @media (max-width: 640px) {
    .nzah-hero { --nzah-shift: 16px; }
  }

  /* Scenes stack in one grid cell; only transform/opacity animate */
  .nzah-stage > .nzah-scene {
    grid-area: 1 / 1;
    opacity: 0;
    visibility: hidden;
    transform: translateX(calc(var(--nzah-shift) * -1));
    transition:
      opacity 550ms cubic-bezier(0.22, 0.61, 0.36, 1),
      transform 550ms cubic-bezier(0.22, 0.61, 0.36, 1),
      visibility 0s linear 550ms;
    pointer-events: none;
  }
  .nzah-stage > .nzah-scene.nzah-active {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    transition-delay: 0s;
    pointer-events: auto;
  }
  .nzah-stage > .nzah-scene.nzah-exit {
    opacity: 0;
    visibility: hidden;
    transform: translateX(var(--nzah-shift));
  }

  /* Typography */
  .nzah-big {
    font-size: clamp(1.75rem, 4.5vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #09090b;
    max-width: 24ch;
    margin: 0 auto;
  }
  .nzah-sub {
    font-size: clamp(1.125rem, 2.6vw, 1.75rem);
    font-weight: 600;
    line-height: 1.35;
    color: #18181b;
  }

  /* Emphasis glow: inline span + text-shadow only (no scale, no reflow) */
  .nzah-em {
    display: inline;
    font-style: inherit;
    color: inherit;
    text-shadow: 0 0 0px rgba(255, 107, 53, 0);
    transition: text-shadow 450ms ease;
  }
  .nzah-em-on {
    text-shadow:
      0 0 18px rgba(255, 107, 53, 0.55),
      0 0 42px rgba(255, 176, 92, 0.35);
  }

  /* Scene 8 bullets */
  .nzah-bullet {
    font-size: clamp(1.125rem, 2.4vw, 1.625rem);
    font-weight: 600;
    line-height: 1.35;
    color: #18181b;
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 550ms cubic-bezier(0.22, 0.61, 0.36, 1),
      transform 550ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .nzah-bullet-on {
    opacity: 1;
    transform: translateY(0);
  }

  /* Reassurance line */
  .nzah-reassure {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 600ms ease, transform 600ms ease;
  }
  .nzah-reassure-on {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .nzah-stage > .nzah-scene,
    .nzah-bullet,
    .nzah-reassure {
      transition: none !important;
    }
  }
`;
