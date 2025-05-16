/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'], // For placeholder images
    formats: ['image/avif', 'image/webp'],
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