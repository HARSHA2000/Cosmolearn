/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_SECRET: process.env.ADMIN_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    AWS_SES_ACCESS_KEY_ID: process.env.AWS_SES_ACCESS_KEY_ID,
    AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL,
    TRAINER_NOTIFICATION_EMAIL: process.env.TRAINER_NOTIFICATION_EMAIL,
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
