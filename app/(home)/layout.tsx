import type { Metadata } from "next";
import { hreflangLanguages } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.quote-core.co.nz/",
    languages: hreflangLanguages("/"),
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
