"use client";

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from "../Dashboard/Sidebar";
import confetti from "canvas-confetti";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const TOTAL_QUESTIONS = 5;

const PROMPT_TEXT = "Python kodlama alanında başlangıç seviyesinde özgün ve orijinal sorular içeren tek bir soru hazırla. Direkt soruyu sor. başlık vs olmadan yap. sadece soruyu ve cevapları ver. Her soru en fazla 3-4 cümle uzunluğunda ve yalnızca düz yazı formatında (sembolsüz ve tek satır) olsun.";

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
      setQuestionCount(prev => prev + 1); 
      fetchQuestion(); 
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
      <div className="flex">
        <Sidebar /> 
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-gray-800 dark:text-white bg-transparent">
          <div className="text-2xl md:text-3xl font-bold mb-4 text-red-600 text-center">VisionI Alıştırmalarına Hoş Geldiniz</div>
          <p className="text-base md:text-lg mb-6 text-center">Bu alıştırmada biyoinformatik konularında sorulara cevap vereceksiniz. Bu eğitim modülü henüz alpha sürümündedir. Başarılar!</p>
          <button
            onClick={() => setStarted(true)}
            className="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
          >
            Başla
          </button>
        </div>
      </div>
    );
  }

  if (loading && !showScore) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-200">
          <div className="animate-pulse text-xl md:text-2xl font-semibold">Alıştırmanız yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="flex">
        <Sidebar />
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
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-900">
        {questionData && (
          <div className="w-full max-w-xl md:max-w-2xl p-8 bg-gray-800 text-white border border-gray-600 rounded-lg md:rounded-xl shadow-lg text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-medium mb-6 leading-tight">
              {questionData.question}
            </h2>

            <div className="space-y-3">
              {questionData.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(choice)}
                  className={`w-full py-3 px-5 border rounded-md text-left font-medium transition duration-300 ease-in-out transform hover:scale-105
                    ${
                      selectedAnswer
                        ? choice === questionData.correctAnswer
                          ? "bg-green-700 border-green-400 text-white"
                          : choice === selectedAnswer
                          ? "bg-red-700 border-red-400 text-white"
                          : "bg-gray-700 border-gray-600 text-gray-300"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300"
                    }`}
                >
                  {choice}
                </button>
              ))}
            </div>
            {showHint && (
              <p className="mt-4 text-sm font-light text-red-400">
                İpucu: Doğru cevap "{questionData.correctAnswer}".
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
