import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    INSTANTDB_KEY: process.env.INSTANTDB_APP_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
    ],
  },
};

export default nextConfig;
