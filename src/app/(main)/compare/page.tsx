"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { schools } from "@/data/schools";
import { IconCompare } from "@/components/ui/Icons";

/* ── Grade-to-remaining-years mapping ── */
const gradeYearsLeft: Record<string, number> = {
  baby: 15, toddler: 14, pre_nursery: 13, nursery: 12,
  kg1: 11, kg2: 10,
  p1: 9, p2: 8, p3: 7, p4: 6, p5: 5, p6: 4,
  m1: 3, m2: 2, m3: 1, m4: 3, m5: 2, m6: 1,
};

const ANNUAL_INCREASE = 0.05; // 5% average annual tuition increase

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(Math.round(n));
}

function calculateTotalCost(
  annualFee: number,
  yearsLeft: number,
  increase: number
): number {
  let total = 0;
  for (let y = 0; y < yearsLeft; y++) {
    total += annualFee * Math.pow(1 + increase, y);
  }
  return total;
}

export default function ComparePage() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState<number[]>([]);
  const [grade, setGrade] = useState("kg1");
  const [includeExtras, setIncludeExtras] = useState(false);
  const extraPerYear = 60000; // after-school, transport estimate

  const yearsLeft = gradeYearsLeft[grade] ?? 10;

  const addSchool = (id: number) => {
    if (selected.length < 3 && !selected.includes(id)) {
      setSelected([...selected, id]);
    }
  };

  const removeSchool = (id: number) => {
    setSelected(selected.filter((s) => s !== id));
  };

  const comparedSchools = useMemo(
    () => selected.map((id) => schools.find((s) => s.id === id)!).filter(Boolean),
    [selected]
  );

  const maxTotalCost = useMemo(() => {
    if (comparedSchools.length === 0) return 1;
    return Math.max(
      ...comparedSchools.map((s) =>
        calculateTotalCost(
          (s.tMin + s.tMax) / 2 + (includeExtras ? extraPerYear : 0),
          yearsLeft,
          ANNUAL_INCREASE
        )
      )
    );
  }, [comparedSchools, yearsLeft, includeExtras]);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("compareTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("compareSub")}
        </p>
      </div>

      {/* School selector */}
      <div className="mb-5">
        <label className="mb-1.5 block text-[11px] font-bold uppercase text-[var(--color-text-secondary)]">
          {t("compareSelectLabel")} ({selected.length}/3)
        </label>
        <select
          className="form-input"
          value=""
          onChange={(e) => {
            if (e.target.value) addSchool(Number(e.target.value));
          }}
        >
          <option value="">
            {lang === "th" ? "เลือกโรงเรียนเพื่อเปรียบเทียบ..." : "Select a school to compare..."}
          </option>
          {schools
            .filter((s) => !selected.includes(s.id))
            .map((s) => (
              <option key={s.id} value={s.id}>
                {s.flag} {s.short}
              </option>
            ))}
        </select>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {comparedSchools.map((s) => (
              <button
                key={s.id}
                onClick={() => removeSchool(s.id)}
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-text)] px-3 py-1.5 text-[11px] font-medium text-white transition-all active:scale-95"
              >
                {s.flag} {s.short}
                <span className="ml-1 opacity-60">✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="mt-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
            <IconCompare className="h-8 w-8" />
          </div>
          <p className="mt-3 text-[13px] text-[var(--color-text-secondary)]">
            {t("compareEmpty")}
          </p>
          <Link
            href="/find"
            className="mt-4 inline-block rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-bold text-white no-underline"
          >
            {t("ctaSearch")}
          </Link>
        </div>
      )}

      {/* ── Side-by-side Comparison ── */}
      {comparedSchools.length >= 2 && (
        <>
          {/* Comparison grid */}
          <div className="mb-5 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                    {t("compareAttribute")}
                  </th>
                  {comparedSchools.map((s) => (
                    <th key={s.id} className="px-3 py-3 text-center font-bold">
                      {s.flag} {s.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label={t("compareCurriculum")}
                  values={comparedSchools.map((s) => s.curL)}
                />
                <CompareRow
                  label={t("compareEstablished")}
                  values={comparedSchools.map((s) =>
                    s.establishedYear
                      ? `${s.establishedYear} (${new Date().getFullYear() - s.establishedYear} ปี)`
                      : "–"
                  )}
                />
                <CompareRow
                  label={t("compareFees")}
                  values={comparedSchools.map(
                    (s) =>
                      `${formatMoney(s.tMin)}–${formatMoney(s.tMax)} ${t("perYear")}`
                  )}
                />
                <CompareRow
                  label={t("compareLocation")}
                  values={comparedSchools.map((s) => s.locL)}
                />
                <CompareRow
                  label={t("compareClassSize")}
                  values={comparedSchools.map((s) =>
                    s.avgClassSize ? `${s.avgClassSize} คน/ห้อง` : "–"
                  )}
                />
                <CompareRow
                  label={t("compareTeacherRatio")}
                  values={comparedSchools.map((s) =>
                    s.teacherStudentRatio || "–"
                  )}
                />
                <CompareRow
                  label={t("compareNativeTeacher")}
                  values={comparedSchools.map((s) => {
                    if (s.nativeEnglishTeachers === undefined) return "–";
                    const accent = s.teacherAccent ? ` (${s.teacherAccent})` : "";
                    return s.nativeEnglishTeachers ? `✅${accent}` : `❌${accent}`;
                  })}
                />
                <CompareRow
                  label={t("compareEfScore")}
                  values={comparedSchools.map((s) => `${s.efScore}/10`)}
                  highlight
                />
                <CompareRow
                  label={t("compareForeignRatio")}
                  values={comparedSchools.map((s) =>
                    s.foreignPassportRatio || "–"
                  )}
                />
                <CompareRow
                  label={t("compareChineseRatio")}
                  values={comparedSchools.map((s) =>
                    s.chineseStudentRatio || "–"
                  )}
                />
                <CompareRow
                  label={t("compareCompetition")}
                  values={comparedSchools.map((s) =>
                    s.competitionRate || "–"
                  )}
                />
                <CompareRow
                  label={t("compareTopUni")}
                  values={comparedSchools.map(
                    (s) => s.topUniAcceptance || s.track.topUni?.slice(0, 3).join(", ") || "–"
                  )}
                />
                <CompareRow
                  label={t("compareMedical")}
                  values={comparedSchools.map((s) =>
                    typeof s.track.medical === "string"
                      ? s.track.medical
                      : s.track.medical ? "✅" : "–"
                  )}
                />
                <CompareRow
                  label={t("compareUsp")}
                  values={comparedSchools.map((s) => s.usp || "–")}
                />
                <CompareRow
                  label={t("compareParentPraise")}
                  values={comparedSchools.map((s) =>
                    s.parentPraise?.slice(0, 2).join(" • ") || "–"
                  )}
                />
                <CompareRow
                  label={t("compareTags")}
                  values={comparedSchools.map((s) =>
                    s.tags.slice(0, 3).join(", ")
                  )}
                />
              </tbody>
            </table>
          </div>

          {/* ── Total Cost Calculator ── */}
          <div className="mb-5 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-[#2D2D3F] p-5 text-white">
            <h3 className="mb-1 text-[16px] font-extrabold">
              {t("costCalcTitle")}
            </h3>
            <p className="mb-4 text-[11px] text-white/50">
              {t("costCalcSub")}
            </p>

            {/* Grade selector */}
            <div className="mb-4">
              <label className="mb-1 block text-[10px] font-bold uppercase text-white/40">
                {t("costCalcGrade")}
              </label>
              <select
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-[13px] text-white"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="baby">แรกเกิด (15 ปี)</option>
                <option value="nursery">อ.1 (12 ปี)</option>
                <option value="kg1">อ.2 (11 ปี)</option>
                <option value="kg2">อ.3 (10 ปี)</option>
                <option value="p1">ป.1 (9 ปี)</option>
                <option value="p3">ป.3 (7 ปี)</option>
                <option value="p6">ป.6 (4 ปี)</option>
                <option value="m1">ม.1 (3 ปี)</option>
                <option value="m4">ม.4 (3 ปี)</option>
              </select>
            </div>

            {/* Extras toggle */}
            <label className="mb-4 flex items-center gap-2 text-[12px]">
              <input
                type="checkbox"
                checked={includeExtras}
                onChange={(e) => setIncludeExtras(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <span className="text-white/70">
                {t("costCalcExtras")} (+{formatMoney(extraPerYear)}/
                {t("perYear")})
              </span>
            </label>

            {/* Cost bars */}
            <div className="space-y-4">
              {comparedSchools.map((s) => {
                const avgFee =
                  (s.tMin + s.tMax) / 2 + (includeExtras ? extraPerYear : 0);
                const totalMin = calculateTotalCost(
                  s.tMin + (includeExtras ? extraPerYear : 0),
                  yearsLeft,
                  ANNUAL_INCREASE
                );
                const totalMax = calculateTotalCost(
                  s.tMax + (includeExtras ? extraPerYear : 0),
                  yearsLeft,
                  ANNUAL_INCREASE
                );
                const totalAvg = calculateTotalCost(
                  avgFee,
                  yearsLeft,
                  ANNUAL_INCREASE
                );
                const pct = (totalAvg / maxTotalCost) * 100;

                return (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-semibold">
                        {s.flag} {s.short}
                      </span>
                      <span className="text-[11px] text-white/60">
                        {formatMoney(avgFee)}/{t("perYear")}
                      </span>
                    </div>
                    <div className="relative h-8 overflow-hidden rounded-lg bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-lg transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${
                            pct > 70
                              ? "#FF3B30"
                              : pct > 40
                              ? "#FF9500"
                              : "#34C759"
                          }, ${
                            pct > 70
                              ? "#FF6482"
                              : pct > 40
                              ? "#FFD60A"
                              : "#30D158"
                          })`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">
                        {formatMoney(totalMin)}–{formatMoney(totalMax)}{" "}
                        {t("costCalcTotal")}
                      </div>
                    </div>
                    <div className="mt-0.5 text-right text-[10px] text-white/40">
                      {t("costCalcYears").replace("{n}", String(yearsLeft))} •{" "}
                      {t("costCalcInflation")}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight */}
            {comparedSchools.length >= 2 && (
              <div className="mt-4 rounded-xl bg-white/10 p-3 text-[11px] text-white/70">
                💡{" "}
                {(() => {
                  const costs = comparedSchools.map((s) => ({
                    name: s.short,
                    total: calculateTotalCost(
                      (s.tMin + s.tMax) / 2,
                      yearsLeft,
                      ANNUAL_INCREASE
                    ),
                  }));
                  costs.sort((a, b) => a.total - b.total);
                  const diff = costs[costs.length - 1].total - costs[0].total;
                  return t("costCalcInsight")
                    .replace("{cheapest}", costs[0].name)
                    .replace("{diff}", formatMoney(diff));
                })()}
              </div>
            )}
          </div>

          {/* View detail buttons */}
          <div className="flex flex-wrap gap-2">
            {comparedSchools.map((s) => (
              <Link
                key={s.id}
                href={`/school/${s.id}`}
                className="flex-1 rounded-xl bg-[var(--color-text)] px-3 py-2.5 text-center text-[12px] font-bold text-white no-underline transition-all active:scale-[0.97]"
              >
                {s.short}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Single school selected - prompt to add more */}
      {comparedSchools.length === 1 && (
        <div className="mt-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
            <IconCompare className="h-6 w-6" />
          </div>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
            {t("compareNeedMore")}
          </p>
        </div>
      )}

      {/* Back */}
      <Link
        href="/"
        className="mt-4 mb-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}

/* ── Table row component ── */
function CompareRow({
  label,
  values,
  highlight,
}: {
  label: string;
  values: string[];
  highlight?: boolean;
}) {
  return (
    <tr className="border-b border-[var(--color-border)] last:border-b-0">
      <td className="px-3 py-2.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
        {label}
      </td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`px-3 py-2.5 text-center ${
            highlight ? "font-bold text-[var(--color-accent)]" : ""
          }`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}
