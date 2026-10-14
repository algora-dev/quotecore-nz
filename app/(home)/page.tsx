import type { Metadata } from 'next';
import MarketingHomepage from '@/components/marketing/home/Homepage';
import { homepageFaqs } from '@/components/marketing/home/homepage-content';
import { homepageConfig, homepageVideoSchema } from '@/components/marketing/home/homepage-config';
import { hreflangLanguages } from '@/lib/seo/hreflang';
import { buildBreadcrumbSchema, buildFaqSchema, buildSoftwareApplicationSchema, siteUrl } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Long-Run Roofing Quoting Software NZ | QuoteCore+',
  description:
    'QuoteCore+ is quoting software built for New Zealand roofing and construction. Measure long-run roofs, price in NZD with GST, send quotes, order materials and invoice, all in one place.',
  alternates: {
    canonical: `${siteUrl}/`,
    languages: hreflangLanguages('/'),
  },
  openGraph: {
    title: 'Roofing Quoting Software for New Zealand | QuoteCore+',
    description: 'Measure long-run roofs, price in NZD with GST, quote, order materials and invoice. Built for New Zealand roofing first.',
    url: `${siteUrl}/`,
    siteName: 'QuoteCore+',
    type: 'website',
    locale: 'en_NZ',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'QuoteCore+ roofing and construction quoting software for New Zealand' }],
  },
};

const faqSchema = buildFaqSchema(homepageFaqs);
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: `${siteUrl}/` },
]);
const softwareSchema = {
  '@context': 'https://schema.org',
  ...buildSoftwareApplicationSchema(),
};
const videoSchema = homepageVideoSchema(homepageConfig);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {videoSchema ? <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema).replace(/</g, '\\u003c') }}
      /> : null}
      <MarketingHomepage />
    </>
  );
}
