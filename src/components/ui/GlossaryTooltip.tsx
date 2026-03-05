"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/i18n/LangProvider";
import { findGlossaryEntry } from "@/lib/glossary";
import type { Lang } from "@/i18n/translations";

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

/**
 * Tooltip that shows a plain-language explanation for education terms.
 * Tap/hover to reveal — designed for first-time parents.
 */
export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("below");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const entry = findGlossaryEntry(term);
  if (!entry) return <>{children}</>;

  const description = entry.description[lang as Lang] || entry.description.th;

  // Position tooltip above or below based on viewport space
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceBelow < 160 ? "above" : "below");
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !tooltipRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [open]);

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          updatePosition();
          setOpen(!open);
        }}
        onMouseEnter={() => {
          updatePosition();
          setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        className="cursor-help border-b border-dotted border-indigo-300 text-indigo-700 transition-colors hover:border-indigo-500 hover:text-indigo-800"
        role="button"
        aria-expanded={open}
        aria-label={`${term} — tap for explanation`}
      >
        {children}
      </span>

      {open && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-50 w-72 rounded-xl border border-gray-100 bg-white p-3 shadow-lg shadow-black/8 transition-all duration-150 ${
            position === "above"
              ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
              : "top-full left-1/2 mt-2 -translate-x-1/2"
          }`}
        >
          {/* Arrow */}
          <div
            className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-gray-100 bg-white ${
              position === "above"
                ? "bottom-[-6px] border-l-0 border-t-0"
                : "top-[-6px] border-b-0 border-r-0"
            }`}
          />
          {/* Header */}
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
              {entry.category === "curriculum" ? "หลักสูตร" :
               entry.category === "assessment" ? "การสอบ" :
               entry.category === "methodology" ? "แนวการเรียน" :
               entry.category === "metric" ? "ตัวชี้วัด" :
               "นโยบาย"}
            </span>
            <span className="text-xs font-semibold text-gray-800">
              {entry.term}
            </span>
          </div>
          {/* Description */}
          <p className="text-[11px] leading-relaxed text-gray-600">
            {description}
          </p>
        </div>
      )}
    </span>
  );
}
