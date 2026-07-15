import type { Metadata } from "next";
import { hreflangLanguages } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.quote-core.co.nz/contact",
    languages: hreflangLanguages("/contact"),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
