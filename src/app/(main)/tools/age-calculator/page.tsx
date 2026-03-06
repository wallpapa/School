"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Thai education cutoff: May 16 ── */
const CUTOFF_MONTH = 5; // May
const CUTOFF_DAY = 16;
const P1_AGE = 6;       // Must turn 6 by May 16
const M1_OFFSET = 6;    // 6 years after P1
const M4_OFFSET = 9;    // 9 years after P1

interface GradeResult {
  grade: string;
  gradeLabel: string;
  academicYear: number; // CE year
  academicYearBE: number; // BE year
  ageYears: number;
  ageMonths: number;
  status: "advantage" | "neutral" | "disadvantage";
  note: string;
}

function computeResults(birthDate: Date, lang: string): GradeResult[] {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1; // 1-based
  const birthDay = birthDate.getDate();

  // Determine P1 entry year
  // Must turn 6 by May 16 of academic year
  let p1Year = birthYear + P1_AGE;
  // If born AFTER May 16, they won't turn 6 by cutoff → must wait 1 year
  if (birthMonth > CUTOFF_MONTH || (birthMonth === CUTOFF_MONTH && birthDay > CUTOFF_DAY)) {
    p1Year += 1;
  }

  const grades = [
    { key: "P1", label: "ป.1", offset: 0 },
    { key: "P4", label: "ป.4", offset: 3 },
    { key: "M1", label: "ม.1", offset: M1_OFFSET },
    { key: "M4", label: "ม.4", offset: M4_OFFSET },
  ];

  return grades.map(({ key, label, offset }) => {
    const entryYear = p1Year + offset;
    // Age on May 16 of entry year
    const cutoffDate = new Date(entryYear, CUTOFF_MONTH - 1, CUTOFF_DAY);
    const ageMs = cutoffDate.getTime() - birthDate.getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    const ageYears = Math.floor(ageDays / 365.25);
    const ageMonths = Math.floor((ageDays % 365.25) / 30.44);

    // How many days before cutoff was the birthday?
    const daysBeforeCutoff =
      (CUTOFF_MONTH - birthMonth) * 30 + (CUTOFF_DAY - birthDay);

    let status: "advantage" | "neutral" | "disadvantage";
    let note: string;

    if (daysBeforeCutoff >= 120) {
      // Born Jan-Feb → oldest in class
      status = "advantage";
      note = lang === "th"
        ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — เป็นเด็กโตในห้อง`
        : `Born ${daysBeforeCutoff} days before cutoff — among oldest in class`;
    } else if (daysBeforeCutoff >= 30) {
      // Born Mar-Apr
      status = "advantage";
      note = lang === "th"
        ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — ได้เปรียบด้านอายุ`
        : `Born ${daysBeforeCutoff} days before cutoff — age advantage`;
    } else if (daysBeforeCutoff >= 0) {
      // Born early May — just made it
      status = "neutral";
      note = lang === "th"
        ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — พอดี! อายุน้อยกว่าเพื่อนส่วนใหญ่`
        : `Born ${daysBeforeCutoff} days before cutoff — borderline! Younger than most peers`;
    } else {
      // Born after cutoff → must wait, so they'll be OLDEST next year
      status = "advantage";
      note = lang === "th"
        ? `เกิดหลัง cutoff — ต้องรอ 1 ปี จะเป็นเด็กโตที่สุดในห้อง`
        : `Born after cutoff — wait 1 year, will be oldest in class`;
    }

    return {
      grade: key,
      gradeLabel: label,
      academicYear: entryYear,
      academicYearBE: entryYear + 543,
      ageYears,
      ageMonths,
      status,
      note,
    };
  });
}

export default function AgeCalculatorPage() {
  const { t, lang } = useLang();
  const [birthStr, setBirthStr] = useState("");

  const birthDate = useMemo(() => {
    if (!birthStr) return null;
    const d = new Date(birthStr);
    return isNaN(d.getTime()) ? null : d;
  }, [birthStr]);

  const results = useMemo(() => {
    if (!birthDate) return [];
    return computeResults(birthDate, lang);
  }, [birthDate, lang]);

  const statusColor = (s: string) =>
    s === "advantage"
      ? "var(--color-success)"
      : s === "neutral"
      ? "var(--color-warning)"
      : "var(--color-error)";

  const statusText = (s: string) =>
    s === "advantage"
      ? t("ageCalcAdvantage")
      : s === "neutral"
      ? t("ageCalcNeutral")
      : t("ageCalcDisadvantage");

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("ageCalcTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("ageCalcSub")}
        </p>
      </div>

      {/* Date picker */}
      <div className="mb-5 rounded-2xl bg-[var(--color-surface)] p-4">
        <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("ageCalcBirthLabel")}
        </label>
        <input
          type="date"
          className="form-input text-center text-[16px] font-bold"
          value={birthStr}
          onChange={(e) => setBirthStr(e.target.value)}
          max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 10).toISOString().split("T")[0]}
          min="2010-01-01"
        />
        <p className="mt-2 text-center text-[10px] text-[var(--color-text-secondary)]">
          {t("ageCalcCutoff")}
        </p>
      </div>

      {/* Results */}
      {results.length > 0 && birthDate && (
        <div className="space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("ageCalcResult")}
          </div>

          {/* Birth info */}
          <div className="rounded-2xl bg-[var(--color-text)] p-4 text-center text-white">
            <div className="text-[14px] font-bold">
              🎂 {birthDate.toLocaleDateString(lang === "th" ? "th-TH" : lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="mt-1 text-[11px] text-white/70">
              {lang === "th"
                ? `พ.ศ. ${birthDate.getFullYear() + 543}`
                : `CE ${birthDate.getFullYear()}`}
            </div>
          </div>

          {/* Grade cards */}
          {results.map((r) => (
            <div
              key={r.grade}
              className="rounded-2xl bg-[var(--color-surface)] p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[18px] font-extrabold">{r.gradeLabel}</span>
                  <span className="ml-2 text-[12px] text-[var(--color-text-secondary)]">
                    {lang === "th"
                      ? `ปีการศึกษา ${r.academicYearBE}`
                      : `Year ${r.academicYear}`}
                  </span>
                </div>
                <div
                  className="rounded-full px-3 py-1 text-[11px] font-bold"
                  style={{
                    backgroundColor: `${statusColor(r.status)}18`,
                    color: statusColor(r.status),
                  }}
                >
                  {r.status === "advantage" ? "✅" : r.status === "neutral" ? "⚠️" : "❌"}
                </div>
              </div>

              {/* Age */}
              <div className="mt-2 text-[13px] font-medium">
                {t("ageCalcAge")}: {t("ageCalcYearsOld").replace("{y}", String(r.ageYears)).replace("{m}", String(r.ageMonths))}
              </div>

              {/* Status note */}
              <p className="mt-1 text-[11px] leading-relaxed" style={{ color: statusColor(r.status) }}>
                {r.note}
              </p>
            </div>
          ))}

          {/* Example for สามเสน */}
          <div className="rounded-2xl bg-[var(--color-surface)] p-4">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              💡 {lang === "th" ? "สำหรับโรงเรียนสามเสนวิทยาลัย" : "For Samsenwit School"}
            </div>
            <div className="space-y-2 text-[11px] text-[var(--color-text-secondary)]">
              <p>
                {lang === "th"
                  ? `🏠 เขตรับนักเรียน: พญาไท, ราชเทวี, ดุสิต, บางซื่อ, จตุจักร`
                  : `🏠 Admission zones: Phaya Thai, Ratchathewi, Dusit, Bang Sue, Chatuchak`}
              </p>
              <p>
                {lang === "th"
                  ? "📋 สอบ ม.1: มี 2 ประเภท — ในเขตพื้นที่ (โควตา) และทั่วไป (สอบแข่งขัน)"
                  : "📋 M1 admission: 2 types — in-zone (quota) and general (competitive exam)"}
              </p>
              <p>
                {lang === "th"
                  ? "⚠️ ย้ายทะเบียนบ้านเข้าเขตก่อนสมัคร — ตรวจสอบ deadline จากโรงเรียน (ปกติ ก.พ.-มี.ค.)"
                  : "⚠️ Transfer house registration to zone before applying — check deadline (usually Feb-Mar)"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Back */}
      <Link
        href="/"
        className="mt-5 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backResults")}
      </Link>
    </div>
  );
}
