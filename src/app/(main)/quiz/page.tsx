"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFinder } from "@/context/FinderContext";
import { quizQuestions, type PersonaType } from "@/data/quiz";

export default function QuizPage() {
  const router = useRouter();
  const { update } = useFinder();
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState<Record<PersonaType, number>>({
    authoritative: 0,
    authoritarian: 0,
    permissive: 0,
    neglectful: 0,
  });

  const q = quizQuestions[idx];
  const progress = (idx / quizQuestions.length) * 100;

  const answer = (type: PersonaType) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (idx + 1 < quizQuestions.length) {
      setIdx(idx + 1);
    } else {
      // Find the persona with highest score
      let best: PersonaType = "authoritative";
      let max = 0;
      (Object.keys(newScores) as PersonaType[]).forEach((k) => {
        if (newScores[k] > max) {
          max = newScores[k];
          best = k;
        }
      });
      update({ persona: best });
      router.push("/quiz/result");
    }
  };

  return (
    <div className="animate-page-enter md:mx-auto md:max-w-[560px]">
      {/* Progress bar */}
      <div className="mb-6 h-[3px] overflow-hidden rounded-sm bg-[var(--color-surface-alt)]">
        <div
          className="h-full rounded-sm bg-[var(--color-text)] transition-all duration-400"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-5 text-[17px] font-semibold leading-relaxed">
        {idx + 1}/{quizQuestions.length}. {q.question}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answer(opt.type)}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-[18px] py-[15px] text-left text-sm leading-relaxed text-[var(--color-text)] transition-all duration-200 hover:border-[var(--color-text)] hover:bg-[var(--color-surface-alt)] active:border-[var(--color-text)] active:bg-[var(--color-surface-alt)]"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
