/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.shutterstock.com"],
  },
};

module.exports = nextConfig;
