"use client";

interface Props {
  variant?: "line" | "card" | "update-card";
  count?: number;
}

function SkeletonLine() {
  return (
    <div className="h-3 w-full animate-shimmer rounded-md bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="flex gap-3">
        <div className="h-10 w-10 flex-shrink-0 animate-shimmer rounded-xl bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 animate-shimmer rounded-full bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
          <div className="h-4 w-3/4 animate-shimmer rounded-md bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
          <div className="h-3 w-1/2 animate-shimmer rounded-md bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
        </div>
      </div>
    </div>
  );
}

export default function Skeleton({ variant = "line", count = 1 }: Props) {
  const items = Array.from({ length: count });

  if (variant === "line") {
    return (
      <div className="space-y-2">
        {items.map((_, i) => (
          <SkeletonLine key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
