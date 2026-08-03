import type { Metadata } from "next";
import { hreflangLanguages } from "@/lib/seo/hreflang";

export const metadata: Metadata = {
  title: "Contact QuoteCore+ NZ | Roofing Quoting Software",
  description: "Get in touch with the QuoteCore+ team in New Zealand. We respond within 24 hours - no jargon, no pressure.",
  alternates: {
    canonical: "https://www.quote-core.co.nz/contact",
    languages: hreflangLanguages("/contact"),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
