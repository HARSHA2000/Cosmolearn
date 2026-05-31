/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_SECRET: process.env.ADMIN_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
