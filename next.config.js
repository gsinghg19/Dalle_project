/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "www.shutterstock.com",
      "https://aigeneratorproject7c9683.blob.core.windows.net/",
    ],
  },
};

module.exports = nextConfig;
