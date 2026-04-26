import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  devIndicators: false,
  turbopack: {},
};

export default nextConfig;