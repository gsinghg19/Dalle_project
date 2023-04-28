const fetchSuggestionFromGPT = () =>
  fetch("/api/suggestion", {
    cache: "no-store",
  }).then((res) => {
    res.json;
  });
export default fetchSuggestionFromGPT;
