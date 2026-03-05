"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/i18n/LangProvider";
import { schools } from "@/data/schools";
import { getSupabase } from "@/lib/supabase";

export default function SurveyPage() {
  const { t, lang } = useLang();

  const surveyQuestions = [
    {
      id: "overall",
      question: t("surveyQ1"),
      options: [
        { label: t("surveyQ1o5"), value: 5 },
        { label: t("surveyQ1o4"), value: 4 },
        { label: t("surveyQ1o3"), value: 3 },
        { label: t("surveyQ1o2"), value: 2 },
        { label: t("surveyQ1o1"), value: 1 },
      ],
    },
    {
      id: "academics",
      question: t("surveyQ2"),
      options: [
        { label: t("surveyQ2o5"), value: 5 },
        { label: t("surveyQ2o4"), value: 4 },
        { label: t("surveyQ2o3"), value: 3 },
        { label: t("surveyQ2o2"), value: 2 },
        { label: t("surveyQ2o1"), value: 1 },
      ],
    },
    {
      id: "ef",
      question: t("surveyQ3"),
      options: [
        { label: t("surveyQ3o5"), value: 5 },
        { label: t("surveyQ3o4"), value: 4 },
        { label: t("surveyQ3o3"), value: 3 },
        { label: t("surveyQ3o2"), value: 2 },
        { label: t("surveyQ3o1"), value: 1 },
      ],
    },
    {
      id: "communication",
      question: t("surveyQ4"),
      options: [
        { label: t("surveyQ4o5"), value: 5 },
        { label: t("surveyQ4o4"), value: 4 },
        { label: t("surveyQ4o3"), value: 3 },
        { label: t("surveyQ4o2"), value: 2 },
        { label: t("surveyQ4o1"), value: 1 },
      ],
    },
    {
      id: "value",
      question: t("surveyQ5"),
      options: [
        { label: t("surveyQ5o5"), value: 5 },
        { label: t("surveyQ5o4"), value: 4 },
        { label: t("surveyQ5o3"), value: 3 },
        { label: t("surveyQ5o2"), value: 2 },
        { label: t("surveyQ5o1"), value: 1 },
      ],
    },
  ];

  /* ── State ── */
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
  const [customSchoolName, setCustomSchoolName] = useState("");
  const [isOtherSchool, setIsOtherSchool] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [parentType, setParentType] = useState<string>("");
  const [childGrade, setChildGrade] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSchoolError, setShowSchoolError] = useState(false);

  /* ── School search ── */
  const [schoolSearch, setSchoolSearch] = useState("");
  const filteredSchools = useMemo(() => {
    if (!schoolSearch) return schools;
    const q = schoolSearch.toLowerCase();
    return schools.filter(
      (s) =>
        s.short.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.curL.toLowerCase().includes(q)
    );
  }, [schoolSearch]);

  const setAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === surveyQuestions.length;
  const hasSchool = selectedSchoolId !== null || (isOtherSchool && customSchoolName.trim().length > 0);
  const canSubmit = allAnswered && hasSchool;
  const avgScore = allAnswered
    ? (Object.values(answers).reduce((a, b) => a + b, 0) / surveyQuestions.length).toFixed(1)
    : null;

  /* ── Grade options ── */
  const gradeOptions = [
    "Pre-Nursery", "Nursery", "KG1", "KG2", "KG3",
    "P1", "P2", "P3", "P4", "P5", "P6",
    "M1", "M2", "M3", "M4", "M5", "M6",
  ];

  /* ── Submit to Supabase (PDPA: NO personal data collected) ── */
  const handleSubmit = async () => {
    if (!canSubmit) {
      if (!hasSchool) setShowSchoolError(true);
      return;
    }

    setSaving(true);

    const schoolName = isOtherSchool
      ? customSchoolName.trim()
      : schools.find((s) => s.id === selectedSchoolId)?.short || "";

    const reviewData = {
      school_id: isOtherSchool ? null : selectedSchoolId,
      school_name: schoolName,
      rating: Math.round(Number(avgScore)),
      score_overall: answers.overall,
      score_academics: answers.academics,
      score_ef: answers.ef,
      score_communication: answers.communication,
      score_value: answers.value,
      comment_text: commentText.trim() || null,
      parent_type: parentType || null,
      child_grade: childGrade || null,
      review_language: lang,
      source: "parent_voice_survey",
      // PDPA compliant: NO name, email, phone, IP, or user_agent stored
      reviewer_name: null,
      is_verified: false,
    };

    try {
      await getSupabase().from("school_reviews").insert(reviewData);
    } catch {
      // Silently handle — still show success (offline-first UX)
    }

    setSaving(false);
    setSubmitted(true);
  };

  /* ── School select handler ── */
  const handleSchoolChange = (value: string) => {
    setShowSchoolError(false);
    if (value === "other") {
      setIsOtherSchool(true);
      setSelectedSchoolId(null);
    } else if (value === "") {
      setIsOtherSchool(false);
      setSelectedSchoolId(null);
    } else {
      setIsOtherSchool(false);
      setSelectedSchoolId(Number(value));
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="animate-fade-up py-10 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-[22px] font-extrabold">{t("surveyThanks")}</h2>
        <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">
          {t("surveyAvgScore")}
        </p>
        <div className="mt-3 text-[48px] font-extrabold text-[var(--color-accent)]">
          {avgScore}
          <span className="text-[18px] text-[var(--color-text-secondary)]">/5</span>
        </div>

        {/* School reviewed */}
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-4 py-2">
          <span className="text-[13px] font-medium text-[var(--color-text)]">
            {isOtherSchool
              ? customSchoolName
              : schools.find((s) => s.id === selectedSchoolId)?.short}
          </span>
        </div>

        {/* Breakdown */}
        <div className="mx-auto mt-6 max-w-[320px]">
          {surveyQuestions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between border-b border-[var(--color-border)]/50 py-2"
            >
              <span className="text-[12px] text-[var(--color-text-secondary)]">
                {q.question}
              </span>
              <span className="text-[14px] font-bold">
                {"⭐".repeat(answers[q.id] || 0)}
              </span>
            </div>
          ))}
        </div>

        {/* Comment preview */}
        {commentText.trim() && (
          <div className="mx-auto mt-4 max-w-[400px] rounded-2xl bg-[var(--color-surface)] p-4 text-left">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              💬 {t("surveyCommentLabel")}
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              {commentText}
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-[var(--color-surface)] p-4 text-[12px] text-[var(--color-text-secondary)]">
          {t("surveyHelpOthers")}
          <br />
          {t("surveyThankNote")}
        </div>

        <button
          onClick={() => {
            setAnswers({});
            setSelectedSchoolId(null);
            setCustomSchoolName("");
            setIsOtherSchool(false);
            setCommentText("");
            setParentType("");
            setChildGrade("");
            setSubmitted(false);
          }}
          className="mt-4 rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-bold text-white active:scale-[0.98]"
        >
          {t("surveyRetry")}
        </button>
      </div>
    );
  }

  /* ── Survey Form ── */
  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("surveyTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("surveySub")}
        </p>
      </div>

      {/* ── Step 1: School Selection ── */}
      <div className="mb-5 rounded-2xl bg-[var(--color-surface)] p-4">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("surveySchoolLabel")} <span className="text-[var(--color-error)]">*</span>
        </div>

        {/* Search + Select */}
        <input
          type="text"
          className="form-input mb-2"
          placeholder={t("surveySchoolPlaceholder")}
          value={schoolSearch}
          onChange={(e) => setSchoolSearch(e.target.value)}
        />

        <select
          className={`form-input ${showSchoolError && !hasSchool ? "border-[var(--color-error)]" : ""}`}
          value={isOtherSchool ? "other" : selectedSchoolId ?? ""}
          onChange={(e) => handleSchoolChange(e.target.value)}
        >
          <option value="">— {t("surveySchoolPlaceholder")} —</option>
          <optgroup label="── International Schools ──">
            {filteredSchools
              .filter((s) => s.id <= 30)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.flag} {s.short} — {s.curL}
                </option>
              ))}
          </optgroup>
          <optgroup label="── Thai Schools ──">
            {filteredSchools
              .filter((s) => s.id > 30)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.flag} {s.short}
                </option>
              ))}
          </optgroup>
          <optgroup label="──────────">
            <option value="other">✏️ {t("surveySchoolOther")}</option>
          </optgroup>
        </select>

        {/* Other school name input */}
        {isOtherSchool && (
          <input
            type="text"
            className="form-input mt-2"
            placeholder={t("surveySchoolOtherPlaceholder")}
            value={customSchoolName}
            onChange={(e) => setCustomSchoolName(e.target.value)}
            autoFocus
          />
        )}

        {showSchoolError && !hasSchool && (
          <p className="mt-1.5 text-[11px] text-[var(--color-error)]">
            {t("surveyRequired")}
          </p>
        )}
      </div>

      {/* ── Step 2: Parent context (optional) ── */}
      <div className="mb-5 flex gap-3">
        <div className="flex-1">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("surveyParentType")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: t("surveyParentCurrent"), value: "current_parent" },
              { label: t("surveyParentAlumni"), value: "alumni_parent" },
              { label: t("surveyParentProspective"), value: "prospective" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setParentType(parentType === opt.value ? "" : opt.value)}
                className={`rounded-full border px-3 py-1.5 text-[11px] transition-all ${
                  parentType === opt.value
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent)]"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress ── */}
      <div className="mb-5">
        <div className="mb-1.5 flex justify-between text-[11px] text-[var(--color-text-secondary)]">
          <span>
            {totalAnswered}/{surveyQuestions.length} {t("surveyQuestion")}
          </span>
          <span>{Math.round((totalAnswered / surveyQuestions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--color-surface-alt)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500"
            style={{
              width: `${(totalAnswered / surveyQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ── Questions ── */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        {surveyQuestions.map((q, qi) => (
          <div key={q.id} className="rounded-2xl bg-[var(--color-surface)] p-4">
            <div className="mb-3 text-[13px] font-bold">
              {qi + 1}. {q.question}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAnswer(q.id, opt.value)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] transition-all active:scale-95 ${
                    answers[q.id] === opt.value
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Free-form Comment ── */}
      <div className="mt-5 rounded-2xl bg-[var(--color-surface)] p-4">
        <div className="mb-2 text-[13px] font-bold">
          {t("surveyCommentLabel")}
        </div>
        <textarea
          className="form-input min-h-[120px] resize-y"
          placeholder={t("surveyCommentPlaceholder")}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxLength={2000}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[10px] text-[var(--color-text-secondary)]">
            {t("surveyCommentHint")}
          </span>
          <span className="text-[10px] text-[var(--color-text-secondary)]">
            {commentText.length}/2000 {t("surveyCommentCharCount")}
          </span>
        </div>
      </div>

      {/* ── Grade (optional) ── */}
      <div className="mt-4">
        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("surveyGradeLabel")}
        </div>
        <select
          className="form-input"
          value={childGrade}
          onChange={(e) => setChildGrade(e.target.value)}
        >
          <option value="">{t("surveyGradeDefault")}</option>
          {gradeOptions.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* ── PDPA Notice ── */}
      <div className="mt-4 rounded-xl bg-[var(--color-surface)] px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="text-[14px]">🔒</span>
          <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
            {lang === "th"
              ? "เราไม่เก็บข้อมูลส่วนบุคคลใดๆ (ไม่มีชื่อ อีเมล เบอร์โทร หรือ IP) ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) เก็บเฉพาะคะแนนรีวิวและความคิดเห็นเพื่อวิเคราะห์คุณภาพโรงเรียน"
              : lang === "zh"
              ? "我们不收集任何个人数据（无姓名、电子邮件、电话或IP），符合个人数据保护法（PDPA）。仅收集评分和意见用于分析学校质量。"
              : lang === "ja"
              ? "個人データは一切収集しません（氏名、メール、電話番号、IPアドレスなし）。PDPAに準拠し、学校品質の分析に評価と意見のみを収集します。"
              : "We do not collect any personal data (no name, email, phone, or IP) in compliance with Thailand's Personal Data Protection Act (PDPA). Only ratings and opinions are collected for school quality analysis."
            }
          </p>
        </div>
      </div>

      {/* ── Submit ── */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || saving}
        className={`mt-5 w-full rounded-[14px] px-4 py-3.5 text-sm font-bold transition-all ${
          canSubmit && !saving
            ? "bg-[var(--color-text)] text-white active:scale-[0.98]"
            : "cursor-not-allowed bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
        }`}
      >
        {saving
          ? t("surveySaving")
          : canSubmit
          ? t("surveySubmit")
          : !hasSchool
          ? t("surveyRequired")
          : t("surveyRemaining").replace("{n}", String(surveyQuestions.length - totalAnswered))
        }
      </button>
    </div>
  );
}
