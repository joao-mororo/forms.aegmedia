"use client";

import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const quotes = [
  {
    text: "Logo no primeiro mês, eu já vendia 8 carros, depois de dois meses eu já estava vendendo 20 carros.",
    author: "Vitor Hugo, VH Motors"
  },
  {
    text: "A gente usa, a gente sabe que funciona, na nossa operação, está indo muito bem.",
    author: "Bello, BellosCar"
  },
  {
    text: "É surreal a forma como você vai multiplicar suas vendas e aumentar o faturamento.",
    author: "Edylton, Petrolina Seminovos"
  }
];

export default function QuoteCarousel() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="rounded-xl shadow-md min-h-[140px] flex flex-col justify-between">
      <div className="flex flex-col items-center sm:flex-row p-4 gap-3 text-lg">
        <Quote className="text-cyan-500 flex-shrink-0" size={24} />
        <p className="opacity-50 font-bold transition-all duration-500 ease-in-out">
          {currentQuote.text}
        </p>
      </div>
      <p className="bg-cyan-100 text-cyan-600 p-2 pl-4 transition-all duration-500 ease-in-out sm:rounded-b-xl">
        {currentQuote.author}
      </p>
    </div>
  );
}
