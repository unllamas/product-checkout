import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
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
