import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary base domain
        pathname: "/dwvocld29/**", // Replace with your cloud name
      },
    ],
  },
};

export default nextConfig;
