import type { FaqItem } from "./faqs";
import { schemaPricingPlans } from "./pricing";

export const siteUrl = "https://quote-core.co.nz";
export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const softwareId = `${siteUrl}/#software`;

export function buildPricingOffers() {
  const prices = schemaPricingPlans
    .map((plan) => plan.schemaPriceNzd)
    .filter((price) => price > 0);

  return {
    "@type": "AggregateOffer",
    url: `${siteUrl}/#pricing`,
    priceCurrency: "NZD",
    lowPrice: String(Math.min(...prices)),
    highPrice: String(Math.max(...prices)),
    offerCount: schemaPricingPlans.length,
    offers: schemaPricingPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.displayName,
      price: String(plan.schemaPriceNzd),
      priceCurrency: "NZD",
      url: `${siteUrl}/#pricing`,
      availability: "https://schema.org/InStock",
      category: plan.isFree ? "Free trial or free plan" : "Subscription",
      description: `${plan.subtitle}. ${plan.features.join(", ")}.`,
    })),
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId,
    name: "QuoteCore+",
    alternateName: ["QuoteCore", "Quote Core", "Quote Core Plus", "QuoteCore Plus"],
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Contractor quoting software",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    url: `${siteUrl}/`,
    description:
      "Contractor quoting software for New Zealand roofers, builders, and trade businesses, including digital takeoff, quote building, approval tracking, materials ordering, and quote-to-job workflow.",
    publisher: {
      "@id": organizationId,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "New Zealand contractors, roofers, builders, and trade businesses",
    },
    areaServed: [{ "@type": "Country", name: "New Zealand" }],
    featureList: [
      "Digital takeoff from plans",
      "Reusable Smart Components",
      "Quote builder",
      "Customer quote preview",
      "Quote approval tracking",
      "Material order creation",
      "Invoice workflow",
      "Resource library",
      "Job and quote information tracking",
    ],
    keywords:
      "New Zealand contractor quoting software, roofing quoting software NZ, construction quoting software NZ, digital takeoff, quote builder, material orders, Smart Components",
    offers: buildPricingOffers(),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  includeContext = true,
) {
  return {
    ...(includeContext ? { "@context": "https://schema.org" } : {}),
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
