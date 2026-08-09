import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

/**
 * NZ sitemap — canonical host only (https://www.quote-core.co.nz).
 * Static marketing routes; add new pages here when they ship.
 * lastModified dates reflect actual content changes per page (from git history).
 */
const lastModified: Record<string, string> = {
  "/": "2026-08-07",
  "/about": "2026-08-03",
  "/features": "2026-08-03",
  "/features/digital-roof-takeoff": "2026-08-03",
  "/features/smart-components": "2026-08-03",
  "/features/material-ordering": "2026-08-03",
  "/features/invoicing": "2026-08-03",
  "/features/ai-scan-assist": "2026-08-03",
  "/features/sending-and-tracking": "2026-08-03",
  "/features/supplier-resources": "2026-08-03",
  "/construction-quoting-software": "2026-08-03",
  "/contact": "2026-07-24",
  "/free-trial": "2026-08-03",
  "/free-tools": "2026-08-05",
  "/free-quote-generator": "2026-08-08",
  "/free-invoice-generator": "2026-08-08",
  "/free-purchase-order-generator": "2026-08-08",
  "/free-roofing-takeoff-builder": "2026-08-04",
  "/roof-cost-calculator-nz": "2026-08-03",
  "/free-calculators": "2026-08-01",
  "/free-roofing-calculator": "2026-08-01",
  "/free-construction-calculator": "2026-08-01",
  "/free-concrete-calculator": "2026-08-01",
  "/free-landscaping-calculator": "2026-08-01",
  "/free-birds-mouth-calculator": "2026-08-01",
  "/pricing": "2026-08-08",
  "/privacy": "2026-08-02",
  "/roofing-quoting-software": "2026-08-03",
  "/services": "2026-08-03",
  "/suppliers": "2026-08-03",
  "/terms": "2026-08-03",
  "/cookie-policy": "2026-08-02",
  "/coffee-terms": "2026-08-02",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.keys(lastModified);
  const generatorPaths = ["/free-quote-generator", "/free-invoice-generator", "/free-purchase-order-generator"];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    lastModified: new Date(lastModified[path]),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : generatorPaths.includes(path) ? 0.9 : 0.7,
  }));
}
