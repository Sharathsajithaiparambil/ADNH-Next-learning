import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-adnh-admin.2base.in',
      },
    ],
  },
};

export default nextConfig;
