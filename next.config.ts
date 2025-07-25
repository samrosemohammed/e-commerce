import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pezreoc0yd.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
