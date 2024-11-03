"use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState, useEffect } from "react";
import { FaPaperclip, FaPaperPlane, FaRegCopy, FaAsterisk, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import Sidebar from "./Dashboard/sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [data, setData] = useState<string>(""); 
  const [imageBase64, setImageBase64] = useState<string | null>(null); 
  const [inputValue, setInputValue] = useState<string>("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loadingPrompts, setLoadingPrompts] = useState<boolean>(true); 
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState<boolean>(false); 
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false); 

  async function getPredefinedPrompts() {
    setLoadingPrompts(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = "Biyoinformatik alanı hakkında maksimum 7-8 kelimelik sorular oluştur. Başlık vs olmasın. sadece sorular olsun. numaralandırma da yapma asla.";

    const result = await model.generateContent([prompt]);
    const responseText = result.response.text();
    const generatedPrompts = responseText
      .split("\n")
      .map(line => line.replace(/^[*#-]\s*/, "").trim())
      .filter(line => line !== "")
      .slice(0, 4);
    setPrompts(generatedPrompts);
    setLoadingPrompts(false);

    setTimeout(() => setShowWelcome(false), 2000); 
  }

  useEffect(() => {
    getPredefinedPrompts();
    const interval = setInterval(getPredefinedPrompts, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  async function runChat(prompt: string) {
    setLoadingData(true);
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
          parts: [{ text: "MERHABA" }],
        },
        {
          role: "model",
          parts: [{ text: "Merhaba! Bugün size nasıl yardımcı olabilirim?" }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    setData(response.text());
    setLoadingData(false);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result?.toString().split(",")[1] || null); 
      setShowModal(false); 
    };
    reader.readAsDataURL(file);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = inputValue || "Bu görseli açıkla, ve not şeklinde çıkart. Başka hiçbir şey yazma.";
    setLoadingData(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const contentData = imageBase64
      ? [
          prompt,
          {
            inlineData: {
              data: imageBase64,
              mimeType: "image/jpeg",
            },
          },
        ]
      : [prompt];

    const result = await model.generateContent(contentData);
    setData(result.response.text());
    setLoadingData(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    setShowCopyConfirmation(true);
    setTimeout(() => setShowCopyConfirmation(false), 2000);
  };

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full p-4 relative space-y-4">
        {showWelcome && (
          <div className="flex items-center text-3xl font-bold text-[#990000] dark:text-white animate-welcomeFade" style={{ fontFamily: "Syne, sans-serif" }}>
            <FaAsterisk className="mr-2" />
            {"VisionAI'a hoş geldiniz".split(" ").map((word, index) => (
              <span key={index} className="inline-block animate-wordFade" style={{ animationDelay: `${index * 0.3}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </div>
        )}

        {/* Output Section */}
        {loadingData ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#990000] dark:border-white"></div>
            <p className="ml-2 text-[#990000] dark:text-white">Yükleniyor...</p>
          </div>
        ) : data && (
          <div className="w-full max-w-xl p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md animate-slideUp z-10 text-gray-900 dark:text-gray-200 relative">
            <button
              onClick={copyToClipboard}
              className="absolute bottom-2 right-2 text-gray-500 hover:text-[#990000] dark:text-gray-300 dark:hover:text-gray-400 transition-all"
            >
              <FaRegCopy className="text-sm" />
            </button>
            <ReactMarkdown
              className="text-gray-700 dark:text-gray-300 text-base space-y-2"
              children={data}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}

        {!showWelcome && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl z-10 animate-slideDown">
            {loadingPrompts ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-200"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => runChat(prompt)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform duration-200 hover:scale-102 text-center"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input Section */}
        {!showWelcome && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 w-full max-w-xl z-10 flex items-center space-x-2 animate-slideDown">
            <form onSubmit={handleSubmit} className="flex-grow flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Mesajını yaz..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="cursor-pointer"
              >
                <FaPaperclip className={`text-xl ${imageBase64 ? "text-[#990000] dark:text-white" : "text-gray-400 dark:text-gray-500"}`} />
              </button>
              <button
                type="submit"
                className="bg-[#990000] dark:bg-white p-2 rounded-full hover:bg-[#800000] dark:hover:bg-gray-300 transition-all duration-300"
              >
                <FaPaperPlane className="text-white dark:text-gray-900 text-lg" />
              </button>
            </form>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative w-[600px] h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600"
              >
                <FaTimes />
              </button>
              <FaCloudUploadAlt className="text-6xl text-gray-400 mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
                Dosyanızı Seçin veya Sürükleyip Bırakın
              </h2>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-auto px-6 py-3 border border-transparent bg-[#990000] dark:bg-white text-white dark:text-gray-900 rounded-lg cursor-pointer hover:bg-[#800000] focus:outline-none"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Desteklenen dosya türleri: JPG, PNG, JPEG
              </p>
            </div>
          </div>
        )}

        {showCopyConfirmation && (
          <div className="fixed bottom-8 right-8 bg-[#990000] dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-md shadow-md text-sm animate-fadeInOut">
            Kopyalandı!
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes welcomeFade {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-welcomeFade {
          animation: welcomeFade 0.5s ease-in-out;
        }
        .animate-wordFade {
          animation: wordFade 0.6s ease-in-out forwards;
          display: inline-block;
          font-family: 'Syne', sans-serif;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out;
        }
        .animate-slideDown {
          animation: welcomeFade 0.5s ease-in-out;
        }
        .animate-slideUp {
          animation: fadeInOut 0.5s ease-in-out;
        }
        @media (max-width: 768px) {
          .flex {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}