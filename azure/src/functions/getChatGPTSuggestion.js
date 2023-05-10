const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const response = await openai.createCompletion(
      {
        model: "text-davinci-003",
        prompt:
          "Write a random text prompt here, for the DALL-E ai to generate an image. This prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
        max_tokens: 100,
        temperature: 0.8,
      },
      {
        timeout: 5500,
        signal: newAbortSignal(4500),
      }
    );

    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.data.choices[0].text;
    try {
      context.log(`prompt generated is: "${responseText}"`);
      return { body: responseText };
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
