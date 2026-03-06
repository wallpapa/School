"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Cutoff dates per system ── */
const SYSTEMS = {
  thai: { cutoffMonth: 5, cutoffDay: 16, startAge: 6 },       // May 16, age 6 for ป.1
  intl_american: { cutoffMonth: 9, cutoffDay: 1, startAge: 6 }, // Sep 1, age 6 for Grade 1
  intl_british: { cutoffMonth: 9, cutoffDay: 1, startAge: 5 },  // Sep 1, age 5 for Year 1
} as const;

type SystemKey = keyof typeof SYSTEMS;

interface GradeResult {
  grade: string;
  gradeLabel: string;
  academicYear: number;
  academicYearBE: number;
  ageYears: number;
  ageMonths: number;
  status: "advantage" | "neutral" | "disadvantage";
  note: string;
}

interface SystemResult {
  system: SystemKey;
  label: string;
  flag: string;
  cutoffLabel: string;
  grades: GradeResult[];
}

function computeAge(birthDate: Date, refDate: Date) {
  const ageMs = refDate.getTime() - birthDate.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return {
    years: Math.floor(ageDays / 365.25),
    months: Math.floor((ageDays % 365.25) / 30.44),
    totalDays: Math.floor(ageDays),
  };
}

function computeSystem(
  birthDate: Date,
  systemKey: SystemKey,
  lang: string
): SystemResult {
  const sys = SYSTEMS[systemKey];
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  // Determine Grade 1 / ป.1 / Year 1 entry year
  let startYear = birthYear + sys.startAge;
  if (
    birthMonth > sys.cutoffMonth ||
    (birthMonth === sys.cutoffMonth && birthDay > sys.cutoffDay)
  ) {
    startYear += 1;
  }

  const gradesDef =
    systemKey === "thai"
      ? [
          { key: "P1", label: "ป.1", offset: 0 },
          { key: "P4", label: "ป.4", offset: 3 },
          { key: "M1", label: "ม.1", offset: 6 },
          { key: "M4", label: "ม.4", offset: 9 },
        ]
      : systemKey === "intl_british"
      ? [
          { key: "Y1", label: "Year 1", offset: 0 },
          { key: "Y3", label: "Year 3", offset: 2 },
          { key: "Y7", label: "Year 7", offset: 6 },
          { key: "Y10", label: "Year 10 (IGCSE)", offset: 9 },
          { key: "Y12", label: "Year 12 (A-Level)", offset: 11 },
        ]
      : [
          { key: "G1", label: "Grade 1", offset: 0 },
          { key: "G3", label: "Grade 3", offset: 2 },
          { key: "G7", label: "Grade 7", offset: 6 },
          { key: "G9", label: "Grade 9", offset: 8 },
          { key: "G10", label: "Grade 10 (IB/AP)", offset: 9 },
        ];

  const grades: GradeResult[] = gradesDef.map(({ key, label, offset }) => {
    const entryYear = startYear + offset;
    const cutoffDate = new Date(entryYear, sys.cutoffMonth - 1, sys.cutoffDay);
    const age = computeAge(birthDate, cutoffDate);

    // Days before cutoff (positive = born before cutoff in same year cycle)
    const daysBeforeCutoff =
      (sys.cutoffMonth - birthMonth) * 30 + (sys.cutoffDay - birthDay);

    let status: "advantage" | "neutral" | "disadvantage";
    let note: string;

    if (daysBeforeCutoff < 0) {
      // Born after cutoff → must wait 1 year → will be OLDEST
      status = "advantage";
      note =
        lang === "th"
          ? `เกิดหลัง cutoff → รอ 1 ปี → เป็นเด็กโตที่สุดในห้อง 💪`
          : `Born after cutoff → wait 1 year → oldest in class 💪`;
    } else if (daysBeforeCutoff <= 15) {
      // Very close to cutoff → youngest
      status = "disadvantage";
      note =
        lang === "th"
          ? `เกิดก่อน cutoff แค่ ${daysBeforeCutoff} วัน — เด็กที่สุดในห้อง ⚠️`
          : `Only ${daysBeforeCutoff} days before cutoff — youngest in class ⚠️`;
    } else if (daysBeforeCutoff <= 60) {
      // 2 months before → still young side
      status = "neutral";
      note =
        lang === "th"
          ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — อายุน้อยกว่าเพื่อนส่วนใหญ่`
          : `${daysBeforeCutoff} days before cutoff — younger than most peers`;
    } else if (daysBeforeCutoff <= 180) {
      // 2-6 months before → good position
      status = "advantage";
      note =
        lang === "th"
          ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — ได้เปรียบด้านอายุ ✅`
          : `${daysBeforeCutoff} days before cutoff — age advantage ✅`;
    } else {
      // 6+ months before → among oldest
      status = "advantage";
      note =
        lang === "th"
          ? `เกิดก่อน cutoff ${daysBeforeCutoff} วัน — เด็กโตในห้อง 💪`
          : `${daysBeforeCutoff} days before cutoff — among oldest 💪`;
    }

    return {
      grade: key,
      gradeLabel: label,
      academicYear: entryYear,
      academicYearBE: entryYear + 543,
      ageYears: age.years,
      ageMonths: age.months,
      status,
      note,
    };
  });

  const labels: Record<SystemKey, { label: string; flag: string; cutoff: string }> = {
    thai: {
      label: lang === "th" ? "🇹🇭 ระบบไทย (รัฐ/เอกชน)" : "🇹🇭 Thai System",
      flag: "🇹🇭",
      cutoff: lang === "th" ? "Cutoff: 16 พ.ค." : "Cutoff: May 16",
    },
    intl_american: {
      label: lang === "th" ? "🇺🇸 International (American/IB)" : "🇺🇸 American / IB",
      flag: "🇺🇸",
      cutoff: lang === "th" ? "Cutoff: 1 ก.ย." : "Cutoff: Sep 1",
    },
    intl_british: {
      label: lang === "th" ? "🇬🇧 International (British)" : "🇬🇧 British System",
      flag: "🇬🇧",
      cutoff: lang === "th" ? "Cutoff: 1 ก.ย. (เริ่ม Year 1 อายุ 5)" : "Cutoff: Sep 1 (Year 1 at age 5)",
    },
  };

  return {
    system: systemKey,
    label: labels[systemKey].label,
    flag: labels[systemKey].flag,
    cutoffLabel: labels[systemKey].cutoff,
    grades,
  };
}

export default function AgeCalculatorPage() {
  const { t, lang } = useLang();
  const [birthStr, setBirthStr] = useState("");

  const birthDate = useMemo(() => {
    if (!birthStr) return null;
    const d = new Date(birthStr);
    return isNaN(d.getTime()) ? null : d;
  }, [birthStr]);

  const allResults = useMemo(() => {
    if (!birthDate) return [];
    return [
      computeSystem(birthDate, "thai", lang),
      computeSystem(birthDate, "intl_american", lang),
      computeSystem(birthDate, "intl_british", lang),
    ];
  }, [birthDate, lang]);

  const statusColor = (s: string) =>
    s === "advantage"
      ? "var(--color-success)"
      : s === "neutral"
      ? "var(--color-warning)"
      : "var(--color-error)";

  // Determine overall best system
  const bestSystem = useMemo(() => {
    if (allResults.length === 0) return null;
    // Count advantages for the first grade (entry point)
    const scores = allResults.map((r) => ({
      system: r.system,
      label: r.label,
      status: r.grades[0]?.status,
    }));
    const adv = scores.filter((s) => s.status === "advantage");
    if (adv.length > 0) return adv[0];
    const neu = scores.filter((s) => s.status === "neutral");
    if (neu.length > 0) return neu[0];
    return scores[0];
  }, [allResults]);

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
      </div>

      {/* Results */}
      {allResults.length > 0 && birthDate && (
        <div className="space-y-4">
          {/* Birth info card */}
          <div className="rounded-2xl bg-[var(--color-text)] p-4 text-center text-white">
            <div className="text-[14px] font-bold">
              🎂{" "}
              {birthDate.toLocaleDateString(
                lang === "th"
                  ? "th-TH"
                  : lang === "zh"
                  ? "zh-CN"
                  : lang === "ja"
                  ? "ja-JP"
                  : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </div>
            <div className="mt-1 text-[11px] text-white/70">
              {lang === "th"
                ? `พ.ศ. ${birthDate.getFullYear() + 543}`
                : `CE ${birthDate.getFullYear()}`}
            </div>
          </div>

          {/* Recommendation banner */}
          {bestSystem && (
            <div className="rounded-2xl bg-[var(--color-accent)]/10 p-4 text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                {lang === "th" ? "💡 แนะนำ" : "💡 Recommendation"}
              </div>
              <div className="mt-1 text-[14px] font-bold text-[var(--color-text)]">
                {bestSystem.status === "advantage" ? (
                  <>
                    {bestSystem.label}{" "}
                    {lang === "th" ? "— ได้เปรียบด้านอายุ!" : "— Age advantage!"}
                  </>
                ) : bestSystem.status === "neutral" ? (
                  <>
                    {bestSystem.label}{" "}
                    {lang === "th"
                      ? "— พอดี (ไม่ได้เปรียบมาก)"
                      : "— Borderline (no major advantage)"}
                  </>
                ) : (
                  <>
                    {lang === "th"
                      ? "ทุกระบบเสียเปรียบเล็กน้อย — International ดีกว่า"
                      : "Slight disadvantage in all — International is better"}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Systems comparison */}
          {allResults.map((sys) => (
            <div key={sys.system} className="rounded-2xl bg-[var(--color-surface)] p-4">
              {/* System header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[14px] font-extrabold">{sys.label}</div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-[var(--color-text-secondary)]">
                  {sys.cutoffLabel}
                </span>
              </div>

              {/* Grade rows */}
              <div className="space-y-2">
                {sys.grades.map((r) => (
                  <div
                    key={r.grade}
                    className="flex items-center gap-3 rounded-xl bg-white p-3"
                  >
                    {/* Status dot */}
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[14px]"
                      style={{
                        backgroundColor: `${statusColor(r.status)}18`,
                      }}
                    >
                      {r.status === "advantage"
                        ? "✅"
                        : r.status === "neutral"
                        ? "⚠️"
                        : "❌"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[14px] font-bold">{r.gradeLabel}</span>
                        <span className="text-[10px] text-[var(--color-text-secondary)]">
                          {sys.system === "thai"
                            ? lang === "th"
                              ? `ปี ${r.academicYearBE}`
                              : `Year ${r.academicYear}`
                            : `${r.academicYear}-${r.academicYear + 1}`}
                        </span>
                      </div>
                      <div className="text-[11px] text-[var(--color-text-secondary)]">
                        {t("ageCalcYearsOld")
                          .replace("{y}", String(r.ageYears))
                          .replace("{m}", String(r.ageMonths))}
                      </div>
                      <p
                        className="mt-0.5 text-[10px] leading-relaxed"
                        style={{ color: statusColor(r.status) }}
                      >
                        {r.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── ทะเบียนบ้าน Transfer Planning Timeline ── */}
          {(() => {
            // Compute M1 entry year from Thai system result
            const thaiResult = allResults.find((r) => r.system === "thai");
            const m1Grade = thaiResult?.grades.find((g) => g.grade === "M1");
            const m1Year = m1Grade?.academicYear ?? 0;
            const m1YearBE = m1Grade?.academicYearBE ?? 0;
            const p1Grade = thaiResult?.grades.find((g) => g.grade === "P1");
            const p1Year = p1Grade?.academicYear ?? 0;

            if (!m1Year) return null;

            // Timeline milestones
            const timeline = [
              {
                yearCE: p1Year,
                yearBE: p1Year + 543,
                icon: "🎒",
                label: lang === "th" ? "เข้า ป.1" : "Enter P1",
                desc:
                  lang === "th"
                    ? "เริ่มเรียน ป.1 — เริ่มวางแผนย้ายทะเบียนบ้านได้เลย (ยิ่งเร็วยิ่งดี)"
                    : "Start P1 — can start planning house registration transfer (earlier is better)",
                urgency: "info" as const,
              },
              {
                yearCE: p1Year + 2,
                yearBE: p1Year + 2 + 543,
                icon: "📋",
                label: lang === "th" ? "ป.3 — เริ่มวางแผน" : "P3 — Start planning",
                desc:
                  lang === "th"
                    ? "เริ่มหาบ้าน/ที่อยู่ในเขตพื้นที่บริการ (พญาไท, ราชเทวี, ดุสิต, บางซื่อ, จตุจักร)"
                    : "Start looking for house/address in service area (Phaya Thai, Ratchathewi, Dusit, Bang Sue, Chatuchak)",
                urgency: "info" as const,
              },
              {
                yearCE: p1Year + 3,
                yearBE: p1Year + 3 + 543,
                icon: "🏠",
                label:
                  lang === "th"
                    ? "ป.4 — ย้ายทะเบียนบ้าน (แนะนำ)"
                    : "P4 — Transfer registration (recommended)",
                desc:
                  lang === "th"
                    ? "ย้ายชื่อนักเรียนเข้าทะเบียนบ้านในเขต — เหลือเวลา 2-3 ปีก่อนสมัคร ม.1 (ปลอดภัยสุด)"
                    : "Transfer student's name to house registration in zone — 2-3 years before M1 application (safest)",
                urgency: "success" as const,
              },
              {
                yearCE: m1Year - 1,
                yearBE: m1Year - 1 + 543,
                icon: "⚠️",
                label:
                  lang === "th"
                    ? "ป.6 — Deadline สุดท้าย"
                    : "P6 — Final deadline",
                desc:
                  lang === "th"
                    ? "ต้องมีชื่อในทะเบียนบ้านก่อน ก.พ.-มี.ค. ปีที่สมัคร ม.1 — ย้ายก่อน ธ.ค. ปีนี้!"
                    : "Must have name in house registration before Feb-Mar of M1 application year — transfer by Dec!",
                urgency: "warning" as const,
              },
              {
                yearCE: m1Year,
                yearBE: m1YearBE,
                icon: "🎯",
                label:
                  lang === "th"
                    ? `ม.1 — ปีสมัครสอบ (${m1YearBE})`
                    : `M1 — Application year (${m1Year})`,
                desc:
                  lang === "th"
                    ? "รับสมัคร ก.พ.-มี.ค. → สอบ มี.ค. → ประกาศผล เม.ย. → เปิดเทอม พ.ค."
                    : "Apply Feb-Mar → Exam Mar → Results Apr → Term starts May",
                urgency: "target" as const,
              },
            ];

            const urgencyColors: Record<string, string> = {
              info: "var(--color-accent)",
              success: "var(--color-success)",
              warning: "var(--color-warning)",
              target: "var(--color-text)",
            };

            return (
              <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  🏠{" "}
                  {lang === "th"
                    ? "วางแผนย้ายทะเบียนบ้าน — สามเสนวิทยาลัย"
                    : "House Registration Transfer Plan — Samsenwit"}
                </div>

                {/* Zone info */}
                <div className="mb-3 rounded-xl bg-white p-3">
                  <div className="text-[11px] font-bold text-[var(--color-text)]">
                    {lang === "th"
                      ? "📍 เขตรับนักเรียน (ม.1 ในเขต)"
                      : "📍 Service Area Districts (M1 in-zone)"}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {["พญาไท", "ราชเทวี", "ดุสิต", "บางซื่อ", "จตุจักร"].map(
                      (d) => (
                        <span
                          key={d}
                          className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-[10px] font-medium text-[var(--color-accent)]"
                        >
                          {d}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative space-y-0">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Timeline line */}
                      <div className="flex w-6 flex-col items-center">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[12px]"
                          style={{
                            backgroundColor: `${urgencyColors[t.urgency]}15`,
                          }}
                        >
                          {t.icon}
                        </div>
                        {i < timeline.length - 1 && (
                          <div className="w-px flex-1 bg-[var(--color-border)]" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-[12px] font-bold"
                            style={{ color: urgencyColors[t.urgency] }}
                          >
                            {t.label}
                          </span>
                          <span className="text-[10px] text-[var(--color-text-secondary)]">
                            {lang === "th"
                              ? `พ.ศ. ${t.yearBE}`
                              : `CE ${t.yearCE}`}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key notes */}
                <div className="mt-2 space-y-1.5 rounded-xl bg-[var(--color-warning)]/8 p-3">
                  <div className="text-[11px] font-bold text-[var(--color-warning)]">
                    {lang === "th" ? "⚠️ สิ่งที่ต้องรู้" : "⚠️ Important notes"}
                  </div>
                  <ul className="space-y-1 text-[10px] text-[var(--color-text-secondary)]">
                    <li>
                      •{" "}
                      {lang === "th"
                        ? "ต้องย้ายชื่อ \"นักเรียน\" เข้าทะเบียนบ้าน ไม่ใช่แค่พ่อแม่"
                        : "Must transfer the STUDENT's name, not just parents"}
                    </li>
                    <li>
                      •{" "}
                      {lang === "th"
                        ? "บางปีโรงเรียนตรวจว่าอยู่จริงหรือไม่ (เยี่ยมบ้าน)"
                        : "Some years the school verifies actual residence (home visits)"}
                    </li>
                    <li>
                      •{" "}
                      {lang === "th"
                        ? "ย้ายเร็ว = ปลอดภัยกว่า — บางโรงเรียนนับระยะเวลาที่อยู่ในเขต"
                        : "Earlier transfer = safer — some schools count residency duration"}
                    </li>
                    <li>
                      •{" "}
                      {lang === "th"
                        ? "สอบ ม.1 มี 2 ประเภท: ในเขต (โควตา แข่งน้อย) vs ทั่วไป (แข่งมาก)"
                        : "M1 exam has 2 types: in-zone (quota, less competitive) vs general (highly competitive)"}
                    </li>
                    <li>
                      •{" "}
                      {lang === "th"
                        ? "ตรวจสอบ deadline ล่าสุดจากเว็บโรงเรียนทุกปี เพราะเปลี่ยนได้"
                        : "Check latest deadline from school website yearly — it can change"}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })()}

          {/* Thai vs International comparison insight */}
          <div className="rounded-2xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4">
            <div className="mb-2 text-[12px] font-bold text-[var(--color-accent)]">
              {lang === "th"
                ? "🔍 เปรียบเทียบ: ทำไม International ได้เปรียบ?"
                : "🔍 Why International schools give an advantage?"}
            </div>
            <div className="space-y-2 text-[11px] text-[var(--color-text-secondary)]">
              <p>
                {lang === "th"
                  ? "🇹🇭 ระบบไทย: Cutoff 16 พ.ค. → เด็กเกิดเดือน พ.ค. จะอายุน้อยที่สุดในห้อง"
                  : "🇹🇭 Thai: Cutoff May 16 → May babies are youngest in class"}
              </p>
              <p>
                {lang === "th"
                  ? "🇺🇸🇬🇧 International: Cutoff 1 ก.ย. → เด็กเกิดเดือน พ.ค. อยู่กลางๆ ถึงค่อนไปทางโต — ได้เปรียบ!"
                  : "🇺🇸🇬🇧 International: Cutoff Sep 1 → May babies are middle-to-older — advantage!"}
              </p>
              <p className="font-medium text-[var(--color-accent)]">
                {lang === "th"
                  ? "💡 เด็กเกิด พ.ค.-ส.ค. → International school ได้เปรียบด้านอายุชัดเจน"
                  : "💡 Children born May-Aug → clear age advantage in International schools"}
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
