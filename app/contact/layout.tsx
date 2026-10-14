import type { Metadata } from "next";
import { hreflangLanguages } from "@/lib/seo/hreflang";
import { buildBreadcrumbSchema, siteUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact QuoteCore+ New Zealand | Talk to Our Team",
  description:
    "Talk to the QuoteCore+ team about quoting software for New Zealand roofing and construction. Book a call or send us a message.",
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: hreflangLanguages("/contact"),
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: `${siteUrl}/` },
  { name: "Contact", url: `${siteUrl}/contact` },
]);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
