/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "aigeneratorproject7c9683.blob.core.windows.net",
      "ai-generator-project.azurewebsites.net/api/generateimage",
      "ai-generator-project.azurewebsites.net/api/generatesastoken",
      "ai-generator-project.azurewebsites.net/api/getchatgptsuggestion",
      "ai-generator-project.azurewebsites.net/api/getimages",
      "www.shutterstock.com",
    ],
  },
};

module.exports = nextConfig;
