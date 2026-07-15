import { nzMarket, nzNav } from "@/lib/nz";

export function NzHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/78 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-[24px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src="/MainQCP.png" alt="QuoteCore+" className="h-10 w-auto" />
          <span className="hidden rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#D9481E] sm:inline-flex">
            NZ
          </span>
        </a>
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-600 lg:flex">
          {nzNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-zinc-950"
              {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden min-h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-[#FF6B35]/50 sm:inline-flex"
          >
            Contact us
          </a>
          <a
            href={nzMarket.trialUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#BD4A1A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A03E15]"
          >
            Start free trial
          </a>
        </div>
      </div>
    </header>
  );
}

export function NzFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10 text-center text-sm text-zinc-500">
      <p className="mx-auto mb-4 max-w-2xl px-6 text-xs text-zinc-400">
        QuoteCore+ NZ is quoting software for Kiwi tradies and contractors who quote from plans, measurements,
        materials, labour, and repeatable job components.
      </p>
      <p>
        <a href="/pricing" className="hover:text-zinc-800">Pricing</a>
        {" · "}
        <a href="/free-trial" className="hover:text-zinc-800">Free Trial</a>
        {" · "}
        <a href="/contact" className="hover:text-zinc-800">Contact</a>
        {" · "}
        <a href="https://app.quote-core.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-800">Documentation</a>
        {" · "}
        <a href="/privacy" className="hover:text-zinc-800">Privacy</a>
        {" · "}
        <a href="/terms" className="hover:text-zinc-800">Terms</a>
        {" · "}
        <a href="/cookie-policy" className="hover:text-zinc-800">Cookies</a>
      </p>
      <p className="mt-3">© 2026 QuoteCore+</p>
      <p className="mt-1">
        Email <a href={`mailto:${nzMarket.email}`} className="hover:text-zinc-800">{nzMarket.email}</a>
      </p>
    </footer>
  );
}

export function CtaBand({
  title = "Send us one old quote",
  body = "Upload an old quote, spreadsheet, plan, or rough job notes. We will show how the same job could move through QuoteCore+ from measurement and pricing to quote approval, materials ordering, and invoice-ready job information.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-zinc-950 py-18 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF8A61]">Talk to us</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#BD4A1A] px-8 text-base font-semibold text-white hover:bg-[#A03E15]">
            Contact us
          </a>
          <a href={nzMarket.callUrl} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-medium text-white hover:bg-white/10">
            Book a 15-minute call
          </a>
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          You can remove customer names, addresses, and private pricing if you prefer.
        </p>
      </div>
    </section>
  );
}

export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 p-5 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D9481E]">Quick answer</p>
      <div className="mt-2 text-base leading-7 text-zinc-700">{children}</div>
    </div>
  );
}
