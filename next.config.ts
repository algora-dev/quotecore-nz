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
    // NZ site decommissioned (owner decision 2026-11-03): every .co.nz URL,
    // any host, any path, permanently redirects to the .com homepage.
    // Ported NZ content now lives on .com (/nz/* pages).
    return [
      {
        source: "/:path*",
        destination: "https://quote-core.com/",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
