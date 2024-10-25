"use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [data, setData] = useState<string>("");

  async function runChat(prompt: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setData(response.text());
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = (event.target as HTMLFormElement)?.prompt?.value || "";
    runChat(prompt);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-gray-200 font-sans">
      <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-sm animate-fadeIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">AI Chat</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="prompt"
            placeholder="Enter your prompt here..."
            className="w-full px-4 py-2 border border-red-600 bg-gray-700 rounded-md text-gray-200 focus:outline-none focus:border-red-500 transition-transform transform duration-200 hover:scale-105"
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-md font-medium uppercase hover:bg-red-700 transition-all duration-300 hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
      {data && (
        <div className="mt-8 w-full max-w-sm p-4 bg-gray-800 border border-red-600 rounded-lg shadow-md animate-slideUp">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Output:</h2>
          <div dangerouslySetInnerHTML={{ __html: data }} className="text-gray-200 text-base"></div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}
