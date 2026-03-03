"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORY_LABELS, CURRICULUM_LABELS } from "@/types/school";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentCurriculum = searchParams.get("curriculum") || "";
  const currentTier = searchParams.get("tier") || "";
  const currentSearch = searchParams.get("q") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="text"
        placeholder="Search schools..."
        defaultValue={currentSearch}
        onChange={(e) => updateParams("q", e.target.value)}
        className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-accent sm:w-64"
      />

      <select
        value={currentCategory}
        onChange={(e) => updateParams("category", e.target.value)}
        className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-accent"
      >
        <option value="">All Categories</option>
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={currentCurriculum}
        onChange={(e) => updateParams("curriculum", e.target.value)}
        className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-accent"
      >
        <option value="">All Curricula</option>
        {Object.entries(CURRICULUM_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={currentTier}
        onChange={(e) => updateParams("tier", e.target.value)}
        className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-accent"
      >
        <option value="">All Tiers</option>
        <option value="tier_1">Tier 1</option>
        <option value="tier_2">Tier 2</option>
        <option value="tier_3">Tier 3</option>
      </select>
    </div>
  );
}
