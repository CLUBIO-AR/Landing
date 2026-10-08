"use client";

import { useEffect, useState } from "react";

const QUESTIONS = [
  "¿Tenés un gym?",
  "¿Sos profe?",
  "¿Tenés una escuela de danza?",
  "¿Das clases de artes marciales?",
  "¿Manejás un club?",
];

// Pregunta rotativa del hero. Es decorativa: el texto completo queda para
// lectores de pantalla en un span sr-only, y con reduced-motion no rota.
export function RotatingQuestion() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % QUESTIONS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="font-display text-2xl sm:text-3xl md:text-4xl uppercase leading-none">
      <span className="sr-only">{QUESTIONS.join(" ")}</span>
      <span
        key={index}
        aria-hidden="true"
        className="inline-block rounded-md bg-lime px-3 py-2 text-lime-text animate-question"
      >
        {QUESTIONS[index]}
      </span>
    </p>
  );
}
