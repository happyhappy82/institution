const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Modern JavaScript - reduces polyfills
  experimental: {
    optimizePackageImports: ['@tailwindcss/typography'],
    optimizeCss: true,
  },

  // Compress responses
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Strict mode for better debugging
  reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
