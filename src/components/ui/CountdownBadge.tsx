"use client";

import { useLang } from "@/i18n/LangProvider";
import { daysUntil } from "@/types/updates";

interface Props {
  dateStr: string;
  showDate?: boolean;
}

export default function CountdownBadge({ dateStr, showDate }: Props) {
  const { lang } = useLang();
  const days = daysUntil(dateStr);

  if (days < 0) return null; // Past event

  const label =
    days === 0
      ? lang === "th" ? "วันนี้!" : lang === "zh" ? "今天!" : lang === "ja" ? "今日!" : "Today!"
      : lang === "th" ? `${days} วัน` : lang === "zh" ? `${days}天` : lang === "ja" ? `${days}日` : `${days}d`;

  // Color: green (>30), orange (7-30), red (<7)
  const bg =
    days <= 3
      ? "bg-[var(--color-error)]"
      : days <= 7
        ? "bg-[var(--color-warning)]"
        : days <= 30
          ? "bg-[#FF9500]"
          : "bg-[var(--color-success)]";

  const pulse = days <= 3 ? "animate-gentle-pulse" : "";

  return (
    <span
      className={`${bg} ${pulse} inline-flex flex-shrink-0 items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-white`}
    >
      {label}
      {showDate && (
        <span className="ml-0.5 font-normal opacity-80">
          {new Date(dateStr).toLocaleDateString(
            lang === "th" ? "th-TH" : lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en-US",
            { day: "numeric", month: "short" }
          )}
        </span>
      )}
    </span>
  );
}
