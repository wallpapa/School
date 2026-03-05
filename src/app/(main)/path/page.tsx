"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { schools, schoolById } from "@/data/schools";

// Feeder path data: which schools feed into which
const feederPaths: {
  fromId: number;
  toIds: number[];
  fit: number; // 1-10
  note: string;
}[] = [
  { fromId: 5, toIds: [6, 1, 3], fit: 9, note: "IB Continuum → IB DP schools" },
  { fromId: 9, toIds: [6, 5, 8], fit: 8, note: "IB-style PBL → Full IB" },
  { fromId: 7, toIds: [1, 2, 3], fit: 8, note: "IGCSE feeder → A-Level/IB DP" },
  { fromId: 8, toIds: [1, 2, 6], fit: 7, note: "British prep → British senior" },
  { fromId: 10, toIds: [1, 2, 3], fit: 8, note: "British early years → senior" },
  { fromId: 27, toIds: [5, 6, 28], fit: 7, note: "Trilingual → IB or bilingual" },
  { fromId: 28, toIds: [5, 6, 27], fit: 7, note: "SISB → IB pathway" },
  { fromId: 31, toIds: [36, 37, 38], fit: 9, note: "สาธิตจุฬา → รร.ชั้นนำ" },
  { fromId: 32, toIds: [36, 37, 39], fit: 8, note: "สาธิตประสานมิตร → รร.รัฐชั้นนำ" },
  { fromId: 33, toIds: [36, 38, 40], fit: 8, note: "สาธิตเกษตร → วิทย์/แพทย์" },
  { fromId: 34, toIds: [36, 37, 38], fit: 7, note: "สาธิตปทุมวัน → รร.ชั้นนำ" },
];

export default function PathPage() {
  const { t } = useLang();
  const [selectedFrom, setSelectedFrom] = useState<number | null>(null);

  // Schools that appear as feeders
  const feederSchools = useMemo(() => {
    const ids = new Set(feederPaths.map((p) => p.fromId));
    return schools.filter((s) => ids.has(s.id));
  }, []);

  const paths = useMemo(() => {
    if (!selectedFrom) return [];
    return feederPaths.filter((p) => p.fromId === selectedFrom);
  }, [selectedFrom]);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("pathTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("pathSub")}
        </p>
      </div>

      {/* From selector */}
      <div className="mb-5">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("pathSelectLabel")}
        </div>
        <select
          className="form-input"
          value={selectedFrom ?? ""}
          onChange={(e) => setSelectedFrom(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">{t("pathSelectDefault")}</option>
          {feederSchools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.flag} {s.short}
            </option>
          ))}
        </select>
      </div>

      {/* Paths */}
      {selectedFrom && paths.length > 0 && (
        <div className="flex flex-col gap-3">
          {paths.map((path, pi) => (
            <div key={pi}>
              <div className="mb-2 text-[12px] text-[var(--color-text-secondary)]">
                {path.note}
              </div>
              <div className="flex flex-col gap-2">
                {path.toIds.map((toId) => {
                  const target = schoolById.get(toId);
                  if (!target) return null;
                  return (
                    <Link
                      key={toId}
                      href={`/school/${toId}`}
                      className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 no-underline transition-all active:scale-[0.98]"
                    >
                      <span className="text-2xl">{target.flag}</span>
                      <div className="flex-1">
                        <div className="text-[14px] font-bold text-[var(--color-text)]">
                          {target.short}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-secondary)]">
                          {target.curL} • {target.locL}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[16px] font-bold text-[var(--color-success)]">
                          {path.fit * 10}%
                        </div>
                        <div className="text-[9px] text-[var(--color-text-secondary)]">
                          {t("pathFit")}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedFrom && paths.length === 0 && (
        <div className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
          {t("pathNoData")}
        </div>
      )}

      {!selectedFrom && (
        <div className="mt-10 text-center">
          <div className="text-4xl">🛤️</div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            {t("pathEmptyState")}
          </p>
        </div>
      )}
    </div>
  );
}
