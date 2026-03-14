"use client";

import React from "react";
import { GoogleGenAI } from "@google/genai";
import { ChangeEvent, useState } from "react";
import { OutputType } from "../lib/types";

export default function AIResearchAssistant() {
  // The client gets the API key from the environment variable `NEXT_PUBLIC_GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<OutputType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleAiTextSubmit = async (
    e:
      | React.SyntheticEvent<HTMLFormElement, Event>
      | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: inputText,
      });
  
      setInputText("");
  
      if (response.responseId && response.text) {
        setOutput([
          ...output,
          {
            id: response.responseId,
            text: response.text,
          },
        ]);
      }
    } catch (e) {
      console.error("Error communicating with LLM: ", e);
    } finally {
      setLoading(false);
    }

  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleAiTextSubmit(e);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const inputTarget = e.target as HTMLInputElement;
    setInputText(inputTarget.value);
  };

  return (
    <>
      <div className="ai-output">
        {output.map((o) => {
          return (
            <div className="output-bubble" key={o.id}>
              {o.text}
            </div>
          );
        })}
      </div>
      <form className="ai-assistant-form" onSubmit={handleAiTextSubmit}>
        <textarea
          className="ai-input"
          name="ai-input"
          placeholder="Enter a question to ask the research assistant."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        ></textarea>
        <button className="submit-btn" type="submit" title="Submit query" disabled={isLoading}>
          {isLoading ? <div className="loader"></div> : ">"}
        </button>
      </form>
    </>
  );
}
