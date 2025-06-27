/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
   images: {
    domains: ['localhost', 'tutor-board-server.onrender.com'],
    // Or use remotePatterns for more control:
    remotePatterns: [
      // Development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/**',
      },
      // Production
      {
        protocol: 'https', // Note: HTTPS for production
        hostname: 'tutor-board-server.onrender.com',
        pathname: '/api/**',
      },
    ],
  },
}

export default nextConfig
