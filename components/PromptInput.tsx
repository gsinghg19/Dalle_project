"use client";

import fetchSuggestionFromChatGPT from "../lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { inspect } from "util";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  // console.log(inspect(suggestion));
  console.log("suggestion is: ", suggestion);

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    console.log("sumbit prompt is: ", submitPrompt);
    setInput("");

    //send prompt to api here
    const promptToApi = useSuggestion ? suggestion : inputPrompt;

    //make POST request to backend here
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptToApi }),
    });
    const data = await res.json();
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
        className="flex flex-col lg:flex-row shadow-xl shadow-slate-400/30 border rounded-md lg:divide-x "
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "chat gpt is loading....") ||
            suggestion ||
            "Enter a prompt..."
          }
          className="flex-1 p-4 outline-none rounded-md shadow-inner shadow-slate-400/40"
        />
        <button
          type="submit"
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          } `}
        >
          Generate
        </button>
        <button
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
          disabled={isValidating || isLoading}
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-600 border-none transition-colors duration-200 rounded-b-md md: rounded-r-md md: rounded-bl-none font-bold"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "Working on your request as we speak...." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
