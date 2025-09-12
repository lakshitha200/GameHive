import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["images.unsplash.com","cdn.cloudflare.steamstatic.com"], // whitelist the external image domain
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
