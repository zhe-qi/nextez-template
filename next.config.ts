import type { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
import './lib/env';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['.'],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@node-rs/argon2'],
};

export default bundleAnalyzer(
  withNextIntl(nextConfig),
);
