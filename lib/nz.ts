export const nzMarket = {
  market: "nz",
  domain: "https://quote-core.co.nz",
  globalDomain: "https://quote-core.com",
  country: "New Zealand",
  locale: "en-NZ",
  currency: "NZD",
  currencySymbol: "NZ$",
  email: "info@quote-core.com",
  callUrl: "https://calendly.com/quote-core-info/15-minute-meeting",
  trialUrl: "/free-trial",
};

export const nzNav = [
  { href: "/roofing-quoting-software", label: "Roofing" },
  { href: "/construction-quoting-software", label: "Construction" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const nzTrades = [
  "Roofers",
  "Builders",
  "Cladding teams",
  "Flooring contractors",
  "Fencing contractors",
  "Decking contractors",
  "Landscaping teams",
  "Renovation trades",
  "Exterior works teams",
  "Specialist trades",
];

export const nzWorkflow = [
  "Add the job",
  "Upload the plan",
  "Measure areas, lengths, and components",
  "Build the quote",
  "Send for approval",
  "Create materials orders",
  "Keep the job information together",
];

export function canonical(path = "/") {
  return `${nzMarket.domain}${path === "/" ? "/" : path}`;
}

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) };
}
