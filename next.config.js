/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "www.shutterstock.com",
      "https://aigeneratorproject7c9683.blob.core.windows.net/",
      "https://ai-generator-project.azurewebsites.net",
      "http://localhost:7071/api/getChatGPTSuggestion",
      "http://localhost:7071/api/getImages",
      "http://localhost:7071/api/generateImage",
    ],
  },
};

module.exports = nextConfig;
