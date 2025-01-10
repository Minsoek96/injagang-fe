// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_SERVER_API: process.env.BACKEND_SERVER_API,
    NEXT_PUBLIC_BACKEND_SERVER_API: process.NEXT_PUBLIC_BACKEND_SERVER_API,
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

  async rewrites() {
    // rewrite는 beforeFiles, afterFiles, fallback 세 단계로 나눠서 처리할 수 있다.

    return {
      beforeFiles: [
        {
          source: '/api/test/:path*',
          destination: '/api/test/:path*',
        },
      ],
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/:path*`,
        },
      ],
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
