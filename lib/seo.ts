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

export const pricingOffers = [
  {
    "@type": "Offer",
    name: "Starter",
    price: "30",
    priceCurrency: site.currency,
    url: `${site.url}/#pricing`,
  },
  {
    "@type": "Offer",
    name: "Professional",
    price: "65",
    priceCurrency: site.currency,
    url: `${site.url}/#pricing`,
  },
  {
    "@type": "Offer",
    name: "Pro Plus",
    price: "99",
    priceCurrency: site.currency,
    url: `${site.url}/#pricing`,
  },
];

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

export const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema, softwareSchema],
};
