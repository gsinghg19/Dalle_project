"use client";

import fetchSuggestionFromChatGPT from "../lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { inspect } from "util";
import fetchImages from "../lib/fetchImages";
import toast from "react-hot-toast";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  // console.log(inspect(suggestion));
  console.log("suggestion is: ==> ", suggestion);

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    console.log(inputPrompt);

    //send prompt to api here
    const promptToApi = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = promptToApi;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `Ai generator is creating: ${notificationPromptShort}...`
    );

    //make POST request to backend here
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptToApi }),
    });
    const data = await res.json();
    console.log(data, " <==> :data is here");

    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success("Your Ai generated art has been created!", {
        id: notification,
      });
    }
    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  const loading = isValidating || isLoading;

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          } font-bold`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className={`p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400`}
          onClick={() => submitPrompt(true)}
          disabled={isLoading || isValidating}
          type="button"
        >
          Use Suggestion
        </button>
        <button
          className={`p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold`}
          onClick={mutate}
          type="button"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
