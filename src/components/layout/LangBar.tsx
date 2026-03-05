"use client";

import { useLang } from "@/i18n/LangProvider";
import type { Lang } from "@/i18n/translations";

const langs: { code: Lang; label: string }[] = [
  { code: "th", label: "TH" },
  { code: "en", label: "EN" },
  { code: "zh", label: "ZH" },
  { code: "ja", label: "JA" },
];

export default function LangBar() {
  const { lang, setLang } = useLang();

  return (
    <div className="glass sticky top-0 z-40 flex justify-center gap-1 border-b border-[var(--color-border)] px-4 py-2.5 lg:justify-start">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-full border-none px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
            lang === l.code
              ? "bg-[var(--color-text)] text-white"
              : "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
