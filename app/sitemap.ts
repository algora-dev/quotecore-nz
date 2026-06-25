import type { MetadataRoute } from "next";
import { nzMarket } from "@/lib/nz";

const paths = [
  "/",
  "/pricing",
  "/free-trial",
  "/roofing-quoting-software",
  "/construction-quoting-software",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path, index) => ({
    url: `${nzMarket.domain}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: index < 7 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index < 7 ? 0.8 : 0.6,
  }));
}
