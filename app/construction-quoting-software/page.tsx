import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { breadcrumbSchema, jsonLd, pricingOffers, site } from "@/lib/seo";
import { hreflangLanguages } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Construction Quoting Software for Trades That Quote From Measurements | QuoteCore+",
  description:
    "Construction quoting software for trades that measure, price, and quote jobs. Turn site measurements into professional quotes faster - no spreadsheets, no reformatting, no re-entering data.",
  alternates: {
    canonical: "https://www.quote-core.co.nz/construction-quoting-software",
    languages: hreflangLanguages("/construction-quoting-software"),
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": `${site.url}/#software`,
  name: "QuoteCore+",
  url: `${site.url}/construction-quoting-software`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Contractor quoting software",
  operatingSystem: "Web",
  description:
    "Construction quoting software built for trades that measure, price, and quote jobs. Turn site measurements into professional quotes faster - no spreadsheets, no reformatting.",
  offers: pricingOffers,
  creator: {
    "@id": `${site.url}/#organization`,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to quote a construction job with QuoteCore+",
  step: [
    {
      "@type": "HowToStep",
      name: "Measure once",
      text: "Upload a plan and measure directly from it. Lengths, areas, components - all routed straight into your pricing. No re-entry.",
    },
    {
      "@type": "HowToStep",
      name: "Price automatically",
      text: "Set up your rates, components, margins and pricing rules once with Smart Components™. QuoteCore+ applies that knowledge to future quotes so you are not rebuilding the same job logic every time.",
    },
    {
      "@type": "HowToStep",
      name: "Professional output",
      text: "A client-ready quote is generated automatically. No reformatting in Word. No manual layout. Just review and send.",
    },
    {
      "@type": "HowToStep",
      name: "Track acceptances",
      text: "Know the moment a quote is accepted or declined - by email and in your account.",
    },
    {
      "@type": "HowToStep",
      name: "Order materials from the quote",
      text: "Accepted quote becomes a materials order. No copying numbers from one document to another.",
    },
    {
      "@type": "HowToStep",
      name: "One place for job details",
      text: "Measurements, quotes, approvals, orders - all connected. No more hunting across emails, folders, and notebooks.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What trades can use QuoteCore+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any construction trade that measures and quotes jobs. Roofing, cladding, flooring, fencing, landscaping, decking, general building, exterior works, renovation - if your workflow involves site measurements, plans, pricing, and quotes, QuoteCore+ is built for you.",
      },
    },
    {
      "@type": "Question",
      name: "Is it only for roofing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. QuoteCore+ started in roofing - that's where our founder's experience comes from - but it works across construction trades. Roofing is the origin. Construction is the market.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most contractors set up their pricing and quote their first job in the same session. The time investment is hours, not days.",
      },
    },
    {
      "@type": "Question",
      name: "Can I try it before paying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. 14-day free trial, no credit card required. Full access from day one.",
      },
    },
    {
      "@type": "Question",
      name: "Who do I contact with questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email info@quote-core.com or book a free 15-minute call with Shaun, who leads the team behind QuoteCore+, at calendly.com/quote-core-info/15-minute-meeting.",
      },
    },
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Construction Quoting Software", path: "/construction-quoting-software" },
]);

const steps = [
  {
    number: "01",
    title: "Measure once",
    body: "Upload a plan and measure directly from it. Lengths, areas, components - all routed straight into your pricing. No re-entry.",
  },
  {
    number: "02",
    title: "Price automatically",
    body: "Set up your rates, components, margins and pricing rules once with Smart Components™. QuoteCore+ applies that knowledge to future quotes so you are not rebuilding the same job logic every time.",
  },
  {
    number: "03",
    title: "Professional output",
    body: "A client-ready quote is generated automatically. No reformatting in Word. No manual layout. Just review and send.",
  },
  {
    number: "04",
    title: "Track acceptances",
    body: "Know the moment a quote is accepted or declined - by email and in your account. Everything logged, nothing lost.",
  },
  {
    number: "05",
    title: "Order materials from the quote",
    body: "Accepted quote becomes a materials order. No copying numbers from one document to another.",
  },
  {
    number: "06",
    title: "One place for job details",
    body: "Measurements, quotes, approvals, orders - all connected. No more hunting across emails, folders, and notebooks.",
  },
];

const faqs = [
  {
    q: "What trades can use QuoteCore+?",
    a: "Any construction trade that measures and quotes jobs. Roofing, cladding, flooring, fencing, landscaping, decking, general building, exterior works, renovation - if your workflow involves site measurements, plans, pricing, and quotes, QuoteCore+ is built for you.",
  },
  {
    q: "Is it only for roofing?",
    a: "No. QuoteCore+ started in roofing - that's where our founder's experience comes from - but it works across construction trades. Roofing is the origin. Construction is the market.",
  },
  {
    q: "How long does setup take?",
    a: "Most contractors set up their pricing and quote their first job in the same session. The time investment is hours, not days.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes. 14-day free trial, no credit card required. Full access from day one.",
  },
  {
    q: "Who do I contact with questions?",
    a: "contact-link",
  },
];

export default function ConstructionQuotingSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(softwareSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumb)}
      />

      <main className="min-h-screen bg-white text-zinc-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/60 bg-white/68 shadow-[0_8px_30px_rgba(255,255,255,0.25)_inset,0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-[24px]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a href="/" className="flex items-center gap-3">
              <img src="/MainQCP.png" alt="QuoteCore+" className="h-10 w-auto" />
            </a>
            <nav className="hidden items-center gap-3 md:flex">
            </nav>
            <a
              href="/free-trial"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85d2b]"
            >
              Start free trial
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,53,0.10),transparent_34%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Construction Quoting Software</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Construction quoting software for trades that quote from measurements
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 sm:text-xl">
              Stop rebuilding quotes from scratch. If you&apos;re still measuring on site, copying numbers into a spreadsheet, formatting a Word document, and sending it off - you&apos;re doing it the hard way.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
              QuoteCore+ is quoting software built for construction businesses that need to turn measurements into professional quotes faster. Built from real{" "}
              <a href="/roofing-quoting-software" className="text-[#FF6B35] hover:underline">roofing</a>{" "}
              experience. Designed for any trade.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/free-trial"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6B35] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e85d2b]"
              >
                Start free 14-day trial - no card required
              </a>
            </div>
            <p className="mt-3 text-sm text-zinc-400">No credit card required. 14 days free.</p>
          </div>
        </section>

        {/* Problem section */}
        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            The problem with how most construction businesses quote
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            The process hasn&apos;t changed in years.
          </p>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Measure on site. Write it up from memory, photos, and notes. Transfer the numbers into a spreadsheet. Format it into something that looks professional enough to send. Then hope you got it out before someone else did.
          </p>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            <a href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Harvard Business Review</a> found that contractors who respond within an hour are 7x more likely to win the job. Every hour between site visit and sent quote is a risk.
          </p>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            And it&apos;s not just speed. It&apos;s errors. Measurements copied wrong. Prices that weren&apos;t updated. Materials orders built from scratch because nothing connects to anything else.
          </p>
          <p className="mt-5 text-lg font-semibold text-zinc-950">
            QuoteCore+ fixes the process, not just the output.
          </p>
        </section>

        {/* What QuoteCore+ does - HowTo */}
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl">What QuoteCore+ does</h2>
            <div className="mt-12 flex flex-col gap-5">
              {steps.map((s) => (
                <div key={s.number} className="pill-shimmer rounded-[2rem] border border-zinc-200 bg-white px-7 py-6 shadow-sm">
                  <div className="flex items-start gap-6">
                    <span className="w-12 shrink-0 text-2xl font-semibold text-zinc-950">{s.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{s.title}</h3>
                      <p className="mt-3 text-zinc-600">{s.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Components™ */}
        <section id="smart-components" className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Smart Components™</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Your quoting knowledge, saved properly.</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Most construction businesses already know how they price jobs. The problem is that knowledge is scattered across spreadsheets, old quotes, memory, photos, folders and notes.
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Smart Components™ give that knowledge a proper home.
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Save materials, labour, waste allowances, measurements, drawings, images, calculations and pricing rules once - then reuse them across future quotes.
            </p>
            <p className="mt-6 text-base font-semibold text-zinc-950">Make them once. Reuse them in seconds.</p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Who it&apos;s for</h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            QuoteCore+ works for any construction trade that:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Measures jobs on site or from plans",
              "Builds quotes manually - spreadsheets, Word docs, memory",
              "Loses time between site visit and sent quote",
              "Re-enters the same data multiple times",
              "Needs quotes to look professional without spending time on formatting",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-zinc-700">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF6B35]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8">
            <h3 className="text-xl font-semibold text-zinc-950">Trades who can use QuoteCore+</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Roofing", "Plumbing", "Electrical", "Carpentry", "General builders", "Cladding", "Flooring", "Fencing", "Landscaping", "Decking", "Exterior works", "Renovation trades"].map((trade) => (
                <span key={trade} className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-600">{trade}</span>
              ))}
            </div>
            <p className="mt-5 text-base font-medium text-zinc-800">
              If your job starts with measurements and ends with a quote, QuoteCore+ can probably save you hours.
            </p>
          </div>
        </section>

        {/* Founder section */}
        <section className="bg-[#FF6B35]/5 py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
              <div className="p-10">
                <div className="mb-6 flex items-center gap-4">
                  <img src="/shaun-smiling.jpg" alt="Shaun" className="h-14 w-14 rounded-full object-cover border-2 border-[#FF6B35]/20 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-950">Shaun</p>
                    <p className="text-sm text-[#FF6B35]">Founder and construction lead, QuoteCore+</p>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-zinc-950">Built from inside the industry</h2>
                <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-600">
                  <p>
                    QuoteCore+ is led by Shaun - a construction professional with 12+ years on sites, managing projects, and running operations - and built by a dedicated product and development team.
                  </p>
                  <p>
                    He spent years dealing with the same quoting mess most trades still deal with. Measuring jobs, copying numbers, building quotes manually, ordering materials, tracking approvals.
                  </p>
                  <p>
                    He couldn&apos;t find software that understood how construction workflows actually work, so the QuoteCore+ team built the platform around that gap.
                  </p>
                  <p>
                    QuoteCore+ started with <a href="/roofing-quoting-software" className="text-[#FF6B35] hover:underline">roofing</a> because that was the problem Shaun knew best. But the system solves a wider problem - for any trade that needs to turn measurements into professional quotes faster.
                  </p>
                  <p className="font-medium text-zinc-800 italic">
                    &ldquo;I lived the quoting problem for years. The team built QuoteCore+ to clean up the workflow from measurement to getting paid.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl">Common questions</h2>
            <div className="mt-10 space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-[1.5rem] border border-zinc-200 bg-white px-6 py-5">
                  <p className="font-semibold text-zinc-950">{f.q}</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {f.a === "contact-link" ? (
                      <>Email <a href="mailto:info@quote-core.com" className="text-[#FF6B35] hover:underline">info@quote-core.com</a> or book a free <a href="https://calendly.com/quote-core-info/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">15-minute call with Shaun, who leads the team behind QuoteCore+</a>.</>
                    ) : f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-5xl">Quote. Manage. Grow.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Stop losing time to spreadsheets and manual admin. QuoteCore+ puts your entire quoting workflow in one place - from measurement to send.
          </p>
          <a
            href="/free-trial"
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6B35] px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e85d2b]"
          >
            Start your free 14-day trial →
          </a>
          <p className="mt-4 text-sm text-zinc-400">No card required. 14 days free.</p>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>

      <style>{`
        .pill-shimmer { position: relative; overflow: hidden; }
        .pill-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(90deg, transparent 0%, transparent 40%, #ff6b35 50%, transparent 60%, transparent 100%);
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
        .pill-shimmer:hover::before { opacity: 1; animation: shimmerBorder 1.5s linear infinite; }
        @keyframes shimmerBorder {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}
