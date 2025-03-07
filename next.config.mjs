/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/roses-portfolio-nextjs' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/roses-portfolio-nextjs/' : '',
  trailingSlash: true,
};

export default nextConfig;
