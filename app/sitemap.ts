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
    "/features/supplier-resources",
    "/construction-quoting-software",
    "/contact",
    "/free-trial",
    "/free-tools",
    "/free-roofing-takeoff-builder",
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
    "/terms",
    "/cookie-policy",
    "/coffee-terms",
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
