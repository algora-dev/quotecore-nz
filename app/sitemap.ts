import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

/**
 * NZ sitemap — canonical host only (https://www.quote-core.co.nz).
 * Static marketing routes; add new pages here when they ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/features",
    "/features/digital-roof-takeoff",
    "/features/smart-components",
    "/features/material-ordering",
    "/features/invoicing",
    "/features/ai-scan-assist",
    "/features/sending-and-tracking",
    "/features/supplier-resources",
    "/construction-quoting-software",
    "/contact",
    "/free-trial",
    "/free-tools",
    "/free-quote-generator",
    "/free-invoice-generator",
    "/free-purchase-order-generator",
    "/free-roofing-takeoff-builder",
    "/roof-cost-calculator-nz",
    "/free-calculators",
    "/free-roofing-calculator",
    "/free-construction-calculator",
    "/free-concrete-calculator",
    "/free-landscaping-calculator",
    "/free-birds-mouth-calculator",
    "/pricing",
    "/privacy",
    "/roofing-quoting-software",
    "/services",
    "/suppliers",
    "/terms",
    "/cookie-policy",
    "/coffee-terms",
  ];
  const generatorPaths = ["/free-quote-generator", "/free-invoice-generator", "/free-purchase-order-generator"];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : generatorPaths.includes(path) ? 0.9 : 0.7,
  }));
}
