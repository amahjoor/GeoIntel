/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'], // For the map data
  },
  // This ensures proper rendering of client components
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;