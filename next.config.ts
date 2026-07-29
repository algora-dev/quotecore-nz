import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // Canonical host is https://www.quote-core.co.nz (locked 2026-07-15).
    // Every other hostname 308s straight to the www canonical - single hop,
    // path and query string preserved by Next's :path* + automatic query
    // forwarding. Do NOT redirect any of these to the global .com site.
    return [
      // Redirect NZ /free-tools to the global free tools hub (single canonical source)
      {
        source: "/free-tools",
        destination: "https://quote-core.com/free-tools",
        permanent: true,
      },
      // Redirect NZ /blog to the global blog (NZ-specific content strategy TBD; for now, all blog content lives on .com)
      {
        source: "/blog",
        destination: "https://quote-core.com/blog",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "https://quote-core.com/blog/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "quote-core.co.nz" }],
        destination: "https://www.quote-core.co.nz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "quotecore.co.nz" }],
        destination: "https://www.quote-core.co.nz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.quotecore.co.nz" }],
        destination: "https://www.quote-core.co.nz/:path*",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
