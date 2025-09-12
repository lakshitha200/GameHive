import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["images.unsplash.com"], // whitelist the external image domain
  },
};

export default nextConfig;
