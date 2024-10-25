"use client"; // İstemci bileşeni olarak işaretle

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 500); // 500ms gecikme ile göster
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#1a1a1a]">
      {/* Minimalist Kapak */}
      <main className="flex flex-col gap-8 row-start-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <h1
            className={`text-4xl sm:text-6xl font-bold transition-opacity duration-1000 ${
              showText ? "opacity-100" : "opacity-0"
            }`}
          >
            Merhaba Dünyalı
          </h1>
          <p
            className={`mt-4 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 transition-opacity duration-1000 delay-300 ${
              showText ? "opacity-100" : "opacity-0"
            }`}
          >
            UNILAB Vision dünyasına hoş geldin!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-2 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
