/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * API Rewrites - Proxy all /api/* requests to the NestJS backend
   *
   * DEVELOPMENT (local):
   *   - Frontend: http://localhost:3000
   *   - Backend: http://localhost:4000
   *   - Proxy: /api/* → http://localhost:4000/api/*
   *
   * PRODUCTION (Vercel + Render):
   *   - Frontend: https://secure-lens-updated3-frontend.vercel.app
   *   - Backend: https://securelensupdated3.onrender.com
   *   - Direct API calls via NEXT_PUBLIC_BACKEND_URL (no rewrites needed)
   *
   * Set NEXT_PUBLIC_BACKEND_URL in .env to control backend URL
   */
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://securelensupdated3.onrender.com'
        : 'http://localhost:4000');

    // Only use rewrites in development for local proxying
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: `${backendUrl}/:path*`,
        },
      ];
    }

    // In production, no rewrites needed - direct API calls via NEXT_PUBLIC_BACKEND_URL
    return [];
  },

  // Allowed domains for images
  images: {
    domains: [
      'localhost',
      'secure-lens-updated3-frontend.vercel.app',
      'securelensupdated3.onrender.com',
    ],
  },
};

module.exports = nextConfig;
