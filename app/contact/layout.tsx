import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | QuoteCore+ NZ",
  description: "Get in touch with the QuoteCore+ team. Ask a question, book a call, or send a message - we reply within 24 hours.",
  alternates: { canonical: "https://www.quote-core.co.nz/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
