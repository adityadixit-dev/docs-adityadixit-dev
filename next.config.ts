import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://www.boot.dev/**")],
  },
  /* config options here */
};

export default nextConfig;
