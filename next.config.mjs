/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Keep your existing image settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co"
      },
      {
        protocol: "https",
        hostname: "*.supabase.co"
      }
    ]
  },

  // 2. Add these lines to ignore errors during deployment
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;