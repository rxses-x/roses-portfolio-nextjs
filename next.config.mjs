/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: "roses-portfolio-nextjs/",
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
};

export default nextConfig;
