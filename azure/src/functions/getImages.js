const { app } = require("@azure/functions");
const generateSASToken = require("../../lib/generateSASToken");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const imageUrlsArr = [];
    const sasToken = await generateSASToken();

    for await (const blob of containerClient.listBlobsFlat()) {
      const imageUrl = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/images/${imageUrl}`;
      imageUrlsArr.push({ url, name: blob.name });
    }

    //TODO: Now split image filenames string (filename is structured as `${fileName}_${timestamp.png}`) to obtain timestamp. Use timestamp to sort images.

    const sortedImageUrls = imageUrlsArr.sort((a, b) => {
      const aName = a.name
        .split("_")[1]
        .toString()
        .split(".png" || ".jpg" || ".jpeg" || ".svg" || ".webp")[0];
      const bName = b.name
        .split("_")[1]
        .toString()
        .split(".png" || ".jpg" || ".jpeg" || ".svg" || ".webp")[0];
      return bName - aName;
    });

    context.log(`HTTP request made is "${request.url}"`);

    return {
      jsonBody: {
        imageUrls: sortedImageUrls,
      },
    };
  },
});
