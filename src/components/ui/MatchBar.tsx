interface MatchBarProps {
  percent: number;
  label?: string;
}

export default function MatchBar({ percent, label }: MatchBarProps) {
  const color =
    percent >= 80
      ? "bg-[var(--color-success)]"
      : percent >= 60
        ? "bg-[var(--color-warning)]"
        : "bg-[var(--color-error)]";

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-[11px] text-[var(--color-text-secondary)]">
          {label}
        </span>
      )}
      <div className="flex-1 h-1 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-600 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="min-w-[42px] text-right text-sm font-bold">
        {percent}%
      </span>
    </div>
  );
}
