const fetchSuggestionFromChatGPT = () =>
  fetch("/api/suggestion", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchSuggestionFromChatGPT;

// const fetchSuggestionFromChatGPT = () =>
//   fetch("http://localhost:7071/api/getChatGPTSuggestion", {
//     cache: "no-store",
//   }).then((res) => res.json());

// export default fetchSuggestionFromChatGPT;
