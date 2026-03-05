"use client";

import { useState, type ReactNode } from "react";

interface ExpandableSectionProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableSection({
  label,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-center gap-1.5 border-none bg-transparent py-3 text-[13px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
      >
        <span>{label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
