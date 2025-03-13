/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: "/roses-portfolio-nextjs/",
  basePath: "/roses-portfolio-nextjs",
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
};

export default nextConfig;
