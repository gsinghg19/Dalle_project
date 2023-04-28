"use client";

import fetchSuggestionFromGPT from "@/lib/fetchSuggestionFromChatGPT";
import { useState } from "react";
import useSWR from "swr";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromGPT, {
    revalidateOnFocus: false,
  });

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-xl shadow-slate-400/30 border rounded-md lg:divide-x ">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter a prompt"
          className="flex-1 p-4 outline-none rounded-md shadow-inner shadow-slate-400/40"
        />
        <button
          type="submit"
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Generate
        </button>
        <button className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400">
          Use Suggestion
        </button>
        <button className="p-4 bg-white text-violet-600 transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400">
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
