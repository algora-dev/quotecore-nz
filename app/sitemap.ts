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
    "/construction-quoting-software",
    "/contact",
    "/free-trial",
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
