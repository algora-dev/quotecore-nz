"use client";

import React, { useEffect, useRef, useState } from "react";
import CoffeePopup from "@/components/CoffeePopup";
import OrangeCheck from "@/components/OrangeCheck";
import SocialIcons from "@/components/SocialIcons";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

const homeBreadcrumbSchema = breadcrumbSchema([{ name: "Home", path: "/" }]);

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoHovered, setVideoHovered] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [carouselMounted, setCarouselMounted] = useState(false);
  const bannerTrackRef = useRef<HTMLDivElement | null>(null);
  const bannerPosRef = useRef(0);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setVideoProgress((video.currentTime / video.duration) * 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  useEffect(() => {
    const PAUSE_MS = 3000;
    const ROLL_MS = 800;
    let rafId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const step = () => {
      const track = bannerTrackRef.current;
      if (!track) return;
      const itemEl = track.querySelector<HTMLElement>('.banner-item');
      if (!itemEl) return;
      const itemW = itemEl.getBoundingClientRect().width;
      bannerPosRef.current += 1;
      track.style.transition = `transform ${ROLL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      track.style.transform = `translateX(-${bannerPosRef.current * itemW}px)`;
      timerId = setTimeout(() => {
        if (bannerPosRef.current >= 3) {
          bannerPosRef.current = 0;
          track.style.transition = 'none';
          track.style.transform = 'translateX(0px)';
          rafId = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              timerId = setTimeout(step, PAUSE_MS);
            });
          });
        } else {
          timerId = setTimeout(step, PAUSE_MS);
        }
      }, ROLL_MS + 100);
    };

    timerId = setTimeout(step, PAUSE_MS);
    return () => { clearTimeout(timerId); cancelAnimationFrame(rafId); };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPaused(false);
      } catch {
        setIsPaused(true);
      }
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setCarouselMounted(true);
  }, []);

  useEffect(() => {
    setActiveTestimonial(0);
  }, [isMobile]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeStep]);

  const newPricingPlans = [
    {
      name: "Full trial",
      nzd: "14 Days Free",
      originalNzd: null,
      subtitle: "A 14-day taste of everything",
      features: ["10 quotes", "100 MB storage", "All features unlocked", "No credit card needed"],
      featured: false,
      comingSoon: false,
      isFree: true,
    },
    {
      name: "Lite",
      nzd: "Free",
      originalNzd: null,
      subtitle: "For individuals just getting started",
      features: ["5 quotes", "50 MB storage"],
      featured: false,
      comingSoon: false,
      isFree: true,
    },
    {
      name: "Starter",
      nzd: "NZ$30/mo",
      originalNzd: "NZ$65/mo",
      subtitle: "For solo traders quoting regularly",
      features: ["25 quotes", "500 MB storage", "All core features", "No card for trial"],
      featured: false,
      comingSoon: false,
      isFree: false,
    },
    {
      name: "Professional",
      nzd: "NZ$65/mo",
      originalNzd: "NZ$149/mo",
      subtitle: "For growing trade businesses",
      features: ["100 quotes", "3 GB storage", "All core features", "Priority support"],
      featured: true,
      comingSoon: false,
      isFree: false,
    },
    {
      name: "Pro Plus",
      nzd: "NZ$99/mo",
      originalNzd: "NZ$200/mo",
      subtitle: "For established teams with high quote volume",
      features: ["200 quotes", "5 GB storage", "All core features", "Priority support"],
      featured: false,
      comingSoon: false,
      isFree: false,
    },
    {
      name: "Premium",
      nzd: "Coming Soon",
      originalNzd: null,
      subtitle: "Enterprise-level power for larger operations",
      features: ["Higher limits", "Advanced features", "Dedicated support"],
      featured: false,
      comingSoon: true,
      isFree: false,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "How do you want to quote?",
      body: "Choose where to start - from your dashboard, saved resources, or a new quote.",
      options: [
        { title: "Line by line", description: "Blank Quote mode - build from scratch, full control", icon: "/how-it-works-line-by-line.png" },
        { title: "Pre-saved components", description: "Manual Mode - use your saved Smart Components", icon: "/how-it-works-pre-saved-components.png" },
        { title: "Measure from a plan", description: "Digital Mode - upload a plan and measure directly", icon: "/how-it-works-measure-from-plan.png" },
      ],
      images: [
        { src: "/how-it-works/how-it-works-1-1.png", label: "Dashboard" },
        { src: "/how-it-works/how-it-works-1-2.png", label: "Components" },
        { src: "/how-it-works/how-it-works-1-3.png", label: "Digital takeoff" },
      ],
    },
    {
      number: "02",
      title: "Build your quote",
      body: "Add items, set pricing, customise what the customer sees, and preview the final quote.",
      images: [
        { src: "/how-it-works/how-it-works-2-1.png", label: "Quote list" },
        { src: "/how-it-works/how-it-works-2-2.png", label: "Quote editor" },
        { src: "/how-it-works/how-it-works-2-3.png", label: "Customer preview" },
      ],
    },
    {
      number: "03",
      title: "Send & track",
      body: "Send quotes, see when customers open them, and track approvals in one place.",
      images: [
        { src: "/how-it-works/how-it-works-3.png", label: "Message centre" },
      ],
    },
    {
      number: "04",
      title: "Order materials",
      body: "Turn accepted quotes into material orders without rebuilding the job from scratch.",
      images: [
        { src: "/how-it-works/how-it-works-4.png", label: "Material orders" },
      ],
    },
    {
      number: "05",
      title: "Invoice",
      body: "Create and manage invoices from the same connected workflow.",
      images: [
        { src: "/how-it-works/how-it-works-5-1.png", label: "Invoice list" },
        { src: "/how-it-works/how-it-works-5-2.png", label: "Invoice view" },
      ],
    },
    {
      number: "06",
      title: "Everything tracked",
      body: "Keep quote, order, invoice, and customer activity visible in one message centre.",
      images: [
        { src: "/how-it-works/how-it-works-6.png", label: "Notifications" },
      ],
    },
  ];

  const currentStep = steps[activeStep] ?? steps[0];
  const currentImages = currentStep.images;
  const currentImage = currentImages[activeImageIndex] ?? currentImages[0];
  const hasMultipleStepImages = currentImages.length > 1;
  const showPreviousStepImage = () => {
    setActiveImageIndex((index) => (index - 1 + currentImages.length) % currentImages.length);
  };
  const showNextStepImage = () => {
    setActiveImageIndex((index) => (index + 1) % currentImages.length);
  };

  const renderScreenshotPreview = (className = "") => (
    <div className={`relative overflow-visible rounded-[2rem] bg-transparent transition-all duration-300 ${hasMultipleStepImages ? "pb-14 sm:pb-16" : ""} ${className}`}>
      <div>
        <div className="min-w-0">
          <div className="relative z-10 flex items-center justify-center">
            <img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.label}
              className="block h-auto max-w-full rounded-xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:rounded-[1.5rem]"
            />
          </div>

          {hasMultipleStepImages && (
            <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-[0_12px_35px_rgba(15,23,42,0.12)] backdrop-blur">
              <button
                type="button"
                onClick={showPreviousStepImage}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200"
                aria-label="Previous screenshot"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2" aria-label={`${currentStep.title} screenshots`}>
                {currentImages.map((image, index) => (
                  <button
                    type="button"
                    key={image.src}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === activeImageIndex ? "bg-[#FF6B35]" : "bg-zinc-600 hover:bg-zinc-400"
                    }`}
                    aria-label={`Show ${image.label}`}
                    aria-current={index === activeImageIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={showNextStepImage}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
                aria-label="Next screenshot"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );


  const testimonials = [
    {
      name: "Tony Edwards",
      business: "NZ Audio Visual",
      quote:
        "Its been hard as an AV company offering very diverse services to find a 1 app does it all solution, but after using QuoteCore+ this is as good as we've found, it does 90% of what we need it to perfectly, and the apps designed in a way that we can improvise making the app work for the other 10%, keeping everything in 1 app! This saves us so much time/money",
      initials: "TE",
    },
    {
      name: "James Hargrove",
      business: "Hargrove Roofing Co.",
      quote:
        "We cut our quoting time in half within the first week. The workflow is dead simple and our customers love getting a proper-looking quote instead of a scribbled note.",
      initials: "JH",
    },
    {
      name: "Tom Harris",
      business: "Harris Flooring Ltd",
      quote:
        "QuoteCore+ paid for itself on the second job. No more chasing customers for approvals - they can see everything clearly and sign off fast.",
      initials: "TH",
    },
    {
      name: "Adam Westbrook",
      business: "Westbrook Fencing Co.",
      quote:
        "I used to spend Sunday nights doing quotes. Now I send them from site before I drive home. Game changer for any solo tradesperson.",
      initials: "AW",
    },
    {
      name: "Mark Clarke",
      business: "Clarke Landscaping",
      quote:
        "The materials ordering side alone saved us hours a week. Everything is in one place - quote, approval, order. No more spreadsheets.",
      initials: "MC",
    },
    {
      name: "Rebecca Chen",
      business: "Meridian Cladding Ltd",
      quote:
        "Our close rate went up noticeably once we started sending proper quotes. Customers take you more seriously when everything looks professional.",
      initials: "RC",
    },
  ];

  const faqs = [
    {
      question: "Who is QuoteCore+ built for?",
      answer:
        "Built for contractors, trade businesses, builders, roofers, and small teams who want a faster, cleaner, and more professional way to measure, quote, store, and manage jobs digitally.",
    },
    {
      question: "How fast can I create a quote?",
      answer:
        "Once set up, most standard job quotes can be measured, built, and sent in as little as 10-15 minutes using reusable templates and our customer approval link system.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply create a free account and test the full system risk-free for 14 days.",
    },
    {
      question: "Does QuoteCore+ create quotes automatically?",
      answer:
        "QuoteCore+ gives you the tools to measure, build, and fully customise professional quotes quickly. You control your pricing, materials, labour, and templates - making every future quote faster and more consistent.",
    },
    {
      question: "Why do contractors switch to QuoteCore+?",
      answer:
        "Because it saves time, reduces quote admin, connects disjointed systems, improves professionalism, and keeps job information organised in one place. It also helps trade businesses quote with more confidence around materials, labour, waste, and margin.",
    },
    {
      question: "Is QuoteCore+ only for roofers?",
      answer:
        "No. QuoteCore+ started in roofing - that's where the founder's trade experience is - but it's built for businesses that measure, price, and quote jobs. Roofing, cladding, flooring, fencing, landscaping, general building work, exterior works, and more.",
    },
  ];

  const primaryButton =
    "inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#e85d2b]";

  const shimmerButton =
    "pill-shimmer inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:border-[#FF6B35]/40";

  const topShimmerButton =
    "pill-shimmer inline-flex min-h-11 items-center justify-center rounded-full border border-white/70 bg-white/72 px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-[0_6px_24px_rgba(255,255,255,0.18)_inset,0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-3xl transition-colors duration-200";

  const headerActionButton =
    "inline-flex h-11 min-w-[170px] items-center justify-center rounded-full px-5 py-2.5 text-sm transition-colors duration-200";

  const topPrimaryButton =
    `${headerActionButton} bg-[#FF6B35] font-semibold text-white hover:bg-[#e85d2b]`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(homeBreadcrumbSchema)}
      />
      <main className="min-h-screen bg-white text-zinc-950">

        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/68 shadow-[0_8px_30px_rgba(255,255,255,0.25)_inset,0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-[24px]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a href="/" className="flex items-center gap-3">
              <img src="/MainQCP.png" alt="QuoteCore+" className="h-10 w-auto" />
            </a>

            <nav className="hidden items-center gap-3 lg:flex">
            </nav>

            {/* Desktop nav buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <a href="/contact" className={topShimmerButton} onClick={() => trackEvent("contact_click", { location: "nav" })}>
                Contact us
              </a>
              <a href="/free-trial" className={topPrimaryButton} onClick={() => trackEvent("free_trial_click", { location: "nav" })}>
                Start free trial
              </a>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50"
                onClick={() => setMobileMenuOpen((p) => !p)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              {/* Nav links */}
              <div className="px-6 pt-5 pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 mb-3">Navigate</p>
                <div className="flex flex-col">
                  {[
                    { label: "How it works", href: "/#how-it-works" },
                    { label: "Pricing", href: "/#pricing" },
                    { label: "Contact", href: "/contact" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between py-3.5 border-b border-zinc-100 text-base font-medium text-zinc-800 hover:text-[#FF6B35] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                      <svg className="h-4 w-4 text-zinc-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    </a>
                  ))}
                </div>
              </div>
              {/* CTAs */}
              <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                <a
                  href="/free-trial"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6B35] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#e85d2b]"
                  onClick={() => { trackEvent("free_trial_click", { location: "nav" }); setMobileMenuOpen(false); }}
                >
                  Start free trial
                </a>
                <a
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                  onClick={() => { trackEvent("contact_click", { location: "nav" }); setMobileMenuOpen(false); }}
                >
                  Contact us
                </a>
              </div>
            </div>
          )}
        </header>

        <section id="hero-section" className="relative overflow-hidden pb-0 bg-white">
          {/* Two-column hero: text left, video right - bg matches video for seamless blend */}
          <div className="relative mx-auto max-w-7xl px-6 pt-12 lg:px-8 lg:pt-16">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
              {/* Left: text */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Built from real New Zealand trade experience</p>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                  Stop using 5 apps to run one job.
                </h1>
                <p className="mt-4 text-xl font-semibold text-zinc-700 sm:text-2xl">
                  Quoting software built for Kiwi businesses.
                </p>
                <p className="mt-4 text-xl font-semibold text-zinc-700 sm:text-2xl">
                  Measure. Quote. Order. Manage. Invoice. Get paid.
                </p>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                  The all-in-1 business platform built around how Kiwis actually work.
                </p>
                <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                  QuoteCore+ is quoting software for New Zealand contractors and businesses that work from measurements, plans, materials and labour. It helps teams measure jobs, build priced quotes, track customer approval, order materials, manage work, invoice and get paid - all in one connected workflow.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a href="/free-trial" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85d2b]" onClick={() => trackEvent("free_trial_click", { location: "hero" })}>
                    Start free trial
                  </a>
                  <a href="https://calendly.com/quote-core-info/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="pill-shimmer inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50" onClick={() => trackEvent("book_call_click", { location: "hero" })}>
                    Book a Call
                  </a>
                  <a
                    href="#how-it-works"
                    className="pill-shimmer inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                    onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    How it works
                  </a>
                </div>
                <p className="mt-3 text-sm text-zinc-500">14 days free. No card required.</p>
              </div>
              {/* Right: laptop video - bg matches section so edges blend */}
              <div className="flex-1 flex items-end justify-center lg:justify-end overflow-hidden">
                <video
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  className="w-full hero-video-float"
                  style={{display: "block"}}
                >
                  <source src="/qc-hero-laptop.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="mt-16 flex flex-col items-center gap-1.5 font-sans text-zinc-500 pb-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</p>
              <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
          {/* Video below centered */}
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 -mt-6">
            <div id="hero-story-video" className="relative">
              <div
                className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.15)]"
                style={{borderRadius: "2rem"}}
                onMouseEnter={() => setVideoHovered(true)}
                onMouseLeave={() => setVideoHovered(false)}
              >
                <video
                  ref={videoRef}
                  className="block w-full aspect-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onTimeUpdate={handleVideoTimeUpdate}
                >
                  <source src="/QCPFinalVideoSmaller.mp4" type="video/mp4" />
                </video>
                {/* Progress bar - shows on hover */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-1.5 cursor-pointer transition-opacity duration-200 ${videoHovered ? "opacity-100" : "opacity-0"}`}
                  style={{background: "rgba(255,255,255,0.2)"}}
                  onClick={handleProgressClick}
                >
                  <div className="h-full bg-[#FF6B35] transition-all duration-100" style={{width: `${videoProgress}%`}} />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 pb-5">
                  <button
                    type="button"
                    onClick={togglePlayback}
                    aria-label={isPaused ? "Play video" : "Pause video"}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/50"
                  >
                    {isPaused ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M8 5.14v13.72c0 .78.84 1.26 1.5.86l10-6.86a1 1 0 000-1.72l-10-6.86A1 1 0 008 5.14z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/50"
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M13 5.23v13.54a1 1 0 01-1.64.77L6.91 16H3a1 1 0 01-1-1v-6a1 1 0 011-1h3.91l4.45-3.54A1 1 0 0113 5.23zM20.78 8.8a1 1 0 010 1.41L19 12l1.78 1.79a1 1 0 11-1.41 1.41L17.59 13.4l-1.8 1.8a1 1 0 01-1.41-1.41L16.17 12l-1.79-1.79a1 1 0 011.41-1.41l1.8 1.8 1.78-1.8a1 1 0 011.41 0z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                        <path d="M14 5.23v13.54a1 1 0 01-1.64.77L7.91 16H4a1 1 0 01-1-1v-6a1 1 0 011-1h3.91l4.45-3.54A1 1 0 0114 5.23z" />
                        <path d="M16.5 9.5a1 1 0 011.41 0A4.97 4.97 0 0119.5 13a4.97 4.97 0 01-1.59 3.5 1 1 0 01-1.41-1.42A2.98 2.98 0 0017.5 13a2.98 2.98 0 00-1-2.08 1 1 0 010-1.42z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Shaun quote bubble - scroll-triggered, appears beside hero video */}
        <ShaunQuoteBubble />

        {/* What is QuoteCore+? */}
        <section id="what-is-quotecore" className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.15)] sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.12),transparent_55%)]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">The platform</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">Why use <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span>?</h2>
              <p className="mt-3 max-w-2xl text-lg font-semibold text-white">Stop running one job through five different apps.</p>
              <div className="mt-4 max-w-6xl space-y-4 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                <p>
                  <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> brings your whole workflow into one connected platform - from the first measure-up and customer conversation, through to quoting, materials, job tracking, invoicing and payment.
                </p>
                <p>
                  Led by a Kiwi who knows how messy trade admin can get, <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> helps New Zealand trade businesses quote faster, stay organised and keep jobs moving.
                </p>
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 sm:mt-6 sm:py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B35] mb-2">Who&apos;s it for?</p>
                <p className="text-base leading-7 text-zinc-300"><span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> is built for Kiwi businesses who need to go from measure-up to approved quote, materials ordering, job info and invoicing - all in one connected platform. We&apos;ve taken the chaotic workflow spread across plans, spreadsheets, emails, notes and quote documents, and turned it into a cleaner system designed around how trade businesses actually operate.</p>
              </div>
            </div>
            <div className="relative mt-5 flex flex-wrap gap-4 sm:mt-8">
              <a
                href="https://app.quote-core.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Read the Docs
              </a>
            </div>
          </div>
        </section>

        {/* Smart ComponentsTM */}
        <section id="smart-components" className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
              {/* Left: text content */}
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"><span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> remembers how you work.</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl text-[#FF6B35]">Smart Components&trade;</h2>
                <p className="mt-4 text-base font-medium leading-7 text-zinc-700 sm:text-lg">Other software remembers what you charged. <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> remembers how you work.</p>
                <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                  Most software stores your quotes. <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> stores your knowledge.
                </p>
                <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                  Every quote you create should make the next quote faster. With Smart Components&trade;, you can save the parts of a job you use again and again - including materials, labour, waste allowances, measurements, drawings, images, calculations and pricing rules.
                </p>
                <p className="mt-4 text-base font-medium leading-7 text-zinc-700 sm:text-lg">Create them once. Reuse them in seconds.</p>
                <ul className="mt-8 grid gap-1.5 sm:grid-cols-2 sm:gap-3">
                  {[
                    "Materials",
                    "Labour",
                    "Waste allowances",
                    "Measurements",
                    "Drawings",
                    "Images",
                    "Angle, pitch, volume, area and length calculations",
                    "Pricing rules",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-zinc-700">
                      <OrangeCheck />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-base font-semibold leading-7 text-zinc-950 sm:text-lg">Make them once. Reuse them in seconds. Forever.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="/free-trial" className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e85d2b]">Start free trial</a>
                  <a href="https://calendly.com/quote-core-info/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-7 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50">Book a call</a>
                </div>
              </div>
              {/* Right: overlapping laptop mockups */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-xl" style={{ minHeight: "340px" }}>
                  {/* Back image - offset top-right */}
                  <div
                    className="absolute left-1/2 top-0 w-full -translate-x-1/2 transition-transform duration-500 ease-out hover:scale-[1.03] hover:-translate-y-2 md:left-auto md:-right-8 md:-top-8 md:w-[102%] md:translate-x-0"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      src="/smart-components-laptop-1.png"
                      alt="Smart Components - component list"
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Front image - offset bottom-left, slightly larger */}
                  <div
                    className="absolute -left-12 -bottom-28 hidden w-[82%] transition-transform duration-500 ease-out hover:scale-[1.03] hover:translate-y-[-8px] md:block"
                    style={{ zIndex: 2 }}
                  >
                    <img
                      src="/smart-components-laptop-2.png"
                      alt="Smart Components - component editor"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Each step is faster, easier, and all in one place!
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> helps trade businesses turn measurements, pricing, approvals, materials, and job details into one connected workflow.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            {/* Left: step cards */}
            <div className="flex flex-col gap-3 lg:w-[460px] lg:shrink-0">
              {steps.map((item, i) => (
                <div key={item.number} className="contents">
                  <button
                    type="button"
                    aria-pressed={i === activeStep}
                    className={`group text-left transition-all duration-200 ${
                      i === activeStep
                        ? "rounded-[1.75rem] border border-[#FF6B35] bg-white p-5 shadow-[0_18px_45px_rgba(255,107,53,0.12)] sm:p-6"
                        : "rounded-[1.4rem] border border-zinc-100 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-[#FF6B35]/30 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
                    }`}
                    onClick={() => setActiveStep(i)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold ${
                          i === activeStep
                            ? "bg-[#FF6B35] text-white shadow-[0_10px_24px_rgba(255,107,53,0.32)]"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {item.number}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-lg font-semibold leading-7 ${ i === activeStep ? "text-zinc-950" : "text-zinc-700" }`}>
                          {item.title}
                        </h3>
                        {i === activeStep && (
                          item.options ? (
                            <div className="mt-5 space-y-3">
                              {item.options.map((option) => (
                                <div key={option.title} className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-[0_8px_22px_rgba(15,23,42,0.07)]">
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35]/10 text-[#FF6B35]" aria-hidden="true">
                                    <img src={option.icon} alt="" className="h-6 w-6 object-contain" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-base font-semibold text-zinc-950">{option.title}</p>
                                    <p className="mt-1 text-sm leading-5 text-zinc-500">{option.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-base leading-7 text-zinc-600">{item.body}</p>
                          )
                        )}
                      </div>
                      {i !== activeStep && (
                        <svg viewBox="0 0 24 24" className="mt-3 h-5 w-5 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </div>
                  </button>
                  {i === activeStep && (
                    <div className="mb-5 mt-2 lg:hidden">
                      {renderScreenshotPreview()}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: screenshot preview panel */}
            <div className="hidden flex-1 lg:sticky lg:top-24 lg:block">
              {renderScreenshotPreview()}
            </div>
          </div>
        </section>



              {/* Rolling banner + CTA */}
        <div className="border-y border-zinc-300 bg-zinc-200 py-3">
          {/* Rolling banner: all screen sizes */}
          <div className="overflow-hidden">
            {/* One crawlable version of the guarantee */}
            <p className="sr-only">At least 25% faster - or it&apos;s free.</p>
            {/* Decorative animated marquee - hidden from crawlers */}
            <div ref={bannerTrackRef} className="banner-track" aria-hidden="true" data-nosnippet style={{willChange: "transform"}}>
              {[0,1,2,3,4,5].map((i) => (
                <span key={i} className="banner-item inline-flex items-center shrink-0 whitespace-nowrap">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-700 px-6 lg:px-16">{carouselMounted ? "AT LEAST 25% FASTER - OR IT'S FREE" : "\u00a0"}</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]"></span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 bg-zinc-200 px-6 py-6 sm:gap-6 sm:py-7">
          <img src="/shaun-smiling.jpg" alt="Shaun" className="h-20 w-20 rounded-full object-cover border-2 border-[#FF6B35]/50 shrink-0 sm:h-24 sm:w-24" />
          <div className="min-w-0 flex-1 sm:flex-none">
            <p className="mb-3 text-sm text-zinc-500 sm:mb-2">Book 15 minutes with Shaun, who leads the team behind QuoteCore+</p>
            <div className="grid max-w-xs grid-cols-1 gap-2 sm:flex sm:max-w-none sm:gap-3">
              <a href="https://calendly.com/quote-core-info/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e85d2b] sm:min-h-9 sm:px-6" onClick={() => trackEvent("book_call_click", { location: "mid" })}>Book a Call</a>
              <a href="/free-trial" className="pill-shimmer inline-flex min-h-10 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 sm:min-h-9 sm:px-6" onClick={() => trackEvent("free_trial_click", { location: "mid" })}>Start free trial</a>
            </div>
          </div>
        </div>

        {/* About Shaun */}
        <section className="bg-[#FF6B35]/5 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col justify-center p-10">
                  <div className="mb-6 flex items-center gap-4">
                    <img src="/shaun-smiling.jpg" alt="Shaun" className="h-14 w-14 rounded-full object-cover border-2 border-[#FF6B35]/20 shrink-0" />
                    <div>
                      <p className="font-semibold text-zinc-950">Shaun</p>
                      <p className="text-sm text-[#FF6B35]">Founder and construction lead, <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span></p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-zinc-950">Meet Shaun</p>
                  <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                    <p>Shaun brings real roofing, construction, and business experience to QuoteCore+.</p>
                    <p>Throughout that journey, he encountered the same problem repeatedly: no matter the industry, businesses were forced to juggle multiple apps, spreadsheets, emails, and documents just to take a job from quote to payment.</p>
                    <p>There wasn&apos;t a single platform that was flexible enough to adapt to how individual businesses actually work.</p>
                    <p><span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> was founded from that real trade experience and built by the QuoteCore+ team to solve the messy gap between measuring a job and getting paid. The goal was simple: build a powerful yet flexible platform that works around your existing processes - making them faster, more organised, less chaotic, and ultimately more profitable.</p>
                    <p className="font-medium text-zinc-800">&ldquo;I lived the quoting mess first-hand. The team built QuoteCore+ around that workflow - practical, simple, and designed to adapt to the way every business works.&rdquo;</p>
                  </div>
                </div>
                <div className="relative hidden overflow-hidden rounded-r-[2rem] lg:block" style={{minHeight: "400px"}}>
                  <img src="/shaun.jpg" alt="Shaun, founder and construction lead of QuoteCore+" className="h-full w-full object-cover object-left" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="font-semibold text-white">Shaun</p>
                    <p className="text-sm text-white/70">Founder and construction lead, <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tell us what you need */}
        <section className="bg-[#FF6B35]/10 px-6 pt-14 pb-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2rem] bg-zinc-950 p-2 shadow-[0_22px_55px_rgba(255,107,53,0.22)]">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-[#FF6B35]/35 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,#242424_0%,#111318_58%,#090a0d_100%)] px-8 py-10 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-12">
                <div className="relative max-w-3xl">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-[#FF6B35]">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                      <path d="M5 3.5 11 8l-6 4.5v-9Z" />
                    </svg>
                    Custom requests
                  </p>
                  <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    Have a feature in mind?
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                    If there&apos;s a workflow improvement that would make your day easier, let us know. We might build it into <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span>.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="relative mt-8 inline-flex min-h-16 items-center justify-center gap-3 rounded-full border border-white/20 bg-[#FF6B35] px-10 text-base font-semibold text-white shadow-[0_18px_40px_rgba(255,107,53,0.35)] transition-colors hover:bg-[#ff5a1f] sm:text-lg lg:mt-0 lg:min-w-64"
                >
                  Get in touch
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#FF6B35]/10 pt-4 pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">What users say</h2>
            </div>
            {/* Crawler-readable testimonials - visually hidden, not duplicated in carousel DOM */}
            <ul className="sr-only">
              {testimonials.map((t, idx) => (
                <li key={idx}>
                  <blockquote>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                    <footer>{t.name}, {t.business}</footer>
                  </blockquote>
                </li>
              ))}
            </ul>
            {/* Mobile: single card carousel - decorative only, text rendered via data attrs to avoid crawler duplication */}
            <div className="relative mt-14 lg:hidden" aria-hidden="true" data-nosnippet>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="w-full min-w-full shrink-0 px-3">
                      <div className="flex h-full flex-col rounded-[2rem] bg-white p-8 shadow-sm">
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-4 w-4 text-[#FF6B35]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="flex-1 text-base leading-relaxed text-zinc-600">{carouselMounted ? <>&ldquo;{t.quote}&rdquo;</> : null}</p>
                        <div className="mt-8 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-xs font-semibold text-white">{carouselMounted ? t.initials : null}</div>
                          <div>
                            <p className="text-sm font-semibold text-zinc-950">{carouselMounted ? t.name : null}</p>
                            <p className="text-xs text-zinc-400">{carouselMounted ? t.business : null}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)} className="absolute -left-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50" aria-label="Previous">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
              <button type="button" onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)} className="absolute -right-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50" aria-label="Next">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
              {/* Dot indicators */}
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, idx) => (
                  <button key={idx} type="button" onClick={() => setActiveTestimonial(idx)} className={`h-2 w-2 rounded-full transition-colors ${idx === activeTestimonial ? "bg-[#FF6B35]" : "bg-zinc-300"}`} aria-label={`Go to testimonial ${idx + 1}`} />
                ))}
              </div>
            </div>
            {/* Desktop: 3-column carousel - decorative only, text suppressed from crawlers */}
            <div className="relative mt-14 hidden lg:block" aria-hidden="true" data-nosnippet>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * (100 / 3)}%)` }}
                >
                  {[...testimonials, ...testimonials].map((t, idx) => (
                  // eslint-disable-next-line jsx-a11y/no-redundant-roles
                    <div key={idx} className="w-1/3 shrink-0 px-3" aria-hidden="true">
                      <div className="flex h-full flex-col rounded-[2rem] bg-white p-8 shadow-sm">
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-4 w-4 text-[#FF6B35]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="flex-1 text-base leading-relaxed text-zinc-600">{carouselMounted ? <>&ldquo;{t.quote}&rdquo;</> : null}</p>
                        <div className="mt-8 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-xs font-semibold text-white">{carouselMounted ? t.initials : null}</div>
                          <div>
                            <p className="text-sm font-semibold text-zinc-950">{carouselMounted ? t.name : null}</p>
                            <p className="text-xs text-zinc-400">{carouselMounted ? t.business : null}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)} className="absolute -left-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50" aria-label="Previous">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
              <button type="button" onClick={() => setActiveTestimonial((p) => (p + 1) % (testimonials.length * 2 - 2))} className="absolute -right-5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-colors hover:bg-zinc-50" aria-label="Next">
                <svg className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="bg-zinc-950 py-24 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF8A61]">Pricing</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Simple, transparent pricing.
                </h2>
                <p className="mt-3 text-zinc-400">
                  Start with a full 14-day free trial. No card required. Founding customer pricing is available for early users.
                </p>
              </div>

            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newPricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-[2rem] border p-8 ${
                    plan.featured
                      ? "border-[#FF6B35] bg-white text-zinc-950"
                      : "border-white/10 bg-white/5"
                  } ${plan.comingSoon ? "opacity-60" : ""}`}
                >
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mt-4 space-y-1">
                    {plan.isFree || plan.comingSoon ? (
                      <p className="text-4xl font-semibold">
                        {plan.nzd}
                      </p>
                    ) : (
                      <>
                        <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${
                          plan.featured ? "text-zinc-500" : "text-zinc-400"
                        }`}>
                          Founding customer price:
                        </p>
                        <p className="text-3xl font-semibold leading-tight">
                          {plan.nzd}
                        </p>
                      </>
                    )}
                    {!plan.isFree && !plan.comingSoon && plan.originalNzd && (
                      <p className={`text-sm ${
                        plan.featured ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        Regular price <s>{plan.originalNzd}</s>
                      </p>
                    )}
                  </div>
                  <p className={`mt-3 text-sm ${
                    plan.featured ? "text-zinc-500" : "text-zinc-400"
                  }`}>{plan.subtitle}</p>
                  <ul className="mt-6 flex-1 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <OrangeCheck className="mt-0" />
                        <span className={plan.featured ? "text-zinc-700" : "text-zinc-300"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.comingSoon ? (
                    <span className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-600 text-sm text-zinc-500">
                      Coming soon
                    </span>
                  ) : (
                    <a
                      href="/free-trial"
                      className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        plan.featured
                          ? "bg-[#FF6B35] text-white hover:bg-[#e85d2b]"
                          : "border border-white/20 text-white hover:bg-white/10"
                      }`}
                      onClick={() => trackEvent("free_trial_click", { location: "pricing" })}
                    >
                      Start free trial
                    </a>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Founding customer pricing shown. Taxes are calculated at checkout where applicable.
            </p>
            <p className="mt-3 text-center text-sm text-zinc-400">
              Not sure which plan fits?{" "}
              <a
                href="https://calendly.com/quote-core-info/15-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white"
                onClick={() => trackEvent("book_call_click", { location: "pricing" })}
              >
                Book 15 minutes with Shaun
              </a>{" "}
              and the team will help you find the right setup.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">Frequently asked Questions</h2>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom philosophy and CTA */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-24">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-100/80 to-transparent" aria-hidden="true" />
          <div className="absolute left-0 top-44 hidden h-52 w-1/2 rounded-br-full bg-[#FF6B35]/5 blur-2xl lg:block" aria-hidden="true" />
          <div className="absolute right-28 top-52 hidden h-24 w-24 bg-[radial-gradient(circle,#FF6B35_1.2px,transparent_1.2px)] opacity-10 [background-size:14px_14px] lg:block" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative mx-auto max-w-5xl text-center">
              <div className="pointer-events-none absolute -left-10 top-14 hidden text-[11rem] font-semibold leading-none text-[#FF6B35]/5 lg:block" aria-hidden="true">&ldquo;</div>
              <div className="pointer-events-none absolute -right-8 top-32 hidden text-[11rem] font-semibold leading-none text-[#FF6B35]/5 lg:block" aria-hidden="true">&rdquo;</div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Our philosophy</p>
              <blockquote className="mx-auto mt-5 max-w-4xl">
                <p className="text-2xl font-semibold leading-snug text-zinc-950 sm:text-3xl">
                  Most top software says: &lsquo;Here&rsquo;s our system - make your business fit around it.&rsquo;
                </p>
                <div className="mx-auto my-6 h-0.5 w-12 bg-[#FF6B35]" aria-hidden="true" />
                <p className="text-3xl font-semibold leading-tight text-[#FF6B35] sm:text-4xl">
                  We say: &lsquo;Here&rsquo;s a flexible system - make it work for your business.&rsquo;
                </p>
              </blockquote>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
              <div className="grid lg:grid-cols-[1fr_0.95fr]">
                <div className="flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-20">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Built for growing businesses</p>
                  <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
                    Quote. Manage. Grow.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
                    <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> gives trade businesses the flexibility to quote, manage materials, track approvals, invoice, and grow from one connected platform.
                  </p>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="/free-trial"
                      className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FF6B35] px-9 text-base font-semibold text-white transition-colors hover:bg-[#e85d2b]"
                      onClick={() => trackEvent("free_trial_click", { location: "bottom" })}
                    >
                      Start free trial
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </a>
                    <a
                      href="https://calendly.com/quote-core-info/15-minute-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-shimmer inline-flex min-h-14 items-center justify-center rounded-full border border-zinc-300 bg-white px-9 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                      onClick={() => trackEvent("book_call_click", { location: "bottom" })}
                    >
                      Book a Call
                    </a>
                  </div>
                  <p className="mt-5 text-sm text-zinc-400">No card required. 14 days free.</p>
                </div>

                <div className="relative min-h-[240px] overflow-hidden bg-[radial-gradient(circle_at_85%_24%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(160deg,#ff965a_0%,#ff6b35_45%,#ff4f25_100%)] p-6 sm:min-h-[360px] sm:p-12">
                  <div className="absolute -right-20 bottom-0 h-64 w-96 rotate-[-12deg] rounded-[50%] bg-white/35 blur-xl" aria-hidden="true" />
                  <div className="relative flex h-full items-center justify-center">
                    <img
                      src="/resource-library-preview.png"
                      alt="QuoteCore resource library screen"
                      className="w-full max-w-xl rounded-xl border border-zinc-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-200 py-10 text-center text-sm text-zinc-500">
          <p className="mb-4 text-xs text-zinc-400"><span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span> is quoting software for contractors and trade businesses.</p>
          <p>
            <a href="/" className="hover:text-zinc-800">Home</a>
            {" \u00b7 "}
            <a href="/#pricing" className="hover:text-zinc-800">Pricing</a>
            {" \u00b7 "}
            <a href="/contact" className="hover:text-zinc-800">Contact</a>
            {" \u00b7 "}
            <a href="/free-trial" className="hover:text-zinc-800">Free Trial</a>
            {" \u00b7 "}
            <a href="/privacy" className="hover:text-zinc-800">Privacy Policy</a>
            {" \u00b7 "}
            <a href="/terms" className="hover:text-zinc-800">Terms &amp; Conditions</a>
            {" \u00b7 "}
            <a href="/cookie-policy" className="hover:text-zinc-800">Cookie Policy</a>
          </p>
          <p className="mt-3">&copy; 2026 <span className="brand-wordmark">QuoteCore<span className="brand-plus">+</span></span></p>
          <p className="mt-1">Built by <a href="https://t3labs.tech" className="hover:text-zinc-800">T3 Labs</a></p>
          <SocialIcons />
        </footer>
      </main>

      {/* Quote lightbox - full screen with scroll */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-full flex flex-col">
            {/* Close bar */}
            <div className="sticky top-0 z-10 flex justify-end p-4">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-zinc-600 hover:text-zinc-950 transition-colors"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Image */}
            <div className="flex-1 flex items-start justify-center px-4 pb-8">
              <img src="/QuoteExample.png" alt="Example Quote" className="w-full max-w-3xl rounded-[1.5rem] shadow-2xl" />
            </div>
          </div>
        </div>
      )}

      <CoffeePopup />
      <style>{`
        .hero-video-float {
          transition: transform 0.5s ease-out;
        }
        .hero-video-float:hover {
          transform: scale(1.03) translateY(-8px);
        }
        .brand-wordmark {
          white-space: nowrap;
        }

        .brand-plus {
          color: #FF6B35;
        }

        @keyframes shimmerBorder {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .pill-shimmer {
          position: relative;
          overflow: hidden;
        }

        .pill-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            #ff6b35 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }

        .pill-shimmer:hover::before {
          opacity: 1;
          animation: shimmerBorder 1.5s linear infinite;
        }
      `}</style>
    </>
  );
}

function ShaunQuoteBubble() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const video = document.getElementById("hero-story-video");
    const platformSection = document.getElementById("what-is-quotecore");
    if (!video || !platformSection) return;

    let rafId = 0;

    const updateVisibility = () => {
      rafId = 0;
      const videoRect = video.getBoundingClientRect();
      const platformRect = platformSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const videoIsInView = videoRect.top < viewportHeight * 0.85 && videoRect.bottom > viewportHeight * 0.25;
      const platformIsClearOfBubble = platformRect.top > viewportHeight * 0.72;

      setVisible(videoIsInView && platformIsClearOfBubble);
    };

    const requestVisibilityUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed left-6 top-[70vh] z-20 hidden w-72 xl:block transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <div className="relative rounded-2xl rounded-bl-sm bg-white px-5 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-zinc-100 animate-[floatBubble_6s_ease-in-out_infinite]">
        <p className="text-lg font-semibold leading-snug text-zinc-800">&ldquo;Software should adapt to your business. Not the other way around.&rdquo;</p>
        <p className="mt-3 text-base font-semibold text-[#FF6B35]">- Shaun, founder</p>
        <span className="absolute -bottom-2.5 left-5 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white" />
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 px-6 py-5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-zinc-950">{question}</span>
        <span className="text-2xl leading-none text-zinc-500">{open ? "-" : "+"}</span>
      </button>
      {/* Answer always in DOM for crawlers; visually hidden when closed */}
      <p
        className="text-base leading-7 text-zinc-600"
        style={open ? { marginTop: "1rem", display: "block" } : { position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        {answer}
      </p>
    </div>
  );
}
