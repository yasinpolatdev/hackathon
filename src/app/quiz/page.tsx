"use client";  // Bu satır Next.js'e bu dosyanın bir Client Component olduğunu söyler

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Sidebar from "../Dashboard/sidebar";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

// Sabit sorular listesi
const SORULAR = [
  { soru: "JavaScript'te, bir değişkene bir değeri nasıl atarsınız?", dogruCevap: "let x = 5;" },
  { soru: "JavaScript'te `const` ve `let` arasındaki fark nedir?", dogruCevap: "`const` ile tanımlanan değer değiştirilemez; `let` ile tanımlanan değiştirilebilir." },
  { soru: "Bir fonksiyonu bir değişkene atama işlemi ne olarak adlandırılır?", dogruCevap: "Fonksiyon ifadesi" },
];

export default function QuizApp() {
  const [mevcutSoruIndex, setMevcutSoruIndex] = useState(0);
  const [kullaniciCevabi, setKullaniciCevabi] = useState("");
  const [dogruMu, setDogruMu] = useState<boolean | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const mevcutSoru = SORULAR[mevcutSoruIndex];

  // Kullanıcının cevabını yapay zekaya göndererek doğrulama yapar
  async function cevabiGonder() {
    setYukleniyor(true);
    setHata(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const istem = `Soru: ${mevcutSoru.soru} \n Cevap: ${kullaniciCevabi} \n Bu cevap doğru mu? Yalnızca "Doğru" veya "Yanlış" olarak yanıtla.`;
      const sonuc = await model.generateContent([istem]);

      const yanitMetni = sonuc.response.text().trim().toLowerCase();
      console.log("Değerlendirme Yanıtı:", yanitMetni);

      if (yanitMetni === "doğru") {
        setDogruMu(true);
        setHata(null);
      } else if (yanitMetni === "yanlış") {
        setDogruMu(false);
        setHata("Yanlış cevap! Lütfen tekrar deneyin.");
      } else {
        setHata("Cevap değerlendirmesi başarısız oldu. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Cevabı değerlendirirken hata oluştu:", err);
      setHata("Cevap değerlendirilemedi. Lütfen tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  const sonrakiSoruyuGetir = () => {
    setKullaniciCevabi("");
    setDogruMu(null);
    setHata(null);
    if (mevcutSoruIndex < SORULAR.length - 1) {
      setMevcutSoruIndex((prevIndex) => prevIndex + 1);
    } else {
      setHata("Tebrikler! Tüm soruları başarıyla yanıtladınız.");
    }
  };

  const sinaviYenidenBaslat = () => {
    setMevcutSoruIndex(0);
    setKullaniciCevabi("");
    setDogruMu(null);
    setHata(null);
  };

  return (
    <div className="flex min-h-screen text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      <Sidebar /> 
      
      <main className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex flex-col items-center justify-center mx-auto p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg space-y-4 animate-slideIn">
          {yukleniyor ? (
            <div className="flex items-center space-x-2 animate-fadeInOut">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#990000] dark:border-white"></div>
              <p className="text-[#990000] dark:text-white font-medium">İşlem yapılıyor...</p>
            </div>
          ) : hata && mevcutSoruIndex === SORULAR.length ? (
            <div className="text-center">
              <p className="text-green-500">{hata}</p>
              <button
                onClick={sinaviYenidenBaslat}
                className="mt-4 bg-[#990000] dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full hover:bg-[#800000] dark:hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
              >
                Sınavı Yeniden Başlat
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-center text-[#990000] dark:text-white">
                Soru {mevcutSoruIndex + 1} / {SORULAR.length}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{mevcutSoru.soru}</p>

              <input
                type="text"
                value={kullaniciCevabi}
                onChange={(e) => setKullaniciCevabi(e.target.value)}
                placeholder="Cevabınızı yazınız..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-300"
              />

              {dogruMu !== null ? (
                <div className="mt-4 text-center">
                  {dogruMu ? (
                    <div className="text-green-500 flex items-center justify-center space-x-2">
                      <FaCheckCircle className="text-2xl" />
                      <span className="text-base font-medium">Tebrikler! Doğru cevap verdiniz.</span>
                    </div>
                  ) : (
                    <div className="text-red-500 flex items-center justify-center space-x-2">
                      <FaTimesCircle className="text-2xl" />
                      <span className="text-base font-medium">Yanlış! Tekrar deneyin.</span>
                    </div>
                  )}
                  {dogruMu ? (
                    <button
                      onClick={sonrakiSoruyuGetir}
                      className="mt-4 bg-[#990000] dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full hover:bg-[#800000] dark:hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
                    >
                      Sonraki Soru
                    </button>
                  ) : null}
                </div>
              ) : (
                <button
                  onClick={cevabiGonder}
                  className="mt-4 bg-[#990000] dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full w-full hover:bg-[#800000] dark:hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
                >
                  Cevap Gönder
                </button>
              )}
            </>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 1s ease-in-out;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
