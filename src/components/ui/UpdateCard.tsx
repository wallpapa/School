"use client";

import { useLang } from "@/i18n/LangProvider";
import { CATEGORY_CONFIG, relativeTime } from "@/types/updates";
import type { SchoolUpdate } from "@/types/updates";
import CountdownBadge from "./CountdownBadge";

interface Props {
  update: SchoolUpdate;
  compact?: boolean;
}

export default function UpdateCard({ update, compact }: Props) {
  const { lang, t } = useLang();
  const config = CATEGORY_CONFIG[update.category] ?? {
    icon: "📰",
    color: "#86868B",
    labelKey: "catGeneralNews",
  };
  const title = lang === "th" ? update.title_th : update.title_en;
  const body = lang === "th" ? update.body_th : update.body_en;

  return (
    <div className="card-interactive group relative flex gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      {/* Left color strip */}
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
        style={{ background: `${config.color}14` }}
      >
        {config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {/* Category chip */}
            <span
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: `${config.color}18`, color: config.color }}
            >
              {t(config.labelKey)}
            </span>
            {/* Title */}
            <h4 className="mt-1 text-[13px] font-semibold leading-snug text-[var(--color-text)]">
              {title}
            </h4>
          </div>

          {/* Countdown if event_date exists */}
          {update.event_date && (
            <CountdownBadge dateStr={update.event_date} />
          )}
        </div>

        {/* Body (hide if compact) */}
        {!compact && body && (
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
            {body}
          </p>
        )}

        {/* Data value highlight */}
        {update.data_value && (
          <div className="mt-1.5 inline-block rounded-lg bg-[var(--color-surface)] px-2 py-0.5 text-[12px] font-bold text-[var(--color-text)]">
            {update.data_value}
            {update.data_unit && (
              <span className="ml-0.5 font-normal text-[var(--color-text-secondary)]">
                {update.data_unit}
              </span>
            )}
          </div>
        )}

        {/* Footer: timestamp + verified + source */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
          <span>{relativeTime(update.data_updated_at, lang)}</span>
          {update.is_verified && (
            <span className="inline-flex items-center gap-0.5 text-[var(--color-success)]">
              ✓ {lang === "th" ? "ยืนยันแล้ว" : "verified"}
            </span>
          )}
          {update.source_url && (
            <a
              href={update.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted hover:text-[var(--color-accent)]"
            >
              {update.source_name || (lang === "th" ? "แหล่งข้อมูล" : "source")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
