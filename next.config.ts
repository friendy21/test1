/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'], // For placeholder images
    formats: ['image/avif', 'image/webp'],
  },
    eslint: {
    // allow production builds to succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
    typescript: {
    // ⚠️ Dangerously ignores all TS errors in production builds
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  // Add any additional Next.js configuration here
};

module.exports = nextConfig;
