"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "@/i18n/LangProvider";
import type { Lang } from "@/i18n/translations";

const langs: { code: Lang; label: string }[] = [
  { code: "th", label: "TH" },
  { code: "en", label: "EN" },
  { code: "zh", label: "ZH" },
  { code: "ja", label: "JA" },
];

/**
 * Compact language switcher — replaces the old full-width sticky bar.
 * Renders as a small pill dropdown to save vertical space.
 * Used in sidebar (desktop) and fixed top-right (mobile).
 */
export default function LangBar({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-[12px] font-semibold text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-text-secondary)]"
        aria-label="Change language"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M1.5 8h13M8 1.5c-2 2-2 11 0 13M8 1.5c2 2 2 11 0 13" />
        </svg>
        {lang.toUpperCase()}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[100px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-1 shadow-lg">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                lang === l.code
                  ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {l.label}
              {lang === l.code && (
                <svg viewBox="0 0 12 12" className="ml-auto h-3 w-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
