"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from "../Dashboard/sidebar";
import confetti from "canvas-confetti";
import { ClipLoader } from "react-spinners";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const TOTAL_QUESTIONS = 5;

const PROMPT_TEXT = "python alanında başlangıç seviyesinde özgün ve orijinal sorular içeren tek bir soru hazırla. Direkt soruyu, seçenekleri ve doğru cevabı ver.";

interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
}

export default function BioinformaticsQuiz() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (started && questionCount < TOTAL_QUESTIONS) {
      fetchQuestion();
    } else if (questionCount >= TOTAL_QUESTIONS) {
      setShowScore(true);
      if (score / TOTAL_QUESTIONS >= 0.5) {
        triggerConfetti();
      }
    }
  }, [questionCount, started]);

  async function fetchQuestion() {
    setLoading(true);
    setShowHint(false);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY as string);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent([PROMPT_TEXT]);
      const responseText = await result.response.text();

      const lines = responseText.split("\n").map(line => line.trim()).filter(line => line !== "");
      const questionText = lines[0].replace("Soru:", "").trim();
      const choices: string[] = [];
      let correctAnswer = "";

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
        correctAnswer: choices[["a", "b", "c", "d"].indexOf(correctAnswer.toLowerCase())],
      });

      setLoading(false);
    } catch (error) {
      console.error("Soru getirilemedi:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  function handleAnswerSelect(choice: string) {
    if (selectedAnswer || !questionData) return;

    setSelectedAnswer(choice);
    if (choice.toLowerCase() === questionData.correctAnswer.toLowerCase()) {
      setScore(score + 1);
    } else {
      setShowHint(true);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setQuestionCount(prev => prev + 1); 
    }, 1500);
  }

  function triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#007AFF", "#4CAF50", "#FFC107"],
    });
  }

  function handleRetry() {
    setQuestionCount(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setStarted(false);
  }

  function handleNextQuestion() {
    setQuestionCount(prev => prev + 1);
    fetchQuestion(); // Yeni bir soru getir
    setSelectedAnswer(null);
    setShowHint(false);
  }

  if (!started) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white w-full">
          <div className="text-3xl font-bold mb-4 text-center">
            VisionAI Teste Hoşgeldin
          </div>
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Teste Başla
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white w-full">
          <ClipLoader color="#ffffff" size={60} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white w-full">
          <div className="text-2xl font-semibold text-red-500">{error}</div>
          <button 
            onClick={handleRetry} 
            className="mt-4 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white w-full">
          <div className="text-4xl font-bold mb-4">Alıştırma Tamamlandı!</div>
          <div className="text-2xl font-medium mb-6">
            Toplam Puanınız: {score} / {TOTAL_QUESTIONS}
          </div>
          <button 
            onClick={handleRetry} 
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Tekrar Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white w-full">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg text-black"> {/* Renk düzenlemeleri yapıldı */}
          {questionData && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">{questionData.question}</h2>
              <div className="space-y-4">
                {questionData.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(choice)}
                    className={`w-full py-3 px-5 border rounded-lg font-medium transition transform hover:scale-105
                      ${
                        selectedAnswer
                          ? choice === questionData.correctAnswer
                            ? "bg-green-500 text-white"
                            : choice === selectedAnswer
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                          : "bg-gray-100 hover:bg-blue-200"
                      }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              {showHint && (
                <p className="mt-4 text-sm font-light text-red-600">
                  İpucu: Doğru cevap "{questionData.correctAnswer}".
                </p>
              )}
              <button 
                onClick={handleNextQuestion}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Yeni Soru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
