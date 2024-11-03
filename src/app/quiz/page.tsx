"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import confetti from "canvas-confetti";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const TOTAL_QUESTIONS = 5;

// prompt metnini burada doğrudan tanımlıyoruz
const PROMPT_TEXT = "Biyoinformatik ile ilgili temel sorular sor";

// Soru ve cevap seçeneklerini tanımlamak için arayüzler oluşturduk
interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
}

export default function Gemini() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (started) {
      fetchQuestion();
    }
  }, [questionCount, started]);

  async function fetchQuestion() {
    if (questionCount >= TOTAL_QUESTIONS) {
      setShowScore(true);
      if (score / TOTAL_QUESTIONS >= 0.5) {
        triggerConfetti();
      }
      return;
    }

    setLoading(true);
    setShowHint(false);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY as string);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent([PROMPT_TEXT]);
      const responseText = await result.response.text();

      // Soruyu ve şıkları ayrıştırma
      const lines = responseText.split("\n").map(line => line.trim()).filter(line => line !== "");

      // Soru kısmı
      const questionText = lines[0].replace("Soru:", "").trim();

      // Şıklar kısmı
      const choices: string[] = [];
      let correctAnswer = "";
      
      // Şıkları ve cevabı doğru ayırmak için döngü
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].startsWith("a)") || lines[i].startsWith("b)") || lines[i].startsWith("c)") || lines[i].startsWith("d)")) {
          choices.push(lines[i].replace(/^[a-d]\)\s*/, "").trim());
        }
        if (lines[i].startsWith("Cevap:")) {
          correctAnswer = lines[i].split(" ")[1].replace(")", "").trim();
        }
      }

      setQuestionData({
        question: questionText,
        choices: choices,
        correctAnswer: choices[["a", "b", "c", "d"].indexOf(correctAnswer)],
      });

      setLoading(false);
    } catch (error) {
      console.error("Soru getirilemedi:", error);
      setLoading(false);
    }
  }

  function handleAnswerSelect(choice: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(choice);
    if (choice === questionData?.correctAnswer) {
      setScore(score + 1);
    } else {
      setShowHint(true);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setQuestionCount(prev => prev + 1); // Soruyu artır
      fetchQuestion(); // Yeni soruyu çek
    }, 1500);
  }

  function triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#bd0000", "#FF6347", "#FF4500"],
    });
  }

  function handleRetry() {
    setQuestionCount(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setLoading(true);
    setStarted(false);
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-gray-800 dark:text-white bg-transparent">
        <div className="text-2xl md:text-3xl font-bold mb-4 text-red-600 text-center">MyUNI Alıştırmalarına Hoş Geldiniz</div>
        <p className="text-base md:text-lg mb-6 text-center">Bu alıştırmada biyoinformatik konularında sorulara cevap vereceksiniz. Bu eğitim modülü henüz alpha sürümündedir. Başarılar!</p>
        <button
          onClick={() => setStarted(true)}
          className="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Başla
        </button>
      </div>
    );
  }

  if (loading && !showScore) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-200">
        <div className="animate-pulse text-xl md:text-2xl font-semibold">Alıştırmanız yükleniyor...</div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
        <div className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Alıştırma Tamamlandı!</div>
        <div className="text-lg md:text-2xl font-medium text-gray-800 mb-6">
          Toplam Puanınız: {score} / {TOTAL_QUESTIONS}
        </div>
        <button 
          onClick={handleRetry} 
          className="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Tekrar Yap
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
      {questionData && (
        <div className="w-full max-w-xl md:max-w-2xl p-6 md:p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl shadow-lg transform transition-all duration-500 relative">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Soru {questionCount + 1}</h2>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
              %{((questionCount / TOTAL_QUESTIONS) * 100).toFixed(0)} tamamlandı
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 dark:bg-gray-700">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${((questionCount / TOTAL_QUESTIONS) * 100).toFixed(0)}%` }}
            ></div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-800 dark:text-gray-100 leading-tight text-center md:text-left">
            {questionData.question}
          </h2>

          <div className="absolute bottom-4 text-xs text-gray-600 dark:text-gray-300 bg-yellow-100 dark:bg-yellow-800 px-3 py-1 rounded-full font-semibold relative group">
            Alpha Sürümü
            <span className="absolute bottom-full mb-1 w-48 text-center text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Henüz geliştirilme aşamasındadır. Sistematik hataları olabilir.
            </span>
          </div>

          <div className="space-y-3">
            {questionData.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(choice)}
                className={`w-full py-2 md:py-3 px-4 md:px-5 border rounded-md text-left font-medium text-gray-800 dark:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105
                  ${
                    selectedAnswer
                      ? choice === questionData.correctAnswer
                        ? "bg-green-100 border-green-400 text-green-800 dark:bg-green-600 dark:border-green-400 dark:text-white"
                        : choice === selectedAnswer
                        ? "bg-red-100 border-red-400 text-red-800 dark:bg-red-600 dark:border-red-400 dark:text-white"
                        : "bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                  }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {showHint && (
            <p className="mt-4 text-center text-sm font-light text-red-600 dark:text-red-400 transition-opacity duration-300 ease-in-out">
              İpucu: Doğru cevap "{questionData.correctAnswer}".
            </p>
          )}
          <div className="flex justify-between mt-6 space-x-2">
            <button
              className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleRetry}
            >
              En Baştan Başla
            </button>
            <button
              className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
              onClick={() => {
                setQuestionCount(prev => prev + 1);
                fetchQuestion(); // Yeni soruyu çek
              }}
            >
              Pas Geç
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
