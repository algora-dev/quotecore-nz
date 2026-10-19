import type { Metadata } from 'next';
import FreeQuoteBuilder from './FreeQuoteBuilder';
import {
  Container,
  ConversionPaths,
  FaqAccordion,
  FeatureGrid,
  FinalCta,
  Hero,
  PageScaffold,
  ProductFrame,
  Section,
  SectionHeader,
  SplitFeature,
  type FaqItem,
} from '@/components/marketing/page-v2/PageV2';
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { hreflangLanguages } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Free Measurement-to-Quote Tool NZ | QuoteCore+',
  description: 'Already have job measurements? Turn areas, lengths and quantities into materials, labour and priced output with reusable rules. Free core workflow for New Zealand trades.',
  alternates: { canonical: 'https://www.quote-core.co.nz/measurement-to-quote-tool', languages: hreflangLanguages('/measurement-to-quote-tool') },
};

const faqs: FaqItem[] = [
  { question: 'What is the Measurement-to-Quote tool for?', answer: 'It is for measured work where you already know the areas, lengths or quantities. Add reusable pricing components, enter the measurements and review the resulting materials, labour, waste and priced output.' },
  { question: 'Can I price a job from measurements I already have?', answer: 'Yes. Measurements can come from a site measure, another takeoff, a report, a spreadsheet or your own notes. You do not need to redraw a plan just to use those quantities.' },
  { question: 'Can I import a spreadsheet or CSV price list?', answer: 'Yes. The tool supports importing price information into a limited free component workflow. Larger catalogues are better suited to the dedicated conversion tools or the saved QuoteCore+ account workflow.' },
  { question: 'How are pitch, waste and pack sizes handled?', answer: 'The component setup can apply pitch, waste and pack logic according to the rules configured in the tool. Review all rates and allowances before using the result for a real customer job.' },
  { question: 'Can I turn the result into a customer quote?', answer: 'Yes. The free workflow can move priced work toward a customer quote, while the paid app keeps the saved job, component library and downstream documents connected.' },
  { question: 'Is it free?', answer: 'Yes. The core browser workflow is free and does not require a paid app account to start.' },
  { question: 'Does it permanently save my pricing library?', answer: 'No. Use the paid QuoteCore+ app when you want a persistent reusable component library and saved jobs.' },
  { question: 'What is the difference between this and Digital Takeoff?', answer: 'Measurement-to-Quote starts after you already have the quantities. Digital Takeoff is for measuring a plan or image first.' },
];

const schemas = [
  { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'QuoteCore+ Measurement-to-Quote Tool', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: 'https://www.quote-core.co.nz/measurement-to-quote-tool', description: 'Free browser tool for turning measured areas, lengths and quantities into materials, labour and priced output.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'NZD' } },
  buildBreadcrumbSchema([{ name: 'Home', url: 'https://www.quote-core.co.nz/' }, { name: 'Measurement-to-Quote Tool', url: 'https://www.quote-core.co.nz/measurement-to-quote-tool' }]),
  buildFaqSchema(faqs),
];

export default function Page() {
  return (
    <PageScaffold breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Free tools', href: '/free-tools' }, { label: 'Measurement-to-Quote' }]} schemas={schemas}>
      <Hero
        eyebrow="Free measurement-to-quote tool"
        title={<>Already have measurements? Turn them into materials, labour and pricing.</>}
        lead="Enter areas, lengths or quantities from a site measure, plan takeoff, report or spreadsheet. Reusable components apply materials, labour, waste and pricing rules, then you can review the result or carry the workflow into QuoteCore+."
        primary={{ href: '#measurement-tool', label: 'Use the free tool' }}
        secondary={{ href: 'https://demo.quote-core.com', label: 'Explore the interactive app demo' }}
        proof={['Free core workflow', 'No signup to start', 'Useful for measured NZ trade work']}
        visual={<ProductFrame src="/marketing/current-ux/quote-builder-components-measurements.webp" alt="QuoteCore+ Quote Builder with measurements and Smart Components" width={2048} height={1112} eager caption="The paid app keeps measured quantities, reusable Smart Components and the priced job together. The free tool below lets you try the core idea first." />}
      />

      <div id="measurement-tool"><FreeQuoteBuilder /></div>

      <Section>
        <Container>
          <SectionHeader eyebrow="Components, measurements and priced output" title="You already did the measuring. Do not rebuild the pricing every time." lead="Start with quantities you already have, apply reusable pricing rules and review the calculated materials, labour and job cost." />
          <FeatureGrid items={[
            { kicker: '01', title: 'Add your pricing components', body: <p>Set or import the products, labour, waste and pricing rules that belong to the work.</p> },
            { kicker: '02', title: 'Enter the measurements', body: <p>Add areas, lineal lengths or quantities from site, another takeoff, a report or your own notes.</p> },
            { kicker: '03', title: 'Review the priced output', body: <p>Check the calculated materials, labour and totals before using the result in the next step.</p> },
          ]} />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SplitFeature visual={<ProductFrame src="/marketing/current-ux/quote-builder-components-measurements.webp" alt="Current QuoteCore+ Quote Builder showing Smart Components and job measurements" width={2048} height={1112} caption="The paid app saves the component library and measured job so the next quote does not start from a blank tool." />}>
            <h2>Free tool for the current task. Saved app workflow for repeat work.</h2>
            <p>Use the free tool when you need the calculation in front of you. Use the paid app when you want the component library, saved jobs and downstream customer documents ready to reuse.</p>
          </SplitFeature>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Spreadsheet comparison" title="A spreadsheet can calculate well. The bigger difference is what happens around the calculation." lead="Reusable components reduce the formula maintenance and copying between pricing and customer documents, while still letting your own rates and rules drive the result." />
          <FeatureGrid columns={2} items={[
            { title: 'Spreadsheet workflow', body: <p>Flexible calculations, with formulas, templates, rate maintenance and copying between documents managed manually.</p> },
            { title: 'Reusable component workflow', body: <p>Save the pricing logic once, apply it to the measured quantity and keep the job connected to the next workflow stages.</p> },
          ]} />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeader eyebrow="Choose the right starting point" title="Choose the tool based on what you already have." />
          <FeatureGrid columns={3} items={[
            { title: 'I need to measure a roof plan', body: <p><a href="/free-roof-takeoff">Use the free roof takeoff tool.</a></p> },
            { title: 'I need to measure cladding or walls', body: <p><a href="/free-cladding-takeoff">Use the free cladding takeoff tool.</a></p> },
            { title: 'I need to measure a floor plan', body: <p><a href="/free-flooring-takeoff">Use the free flooring takeoff tool.</a></p> },
            { title: 'I already have measurements', body: <p>Stay here and enter the quantities you already know.</p> },
            { title: 'I only need the finished quote', body: <p><a href="/free-quote-generator">Use the free quote generator.</a></p> },
            { title: 'I have a larger price catalogue', body: <p><a href="https://quote-core.com/free-smart-component-creator">Use the catalogue conversion workflow.</a></p> },
          ]} />
        </Container>
      </Section>

      <Section><Container><FaqAccordion faqs={faqs} title="Measurement-to-Quote FAQ" /></Container></Section>

      <Section tone="soft">
        <Container>
          <SectionHeader eyebrow="Next step" title="Choose the next step that suits you" />
          <ConversionPaths items={[
            { title: 'Explore the interactive app demo', body: 'See how saved measurements, pricing, quotes and the wider job workflow fit together in a prepared account.', href: 'https://demo.quote-core.com', label: 'Explore the demo' },
            { title: 'Build your subscription configuration', body: 'Choose the workload and tools you want in the paid app and see the current monthly price.', href: '/pricing', label: 'See pricing' },
            { title: 'Bring your existing pricing with you', body: 'Done For You Setup can help translate agreed spreadsheets, products, labour and pricing logic into your QuoteCore+ account.', href: '/done-for-you-setup', label: 'Explore Done For You' },
          ]} />
        </Container>
      </Section>

      <FinalCta title="Already measured the job? Start from what you know." body="Use the free tool for the current task, then explore the saved QuoteCore+ workflow when you want those pricing rules and jobs ready to reuse." primary={{ href: '#measurement-tool', label: 'Use the free tool' }} secondary={{ href: 'https://demo.quote-core.com', label: 'Explore the app demo' }} />
      <div style={{ height: 72 }} />
    </PageScaffold>
  );
}
