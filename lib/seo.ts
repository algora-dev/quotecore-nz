export const site = {
  name: "QuoteCore+",
  legalName: "T3 Play Limited",
  url: "https://www.quote-core.co.nz",
  logo: "https://www.quote-core.co.nz/MainQCP.png",
  email: "info@quote-core.com",
  linkedin: "https://www.linkedin.com/company/quotecore/",
  locale: "en-NZ",
  currency: "NZD",
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "/" : path}`;
}

export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

import { schemaPricingPlans } from "./pricing";

// Derived from lib/pricing.ts so schema prices can never drift from the site.
export const pricingOffers = schemaPricingPlans.map((plan) => ({
  "@type": "Offer",
  name: plan.displayName,
  price: String(plan.schemaPriceNzd),
  priceCurrency: site.currency,
  url: `${site.url}/pricing`,
}));

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: `${site.url}/`,
  logo: site.logo,
  email: site.email,
  sameAs: [site.linkedin],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: `${site.url}/`,
  publisher: {
    "@id": `${site.url}/#organization`,
  },
};

export const softwareSchema = {
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": `${site.url}/#software`,
  name: site.name,
  url: `${site.url}/`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Contractor quoting software",
  operatingSystem: "Web",
  description:
    "QuoteCore+ is contractor quoting software for roofers, builders and trade businesses that work from measurements. It helps users measure jobs, build priced quotes, track customer approval, order materials, manage work, invoice and get paid.",
  creator: {
    "@id": `${site.url}/#organization`,
  },
  offers: pricingOffers,
};

// VideoObject schema for YouTube videos on the homepage
const heroVideoSchema = {
  "@type": "VideoObject",
  name: "Create a complex roofing quote in under 3min for less than $1!",
  description: "See how QuoteCore+ lets you create a complex roofing quote in under 3 minutes for less than a dollar per quote.",
  thumbnailUrl: `https://i.ytimg.com/vi/X379HDoDE_o/maxresdefault.jpg`,
  uploadDate: "2026-07-28",
  embedUrl: `https://www.youtube-nocookie.com/embed/X379HDoDE_o`,
  contentUrl: `https://www.youtube.com/watch?v=X379HDoDE_o`,
};

const storyVideoSchema = {
  "@type": "VideoObject",
  name: "Still looking for the long wait?",
  description: "Discover how QuoteCore+ eliminates the long wait for roofing contractors who need to measure, quote and invoice efficiently.",
  thumbnailUrl: `https://i.ytimg.com/vi/rqmEtartkYw/maxresdefault.jpg`,
  uploadDate: "2026-07-28",
  embedUrl: `https://www.youtube-nocookie.com/embed/rqmEtartkYw`,
  contentUrl: `https://www.youtube.com/watch?v=rqmEtartkYw`,
};

// Tutorial video schema
const tutorialVideoSchemas = [
  {
    "@type": "VideoObject",
    name: "What are Smart Components?",
    description: "Discover how QuoteCore+ Smart Components help businesses turn the way they already quote, price and deliver work into a repeatable digital system.",
    thumbnailUrl: `https://i.ytimg.com/vi/aFXJwOiliPI/maxresdefault.jpg`,
    uploadDate: "2026-07-28",
    embedUrl: `https://www.youtube-nocookie.com/embed/aFXJwOiliPI`,
    contentUrl: `https://www.youtube.com/watch?v=aFXJwOiliPI`,
  },
  {
    "@type": "VideoObject",
    name: "How to Set Up Roofing Smart Components in QuoteCore+",
    description: "Step-by-step tutorial showing how to set up roofing Smart Components in QuoteCore+.",
    thumbnailUrl: `https://i.ytimg.com/vi/XZSTIfGUHAU/maxresdefault.jpg`,
    uploadDate: "2026-07-28",
    embedUrl: `https://www.youtube-nocookie.com/embed/XZSTIfGUHAU`,
    contentUrl: `https://www.youtube.com/watch?v=XZSTIfGUHAU`,
  },
  {
    "@type": "VideoObject",
    name: "How to Order Materials from an Accepted Quote",
    description: "Tutorial showing how to create a materials order from an accepted quote in QuoteCore+.",
    thumbnailUrl: `https://i.ytimg.com/vi/kOkQuUy8MWQ/maxresdefault.jpg`,
    uploadDate: "2026-07-28",
    embedUrl: `https://www.youtube-nocookie.com/embed/kOkQuUy8MWQ`,
    contentUrl: `https://www.youtube.com/watch?v=kOkQuUy8MWQ`,
  },
  {
    "@type": "VideoObject",
    name: "Create a Quote from Start to Finish with QuoteCore+",
    description: "Full walkthrough showing how to create a quote from start to finish using QuoteCore+.",
    thumbnailUrl: `https://i.ytimg.com/vi/pqIfx-rOcmo/maxresdefault.jpg`,
    uploadDate: "2026-07-28",
    embedUrl: `https://www.youtube-nocookie.com/embed/pqIfx-rOcmo`,
    contentUrl: `https://www.youtube.com/watch?v=pqIfx-rOcmo`,
  },
];

export const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    softwareSchema,
    heroVideoSchema,
    storyVideoSchema,
    ...tutorialVideoSchemas,
  ],
};
