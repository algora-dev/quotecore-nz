import type { Metadata } from "next";
import { NzFooter, NzHeader } from "@/components/NzSite";
import { canonical, nzMarket } from "@/lib/nz";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | QuoteCore+ NZ",
  description: "How QuoteCore+ NZ collects, uses, stores, and protects personal information and uploaded quote files.",
  alternates: { canonical: canonical("/privacy") },
};

const schema = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main className="min-h-screen bg-white text-zinc-950">
        <NzHeader />
        <article className="prose prose-zinc mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h1>Privacy Policy</h1>
        <p>Effective date: 22 June 2026</p>
        <p>
          This Privacy Policy explains how QuoteCore+ handles personal information when you visit <strong>quote-core.co.nz</strong>,
          contact us, upload quote review files, start a free trial, or use the QuoteCore+ service.
        </p>
        <h2>Who we are</h2>
        <p>QuoteCore+ is operated by T3 Play Limited in New Zealand. Contact: <a href={`mailto:${nzMarket.email}`}>{nzMarket.email}</a>.</p>
        <h2>Information we collect</h2>
        <ul>
          <li>Contact details such as name, email address, business name, trade, and messages you send us.</li>
          <li>Account and service data such as login details, quote records, job records, customer records, and usage logs.</li>
          <li>Billing information handled by our payment provider. We do not store full card details.</li>
          <li>Uploaded quote review files, including old quotes, spreadsheets, PDFs, plans, materials lists, notes, and screenshots.</li>
          <li>Website analytics and cookie data where you consent to optional analytics or marketing cookies.</li>
        </ul>
        <h2>How we use uploaded quote files</h2>
        <p>
          If you send files for a free quote review, we use them only to understand your quoting workflow and show how the
          same job could work inside QuoteCore+. You can remove customer names, addresses, and private pricing before
          sending files. We do not publish uploaded files or use them in testimonials without permission.
        </p>
        <h2>Why we use information</h2>
        <ul>
          <li>To run the website and QuoteCore+ service.</li>
          <li>To respond to enquiries, trial requests, quote review requests, and support messages.</li>
          <li>To provide the quoting workflow, store your quote and job data, and process subscriptions.</li>
          <li>To keep the service secure, diagnose issues, and improve the product.</li>
          <li>To measure website performance and marketing where you have consented.</li>
          <li>To meet legal, tax, accounting, and record-keeping obligations.</li>
        </ul>
        <h2>Third-party processors</h2>
        <p>
          We may use service providers including Vercel for hosting, Supabase for database and storage, Stripe for
          payments, email delivery providers for transactional email, and analytics or advertising tools such as Google
          Analytics, Microsoft Clarity, Meta Pixel, or LinkedIn Insight Tag where enabled with consent.
        </p>
        <h2>Storage and retention</h2>
        <p>
          Account and service data is retained while your account is active and for a limited period after closure so you
          can export data. Billing records may be kept for the period required by tax and accounting law. Quote review
          files are retained only as long as needed to complete the review unless you become a customer and ask us to use
          them for setup.
        </p>
        <h2>Your rights</h2>
        <p>
          Under New Zealand privacy law, you can ask to access or correct personal information we hold about you. You can
          also ask us to delete information where we no longer need it, subject to legal retention obligations. Email
          <a href={`mailto:${nzMarket.email}`}> {nzMarket.email}</a>.
        </p>
        <h2>Cookies</h2>
        <p>Optional analytics and marketing cookies are controlled through the cookie banner. See the <a href="/cookie-policy">Cookie Policy</a>.</p>
        <h2>Contact</h2>
        <p>Privacy questions or rights requests: <a href={`mailto:${nzMarket.email}`}>{nzMarket.email}</a>.</p>
      </article>
        <NzFooter />
      </main>
    </>
  );
}
