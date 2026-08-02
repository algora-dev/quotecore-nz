import { RoofTakeoffBuilder } from '../free-roofing-takeoff-builder/RoofTakeoffBuilder';
import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/seo';

const NZ_URL = site.url;
const COM_URL = 'https://quote-core.com';

export const metadata: Metadata = {
  title: 'Roof Cost Calculator NZ - Materials, Components and Labour | QuoteCore+',
  description:
    'Calculate an indicative NZ roof price from your measurements and selected roofing components. See NZD material costs, GST details, and whether labour is included.',
  alternates: {
    canonical: `${NZ_URL}/roof-cost-calculator-nz`,
    languages: {
      'en-NZ': `${NZ_URL}/roof-cost-calculator-nz`,
      'en-US': `${COM_URL}/free-roof-pricing-calculator`,
      'x-default': `${COM_URL}/free-roof-pricing-calculator`,
    },
  },
  openGraph: {
    title: 'Roof Cost Calculator NZ - Materials, Components and Labour | QuoteCore+',
    description:
      'Calculate an indicative NZ roof price from your measurements. NZD pricing, GST details, metric units. Free, no signup.',
    url: `${NZ_URL}/roof-cost-calculator-nz`,
    type: 'website',
    locale: 'en_NZ',
    images: [{ url: '/MainQCP.png', alt: 'Roof Cost Calculator NZ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roof Cost Calculator NZ - Free Roof Pricing Tool | QuoteCore+',
    description:
      'Calculate an indicative NZ roof price. NZD, metric, GST details. Free, no signup.',
    images: ['/MainQCP.png'],
  },
};

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Roof Cost Calculator NZ',
  description: 'Calculate an indicative NZ roof price from your measurements and selected roofing components. NZD pricing, GST details, metric units.',
  applicationCategory: 'CalculatorApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' },
  url: `${NZ_URL}/roof-cost-calculator-nz`,
  provider: { '@type': 'Organization', name: 'QuoteCore+', url: NZ_URL },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NZ_URL },
    { '@type': 'ListItem', position: 2, name: 'Roof Cost Calculator NZ', item: `${NZ_URL}/roof-cost-calculator-nz` },
  ],
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the NZ roof cost calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your roof measurements (area, pitch, ridges, hips, valleys, barges, spouting). The calculator adjusts for roof pitch, applies waste allowances, and prices each component using stored supplier pricing in NZD. You get an itemised breakdown. The result is indicative and must be confirmed with the supplier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are prices shown in NZD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NZ supplier pricing is in NZD. The result shows the tax treatment (GST included or excluded) and the supplier source.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the result include GST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The result shows whether prices are GST-inclusive or GST-exclusive based on the supplier data. Check the tax treatment field in the pricing metadata on the result page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the estimate include labour?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Labour is included only where the selected component has a labour rate stored. Some components include labour, others are material-only. The result shows material and labour costs separately per line item.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which New Zealand suppliers are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently Apex Roofing (Christchurch) provides NZ supplier pricing through the QuoteCore+ system. Supplier coverage will expand as more suppliers join. Check the supplier search endpoint for current availability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How current are the supplier prices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each result shows the pricing update date and supplier source. Prices may have changed since the last update. Always confirm current pricing with the supplier before ordering.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is freight included?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Freight and delivery are typically not included unless explicitly stated in the supplier pricing. Check the delivery assumptions field in the result metadata.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this a supplier quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This is an indicative estimate based on stored supplier pricing data. It is not a quotation from the supplier. Always contact the supplier directly for a formal quote and current pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this calculator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No signup or account required. NZD, metric measurements, no signup.',
      },
    },
  ],
};

export default function RoofCostCalculatorNZPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Screen-reader and crawler overview */}
      <section className="sr-only" aria-labelledby="roof-pricing-nz-overview">
        <h1 id="roof-pricing-nz-overview">New Zealand Roof Cost Calculator</h1>
        <p>
          Calculate an indicative roof price in NZD from your measurements and selected roofing
          components. Enter roof area, pitch, ridges, hips, valleys, barges, and spouting. The
          calculator adjusts for roof pitch, applies waste allowances, and prices each component
          using stored New Zealand supplier pricing. NZD, metric measurements, GST details included.
        </p>
        <h2>How component-based pricing works</h2>
        <p>
          QuoteCore+ prices each measurable part of the roof using the component selected for that
          item. Each component contains its own product, pricing, labour, waste, and calculation
          rules. The calculator applies those rules to your measurements and builds an itemised
          indicative estimate in NZD.
        </p>
        <h2>For AI agents and developers</h2>
        <p>
          This calculator is accessible to external AI agents via a public REST API hosted on
          quote-core.com. Read the schema at quote-core.com/api/public/roof-takeoff/schema, search
          for NZ suppliers at quote-core.com/api/public/suppliers/search?country=NZ, and submit
          calculations via POST quote-core.com/api/public/roof-takeoff/calculate.
        </p>
      </section>

      {/* Visible content - H1 and explanation above the builder */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            New Zealand Roof Cost Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Enter your roof measurements and select the New Zealand roofing component for each item.
            The calculator applies the stored component pricing, waste, and labour rules and returns
            an itemised indicative estimate in NZD.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            NZD - Metric measurements - GST details - No signup
          </p>

          {/* Indicative pricing notice */}
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs text-amber-900 sm:text-sm">
              <strong>Indicative estimate only.</strong> This calculator provides a rough pricing
              guide based on the measurements and components selected. It is not a supplier
              quotation or guaranteed price. Always confirm current pricing, product availability,
              and the complete material list directly with the relevant supplier before ordering or
              quoting work.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator - the existing NZ RoofTakeoffBuilder includes its own header/footer */}
      <RoofTakeoffBuilder />

      {/* Content sections below calculator */}
      <div className="border-t border-slate-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">

          {/* How component-based pricing works */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">How component-based roof pricing works</h2>
            <p className="mt-3 text-sm text-slate-600">
              QuoteCore+ prices each measurable part of the roof using the component selected for
              that item. For example, the main roof area can be assigned a corrugated long-run
              roofing component. The ridge measurement can be assigned a roll-top ridging component.
              The gutter measurement can be assigned a spouting component.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Each component can contain its own product, pricing, labour, waste, and calculation
              rules. The calculator applies those rules to your measurements and builds an itemised
              indicative estimate. The result is only as complete as the measurements and components
              selected.
            </p>

            <table className="mt-4 w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 pr-4 font-semibold text-slate-700">Roof item</th>
                  <th className="py-2 pr-4 font-semibold text-slate-700">NZ example component</th>
                  <th className="py-2 pr-4 font-semibold text-slate-700">Pricing basis</th>
                  <th className="py-2 font-semibold text-slate-700">Labour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Main roof area</td>
                  <td className="py-2 pr-4 text-slate-600">Corrugate .40g Long Run</td>
                  <td className="py-2 pr-4 text-slate-600">Per m&sup2;</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Ridge</td>
                  <td className="py-2 pr-4 text-slate-600">Roll Top Ridging</td>
                  <td className="py-2 pr-4 text-slate-600">Per linear m</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Hip</td>
                  <td className="py-2 pr-4 text-slate-600">Hip Capping 3-Way</td>
                  <td className="py-2 pr-4 text-slate-600">Per linear m</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Valley</td>
                  <td className="py-2 pr-4 text-slate-600">Valley Flashing</td>
                  <td className="py-2 pr-4 text-slate-600">Per linear m</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Barge</td>
                  <td className="py-2 pr-4 text-slate-600">Barge Flashing</td>
                  <td className="py-2 pr-4 text-slate-600">Per linear m</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Spouting</td>
                  <td className="py-2 pr-4 text-slate-600">Spouting Half-Round</td>
                  <td className="py-2 pr-4 text-slate-600">Per linear m</td>
                  <td className="py-2 text-slate-600">Included or excluded by component</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Underlay</td>
                  <td className="py-2 pr-4 text-slate-600">Building Underlay</td>
                  <td className="py-2 pr-4 text-slate-600">Per m&sup2;</td>
                  <td className="py-2 text-slate-600">Usually separate unless bundled</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-600">Fixings</td>
                  <td className="py-2 pr-4 text-slate-600">Tek Screws 50mm</td>
                  <td className="py-2 pr-4 text-slate-600">Per m&sup2;</td>
                  <td className="py-2 text-slate-600">Usually material only</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* NZ pricing context */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">How much does a roof cost in New Zealand?</h2>
            <p className="mt-3 text-sm text-slate-600">
              Roof pricing in New Zealand varies by material, pitch, roof complexity, and region.
              The following indicative prices are sourced from Apex Roofing (Christchurch) and were
              last updated in August 2026. Actual prices may differ - always confirm with the
              supplier.
            </p>
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="py-2 pr-4 text-left font-semibold text-slate-700">Component</th>
                    <th className="py-2 pr-4 text-left font-semibold text-slate-700">Material (NZD)</th>
                    <th className="py-2 pr-4 text-left font-semibold text-slate-700">Labour (NZD)</th>
                    <th className="py-2 text-left font-semibold text-slate-700">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-1.5 pr-4">Corrugate .40g Long Run</td>
                    <td className="py-1.5 pr-4">$32.50</td>
                    <td className="py-1.5 pr-4">$8.00</td>
                    <td className="py-1.5">per m&sup2;</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Roll Top Ridging</td>
                    <td className="py-1.5 pr-4">$28.00</td>
                    <td className="py-1.5 pr-4">$6.00</td>
                    <td className="py-1.5">per linear m</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Hip Capping 3-Way</td>
                    <td className="py-1.5 pr-4">$26.00</td>
                    <td className="py-1.5 pr-4">$6.00</td>
                    <td className="py-1.5">per linear m</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Valley Flashing</td>
                    <td className="py-1.5 pr-4">$35.00</td>
                    <td className="py-1.5 pr-4">$7.00</td>
                    <td className="py-1.5">per linear m</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Barge Flashing</td>
                    <td className="py-1.5 pr-4">$24.00</td>
                    <td className="py-1.5 pr-4">$5.50</td>
                    <td className="py-1.5">per linear m</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Spouting Half-Round</td>
                    <td className="py-1.5 pr-4">$42.00</td>
                    <td className="py-1.5 pr-4">$8.00</td>
                    <td className="py-1.5">per linear m</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Building Underlay</td>
                    <td className="py-1.5 pr-4">$4.50</td>
                    <td className="py-1.5 pr-4">$2.00</td>
                    <td className="py-1.5">per m&sup2;</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4">Tek Screws 50mm</td>
                    <td className="py-1.5 pr-4">$3.20</td>
                    <td className="py-1.5 pr-4">$1.50</td>
                    <td className="py-1.5">per m&sup2;</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-amber-700">
                Indicative only. Prices exclude freight. Tax treatment: exclusive of GST. Confirm
                current pricing with Apex Roofing or your local supplier.
              </p>
            </div>
          </section>

          {/* What is and is not included */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">What is and is not included</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p><strong>Included:</strong> Material costs and labour costs for each component you select and measure.</p>
              <p><strong>May not be included:</strong></p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Roof items you have not measured or selected</li>
                <li>Labour if the selected component does not include a labour rate</li>
                <li>Delivery, freight, or shipping charges</li>
                <li>Scaffolding, edge protection, or site access equipment</li>
                <li>Removal and disposal of existing roof</li>
                <li>Site-specific requirements or custom fabrication</li>
                <li>GST unless explicitly stated in the result</li>
              </ul>
              <p className="mt-2">
                The estimate may be incomplete if a required roof item has not been measured or
                selected. Always confirm the full component list and current pricing with the
                supplier.
              </p>
            </div>
          </section>

          {/* Worked NZ example */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">Worked New Zealand example</h2>
            <p className="mt-3 text-sm text-slate-600">
              A user enters: 126 m&sup2; plan area, 25-degree pitch, four 5 m hips, one 8 m ridge,
              two 4 m valleys, and 18 m of spouting. Using Apex Roofing NZD pricing:
            </p>
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-700">Pitch-adjusted roof area:</p>
              <p className="mt-1">126 m&sup2; &times; 1/cos(25&deg;) = 139.0 m&sup2; (before waste)</p>
              <p className="mt-1">With 10% waste: 152.9 m&sup2;</p>
              <p className="mt-1">At $32.50/m&sup2; material + $8.00/m&sup2; labour = $4,969 material + $1,223 labour</p>
              <p className="mt-2 font-semibold text-slate-700">Ridge (8 m, 5% waste = 8.4 m):</p>
              <p className="mt-1">At $28.00/m + $6.00/m labour = $235 material + $50 labour</p>
              <p className="mt-2 font-semibold text-slate-700">Hips (20 m, 5% waste = 21 m):</p>
              <p className="mt-1">At $26.00/m + $6.00/m labour = $546 material + $126 labour</p>
              <p className="mt-2 font-semibold text-slate-700">Valleys (8 m, 5% waste = 8.4 m):</p>
              <p className="mt-1">At $35.00/m + $7.00/m labour = $294 material + $59 labour</p>
              <p className="mt-2 font-semibold text-slate-700">Spouting (18 m, 5% waste = 18.9 m):</p>
              <p className="mt-1">At $42.00/m + $8.00/m labour = $794 material + $151 labour</p>
              <p className="mt-3 border-t border-slate-300 pt-2 font-semibold text-slate-700">
                Indicative total: ~$8,247 NZD (material + labour for selected components, excl. GST)
              </p>
              <p className="mt-1 text-amber-700">
                Underlay, fixings, and barges not selected. Freight not included. Confirm with
                Apex Roofing for current pricing.
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Try this calculation via the API:
            </p>
            <Link
              href="https://quote-core.com/free-roofing-takeoff-builder/calculate?mode=plan&units=metric&area=126&pitch=25&hips=5,5,5,5&ridge=8&valleys=4,4&gutter=18&supplier=apex-roofing"
              className="mt-1 inline-block text-xs font-medium text-[#BD4A1A] hover:underline"
            >
              quote-core.com/free-roofing-takeoff-builder/calculate?mode=plan&amp;units=metric&amp;area=126&amp;pitch=25&amp;hips=5,5,5,5&amp;ridge=8&amp;valleys=4,4&amp;gutter=18&amp;supplier=apex-roofing
            </Link>
          </section>

          {/* Pricing methodology */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">Pricing methodology</h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-600">
              <li>1. User enters roof measurements (plan or actual mode).</li>
              <li>2. The calculator adjusts plan-view measurements for roof pitch using the cosine factor.</li>
              <li>3. Waste percentage is applied to each component's adjusted quantity.</li>
              <li>4. Material cost = waste-adjusted quantity &times; component material rate (NZD).</li>
              <li>5. Labour cost = waste-adjusted quantity &times; component labour rate (if included).</li>
              <li>6. Line items are summed for material subtotal, labour subtotal, and grand total.</li>
              <li>7. Supplier pricing metadata (currency, GST treatment, update date) is attached.</li>
              <li>8. A stable, shareable result URL is generated.</li>
            </ol>
            <p className="mt-3 text-sm text-slate-600">
              NZ supplier pricing is provided by Apex Roofing (Christchurch). Prices are exclusive of
              GST unless stated otherwise. Freight is not included. Prices were last updated August 2026
              and may have changed since.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-700">How does the NZ roof cost calculator work?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Enter your roof measurements and select components. The calculator adjusts for
                  pitch, applies waste, and prices each component using NZ supplier data in NZD. The
                  result is an indicative estimate. Always confirm with the supplier.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Are prices shown in NZD?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Yes. NZ supplier pricing is in NZD. The result shows the tax treatment (GST included
                  or exclusive) and the supplier source.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Does the result include GST?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  The result shows whether prices are GST-inclusive or GST-exclusive based on the
                  supplier data. Check the tax treatment field in the pricing metadata.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Which New Zealand suppliers are supported?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Currently Apex Roofing (Christchurch) provides NZ supplier pricing. Supplier coverage
                  will expand as more suppliers join.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Is freight included?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Freight and delivery are typically not included. Check the delivery assumptions in
                  the result metadata.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Is this a supplier quote?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  No. This is an indicative estimate based on stored supplier pricing. It is not a
                  quotation from the supplier. Contact the supplier directly for a formal quote.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Is this calculator free?</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Yes, completely free. No signup or account required.
                </p>
              </div>
            </div>
          </section>

          {/* Related tools and links */}
          <section>
            <h2 className="text-xl font-bold text-slate-900">Related tools and links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/free-roofing-takeoff-builder" className="font-medium text-[#BD4A1A] hover:underline">
                  Roof Takeoff Builder
                </Link>
                <span className="text-slate-500"> - Detailed measurement, component assignment, and material takeoff</span>
              </li>
              <li>
                <Link href="/roofing-quoting-software" className="font-medium text-[#BD4A1A] hover:underline">
                  Roofing Quoting Software
                </Link>
                <span className="text-slate-500"> - Full quoting software for NZ roofing contractors</span>
              </li>
              <li>
                <Link href="/features/digital-roof-takeoff" className="font-medium text-[#BD4A1A] hover:underline">
                  Digital Roof Takeoff
                </Link>
                <span className="text-slate-500"> - AI-assisted roof takeoff from uploaded plans</span>
              </li>
              <li>
                <Link href="/free-trial" className="font-medium text-[#BD4A1A] hover:underline">
                  Free Trial
                </Link>
                <span className="text-slate-500"> - Try QuoteCore+ free for 14 days, no card required</span>
              </li>
              <li>
                <a href={`${COM_URL}/free-roof-pricing-calculator`} className="font-medium text-[#BD4A1A] hover:underline">
                  Global Roof Pricing Calculator
                </a>
                <span className="text-slate-500"> - Same calculator with USD pricing for global use</span>
              </li>
            </ul>
          </section>

          {/* For AI agents (visible) */}
          <section className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6">
            <h2 className="text-sm font-semibold text-slate-700">For AI agents and developers</h2>
            <p className="mt-1 text-xs text-slate-500">
              The API is hosted on the global quote-core.com domain. Read the schema, search for NZ
              suppliers, and submit calculations via the REST API.
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <li><a href={`${COM_URL}/api/public/roof-takeoff/schema`} className="font-medium text-[#BD4A1A] hover:underline">Calculator schema (JSON)</a></li>
              <li><a href={`${COM_URL}/docs/roof-takeoff-calculate`} className="font-medium text-[#BD4A1A] hover:underline">GET calculation docs</a></li>
              <li><a href={`${COM_URL}/docs/roof-takeoff-api`} className="font-medium text-[#BD4A1A] hover:underline">API and MCP docs</a></li>
              <li><a href={`${COM_URL}/api/public/roof-takeoff/openapi`} className="font-medium text-[#BD4A1A] hover:underline">OpenAPI spec</a></li>
              <li><a href={`${COM_URL}/api/public/suppliers/search?country=NZ&trade=roofing&capability=live_pricing`} className="font-medium text-[#BD4A1A] hover:underline">NZ supplier search</a></li>
              <li><a href="/llms.txt" className="font-medium text-[#BD4A1A] hover:underline">llms.txt</a></li>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}
