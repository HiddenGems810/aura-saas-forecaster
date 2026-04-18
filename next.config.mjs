/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
