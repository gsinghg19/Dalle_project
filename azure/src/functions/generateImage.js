const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("../../lib/generateSASToken0");

const accountName = process.env.accountName;
const containerName = process.env.containerName;

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

app.http("generateImage", {
  methods: [""],
  authLevel: "anonymous",
  handler: async (request, response) => {
    try {
      const response = await openai.createCompletion(
        {
          //model:
          //prompt:
          //max_tokens:
          //temperature:
        },
        {
          timeout: 7000,
          signal: newAbortSignal(5000),
        }
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },
});
