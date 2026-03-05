"use client";

import Link from "next/link";
import { useFinder } from "@/context/FinderContext";
import { useLang } from "@/i18n/LangProvider";
import { personaData } from "@/data/personas";
import type { PersonaType } from "@/data/quiz";

export default function QuizResultPage() {
  const { state } = useFinder();
  const { t } = useLang();
  const persona = (state.persona || "authoritative") as PersonaType;
  const d = personaData[persona];

  return (
    <div className="animate-fade-up md:mx-auto md:max-w-[560px]">
      {/* Persona Card */}
      <div className="relative mb-5 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-7 text-center">
        <div className="text-[44px]">{d.emoji}</div>
        <div className="mt-2 text-xl font-bold">{d.title}</div>
        <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {d.thai}
        </div>
        <div className="mb-3.5 mt-1 text-[15px] font-medium text-[var(--color-text-secondary)]">
          {d.nick}
        </div>

        {/* Axis pills */}
        <div className="flex justify-center gap-3">
          <span
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              d.demHigh
                ? "bg-[var(--color-surface-alt)] text-[var(--color-text)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
            }`}
          >
            {d.demHigh ? "มีกรอบ" : "ยืดหยุ่น"}
          </span>
          <span
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              d.resHigh
                ? "bg-[var(--color-surface-alt)] text-[var(--color-text)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
            }`}
          >
            {d.resHigh ? "ใกล้ชิด" : "ให้พื้นที่"}
          </span>
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-2 text-[15px] font-bold">{t("personaStrengths")}</div>
      <div className="mb-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        {d.strengths.map((s, i) => (
          <div key={i} className="py-1 text-[13px] leading-relaxed">
            · {s}
          </div>
        ))}
      </div>

      {/* EF Note */}
      <div className="mb-3 rounded-xl bg-[var(--color-surface)] p-3.5 text-[13px] leading-relaxed">
        {d.efNote}
      </div>

      {/* School Recommendations */}
      <div className="mt-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <div className="mb-2 text-sm font-bold">{t("personaSchoolRec")}</div>
        <div className="text-[13px] leading-relaxed">
          {d.schoolRec}
          <br />
          <br />
          {d.schoolTypes.map((s, i) => (
            <span key={i}>
              · {s}
              <br />
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/find"
        className="mt-5 block w-full rounded-xl bg-[var(--color-text)] px-4 py-[15px] text-center text-[15px] font-semibold text-white no-underline transition-all duration-200 active:scale-[0.97] active:opacity-80"
      >
        {t("continueBtn")}
      </Link>
    </div>
  );
}
