/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
