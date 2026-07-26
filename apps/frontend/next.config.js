/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * API Rewrites - Proxy all /api/* requests to the NestJS backend
   *
   * LOCAL:
   *   - Frontend: http://localhost:3000
   *   - Backend: http://localhost:4000
   *   - Proxy: /api/* → http://localhost:4000/api/*
   *
   * Set NEXT_PUBLIC_BACKEND_URL in .env to control backend URL
   */
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

    // Use rewrites for local development
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },

  // Allowed domains for images
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
