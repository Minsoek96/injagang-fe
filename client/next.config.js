// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_SERVER_API: process.env.BACKEND_SERVER_API,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  rewrites: () => [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND_SERVER_API}/:path*`,
    },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
