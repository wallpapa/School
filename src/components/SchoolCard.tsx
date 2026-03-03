import Link from "next/link";
import {
  School,
  CATEGORY_LABELS,
  CURRICULUM_LABELS,
  TierLevel,
} from "@/types/school";

function TierBadge({ tier }: { tier: TierLevel | null }) {
  if (!tier) return null;
  const colors: Record<TierLevel, string> = {
    tier_1: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    tier_2: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
    tier_3: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  };
  const labels: Record<TierLevel, string> = {
    tier_1: "Tier 1",
    tier_2: "Tier 2",
    tier_3: "Tier 3",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[tier]}`}>
      {labels[tier]}
    </span>
  );
}

function EfScore({ score }: { score: number | null }) {
  if (!score) return null;
  const color =
    score >= 8
      ? "text-green-600 dark:text-green-400"
      : score >= 6
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400";
  return (
    <div className="flex items-center gap-1">
      <span className={`text-lg font-bold ${color}`}>{score}</span>
      <span className="text-xs text-muted">/10</span>
    </div>
  );
}

function formatFee(min: number | null, max: number | null) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("th-TH", { notation: "compact" }).format(n);
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  return fmt(min || max!);
}

export default function SchoolCard({ school }: { school: School }) {
  const fee = formatFee(school.fee_min, school.fee_max);

  return (
    <Link
      href={`/school/${school.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{school.flag}</span>
          <h3 className="font-semibold leading-tight group-hover:text-accent">
            {school.name}
          </h3>
        </div>
        <EfScore score={school.ef_score} />
      </div>

      {school.name_th && (
        <p className="mb-2 text-sm text-muted">{school.name_th}</p>
      )}

      <div className="mb-3 flex flex-wrap gap-1.5">
        <TierBadge tier={school.tier} />
        <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent">
          {CURRICULUM_LABELS[school.curriculum]}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {CATEGORY_LABELS[school.category]}
        </span>
      </div>

      {school.description && (
        <p className="mb-3 line-clamp-2 text-sm text-muted">
          {school.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between text-xs text-muted">
        <span>
          {school.district && `${school.district}, `}
          {school.city || "Bangkok"}
        </span>
        {fee && <span className="font-medium">THB {fee}/yr</span>}
      </div>
    </Link>
  );
}
