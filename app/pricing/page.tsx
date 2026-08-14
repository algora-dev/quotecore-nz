import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import { pricingPlans } from "@/lib/pricing";
import { buildFaqSchema } from "@/lib/schema";
import { breadcrumbSchema, jsonLd, pricingOffers, site } from "@/lib/seo";
import { hreflangLanguages } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "Roofing & Construction Quoting Software Pricing NZ | QuoteCore+",
  description:
    "Compare QuoteCore+ plans in USD. Start with a 14-day full-feature trial with no credit card, then choose the quote and storage limits that fit your New Zealand trade business.",
  alternates: { canonical: `${site.url}/pricing`, languages: hreflangLanguages("/pricing") },
  openGraph: {
    title: "QuoteCore+ Pricing New Zealand",
    description: "Compare QuoteCore+ monthly plans and limits in USD for New Zealand trade businesses.",
    url: `${site.url}/pricing`,
    siteName: "QuoteCore+",
    type: "website",
  },
};

const faqs = [
  {
    question: "Is QuoteCore+ pricing shown in New Zealand dollars?",
    answer: "No. QuoteCore+ bills in USD. This page shows USD pricing. Local taxes (such as GST in New Zealand) may apply at checkout.",
  },
  {
    question: "Is a credit card required for the trial?",
    answer: "No. You can start the 14-day Full trial without entering a credit card.",
  },
  {
    question: "What happens when the trial ends?",
    answer: "The account moves to the Lite free plan unless you choose to upgrade to a paid plan.",
  },
  {
    question: "What limits differ between plans?",
    answer: "Plans differ by monthly quote allowance, storage and the support or usage features listed on each plan card.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#software`,
      name: "QuoteCore+",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${site.url}/pricing`,
      description: "Roofing and construction quoting software for New Zealand measured trades.",
      offers: pricingOffers.map((offer) => ({ ...offer, url: `${site.url}/pricing` })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  ],
};

export default function PricingPage() {
  return (
    <>
      <Script id="pricing-nz-schema" type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Script id="pricing-nz-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(faqs))} />
      <BlogHeader />
      <main className="min-h-screen bg-white text-zinc-950">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
        <section className="mx-auto max-w-7xl px-6 pb-14 pt-12 text-center lg:px-8 lg:pb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BD4A1A]">USD monthly plans</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            QuoteCore+ pricing for New Zealand trade businesses.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-600">
            Start with every feature for 14 days, no card required. Compare the quote and storage limits before choosing the plan that fits your workload.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-trial" className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_18px_rgba(255,107,53,0.32)]">Start free trial</Link>
            <Link href="/features" className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-500">Compare features</Link>
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className={`relative flex flex-col rounded-[2rem] border bg-white p-8 ${plan.featured ? "border-[#BD4A1A] shadow-[0_18px_50px_rgba(24,24,27,0.10)]" : "border-zinc-200"} ${plan.comingSoon ? "opacity-75" : ""}`}>
                {plan.featured && <span className="absolute right-6 top-6 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
                <h2 className="text-xl font-semibold">{plan.displayName}</h2>
                <p className="mt-2 min-h-10 text-sm leading-6 text-zinc-600">{plan.subtitle}</p>
                <div className="mt-6 rounded-xl border border-zinc-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">NZD</p>
                  <p className="mt-1 text-3xl font-semibold">{plan.nzd}</p>
                  {!plan.isFree && !plan.comingSoon && <p className="text-xs text-zinc-500">per month</p>}
                </div>
                {plan.originalNzd && <p className="mt-3 text-xs text-zinc-500">Regular monthly price: <s>{plan.originalNzd}</s></p>}
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-zinc-700">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#BD4A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.comingSoon ? (
                  <span className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-500">Coming soon</span>
                ) : (
                  <Link href="/free-trial" className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors ${plan.featured ? "bg-black text-white hover:bg-zinc-800" : "border border-zinc-300 text-zinc-900 hover:border-zinc-500"}`}>
                    {plan.isFree ? "Start free trial" : "Try this plan"}
                  </Link>
                )}
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl px-6 text-center text-sm text-zinc-600">USD pricing shown. Local taxes may apply at checkout.</p>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#BD4A1A]">New Zealand pricing questions</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Know what happens before you start.</h2>
          </div>
          <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-semibold text-zinc-950">{faq.question}</h3>
                <p className="mt-2 leading-7 text-zinc-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-500">Ask a pricing question</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
