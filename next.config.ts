import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  serverExternalPackages: ["better-sqlite3", "sharp"],
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
