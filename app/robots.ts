import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

const isProduction =
  process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;

export default function robots(): MetadataRoute.Robots {
  // Preview/staging: block everything
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: `${site.url}/sitemap.xml`,
    };
  }

  // Production: allow all public pages, block API
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
