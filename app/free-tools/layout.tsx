import type { ReactNode } from 'react';
import { TOOLS } from './tools-data';
import { site } from '@/lib/seo';

const NZ_URL = site.url;

export const metadata = {
  title: 'Free Tools for Kiwi Trades - Calculators, Generators & Takeoff | QuoteCore+ NZ',
  description:
    'Free professional trade tools for New Zealand: roof takeoff builder, roofing calculators, quote generator, invoice generator, and purchase order generator. NZD pricing, GST included. No signup required.',
  alternates: {
    canonical: `${NZ_URL}/free-tools`,
    languages: {
      'en-NZ': `${NZ_URL}/free-tools`,
      en: `https://quote-core.com/free-tools`,
      'x-default': `https://quote-core.com/free-tools`,
    },
  },
  openGraph: {
    title: 'Free Tools for Kiwi Trades - Calculators, Generators & Takeoff',
    description:
      'Free professional trade tools for New Zealand: roof takeoff builder, roofing calculators, quote generator, and more. NZD pricing, GST included. No signup required.',
    url: `${NZ_URL}/free-tools`,
    type: 'website',
    locale: 'en_NZ',
    images: [{ url: '/MainQCP.png', alt: 'QuoteCore+ NZ Free Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools for Kiwi Trades - Calculators, Generators & More',
    description: 'Free professional trade tools for New Zealand. NZD pricing, GST included. No signup required.',
    images: ['/MainQCP.png'],
  },
};

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Trade Tools for New Zealand',
  description: `Free professional trade tools for New Zealand including ${TOOLS.length} calculators, generators, and a roof takeoff builder.`,
  itemListElement: TOOLS.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tool.name,
    url: `${NZ_URL}/${tool.slug}`,
  })),
};

const webApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QuoteCore+ Free Tools',
  url: `${NZ_URL}/free-tools`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'NZD',
  },
};

export default function FreeToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationLd) }} />
      {children}
    </>
  );
}
