import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AttributionTracker from "@/components/AttributionTracker";
import CookieConsent from "@/components/CookieConsent";
import BrandFormatter from "@/components/BrandFormatter";
import SiteAssistant from "@/components/SiteAssistant";
import { homepageSchema, jsonLd, site } from "@/lib/seo";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteCore+ | Contractor Quoting Software for Trades",
  description:
    "QuoteCore+ is contractor quoting software for trades that work from measurements. Measure jobs, build priced quotes, track approvals, order materials, manage work, invoice and get paid.",
  metadataBase: new URL(site.url),
  alternates: {
    canonical: `${site.url}/`,
    languages: {
      en: `${site.url}/`,
      "en-GB": `${site.url}/`,
      "x-default": `${site.url}/`,
    },
  },
  openGraph: {
    title: "QuoteCore+ | Contractor Quoting Software for Trades",
    description: "Contractor quoting software for trades that work from measurements.",
    url: `${site.url}/`,
    siteName: "QuoteCore+",
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteCore+ | Contractor Quoting Software for Trades",
    description: "Measure, quote, order, manage, invoice and get paid in one connected workflow.",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <AttributionTracker />
        <CookieConsent />
        <BrandFormatter />
        <SiteAssistant />
        {/* Google Analytics 4 — loads gtag.js with Consent Mode default denied.
            Optional tracking scripts (Clarity, Meta Pixel, LinkedIn) are
            loaded conditionally by CookieConsent after user accepts. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HV8F4G8BN1"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('js', new Date());
            gtag('config', 'G-HV8F4G8BN1');
          `}
        </Script>
        <Script
          id="combined-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(homepageSchema)}
        />

      </body>
    </html>
  );
}
