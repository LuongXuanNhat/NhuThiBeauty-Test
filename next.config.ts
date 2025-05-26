import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  useFileSystemPublicRoutes: true,
  images: {
    domains: ["https://nhu-thi-beauty.vercel.app"],
    formats: ["image/webp", "image/avif"],
  },

  // Tối ưu cho SEO
  generateEtags: false,
  poweredByHeader: false,
};

export default nextConfig;
