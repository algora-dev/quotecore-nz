import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AttributionTracker from "@/components/AttributionTracker";
import CookieConsent from "@/components/CookieConsent";
import BrandFormatter from "@/components/BrandFormatter";
import SiteAssistant from "@/components/SiteAssistant";
import { homepageSchema, jsonLd, site } from "@/lib/seo";
import { PillShimmerScript } from "./components/PillShimmerScript";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Kill switch: Q (SiteAssistant) is disabled site-wide while its knowledge base
// is updated (owner, 2026-10-17). Flip to true to re-enable everywhere.
const SITE_ASSISTANT_ENABLED = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteCore+ NZ | Contractor Quoting Software for Kiwi Trades",
  description:
    "QuoteCore+ is contractor quoting software for New Zealand trades that work from measurements. Measure jobs, build priced quotes, track approvals, order materials, manage work, invoice and get paid.",
  metadataBase: new URL(site.url),
  alternates: {
    canonical: `${site.url}/`,
  },
  openGraph: {
    title: "QuoteCore+ NZ | Contractor Quoting Software for Kiwi Trades",
    description: "Contractor quoting software for New Zealand trades that work from measurements.",
    url: `${site.url}/`,
    siteName: "QuoteCore+",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteCore+ NZ | Contractor Quoting Software for Kiwi Trades",
    description: "Measure, quote, order, manage, invoice and get paid in one connected workflow.",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Vercel previews/test deployments must not pollute acquisition data. Keep
  // this compile-time so the NZ marketing site remains statically renderable.
  const analyticsOn = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yjvmsx2huf";

  return (
    <html
      lang="en-NZ"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <BrandFormatter />
        {SITE_ASSISTANT_ENABLED && <SiteAssistant />}
        <PillShimmerScript />
        {analyticsOn && <>
          <Analytics />
          <AttributionTracker />
          <CookieConsent clarityProjectId={clarityProjectId} />
          {/* Production-only GA4. Consent Mode defaults to denied; Clarity,
              Meta and LinkedIn are loaded by CookieConsent after opt-in. */}
          <Script id="ga4-consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              var qcAnalytics = false;
              var qcMarketing = false;
              try {
                var qcMatch = document.cookie.split(';').map(function(v){ return v.trim(); }).find(function(v){ return v.indexOf('qc_cookie_consent=') === 0; });
                if (qcMatch) {
                  var qcPrefs = JSON.parse(decodeURIComponent(qcMatch.slice('qc_cookie_consent='.length)));
                  qcAnalytics = qcPrefs && qcPrefs.analytics === true;
                  qcMarketing = qcPrefs && qcPrefs.marketing === true;
                }
              } catch (e) {}
              gtag('consent', 'default', {
                analytics_storage: qcAnalytics ? 'granted' : 'denied',
                ad_storage: qcMarketing ? 'granted' : 'denied',
                ad_user_data: qcMarketing ? 'granted' : 'denied',
                ad_personalization: qcMarketing ? 'granted' : 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-HV8F4G8BN1"
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              gtag('set', 'linker', { domains: ['quote-core.co.nz', 'quote-core.com'] });
              gtag('js', new Date());
              gtag('config', 'G-HV8F4G8BN1');
            `}
          </Script>
        </>}
        <Script
          id="combined-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(homepageSchema)}
        />

      </body>
    </html>
  );
}
