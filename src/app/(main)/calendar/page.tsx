"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/i18n/LangProvider";
import { admissionCalendar, schools, type AdmissionCalendarEntry, type AdmissionEvent } from "@/data/schools";
import { useUpcomingEvents } from "@/hooks/useSchoolUpdates";
import { CATEGORY_CONFIG, daysUntil } from "@/types/updates";
import CountdownBadge from "@/components/ui/CountdownBadge";
import Skeleton from "@/components/ui/Skeleton";

const eventColors: Record<string, string> = {
  apply: "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-[var(--color-accent)]/30",
  deadline: "bg-[var(--color-error)]/15 text-[var(--color-error)] border-[var(--color-error)]/30",
  exam: "bg-[var(--color-warning)]/15 text-[var(--color-warning)] border-[var(--color-warning)]/30",
  openday: "bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/30",
  result: "bg-purple-100 text-purple-700 border-purple-200",
  info: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function CalendarPage() {
  const { lang, t } = useLang();
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = all
  const monthNames = t("monthNames").split(",");
  const { events: upcomingEvents, loading: eventsLoading } = useUpcomingEvents(5);

  const filtered = useMemo(() => {
    if (selectedMonth === 0) return admissionCalendar;
    return admissionCalendar
      .map((entry) => ({
        ...entry,
        events: entry.events.filter((e) => e.m === selectedMonth),
      }))
      .filter((entry) => entry.events.length > 0);
  }, [selectedMonth]);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("calendarTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("calendarSub")}
        </p>
      </div>

      {/* ── Upcoming Events Highlight ── */}
      {eventsLoading ? (
        <div className="mb-5">
          <Skeleton variant="card" count={1} />
        </div>
      ) : upcomingEvents.length > 0 ? (
        <div className="mb-5 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-[#2D2D3F] p-5 text-white">
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-white/60">
            {t("upcomingEvents")}
          </h3>
          <div className="flex flex-col gap-2.5">
            {upcomingEvents.map((ev) => {
              const schoolName = schools.find((s) => s.id === ev.school_id)?.short || "";
              return (
                <div key={ev.id} className="flex items-center gap-3">
                  <span className="text-lg flex-shrink-0">
                    {CATEGORY_CONFIG[ev.category]?.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold leading-snug truncate">
                      {lang === "th" ? ev.title_th : ev.title_en}
                    </div>
                    <div className="text-[10px] text-white/50">{schoolName}</div>
                  </div>
                  {ev.event_date && (
                    <CountdownBadge dateStr={ev.event_date} showDate />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Month tabs */}
      <div className="mb-5 -mx-5 overflow-x-auto px-5">
        <div className="flex gap-1.5" style={{ minWidth: "max-content" }}>
          <MonthTab
            label={t("allMonths")}
            active={selectedMonth === 0}
            onClick={() => setSelectedMonth(0)}
          />
          {monthNames.map((name, i) => (
            <MonthTab
              key={i}
              label={name}
              active={selectedMonth === i + 1}
              onClick={() => setSelectedMonth(i + 1)}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { type: "apply", label: t("eventApply") },
          { type: "deadline", label: t("eventDeadline") },
          { type: "exam", label: t("eventExam") },
          { type: "openday", label: t("eventOpenday") },
          { type: "result", label: t("eventResult") },
        ].map((item) => (
          <span
            key={item.type}
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${eventColors[item.type]}`}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* School event blocks */}
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        {filtered.map((entry) => (
          <SchoolCalendarBlock key={entry.id} entry={entry} monthNames={monthNames} t={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
          ไม่มีกำหนดการในเดือนนี้
        </div>
      )}
    </div>
  );
}

function MonthTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[12px] font-medium transition-all ${
        active
          ? "bg-[var(--color-text)] text-white"
          : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
      }`}
    >
      {label}
    </button>
  );
}

function SchoolCalendarBlock({
  entry,
  monthNames,
  t,
}: {
  entry: AdmissionCalendarEntry;
  monthNames: string[];
  t: (key: string) => string;
}) {
  return (
    <div className="card-interactive rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[14px] font-bold">{entry.name}</span>
        <span className="text-[11px] text-[var(--color-text-secondary)]">
          {t("termStart")}: {entry.termStart}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {entry.events.map((event, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-0.5 min-w-[32px] text-[11px] font-medium text-[var(--color-text-secondary)]">
              {monthNames[event.m - 1]}
            </span>
            <span
              className={`rounded-lg border px-2 py-0.5 text-[11px] font-medium ${
                eventColors[event.type || "info"]
              }`}
            >
              {event.label}
            </span>
            {event.note && (
              <span className="text-[11px] text-[var(--color-text-secondary)]">
                {event.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
