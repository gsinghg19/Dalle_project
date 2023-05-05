const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName;
const containerName = "images";

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();
    console.log(`Prompt is ====> ${prompt}`);

    const response = await openai.createImage(
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        timeout: 20000,
        signal: newAbortSignal(17000),
      }
    );

    //download image data here
    image_url = response.data.data[0].url;
    const res = await axios.get(image_url, { responseType: "arraybuffer" });
    const arrayBuffer = res.data;

    //accessing azure storage
    sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    //access image container in azure storage via query
    const containerClient = blobServiceClient.getContainerClient(containerName);

    //generate timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("Success! File uploaded.");
    } catch (error) {
      if (error.response) {
        console.log("Error has occured. Upload failed...");
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log("Error has occured. Upload failed... ::", error.message);
      }
      return { body: "Successfully uploaded image" };
    }
  },
});
