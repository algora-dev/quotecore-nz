import type { Metadata } from "next";
import { NzFooter, NzHeader } from "@/components/NzSite";
import { canonical, nzMarket } from "@/lib/nz";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions | QuoteCore+ NZ",
  description: "Terms governing access to QuoteCore+ NZ, free trials, subscriptions, quote review uploads, and use of the service.",
  alternates: { canonical: canonical("/terms") },
};

const schema = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Terms & Conditions", path: "/terms" },
]);

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main className="min-h-screen bg-white text-zinc-950">
        <NzHeader />
        <article className="prose prose-zinc mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h1>Terms &amp; Conditions</h1>
        <p>Effective date: 22 June 2026</p>
        <p>
          These Terms govern your use of quote-core.co.nz, the QuoteCore+ web application, free trials, paid
          subscriptions, contact forms, and quote review uploads. QuoteCore+ is operated by T3 Play Limited in New
          Zealand.
        </p>
        <h2>Service</h2>
        <p>
          QuoteCore+ is quoting software for tradies and contractors. It helps users measure from plans, price jobs,
          build quotes, track approvals, create materials orders, and keep job information connected.
        </p>
        <h2>Accounts and free trial</h2>
        <p>You must be at least 18 and authorised to act for the business you represent. The free trial lasts 14 days and does not require a card.</p>
        <h2>Paid subscriptions, currency, and GST</h2>
        <p>
          Paid plan prices are shown in the supported checkout currency at the time of purchase. NZD pricing and GST
          wording must match the live checkout configuration. Subscription renewals, cancellations, and refunds are
          handled according to the terms shown at checkout and any mandatory rights under New Zealand law.
        </p>
        <h2>Quote review uploads</h2>
        <p>
          If you upload or email an old quote, spreadsheet, PDF, plan, materials list, notes, or screenshots, you confirm
          you have the right to share that file with us. You should remove customer names, addresses, and private pricing
          if you do not want us to see them. We use uploaded files only to understand your workflow and show how
          QuoteCore+ could handle it.
        </p>
        <h2>Your data</h2>
        <p>You keep ownership of the data and files you upload or create. You grant us permission to store and process that data only to provide and support the service.</p>
        <h2>Acceptable use</h2>
        <p>
          Do not use QuoteCore+ unlawfully, attempt to access systems without permission, share credentials outside your
          organisation, upload malicious files, scrape the service, or misuse the platform in a way that harms other users.
        </p>
        <h2>Availability and changes</h2>
        <p>We may update features over time. We aim to keep the service available but cannot guarantee uninterrupted access.</p>
        <h2>Liability</h2>
        <p>
          To the maximum extent permitted by law, QuoteCore+ is provided as is. We are not liable for indirect losses,
          lost profits, lost revenue, or lost data arising from your use of the service. Nothing in these Terms limits
          rights that cannot be limited under New Zealand law.
        </p>
        <h2>Governing law</h2>
        <p>These Terms are governed by the laws of New Zealand. New Zealand courts have jurisdiction over disputes.</p>
        <h2>Contact</h2>
        <p>Questions: <a href={`mailto:${nzMarket.email}`}>{nzMarket.email}</a>.</p>
      </article>
        <NzFooter />
      </main>
    </>
  );
}
