"use client";

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 active:scale-95 ${
        active
          ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
          : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
      }`}
    >
      {label}
    </button>
  );
}
