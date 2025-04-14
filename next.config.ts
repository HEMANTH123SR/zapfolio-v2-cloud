import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["media.licdn.com", "img.clerk.com"],
    unoptimized: true,
  },
};

export default nextConfig;
