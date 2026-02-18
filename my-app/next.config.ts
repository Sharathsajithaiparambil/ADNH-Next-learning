import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uat-services-adnh.2base-uat.com',
      },
    ],
    // Cache images for 1 year (31536000 seconds) to reduce repeated requests
    minimumCacheTTL: 31536000,
    // Optimize image formats for better performance
    formats: ["image/avif", "image/webp"],
    // Allow unoptimized images for localhost in development
    unoptimized: process.env.NODE_ENV === "development" ? false : undefined,
    // Allow SVG images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'swiper', 'lucide-react'],
  },
};

export default nextConfig;
