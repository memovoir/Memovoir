/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co"
      },
      {
        protocol: "https",
        // Allow Supabase storage images: replace with your actual project ref if different
        hostname: "*.supabase.co"
      }
    ]
  }
};

export default nextConfig;


