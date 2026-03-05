interface EfBadgeProps {
  score: number;
  size?: "sm" | "md";
}

export default function EfBadge({ score, size = "sm" }: EfBadgeProps) {
  const level =
    score >= 8 ? "high" : score >= 6 ? "med" : "low";
  const colors = {
    high: "bg-[rgba(52,199,89,0.08)] text-[#248A3D]",
    med: "bg-[rgba(255,159,10,0.08)] text-[#C93400]",
    low: "bg-[rgba(255,59,48,0.08)] text-[#D70015]",
  };
  const sizeClass = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors[level]} ${sizeClass}`}
    >
      EF {score}/10
    </span>
  );
}
