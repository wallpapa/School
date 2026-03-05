"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { useFinder } from "@/context/FinderContext";
import { schools } from "@/data/schools";
import { matchSchools, type MatchResult } from "@/lib/matching";
import MatchBar from "@/components/ui/MatchBar";
import EfBadge from "@/components/ui/EfBadge";
import ExpandableSection from "@/components/ui/ExpandableSection";

export default function ResultsPage() {
  const { t } = useLang();
  const { state } = useFinder();
  const [showCount, setShowCount] = useState(10);

  const results = useMemo(() => matchSchools(schools, state, t), [state, t]);
  const visible = results.slice(0, showCount);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("resultsTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("resultsFound").replace("{n}", String(results.length))}
        </p>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        {visible.map((r, i) => (
          <SchoolResultCard key={r.school.id} result={r} rank={i + 1} />
        ))}
      </div>

      {/* Load More */}
      {showCount < results.length && (
        <button
          onClick={() => setShowCount((c) => c + 10)}
          className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-center text-sm text-[var(--color-text-secondary)] transition-all active:scale-[0.98]"
        >
          {t("loadMore")} ({results.length - showCount} {t("remaining")})
        </button>
      )}

      {/* No results */}
      {results.length === 0 && (
        <div className="mt-10 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            {t("noResults")}
          </p>
          <Link
            href="/find"
            className="mt-4 inline-block rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-bold text-white no-underline"
          >
            {t("adjustFilters")}
          </Link>
        </div>
      )}

      {/* Back */}
      <Link
        href="/find"
        className="mt-4 mb-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backToFind")}
      </Link>
    </div>
  );
}

function SchoolResultCard({ result, rank }: { result: MatchResult; rank: number }) {
  const { t } = useLang();
  const s = result.school;

  return (
    <div className="card-interactive overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Header band */}
      <div className="flex items-center justify-between bg-[var(--color-text)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{s.flag}</span>
          <span className="text-[15px] font-bold text-white">{s.short}</span>
        </div>
        <div className="flex items-center gap-2">
          <EfBadge score={s.efScore} />
          <span className="text-xs text-white/60">#{rank}</span>
        </div>
      </div>

      {/* Match bar */}
      <div className="px-4 pt-3">
        <MatchBar percent={result.score} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 px-4 pt-2.5">
        <span className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]">
          {s.curL}
        </span>
        {s.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-surface-alt)] px-2.5 py-1 text-[11px] text-[var(--color-text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Reasons */}
      <div className="px-4 pt-3">
        {result.reasons.slice(0, 4).map((r, i) => (
          <div key={i} className="flex items-start gap-1.5 py-0.5">
            <span className="text-[var(--color-success)]">✓</span>
            <span className="text-[12px] leading-snug text-[var(--color-text-secondary)]">
              {r}
            </span>
          </div>
        ))}
      </div>

      {/* Info grid */}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2 rounded-xl bg-white p-3">
        <div>
          <div className="text-[10px] uppercase text-[var(--color-text-secondary)]">
            {t("location")}
          </div>
          <div className="text-[13px] font-medium">{s.locL}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-[var(--color-text-secondary)]">
            {t("annualFee")}
          </div>
          <div className="text-[13px] font-medium">
            {(s.tMin / 1000).toFixed(0)}K–{(s.tMax / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      {/* Track Record expandable */}
      {s.track.topUni && s.track.topUni.length > 0 && (
        <div className="px-4 pt-2">
          <ExpandableSection label={t("trackRecord")}>
            <div className="rounded-xl bg-white p-3">
              {s.track.igcse && (
                <div className="mb-1 text-[12px]">
                  <span className="font-medium">IGCSE:</span> {s.track.igcse}
                </div>
              )}
              {s.track.aLevel && (
                <div className="mb-1 text-[12px]">
                  <span className="font-medium">A-Level:</span> {s.track.aLevel}
                </div>
              )}
              {s.track.ibAvg && (
                <div className="mb-1 text-[12px]">
                  <span className="font-medium">IB:</span> {s.track.ibAvg}
                  {s.track.ibNote && ` (${s.track.ibNote})`}
                </div>
              )}
              {s.track.topUni && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.track.topUni.map((u) => (
                    <span
                      key={u}
                      className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-[10px] font-medium"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              )}
              {s.track.medical && (
                <div className="mt-2 text-[12px] text-[var(--color-success)]">
                  🏥 {typeof s.track.medical === "string" ? s.track.medical : t("medicalTrack")}
                </div>
              )}
            </div>
          </ExpandableSection>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 p-4">
        <Link
          href={`/school/${s.id}`}
          className="flex-1 rounded-xl bg-[var(--color-text)] px-3 py-2.5 text-center text-[12px] font-bold text-white no-underline transition-all active:scale-[0.97]"
        >
          {t("viewDetail")}
        </Link>
        {s.web && (
          <a
            href={s.web}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--color-border)] px-3 py-2.5 text-center text-[12px] text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
          >
            Web
          </a>
        )}
        {s.mq && (
          <a
            href={`https://maps.google.com/?q=${s.mq}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--color-border)] px-3 py-2.5 text-center text-[12px] text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
          >
            Maps
          </a>
        )}
      </div>
    </div>
  );
}
