const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const accoutName = process.env.accoutName;
const accountKey = process.env.accountKey;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accoutName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

//generate SAS token here
async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.write = true;
  permisions.create = true;
  permissions.read = true;

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions.toString(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}

module.exorts = generateSASToken;
