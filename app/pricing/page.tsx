import type { Metadata } from 'next';
import { MarketingCalculator } from '@/app/components/pricing/MarketingCalculator';
import {
  BulletList,
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
import { workflowCallHref } from '@/lib/booking';
import { buildBreadcrumbSchema, buildFaqSchema, buildPricingOffers } from '@/lib/schema';
import { publicPricing } from '@/lib/public-pricing';
import { hreflangLanguages } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'QuoteCore+ Pricing NZ | Build Your Plan',
  description: 'Build a QuoteCore+ plan around your workload and selected tools. Current configurations range from US$29 to US$259/month (USD). Done For You Setup starts from NZ$899.',
  alternates: { canonical: 'https://www.quote-core.co.nz/pricing', languages: hreflangLanguages('/pricing') },
  openGraph: {
    title: 'QuoteCore+ Pricing New Zealand | Build Your Plan',
    description: 'Configure the workload and tools you need. Current QuoteCore+ configurations range from US$29 to US$259/month (USD).',
    url: 'https://www.quote-core.co.nz/pricing', siteName: 'QuoteCore+', type: 'website',
  },
};

const faqs: FaqItem[] = [
  { question: 'How much does QuoteCore+ cost in New Zealand?', answer: `QuoteCore+ uses configurable monthly pricing built around your workload and selected tools. Current configurations range from US$${publicPricing.monthlyMin} to US$${publicPricing.monthlyMax} per month (shown in USD). Use the pricing builder on this page to choose your workload and tools and see the resulting monthly price.` },
  { question: 'What is the cheapest QuoteCore+ setup?', answer: `The current pricing builder starts at US$${publicPricing.monthlyMin} per month for the minimum public configuration. Your exact monthly price changes with the workload and optional tools you choose.` },
  { question: 'What can make my monthly price higher?', answer: 'The pricing builder changes the monthly total around your core job or quote allowance and optional tools such as Digital Takeoff, Roof Scan Assist, offcut optimisation and Smart Assistant.' },
  { question: 'Is there a free trial?', answer: 'No. There is no full-app trial. You can use the free tools, explore the interactive app demo, try the focused takeoff demo or book a tailored product demo before subscribing.' },
  { question: 'Can I try QuoteCore+ before subscribing?', answer: 'Yes. The free tools work in the browser without a paid app account. The interactive demo opens a prepared fictional roofing workspace, and a tailored demo call lets us show a workflow relevant to your trade.' },
  { question: 'Is Done For You included in the monthly subscription?', answer: `No. Done For You Setup is a separate one-time service starting from NZ$${publicPricing.doneForYouStarting}. It is for businesses that want help configuring agreed materials, labour, waste and pricing logic and learning the setup using their own workflow.` },
  { question: 'Is GST included?', answer: 'The pricing builder shows the subscription configuration. The checkout flow is the final source for any GST or other tax treatment that applies to the purchase.' },
];

const schemas = [
  { '@context': 'https://schema.org', '@type': 'SoftwareApplication', '@id': 'https://www.quote-core.co.nz/#software', name: 'QuoteCore+', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: 'https://www.quote-core.co.nz/pricing', offers: buildPricingOffers() },
  buildBreadcrumbSchema([{ name: 'Home', url: 'https://www.quote-core.co.nz/' }, { name: 'Pricing', url: 'https://www.quote-core.co.nz/pricing' }]),
  buildFaqSchema(faqs),
];

export default function PricingPage() {
  return (
    <PageScaffold breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} schemas={schemas}>
      <Hero
        eyebrow="QuoteCore+ pricing NZ"
        title={<>Build a plan around the way you work.</>}
        lead={`Choose your workload and the tools you need. The pricing builder creates the monthly setup and shows the price before you continue. Current configurations range from US$${publicPricing.monthlyMin} to US$${publicPricing.monthlyMax} per month (USD).`}
        body="There is no full-app trial. If you want to try the workflow first, use the free tools, explore the interactive demo or book a tailored product demo."
        primary={{ href: '#build-your-plan', label: 'Build your plan' }}
        secondary={{ href: 'https://demo.quote-core.com', label: 'Explore the interactive demo' }}
        proof={['Configurable monthly pricing (USD)', 'See the total before signup', 'Free tools and demos available first']}
        visual={<ProductFrame src="/marketing/current-ux/job-space-overview.webp" alt="Current QuoteCore+ Job Space overview" width={2048} height={1112} eager caption="The pricing configuration changes with the tools and usage you choose. The connected job workflow stays the point." />}
      />

      <Section tone="soft" id="build-your-plan">
        <Container><SectionHeader eyebrow="Pricing builder" title="Choose the tools and usage that earn their place." lead="Use the same configurable pricing model used globally and see the monthly setup (in USD) before you continue." /></Container>
        <MarketingCalculator />
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="What changes the price" title="Configure the workload and tools you actually need." lead="The builder combines the core workload with the optional tools and allowances that fit the way you expect to work." />
          <FeatureGrid columns={3} items={[
            { title: 'Core workload', body: <p>Your expected job or quote volume sets the core allowance used by the builder.</p> },
            { title: 'Digital Takeoff', body: <p>Add in-app plan measurement when you want to measure drawings directly in QuoteCore+.</p> },
            { title: 'Roof Scan Assist', body: <p>Choose the AI allowance that fits how often you expect to automate roof-plan takeoff.</p> },
            { title: 'Offcut optimisation', body: <p>Add long-run offcut and cut-plan capability when it belongs in your roofing workflow.</p> },
            { title: 'Smart Assistant', body: <p>Choose an Assistant allowance based on how much help you expect to use across supported account tasks.</p> },
            { title: 'One monthly total', body: <p>The builder combines the choices into one monthly USD price before you continue.</p> },
          ]} />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SplitFeature visual={<ProductFrame src="/marketing/current-ux/job-space-overview.webp" alt="Current QuoteCore+ Job Space showing the connected job workflow" width={2048} height={1112} caption="The configuration changes. The connected measured-job workflow stays together." />}>
            <h2>The configuration changes. The connected workflow stays the point.</h2>
            <p>QuoteCore+ is designed to keep the information for a measured job together instead of retyping it between takeoff, pricing, customer documents and the next stage of the work.</p>
            <BulletList items={['Saved jobs and measurements', 'Reusable Smart Components', 'Customer quotes and activity', 'Material ordering and invoicing workflow', 'Phone, tablet and desktop access']} />
          </SplitFeature>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Try it before you subscribe" title="No full-app trial. Three useful ways to evaluate QuoteCore+." lead="Choose the route that gives you the evidence you need before subscribing." />
          <ConversionPaths items={[
            { title: 'Explore the interactive app demo', body: 'Open a prepared fictional roofing account and explore several important parts of the current QuoteCore+ workflow.', href: 'https://demo.quote-core.com', label: 'Explore the demo' },
            { title: 'Use the free tools', body: 'Try takeoff, measurement-to-pricing, calculators and document tools in your browser without creating a paid app account.', href: '/free-tools', label: 'Browse free tools' },
            { title: 'Book a tailored 20-minute demo', body: 'Tell us how you currently measure and price work. We will share our screen and show a workflow relevant to your trade and questions.', href: workflowCallHref, label: 'Book a tailored demo' },
          ]} />
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SplitFeature reverse visual={<ProductFrame src="/marketing/current-ux/smart-components-pricing-library.webp" alt="QuoteCore+ Smart Components pricing library" width={2048} height={1111} caption="Done For You Setup can help translate the agreed materials, labour, waste and pricing logic into the account you will use." />}>
            <h2>Want us to help build the setup around your business?</h2>
            <p>Done For You Setup is a separate one-time service starting from <strong>NZ${publicPricing.doneForYouStarting}</strong>. We can help translate agreed products, labour rates, waste rules and pricing logic into QuoteCore+ and teach you using your own workflow.</p>
            <p>Your monthly subscription is still configured separately through the pricing builder above.</p>
            <BulletList items={['Existing spreadsheets and price lists can be a starting point', 'The agreed setup is configured around your own pricing logic', 'Training focuses on the way your business will use QuoteCore+']} />
          </SplitFeature>
        </Container>
      </Section>

      <Section><Container><FaqAccordion faqs={faqs} title="Pricing FAQ" /></Container></Section>

      <FinalCta title="See your price, then choose how you want to start." body="Build the configuration that fits your workload, or explore the product before you subscribe." primary={{ href: '#build-your-plan', label: 'Build your plan' }} secondary={{ href: 'https://demo.quote-core.com', label: 'Explore the demo' }} />
      <div style={{ height: 72 }} />
    </PageScaffold>
  );
}
