"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/i18n/LangProvider";
import { schools } from "@/data/schools";
import { useSchoolUpdates, useUpcomingEvents } from "@/hooks/useSchoolUpdates";
import { CATEGORY_CONFIG } from "@/types/updates";
import type { UpdateCategory } from "@/types/updates";
import UpdateCard from "@/components/ui/UpdateCard";
import CountdownBadge from "@/components/ui/CountdownBadge";
import Skeleton from "@/components/ui/Skeleton";
import Chip from "@/components/ui/Chip";

const ITEMS_PER_PAGE = 10;

export default function NewsPage() {
  const { lang, t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { updates, loading: updatesLoading } = useSchoolUpdates(
    selectedSchool ?? undefined,
    selectedCategory !== "all" ? (selectedCategory as UpdateCategory) : undefined
  );
  const { events, loading: eventsLoading } = useUpcomingEvents(6);

  /* ── Category chips ── */
  const categoryChips = useMemo(() => {
    const allChip = { key: "all", label: t("allCategories") };
    const cats = Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => ({
      key,
      label: `${cfg.icon} ${t(cfg.labelKey)}`,
    }));
    return [allChip, ...cats];
  }, [t]);

  /* ── Stats ── */
  const totalUpdates = updates.length;
  const schoolsWithUpdates = new Set(updates.map((u) => u.school_id)).size;

  return (
    <div className="animate-page-enter">
      {/* Hero */}
      <div className="mb-5 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-[#2D2D3F] p-6 text-white">
        <h1 className="text-[22px] font-extrabold leading-tight md:text-[28px]">
          {t("newsTitle")}
        </h1>
        <p className="mt-1 text-[13px] text-white/60">
          {t("newsSub")}
        </p>
        {/* Stats */}
        <div className="mt-4 flex gap-6">
          <div>
            <div className="text-[24px] font-extrabold animate-count-up">
              {totalUpdates}
            </div>
            <div className="text-[10px] uppercase text-white/50">
              {lang === "th" ? "ข่าว" : "Updates"}
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold animate-count-up">
              {schoolsWithUpdates}
            </div>
            <div className="text-[10px] uppercase text-white/50">
              {t("statSchools")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Upcoming Events Highlight ── */}
      {!eventsLoading && events.length > 0 && (
        <div className="mb-5">
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("upcomingEvents")}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {events.map((ev) => {
              const schoolName = schools.find((s) => s.id === ev.school_id)?.short || "";
              return (
                <div
                  key={ev.id}
                  className="card-interactive flex-shrink-0 w-[200px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">
                      {CATEGORY_CONFIG[ev.category]?.icon}
                    </span>
                    {ev.event_date && (
                      <CountdownBadge dateStr={ev.event_date} showDate />
                    )}
                  </div>
                  <h4 className="text-[12px] font-semibold leading-snug text-[var(--color-text)]">
                    {lang === "th" ? ev.title_th : ev.title_en}
                  </h4>
                  {schoolName && (
                    <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      {schoolName}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="mb-4 space-y-3">
        {/* Category chips */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase text-[var(--color-text-secondary)]">
            {t("filterCategory")}
          </label>
          <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
            {categoryChips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                active={selectedCategory === chip.key}
                onClick={() => {
                  setSelectedCategory(chip.key);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
              />
            ))}
          </div>
        </div>

        {/* School filter */}
        <div>
          <select
            className="form-input"
            value={selectedSchool ?? ""}
            onChange={(e) => {
              setSelectedSchool(e.target.value ? Number(e.target.value) : null);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
          >
            <option value="">
              {lang === "th" ? "ทุกโรงเรียน" : "All Schools"}
            </option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.flag} {s.short}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Update Feed ── */}
      <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
        {t("liveUpdates")}
      </h2>

      {updatesLoading ? (
        <Skeleton variant="update-card" count={3} />
      ) : updates.length === 0 ? (
        <div className="py-12 text-center">
          <div className="text-4xl">📭</div>
          <p className="mt-3 text-[13px] text-[var(--color-text-secondary)]">
            {t("noUpdates")}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {updates.slice(0, visibleCount).map((u) => {
              const schoolName = schools.find((s) => s.id === u.school_id)?.short;
              return (
                <div key={u.id}>
                  {schoolName && (
                    <div className="mb-1 text-[10px] font-medium text-[var(--color-text-secondary)]">
                      {schoolName}
                    </div>
                  )}
                  <UpdateCard update={u} />
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {visibleCount < updates.length && (
            <button
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-transparent py-3 text-[13px] font-medium text-[var(--color-text-secondary)] transition-all active:scale-[0.98]"
            >
              {t("loadMoreUpdates")} ({updates.length - visibleCount})
            </button>
          )}
        </>
      )}
    </div>
  );
}
