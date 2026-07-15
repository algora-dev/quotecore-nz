import type { Metadata } from "next";
import ManageCookiesButton from "@/components/ManageCookiesButton";
import OpenCookiePrefButton from "@/components/OpenCookiePrefButton";
import { NzFooter, NzHeader } from "@/components/NzSite";
import { canonical, nzMarket } from "@/lib/nz";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";
import { hreflangLanguages } from "@/lib/hreflang";

export const metadata: Metadata = {
  title: "Cookie Policy | QuoteCore+ NZ",
  description: "How QuoteCore+ NZ uses necessary, analytics, and marketing cookies on quote-core.co.nz.",
  alternates: { canonical: canonical("/cookie-policy"), languages: hreflangLanguages("/cookie-policy") },
};

const schema = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Cookie Policy", path: "/cookie-policy" },
]);

export default function CookiePolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main className="min-h-screen bg-white text-zinc-950">
        <NzHeader />
        <article className="mx-auto max-w-3xl px-6 py-20 leading-7 text-zinc-700 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Cookie Policy</h1>
        <p className="mt-3 text-sm text-zinc-500">Last updated: 22 June 2026</p>
        <div className="mt-6"><ManageCookiesButton /></div>
        <p className="mt-10">
          QuoteCore+ uses cookies and similar technologies on <strong>quote-core.co.nz</strong>. Some cookies are needed
          for the website to work. Optional analytics and marketing cookies are only used where you consent.
        </p>
        <h2 className="mt-10 text-xl font-semibold text-zinc-950">Types of cookies</h2>
        <div className="mt-5 space-y-5">
          {[
            ["Strictly necessary", "Used for security, page loading, forms, account access, and remembering cookie preferences."],
            ["Analytics", "Used to understand pages visited, device type, approximate location, clicks, and site performance. Tools may include Google Analytics 4 and Microsoft Clarity."],
            ["Marketing", "Used to measure advertising performance where enabled. Tools may include Meta Pixel, LinkedIn Insight Tag, and Google advertising tags."],
          ].map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="font-semibold text-zinc-950">{title}</h3>
              <p className="mt-2 text-sm leading-6">{body}</p>
            </section>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-semibold text-zinc-950">Managing cookies</h2>
        <p className="mt-4">
          You can change optional cookie choices at any time using the <OpenCookiePrefButton /> link or through your
          browser settings. If you reject optional cookies, the website will still work.
        </p>
        <h2 className="mt-10 text-xl font-semibold text-zinc-950">Contact</h2>
        <p className="mt-4">Questions about cookies: <a className="underline" href={`mailto:${nzMarket.email}`}>{nzMarket.email}</a>.</p>
      </article>
        <NzFooter />
      </main>
    </>
  );
}
