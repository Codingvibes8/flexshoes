/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this project so a lockfile in a parent directory
  // cannot make Next infer the wrong workspace root.
  outputFileTracingRoot: process.cwd(),
  images: {
    // Product images are stored as URLs in Neon. Allow any HTTPS host so
    // admins can point products at a CDN or object store without a code change.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
