import type { ReactNode } from 'react';
import { site } from '@/lib/seo';

const NZ_URL = site.url;

export const metadata = {
  title: 'Free Roof Takeoff Builder - Calculate Roof Materials | QuoteCore+ NZ',
  description:
    'Free roofing takeoff tool for NZ trades. Input roof areas, hips, valleys, ridges, barges and spouting with pitch calculations. Get total lengths and areas for your entire roof. NZD pricing, GST included.',
  alternates: {
    canonical: `${NZ_URL}/free-roofing-takeoff-builder`,
    languages: {
      'en-NZ': `${NZ_URL}/free-roofing-takeoff-builder`,
      en: `https://quote-core.com/free-roofing-takeoff-builder`,
      'x-default': `https://quote-core.com/free-roofing-takeoff-builder`,
    },
  },
  openGraph: {
    title: 'Free Roof Takeoff Builder - Calculate Roof Materials | NZ',
    description:
      'Free roofing takeoff tool for NZ trades. Input measurements with pitch calculations for all roof components. NZD pricing, GST included. No signup required.',
    url: `${NZ_URL}/free-roofing-takeoff-builder`,
    type: 'website',
    locale: 'en_NZ',
    images: [{ url: '/MainQCP.png', alt: 'Free Roof Takeoff Builder NZ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Roof Takeoff Builder - Calculate Roof Materials | NZ',
    description:
      'Free roofing takeoff tool for NZ trades. Input measurements with pitch calculations for all roof components. NZD pricing, GST included. No signup required.',
    images: ['/MainQCP.png'],
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Roof Takeoff Builder (NZ)',
  description: 'Free roofing takeoff tool for New Zealand trades. Input roof areas, hips, valleys, ridges, barges and spouting with pitch calculations. NZD pricing, GST included.',
  applicationCategory: 'CalculatorApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' },
  url: `${NZ_URL}/free-roofing-takeoff-builder`,
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Free Tools', item: `${NZ_URL}/free-tools` },
    { '@type': 'ListItem', position: 2, name: 'Roof Takeoff Builder', item: `${NZ_URL}/free-roofing-takeoff-builder` },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a roof takeoff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A roof takeoff is a complete list of all materials and measurements needed for a roofing project, including roof area, ridge lengths, hip lengths, valley lengths, barge lengths, spouting lengths, and any custom components.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the roof takeoff builder free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the QuoteCore+ roof takeoff builder is completely free. No signup or account required. Enter your measurements and get instant results with NZD pricing and GST included.',
      },
    },
    {
      '@type': 'Question',
      name: 'What measurements does the takeoff builder calculate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The takeoff builder calculates roof area, ridge lengths, hip lengths, valley lengths, barge lengths, spouting lengths, and supports custom components. All with pitch calculations included. Designed for NZ long-run, corrugated, and tile roofs.',
      },
    },
  ],
};

export default function RoofTakeoffBuilderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: 'button:not(:disabled){cursor:pointer}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
    </>
  );
}
