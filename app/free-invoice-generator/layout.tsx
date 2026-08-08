import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = 'https://www.quote-core.co.nz';

export const metadata: Metadata = {
  title: 'Free Invoice Generator | quote-core.co.nz',
  description:
    'Free online invoice generator for NZ trades. Create professional invoices with line items, GST, and payment terms. No signup - download as PDF.',
  openGraph: {
    title: 'Free Invoice Generator - Create Professional Invoices',
    description: 'Create professional invoices in minutes. NZD pricing, GST included. No signup required.',
    url: `${SITE_URL}/free-invoice-generator`,
    type: 'website',
    images: [{ url: '/og-image.png', alt: 'Free Invoice Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Generator - Create Professional Invoices',
    description: 'Create professional invoices in minutes. NZD pricing, GST included. No signup required.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/free-invoice-generator`,
    languages: {
      'en-NZ': `${SITE_URL}/free-invoice-generator`,
      'en': 'https://quote-core.com/free-invoice-generator',
      'x-default': 'https://quote-core.com/free-invoice-generator',
    },
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Invoice Generator',
  description: 'Free online invoice generator for NZ trades. Create professional invoices with line items, GST calculations, and payment terms. Download as PDF. No signup required.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' },
  url: `${SITE_URL}/free-invoice-generator`,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Free Tools', item: `${SITE_URL}/free-tools` },
    { '@type': 'ListItem', position: 2, name: 'Invoice Generator', item: `${SITE_URL}/free-invoice-generator` },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the invoice generator really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The quote-core.co.nz free invoice generator is completely free with no signup required. Create invoices and download as PDF. No watermark, no hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add GST to my invoice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The invoice generator supports GST and other tax rates. Set your GST rate (default 15%) and it calculates automatically on line items and totals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I pre-fill an invoice from a quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you created a free quote using the quote-core.co.nz quote generator, you can generate an invoice from it using URL parameters. The line items, pricing, and customer details carry over automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment details can I include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add your NZ bank account details, payment terms, due dates, and any payment instructions. The invoice template is designed for trade businesses.',
      },
    },
  ],
};

const faqs = [
  { q: 'Is the invoice generator really free?', a: 'Yes. Create invoices and download as PDF. No watermark, no hidden fees.' },
  { q: 'Can I add GST to my invoice?', a: 'Yes. Supports GST and other tax rates. Default 15% GST, calculates automatically.' },
  { q: 'Can I pre-fill an invoice from a quote?', a: 'Yes. Generate an invoice from your free quote using URL parameters. Line items, pricing, and customer details carry over.' },
  { q: 'What payment details can I include?', a: 'Add NZ bank account details, payment terms, due dates, and payment instructions. Designed for trade businesses.' },
];

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">About the Free Invoice Generator</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          The quote-core.co.nz free invoice generator helps Kiwi trades contractors create professional invoices in minutes.
          Add line items with quantities and rates, apply GST, include payment terms and NZ bank details, and download as PDF.
          No signup required. Built for New Zealand trades.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">What you can do</h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>Itemised invoices with quantities and rates</li>
              <li>AI-assisted invoicing from photos or text</li>
              <li>Add your branding and NZ bank details</li>
              <li>GST calculations (default 15%)</li>
              <li>Download as professional PDF</li>
              <li>Pre-fill from a quote via URL</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Related tools</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/free-quote-generator" className="text-[#BD4A1A] hover:text-[#BD4A1A]">Free Quote Generator</Link></li>
              <li><Link href="/free-purchase-order-generator" className="text-[#BD4A1A] hover:text-[#BD4A1A]">Free Purchase Order Generator</Link></li>
              <li><Link href="/free-roofing-calculator" className="text-[#BD4A1A] hover:text-[#BD4A1A]">Roofing Calculator</Link></li>
              <li><Link href="/free-roofing-takeoff-builder" className="text-[#BD4A1A] hover:text-[#BD4A1A]">Roof Takeoff Builder</Link></li>
              <li><Link href="/free-tools" className="text-[#BD4A1A] hover:text-[#BD4A1A]">All Free Tools</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h4 className="text-sm font-medium text-slate-900">{faq.q}</h4>
                <p className="text-sm text-slate-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
