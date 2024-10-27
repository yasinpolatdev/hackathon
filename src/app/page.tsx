"use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon from react-icons
import Sidebar from "./Dashboard/sidebar"; // Sidebar bileşenini import ettik

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-gray-800 font-sans w-full p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-500 opacity-50 animate-gradient" />
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm z-10 animate-fadeIn">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-600">VisionAI</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="prompt"
              placeholder="Enter your prompt here..."
              className="w-full px-4 py-2 border border-red-600 bg-red-100 rounded-md text-gray-800 focus:outline-none focus:border-red-500 transition-transform transform duration-200 hover:scale-105"
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
          <div className="mt-8 w-full max-w-sm p-4 bg-white border border-red-600 rounded-lg shadow-md animate-slideUp z-10">
            <h2 className="text-xl font-semibold text-red-600 mb-2 flex items-center justify-between">
              Output:
              <button onClick={copyToClipboard} className="text-red-600 hover:text-red-800">
                <FaCopy />
              </button>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data }} className="text-gray-800 text-base"></div>
          </div>
        )}
      </main>

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
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-gradient {
          animation: gradientAnimation 5s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}