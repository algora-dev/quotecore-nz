"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * Homepage interactive demo entry card.
 * Replaces the passive YouTube embed in the how-it-works flow.
 * Deep-links into /takeoff-demo with the mode pre-selected
 * (?mode=ai | ?mode=manual — handled by DemoTakeoff).
 */
export default function DemoToolCard() {
  const go = (mode: "ai" | "manual") => {
    trackEvent("demo_tool_click", { location: "homepage_section", mode: mode === "ai" ? "ai_scan" : "manual" });
  };

  const DEMO_BASE = "https://quote-core.com/takeoff-demo";

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-2 pb-4 lg:px-8" aria-labelledby="demo-tool-heading">
      <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-transform duration-200 hover:scale-[1.01]">
        {/* Image layer */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/takeoff-demo/roofplan-baseline.png"
            alt="Roof plan used in the QuoteCore+ interactive takeoff demo"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            width={1280}
            height={720}
          />
          {/* Gradient overlay for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" aria-hidden="true" />

          {/* Copy overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Interactive demo
              </span>
              <h2 id="demo-tool-heading" className="mt-3 text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
                Try our real system in 30 seconds or less
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-200 sm:text-base">
                Scan this sample roof plan with AI or measure it yourself - the same takeoff workstation that&apos;s in the app. No sign-in needed.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={`${DEMO_BASE}?mode=ai`}
                onClick={() => go("ai")}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E55A28]"
              >
                Try AI Scan Assist
              </a>
              <a
                href={`${DEMO_BASE}?mode=manual`}
                onClick={() => go("manual")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/60 bg-white/10 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-zinc-950"
              >
                Try Manual Digital Measure
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
