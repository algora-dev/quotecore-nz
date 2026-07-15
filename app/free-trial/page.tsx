import type { Metadata } from "next";
import Script from "next/script";
import FreeTrialClient from "./client";
import FreeTrialFaqPanel from "./FreeTrialFaqPanel";
import SiteFooter from "@/components/SiteFooter";
import BlogHeader from "@/components/BlogHeader";
import { canonical } from "@/lib/nz";
import { hreflangLanguages } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Free 14-Day Trial - No Card Required | QuoteCore+ NZ",
  description:
    "Try QuoteCore+ free for 14 days. Measure jobs, build professional quotes, track acceptances, and manage materials orders. No credit card needed.",
  alternates: {
    canonical: canonical("/free-trial"),
    languages: hreflangLanguages("/free-trial"),
  },
};

const faqs = [
  {
    question: "Do I need a credit card to sign up?",
    answer: "No. Your free trial is completely free. We'll only ask for payment if you decide to upgrade.",
  },
  {
    question: "How long is the trial?",
    answer: "14 days from the date you sign up.",
  },
  {
    question: "What happens when the trial ends?",
    answer: "You'll be prompted to choose a plan. If you don't upgrade, your account pauses and your data stays safe.",
  },
  {
    question: "Can I send real quotes to real customers during the trial?",
    answer: "Yes. Quote, measure, and send to customers from day one.",
  },
  {
    question: "What if I need help?",
    answer: "Email us at info@quote-core.com and we'll get back to you within one business day.",
  },
  {
    question: "What is included in the free trial?",
    answer:
      "Your 14-day free trial gives you full access to every QuoteCore+ feature. That includes the digital takeoff tool, quote builder with your own pricing logic, automated materials ordering from accepted quotes, and the job management dashboard. You can send real quotes to real customers from day one - nothing is locked.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started takes less than ten minutes. Create your account, set up your pricing rates and components once, and you are ready to quote. Upload a site plan, measure the job directly from it, and QuoteCore+ builds the quote automatically using your pricing logic.",
  },
  {
    question: "Who is QuoteCore+ for?",
    answer:
      "QuoteCore+ is built for construction businesses that measure and quote jobs regularly - roofing, plumbing, electrical, cladding, flooring, fencing, landscaping, decking, general building, exterior works, and renovation trades. Led by Shaun's real construction experience and built by the QuoteCore+ team, it is designed for businesses that want a cleaner path from measurements to payment.",
  },
  {
    question: "What are Smart Components\u2122?",
    answer:
      "Smart Components\u2122 are reusable parts of your quoting workflow. You can create components that include materials, labour, waste allowances, measurements, drawings, images, calculations and pricing rules, then reuse them in future quotes. They help each quote make the next quote faster.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function TrialPreviewImages() {
  return (
    <div className="relative mx-auto flex min-h-[460px] w-full max-w-md items-center justify-center lg:min-h-[620px]">
      <div className="absolute inset-x-10 bottom-16 top-20 rounded-[44%] bg-[#FF6B35]/10 blur-[2px]" />

      <div className="relative z-10 w-[68%] -translate-y-8 -rotate-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.12)] transition duration-300 ease-out hover:-translate-y-10 hover:-rotate-2 hover:scale-[1.03] hover:shadow-[0_34px_90px_rgba(15,23,42,0.18)]">
        <img
          src="/free-trial-resource-lib.png"
          alt="QuoteCore+ resource library preview"
          className="h-auto w-full"
        />
      </div>

      <div className="absolute bottom-8 right-1 z-20 w-[86%] rotate-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition duration-300 ease-out hover:bottom-10 hover:rotate-0 hover:scale-[1.03] hover:shadow-[0_34px_90px_rgba(15,23,42,0.22)]">
        <img
          src="/free-trial-order-layout.png"
          alt="QuoteCore+ order layout preview"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function FreeTrialPage() {
  return (
    <>
      <Script
        id="free-trial-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-white text-zinc-950">
        <BlogHeader backLabel="Back to homepage" backHref="/" />

        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#fff7f2_52%,#fff_100%)]">
          <div className="relative mx-auto grid max-w-[92rem] gap-10 px-6 py-12 lg:grid-cols-[1fr_0.68fr] lg:px-8 lg:py-16 xl:grid-cols-[0.98fr_0.58fr_0.95fr] xl:gap-8">
            <div className="xl:pt-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF6B35] shadow-sm">
                <span className="text-base leading-none">*</span>
                14-day free trial
              </p>
              <h1 className="mt-8 max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Try QuoteCore+ free for 14 days.
              </h1>

              <p className="mt-7 max-w-2xl text-2xl font-semibold leading-tight text-zinc-700 sm:text-3xl">
                Test the full quoting workflow.
                <br />
                No card. No commitment.
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl">
                See how fast you can go from measurement to customer-ready quote before you spend a penny.
              </p>

              <FreeTrialClient />

              <div className="mt-8 hidden max-w-xl grid-cols-1 gap-4 text-sm text-zinc-500 sm:grid sm:grid-cols-3 sm:gap-6">
                {[
                  ["Full access", "All features included"],
                  ["14 days", "Risk-free trial"],
                  ["Pause anytime", "No charges"],
                ].map(([title, text]) => (
                  <div key={title} className="flex flex-col items-start gap-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#FF6B35] shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>
                      <span className="block whitespace-nowrap font-semibold text-zinc-950">{title}</span>
                      <span className="block whitespace-nowrap">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:order-3 lg:col-span-2 xl:order-none xl:col-span-1">
              <TrialPreviewImages />
            </div>

            <div className="xl:pt-8">
              <FreeTrialFaqPanel faqs={faqs} />
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
