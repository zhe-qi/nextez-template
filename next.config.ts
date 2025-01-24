import type { NextConfig } from "next";

import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/env";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["."],
  },
  experimental: {
    reactCompiler: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default bundleAnalyzer(withNextIntl(nextConfig));
