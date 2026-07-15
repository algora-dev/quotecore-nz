import type { Metadata } from "next";
import Script from "next/script";
import OrangeCheck from "@/components/OrangeCheck";
import { breadcrumbSchema, jsonLd, pricingOffers, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | QuoteCore+ NZ",
  description:
    "Simple pricing for NZ tradies and contractors. Start a 14-day free trial and test QuoteCore+ for measuring, pricing, quote approvals, materials ordering, and job workflow.",
  alternates: { canonical: `${site.url}/pricing` },
};

const plans = [
  { name: "Full trial", price: "14 days free", regularPrice: null, note: "Full platform access. No card required.", features: ["Digital takeoff", "Quote builder", "Approval tracking", "Materials ordering"] },
  { name: "Starter", price: "NZ$30/mo", regularPrice: "NZ$65/mo", note: "For owner-operators and solo tradies.", features: ["Saved components", "Customer-ready quotes", "Core quote workflow", "Email support"] },
  { name: "Professional", price: "NZ$65/mo", regularPrice: "NZ$149/mo", note: "For small teams quoting regularly.", features: ["Higher usage", "Reusable pricing rules", "Materials lists", "Priority setup help"] },
  { name: "Pro Plus", price: "NZ$99/mo", regularPrice: "NZ$200/mo", note: "For established teams with higher quote volume.", features: ["Higher limits", "Reusable pricing rules", "Materials lists", "Priority setup help"] },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "QuoteCore+",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${site.url}/pricing`,
      description: "Contractor quoting software for trades that work from measurements.",
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
      <main className="min-h-screen bg-white text-zinc-950">
        <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
            <a href="/" className="flex items-center gap-3">
              <img src="/MainQCP.png" alt="QuoteCore+" className="h-10 w-auto" />
            </a>
            <div className="flex items-center gap-3">
              <a href="/contact" className="hidden min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-[#FF6B35]/50 sm:inline-flex">
                Contact us
              </a>
              <a href="/free-trial" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#BD4A1A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A03E15]">
                Start free trial
              </a>
            </div>
          </div>
        </header>
        <section className="bg-[linear-gradient(180deg,#fff_0%,#fff7f2_70%,#fff_100%)] px-6 py-20 text-center lg:px-8">
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
            Simple pricing for NZ tradies and contractors
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Start with 14 days free. QuoteCore+ helps trade businesses measure, price, send, approve, and manage quotes
            in one connected workflow.
          </p>
          <p className="mt-4 text-sm font-medium text-zinc-500">
            Founding customer pricing is available for early users. Regular prices are shown separately for clarity.
          </p>
        </section>
        <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <div className="mt-4 space-y-1">
                {plan.regularPrice && (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Founding customer price:
                  </p>
                )}
                <p className="text-3xl font-semibold text-[#BD4A1A]">{plan.price}</p>
                {plan.regularPrice && (
                  <p className="text-sm text-zinc-500">
                    Regular price <s>{plan.regularPrice}</s>
                  </p>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{plan.note}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2"><OrangeCheck />{feature}</li>
                ))}
              </ul>
              <a href="/free-trial" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#BD4A1A] px-5 text-sm font-semibold text-white hover:bg-[#A03E15]">
                Start free trial
              </a>
            </div>
          ))}
        </section>
        <section className="mx-auto max-w-4xl px-6 pb-20 text-center lg:px-8">
          <p className="text-zinc-600">
            Not sure which plan fits your business? Contact us and we will help you choose the right setup.
          </p>
          <a href="/contact" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-semibold text-zinc-900 hover:border-[#FF6B35]/50">
            Contact us
          </a>
        </section>
        <footer className="border-t border-zinc-200 py-10 text-center text-sm text-zinc-500">
          <p className="mb-4 text-xs text-zinc-400">QuoteCore+ is quoting software for contractors and trade businesses.</p>
          <p>
            <a href="/" className="hover:text-zinc-800">Home</a>
            {" · "}
            <a href="/free-trial" className="hover:text-zinc-800">Free Trial</a>
            {" · "}
            <a href="/contact" className="hover:text-zinc-800">Contact</a>
            {" · "}
            <a href="/privacy" className="hover:text-zinc-800">Privacy</a>
            {" · "}
            <a href="/terms" className="hover:text-zinc-800">Terms</a>
          </p>
        </footer>
      </main>
    </>
  );
}
