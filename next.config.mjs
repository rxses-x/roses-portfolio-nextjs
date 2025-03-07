/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  basePath: '/roses-portfolio-nextjs',
  assetPrefix: '/roses-portfolio-nextjs/',
};

export default nextConfig;
