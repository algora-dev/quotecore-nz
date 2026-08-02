import type { Metadata } from "next";
import Link from "next/link";
import BlogHeader from "@/components/BlogHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import NzContextPanel from "@/components/NzContextPanel";
import { site } from "@/lib/seo";
import { hreflangLanguages } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "Roofing & Construction Software Features NZ | QuoteCore+",
  description:
    "Explore digital roof takeoffs, reusable NZD pricing rules, material ordering and invoicing for New Zealand roofing and measured trade businesses.",
  alternates: {
    canonical: "https://www.quote-core.co.nz/features",
    languages: hreflangLanguages("/features"),
  },
  openGraph: {
    title: "Roofing & Construction Software Features NZ | QuoteCore+",
    description: "Take New Zealand trade work from metric measurement to NZD quote, supplier-ready order and invoice in one connected platform.",
    url: "https://www.quote-core.co.nz/features",
    siteName: "QuoteCore+",
    type: "website",
  },
};

const features = [
  {
    title: "Digital Roof Takeoff",
    description:
      "Upload plans, measure digitally, and build a complete roof takeoff with sections, lengths, areas, and flashings connected from the start.",
    href: "/features/digital-roof-takeoff",
    keyword: "roof takeoff software",
    steps: ["Upload a roof plan", "Measure sections digitally", "Generate a complete takeoff", "Send to quote builder"],
  },
  {
    title: "Smart Components™",
    description:
      "Reusable quoting components that know their own measurements, waste allowances, and pricing rules. Build a roof quote in minutes, not hours.",
    href: "/features/smart-components",
    keyword: "reusable quoting components",
    steps: ["Create a component once", "Set pricing and waste rules", "Drop into any quote", "Quote repeats automatically"],
  },
  {
    title: "Material Ordering",
    description:
      "Turn an accepted quote into a material order in seconds. Quantities, codes, and supplier details flow straight from the quote.",
    href: "/features/material-ordering",
    keyword: "material ordering software",
    steps: ["Accept a quote", "Generate a material order", "Send to your supplier", "Track the order"],
  },
  {
    title: "Invoicing",
    description:
      "Turn accepted quotes into professional invoices with line items, payment instructions, and online payment tracking.",
    href: "/features/invoicing",
    keyword: "contractor invoicing software",
    steps: ["Accept a quote", "Generate an invoice", "Customer pays", "Track status"],
  },
  {
    title: "Supplier Resources",
    description:
      "Search supplier pricing catalogs and component libraries by area or product type. Import ready-made components or convert catalogs in bulk.",
    href: "/features/supplier-resources",
    keyword: "supplier pricing catalogs",
    steps: ["Search suppliers", "Browse catalogs and libraries", "Import or convert", "Quote with real pricing"],
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Features", item: `${site.url}/features` },
  ],
};

export default function FeaturesHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-white text-zinc-950">
       <BlogHeader />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Features" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden pb-12 pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,53,0.08),transparent_40%)]" />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm font-medium text-[#FF6B35]">Features</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything a New Zealand contractor needs from measurement to invoice.
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              From the first measurement to the final invoice, QuoteCore+ keeps every step of the quoting process in one place. Explore the features that make it work.
            </p>
          </div>
        </section>

        <NzContextPanel
          title="A quoting workflow grounded in New Zealand trade work"
          intro="QuoteCore+ keeps measurements, pricing, approvals, material orders and invoices connected while giving New Zealand contractors the local context their jobs require."
          items={[
            { title: "NZD and GST", description: "Build prices in New Zealand dollars and carry the right GST treatment through quotes and invoices." },
            { title: "Metric by default", description: "Work with metres, millimetres, square metres and the measurement types used on New Zealand jobs." },
            { title: "One connected workflow", description: "Move from takeoff to quote, approval, supplier-ready order and invoice without re-entering the same job data." },
          ]}
        />

        {/* Feature cards */}
        <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:bg-orange-50/40 hover:shadow-[0_0_8px_rgba(255,107,53,0.08)]"
              >
                <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
                <p className="mt-4 text-sm font-medium text-[#BD4A1A] group-hover:text-[#FF6B35]">
                  Learn more
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature table */}
        <section className="mx-auto max-w-5xl px-6 pb-16 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight">What each feature does</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600">Five connected tools that take you from plan to payment.</p>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Feature</th>
                  <th className="px-5 py-3 font-semibold">What it does</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-orange-50/40"><td className="px-5 py-3 font-medium text-slate-900">Digital Roof Takeoff</td><td className="px-5 py-3 text-slate-600">Upload plans, measure roof geometry, and calculate areas automatically</td></tr>
                <tr className="hover:bg-orange-50/40"><td className="px-5 py-3 font-medium text-slate-900">Smart Components™</td><td className="px-5 py-3 text-slate-600">Store reusable pricing and quantity rules so every quote is consistent</td></tr>
                <tr className="hover:bg-orange-50/40"><td className="px-5 py-3 font-medium text-slate-900">Material Ordering</td><td className="px-5 py-3 text-slate-600">Turn quote line items into supplier-ready orders in one click</td></tr>
                <tr className="hover:bg-orange-50/40"><td className="px-5 py-3 font-medium text-slate-900">Invoicing</td><td className="px-5 py-3 text-slate-600">Convert accepted quotes into invoices with payment instructions</td></tr>
                <tr className="hover:bg-orange-50/40"><td className="px-5 py-3 font-medium text-slate-900">Supplier Resources</td><td className="px-5 py-3 text-slate-600">Import supplier catalogues and build component libraries from CSV</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B35] mb-2">Who it&apos;s for</p>
            <p className="text-base text-slate-700">NZ roofers and roofing estimators come first. QuoteCore+ was built around the pitches, angles and measurements roofing demands. Construction, cladding, fencing and landscaping trades use it too - Smart Components™ adapt to any trade that measures and quotes.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Try all features free for 14 days</h2>
            <p className="mt-2 text-zinc-600">No credit card required. Full access to every feature.</p>
            <a
              href="/free-trial"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E55A28]"
            >
              Start free trial
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
