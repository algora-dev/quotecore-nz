import type { Metadata } from "next";
import OrangeCheck from "@/components/OrangeCheck";
import SiteFooter from "@/components/SiteFooter";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Roofing Quoting Software for Contractors | QuoteCore+",
  description:
    "QuoteCore+ is roofing quoting software built for contractors. Go from measurements to a client-ready quote in minutes - no spreadsheets, no double-handling.",
  alternates: {
    canonical: "https://quote-core.co.nz/roofing-quoting-software",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to quote a roofing job with QuoteCore+",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Quote request received",
      "text": "Upload a quality roof plan into the digital takeoff system and accurately measure roofs and components from your desk."
    },
    {
      "@type": "HowToStep",
      "name": "Build the quote",
      "text": "Convert measurements into a high quality, professional quote with full control over what the customer sees."
    },
    {
      "@type": "HowToStep",
      "name": "Track quote acceptances",
      "text": "Create quote acceptance links that alert you when a quote is accepted or declined - by email and in your QuoteCore+ account."
    },
    {
      "@type": "HowToStep",
      "name": "Order your materials",
      "text": "Create complete materials orders directly from your quote, including custom flashing images."
    },
    {
      "@type": "HowToStep",
      "name": "Everything in one place",
      "text": "From quote acceptance to materials orders, scheduling to completion invoices - all in one place."
    }
  ]
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Roofing Quoting Software", path: "/roofing-quoting-software" },
]);


const steps = [
  {
    number: "01",
    title: "Quote request received",
    body: "No more printing roof plans. Upload a quality roof plan into our digital takeoff system and accurately measure roofs and components from your desk.",
  },
  {
    number: "02",
    title: "Build the quote",
    body: "Convert your measurements into a high quality, professional quote. Full control and unlimited flexibility over what the customer sees.",
  },
  {
    number: "03",
    title: "Track quote acceptances",
    body: "Create quote acceptance links that alert you when a quote is accepted or declined - by email and in your QuoteCore+ account. Everything is logged, nothing lost in a pile of emails.",
  },
  {
    number: "04",
    title: "Order your materials",
    body: "Create complete materials orders directly from your quote - including custom flashing images you can draw and store in the flashings drawer.",
  },
  {
    number: "05",
    title: "Everything in one place",
    body: "From quote acceptance to materials orders, scheduling to completion invoices. One place for all of it. (Project manager mode coming soon)",
  },
];

const bullets = [
  "Digital takeoffs built for roofing - not adapted from another trade",
  "Smart Components™ with materials, labour, measurements, drawings, calculations and pricing rules",
  "Client-ready output that looks professional every time",
  "Full workflow from measurement to send - in one place",
];

const faqs = [
  {
    q: "What is roofing quoting software?",
    a: "Roofing quoting software helps contractors go from job measurements to a professional, priced quote without spreadsheets or manual calculation. QuoteCore+ combines digital takeoffs, pricing logic, and client-ready output in one workflow.",
  },
  {
    q: "How is QuoteCore+ different from generic quoting tools?",
    a: "Most quoting tools are built for trades in general - they don't understand roofing-specific workflows like takeoffs, hip and valley calculations, or material quantities by roof section. QuoteCore+ is built specifically for roofers.",
  },
  {
    q: "How long does it take to send a quote?",
    a: "Most contractors send their first quote within minutes of entering their measurements. The goal is to quote before you leave the driveway.",
  },
  {
    q: "Do I need to be tech-savvy to use it?",
    a: "No. QuoteCore+ is designed to be straightforward. If you can use a computer and email, you can use QuoteCore+.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You get 14 days free - no credit card required. You'll be quoting within minutes of signing up.",
  },
  {
    q: "Where is QuoteCore+ available?",
    a: "QuoteCore+ is a web-based platform. Sign up and start quoting from your desktop or laptop.",
  },
];

export default function RoofingQuotingSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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

        {/* Cross-trade notice */}
        <div className="bg-zinc-50 border-b border-zinc-200 py-3 px-6 text-center text-sm text-zinc-600">
          QuoteCore+ also works across cladding, flooring, fencing, landscaping, and other construction trades.{" "}
          <a href="/construction-quoting-software" className="font-medium text-[#FF6B35] hover:underline">See the full construction quoting software page →</a>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,53,0.10),transparent_34%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Roofing quoting software built for the way you work.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 sm:text-xl">
              From takeoff to a professional, priced quote in minutes - without the spreadsheets, the re-entry, or the back-and-forth.
            </p>
            <div className="mt-6 mx-auto max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B35] mb-2">Quick answer</p>
              <p className="text-sm leading-6 text-zinc-600">QuoteCore+ is roofing quoting software for contractors who quote from plans and want one connected workflow from digital takeoff to priced quote, customer approval, materials ordering, and job management. It may not be the right fit for roofers doing mostly reactive repair work or teams that mainly need mobile job dispatch.</p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="/free-trial"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6B35] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e85d2b]"
              >
                Start your free 14-day trial
              </a>
            </div>
            <p className="mt-3 text-sm text-zinc-400">No credit card required.</p>
          </div>
        </section>

        {/* Problem section */}
        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <p className="text-lg leading-8 text-zinc-700">
            Most roofers quote the same way they always have.
          </p>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Measure on site. Write it up by hand. Transfer it into a spreadsheet. Re-enter it into an email. Send it off and hope the numbers are right.
          </p>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            It works - until it doesn't. A mistake in the measurements. A price that changed. A quote that took three hours and lost to someone who replied in one.
          </p>
          <p className="mt-5 text-lg font-semibold text-zinc-950">
            QuoteCore+ was built to fix that.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl">One clean workflow. Takeoff to send.</h2>
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
        <section id="smart-components" className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B35]">Smart Components™</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Smart Components™ for roofing quotes</h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Roofing quotes repeat more than people think. Materials, labour, waste, pitch, angles, lengths, areas, flashing details and pricing rules all come back again and again.
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            With Smart Components™, you can save the way you price and build those parts of a job, then reuse them in future quotes without starting from scratch.
          </p>
          <p className="mt-6 text-base font-medium text-zinc-700">Use Smart Components™ for:</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Roof sections",
              "Flashings",
              "Labour rules",
              "Waste allowances",
              "Pitch and angle calculations",
              "Area and length calculations",
              "Drawings and images",
              "Materials and pricing logic",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                <OrangeCheck />
                {item}
              </li>
              ))}
          </ul>
          <p className="mt-8 text-base font-medium text-zinc-700">Make the component once. Reuse it whenever the same type of work comes up again.</p>
        </section>

        {/* Why QuoteCore+ */}
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Started in roofing. Works across construction trades.
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Most quoting tools are built for "trades" in general. They don't know the difference between a hip and a valley, and neither does your quote if you're using a generic template.
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            QuoteCore+ is built specifically for roofing workflows - takeoffs, pricing logic, material quantities, and client-ready output that makes sense to a homeowner and holds up to scrutiny.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-zinc-700">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF6B35]" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Who it's for */}
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-semibold sm:text-4xl">For solo operators and roofing teams.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold">Solo contractor</h3>
                <p className="mt-4 text-zinc-600">
                  You're quoting every job yourself. QuoteCore+ gets you from site to quote in minutes, not hours. No admin backlog. No late nights redoing spreadsheets.
                </p>
              </div>
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold">Roofing team</h3>
                <p className="mt-4 text-zinc-600">
                  Every quote goes out looking the same - priced consistently, formatted professionally, and not depending on whoever happens to be doing it that day.
                </p>
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
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-3xl font-semibold sm:text-5xl">Quote. Manage. Grow.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Stop losing time to spreadsheets and manual admin. QuoteCore+ puts your entire quoting workflow in one place - from takeoff to send.
          </p>
          <a
            href="/free-trial"
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF6B35] px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e85d2b]"
          >
            Start your free 14-day trial
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
