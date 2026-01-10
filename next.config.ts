/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sbsqnxfjcazufzqntvhm.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**', // This is now more permissive
      },
    ],
  },
};

export default nextConfig;