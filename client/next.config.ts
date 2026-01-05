import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ["i.pinimg.com"],
  },
};

export default nextConfig;
