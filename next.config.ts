import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
