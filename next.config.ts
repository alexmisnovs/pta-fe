import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
