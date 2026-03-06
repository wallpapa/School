"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { schoolById } from "@/data/schools";
import EfBadge from "@/components/ui/EfBadge";
import ExpandableSection from "@/components/ui/ExpandableSection";
import UpdateCard from "@/components/ui/UpdateCard";
import CountdownBadge from "@/components/ui/CountdownBadge";
import Skeleton from "@/components/ui/Skeleton";
import { useSchoolUpdates, useExamResultLinks } from "@/hooks/useSchoolUpdates";
import { useSchoolReviews } from "@/hooks/useSchoolReviews";
import { relativeTime } from "@/types/updates";

export default function SchoolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { lang, t } = useLang();
  const school = schoolById.get(Number(id));

  if (!school) {
    return (
      <div className="animate-fade-up py-20 text-center">
        <div className="text-4xl">🏫</div>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          School not found
        </p>
        <Link
          href="/results"
          className="mt-4 inline-block rounded-xl bg-[var(--color-text)] px-6 py-3 text-sm font-bold text-white no-underline"
        >
          {t("backResults")}
        </Link>
      </div>
    );
  }

  const s = school;
  const { updates, loading: updatesLoading } = useSchoolUpdates(Number(id));
  const { links: examLinks, loading: examsLoading } = useExamResultLinks(Number(id));
  const { reviews, loading: reviewsLoading, addReview, submitting } = useSchoolReviews(Number(id));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewParentType, setReviewParentType] = useState("");
  const [reviewGrade, setReviewGrade] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className="animate-page-enter">
      {/* Hero Header */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-[var(--color-text)] p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{s.flag}</span>
          <div>
            <h1 className="text-[18px] font-extrabold leading-tight">
              {s.short}
            </h1>
            <p className="mt-0.5 text-[12px] text-white/60">{s.name}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <EfBadge score={s.efScore} />
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px]">
            {s.curL}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px]">
            {s.locL}
          </span>
        </div>
      </div>

      {/* Description + Pros row on larger screens */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {/* Description */}
        <Section title={t("schoolDesc")}>
          <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {s.desc}
          </p>
        </Section>

        {/* Pros */}
        {s.pros && s.pros.length > 0 && (
          <Section title={t("schoolPros")}>
            <div className="flex flex-col gap-1.5">
              {s.pros.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-success)]">✓</span>
                  <span className="text-[13px]">{p}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* ── Enriched School Profile ── */}
      {(s.establishedYear || s.usp || s.avgClassSize || s.teacherStudentRatio) && (
        <Section title={lang === "th" ? "ข้อมูลเชิงลึก" : "School Profile"}>
          <div className="grid grid-cols-2 gap-2.5">
            {s.establishedYear && (
              <ProfileCard
                icon="🏛️"
                label={lang === "th" ? "ก่อตั้ง" : "Established"}
                value={`${s.establishedYear} (${new Date().getFullYear() - s.establishedYear} ปี)`}
              />
            )}
            {s.avgClassSize && (
              <ProfileCard
                icon="👩‍🏫"
                label={lang === "th" ? "นร./ห้อง" : "Class Size"}
                value={`${s.avgClassSize} คน`}
              />
            )}
            {s.teacherStudentRatio && (
              <ProfileCard
                icon="📊"
                label={lang === "th" ? "ครู:นร." : "Teacher:Student"}
                value={s.teacherStudentRatio}
              />
            )}
            {s.competitionRate && (
              <ProfileCard
                icon="🎯"
                label={lang === "th" ? "อัตราแข่งขัน" : "Competition"}
                value={s.competitionRate}
              />
            )}
            {s.foreignPassportRatio && (
              <ProfileCard
                icon="🌍"
                label={lang === "th" ? "นร.ต่างชาติ" : "Foreign"}
                value={s.foreignPassportRatio}
              />
            )}
            {s.teacherAccent && (
              <ProfileCard
                icon="🗣️"
                label={lang === "th" ? "สำเนียง" : "Accent"}
                value={s.teacherAccent}
              />
            )}
          </div>
          {s.usp && (
            <div className="mt-3 rounded-xl bg-[var(--color-accent)]/5 px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              ✨ <span className="font-medium text-[var(--color-text)]">{lang === "th" ? "จุดเด่น" : "USP"}:</span> {s.usp}
            </div>
          )}
          {s.topUniAcceptance && (
            <div className="mt-2 rounded-xl bg-[var(--color-success)]/5 px-3.5 py-2.5 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              🎓 <span className="font-medium text-[var(--color-text)]">{lang === "th" ? "ผลตอบรับมหาลัย" : "Uni Acceptance"}:</span> {s.topUniAcceptance}
            </div>
          )}
          {s.parentPraise && s.parentPraise.length > 0 && (
            <div className="mt-2 rounded-xl bg-[var(--color-warning)]/5 px-3.5 py-2.5 text-[12px] leading-relaxed">
              💬 <span className="font-medium text-[var(--color-text)]">{lang === "th" ? "ผู้ปกครองมักชม" : "Parents praise"}:</span>{" "}
              <span className="text-[var(--color-text-secondary)]">{s.parentPraise.join(" • ")}</span>
            </div>
          )}
        </Section>
      )}

      {/* Fee + EF row on larger screens */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {/* Fee Breakdown */}
        <Section title={t("feeBreakdown")}>
          <div className="grid grid-cols-2 gap-3">
            <FeeCard label={t("feeMin")} value={`฿${s.tMin.toLocaleString()}`} />
            <FeeCard label={t("feeMax")} value={`฿${s.tMax.toLocaleString()}`} />
          </div>
        </Section>

        {/* EF Score */}
        <Section title={t("efSection")}>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-alt)]">
            <span className="text-[22px] font-extrabold">{s.efScore}</span>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-medium">{t("efLabel")}: {s.efScore}/10</div>
            {s.efNote && (
              <div className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">
                {s.efNote}
              </div>
            )}
          </div>
        </div>
      </Section>
      </div>{/* close Fee + EF grid */}

      {/* Learning Styles */}
      <Section title={t("learningStyles")}>
        <div className="flex flex-wrap gap-2">
          {s.ls.map((style) => (
            <span
              key={style}
              className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1.5 text-[12px] font-medium text-[var(--color-accent)]"
            >
              {style}
            </span>
          ))}
        </div>
      </Section>

      {/* Shadow Teacher */}
      {s.shadow && (
        <Section title={t("shadowTeacher")}>
          <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {s.shadow}
          </p>
        </Section>
      )}

      {/* You-Time */}
      {s.youtime && (
        <Section title={t("youTime")}>
          <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {s.youtime}
          </p>
        </Section>
      )}

      {/* Extra Curriculum */}
      {s.extra && (
        <Section title={t("extraCurriculum")}>
          <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
            {s.extra}
          </p>
        </Section>
      )}

      {/* Track Record */}
      {s.track.topUni && s.track.topUni.length > 0 && (
        <Section title={t("trackRecord")}>
          {s.track.igcse && (
            <InfoRow label="IGCSE" value={s.track.igcse} />
          )}
          {s.track.aLevel && (
            <InfoRow label="A-Level" value={s.track.aLevel} />
          )}
          {s.track.ibAvg && (
            <InfoRow label="IB Average" value={s.track.ibAvg} />
          )}
          {s.track.ibNote && (
            <div className="mb-2 text-[12px] text-[var(--color-text-secondary)]">
              {s.track.ibNote}
            </div>
          )}
          <div className="mt-2">
            <div className="mb-1.5 text-[11px] font-bold uppercase text-[var(--color-text-secondary)]">
              {t("topUniversities")}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.track.topUni.map((u) => (
                <span
                  key={u}
                  className="rounded-full bg-[var(--color-surface-alt)] px-2.5 py-1 text-[11px] font-medium"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
          {s.track.medical && (
            <div className="mt-3 rounded-xl bg-[var(--color-success)]/10 px-3 py-2 text-[12px] text-[var(--color-success)]">
              🏥 {typeof s.track.medical === "string" ? s.track.medical : t("medicalTrack")}
            </div>
          )}
        </Section>
      )}

      {/* ── Live Updates ── */}
      <Section title={t("liveUpdates")}>
        {updatesLoading ? (
          <Skeleton variant="update-card" count={2} />
        ) : updates.length === 0 ? (
          <p className="py-4 text-center text-[12px] text-[var(--color-text-secondary)]">
            {t("noUpdates")}
          </p>
        ) : (
          <div className="space-y-3">
            {updates.slice(0, 3).map((u) => (
              <UpdateCard key={u.id} update={u} compact />
            ))}
            {updates.length > 3 && (
              <ExpandableSection label={`${t("loadMoreUpdates")} (${updates.length - 3})`}>
                <div className="space-y-3">
                  {updates.slice(3).map((u) => (
                    <UpdateCard key={u.id} update={u} compact />
                  ))}
                </div>
              </ExpandableSection>
            )}
          </div>
        )}
      </Section>

      {/* ── Exam & Results Tracking ── */}
      {(examsLoading || examLinks.length > 0) && (
        <Section title={t("examTracking")}>
          {examsLoading ? (
            <Skeleton variant="line" count={3} />
          ) : (
            <div className="relative space-y-0 pl-4">
              {/* Timeline vertical line */}
              <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-[var(--color-border)]" />
              {examLinks.map((link) => (
                <div key={link.id} className="relative pb-4">
                  {/* Timeline dot */}
                  <div className="absolute left-[-12px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]" />

                  <div className="rounded-xl bg-[var(--color-bg)] p-3 border border-[var(--color-border)]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-[13px] font-semibold">
                          {lang === "th" ? link.title_th : link.title_en}
                        </h5>
                        {link.academic_year && (
                          <span className="text-[10px] text-[var(--color-text-secondary)]">
                            {link.academic_year}
                          </span>
                        )}
                      </div>
                      {link.is_official && (
                        <span className="flex-shrink-0 rounded-full bg-[var(--color-success)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-success)]">
                          {t("officialSource")}
                        </span>
                      )}
                    </div>

                    {/* Dates row */}
                    <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
                      {link.exam_date && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[var(--color-text-secondary)]">{t("examDate")}:</span>
                          <span className="font-medium">{new Date(link.exam_date).toLocaleDateString(lang === "th" ? "th-TH" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <CountdownBadge dateStr={link.exam_date} />
                        </div>
                      )}
                      {link.result_date && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[var(--color-text-secondary)]">{t("resultDate")}:</span>
                          <span className="font-medium">{new Date(link.result_date).toLocaleDateString(lang === "th" ? "th-TH" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                          <CountdownBadge dateStr={link.result_date} />
                        </div>
                      )}
                    </div>

                    {/* Action links */}
                    <div className="mt-2 flex gap-2">
                      {link.registration_url && (
                        <a
                          href={link.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-[11px] font-semibold text-white no-underline"
                        >
                          {t("registrationLink")}
                        </a>
                      )}
                      {link.result_url && (
                        <a
                          href={link.result_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--color-text)] no-underline"
                        >
                          {t("viewResults")}
                        </a>
                      )}
                    </div>

                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(link as any).notes && (
                      <p className="mt-1.5 text-[10px] text-[var(--color-text-secondary)]">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(link as any).notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ── Reviews Section ── */}
      <Section title={t("reviewSectionTitle")}>
        {/* Average + count */}
        {!reviewsLoading && reviews.length > 0 && (
          <div className="mb-4 flex items-center gap-3">
            <div className="text-[28px] font-extrabold text-[var(--color-accent)]">
              {(reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1)}
            </div>
            <div>
              <div className="text-[13px] font-medium">
                {"⭐".repeat(Math.round(reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length))}
              </div>
              <div className="text-[11px] text-[var(--color-text-secondary)]">
                {t("reviewCount").replace("{n}", String(reviews.length))}
              </div>
            </div>
          </div>
        )}

        {/* Review list */}
        {reviewsLoading ? (
          <div className="space-y-3">
            <div className="h-20 animate-shimmer rounded-xl bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
            <div className="h-20 animate-shimmer rounded-xl bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface-alt)] to-[var(--color-surface)]" />
          </div>
        ) : reviews.length === 0 && !reviewSubmitted ? (
          <p className="py-4 text-center text-[12px] text-[var(--color-text-secondary)]">
            {t("reviewEmpty")}
          </p>
        ) : (
          <div className="space-y-3">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((r) => (
              <div
                key={r.id}
                className="rounded-xl bg-white p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold">
                      {r.reviewer_name || t("reviewAnonymous")}
                    </span>
                    {r.parent_type && (
                      <span className="rounded-full bg-[var(--color-surface-alt)] px-2 py-0.5 text-[9px] font-medium text-[var(--color-text-secondary)]">
                        {r.parent_type === "current_parent"
                          ? t("reviewParentCurrent")
                          : r.parent_type === "alumni_parent"
                          ? t("reviewParentAlumni")
                          : t("reviewParentProspective")}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--color-text-secondary)]">
                    {relativeTime(r.created_at, lang)}
                  </span>
                </div>
                <div className="mt-1 text-[12px]">
                  {"⭐".repeat(r.rating || 0)}
                  {r.child_grade && (
                    <span className="ml-2 text-[10px] text-[var(--color-text-secondary)]">
                      {r.child_grade}
                    </span>
                  )}
                </div>
                {r.comment_text && (
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                    {r.comment_text}
                  </p>
                )}
              </div>
            ))}

            {/* Show more / less */}
            {reviews.length > 3 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full py-2 text-center text-[11px] font-medium text-[var(--color-accent)]"
              >
                {showAllReviews
                  ? t("reviewShowLess")
                  : t("reviewShowMore").replace("{n}", String(reviews.length))}
              </button>
            )}
          </div>
        )}

        {/* Success message */}
        {reviewSubmitted && (
          <div className="my-3 rounded-xl bg-[var(--color-success)]/10 p-3 text-center text-[13px] font-medium text-[var(--color-success)]">
            {t("reviewSuccess")}
          </div>
        )}

        {/* Write review button */}
        {!showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-3 w-full rounded-xl border border-[var(--color-accent)] px-4 py-3 text-[13px] font-bold text-[var(--color-accent)] transition-all active:scale-[0.98]"
          >
            {t("reviewWriteBtn")}
          </button>
        )}

        {/* Review form */}
        {showReviewForm && (
          <div className="mt-4 space-y-4 rounded-xl bg-white p-4">
            {/* Nickname */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("reviewNameLabel")}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={t("reviewNamePlaceholder")}
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                maxLength={50}
              />
            </div>

            {/* Star rating */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("reviewRatingLabel")} <span className="text-[var(--color-error)]">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`text-[28px] transition-all ${
                      star <= reviewRating ? "grayscale-0" : "opacity-30 grayscale"
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("reviewCommentLabel")}
              </label>
              <textarea
                className="form-input min-h-[80px] resize-y"
                placeholder={t("reviewCommentPlaceholder")}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                maxLength={1000}
              />
            </div>

            {/* Parent type */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("reviewParentLabel")}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: t("reviewParentCurrent"), value: "current_parent" },
                  { label: t("reviewParentAlumni"), value: "alumni_parent" },
                  { label: t("reviewParentProspective"), value: "prospective" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setReviewParentType(reviewParentType === opt.value ? "" : opt.value)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] transition-all ${
                      reviewParentType === opt.value
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade */}
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("reviewGradeLabel")}
              </label>
              <select
                className="form-input"
                value={reviewGrade}
                onChange={(e) => setReviewGrade(e.target.value)}
              >
                <option value="">{t("reviewGradeDefault")}</option>
                {["Pre-Nursery","Nursery","KG1","KG2","KG3","P1","P2","P3","P4","P5","P6","M1","M2","M3","M4","M5","M6"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* PDPA */}
            <div className="flex items-start gap-2 rounded-lg bg-[var(--color-surface)] px-3 py-2">
              <span className="text-[12px]">🔒</span>
              <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                {t("reviewPdpa")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowReviewForm(false)}
                className="flex-1 rounded-xl border border-[var(--color-border)] py-3 text-[13px] font-medium text-[var(--color-text-secondary)]"
              >
                {t("reviewCloseBtn")}
              </button>
              <button
                disabled={reviewRating === 0 || submitting}
                onClick={async () => {
                  await addReview({
                    school_name: s.short,
                    reviewer_name: reviewName.trim() || null,
                    rating: reviewRating,
                    comment_text: reviewComment.trim() || null,
                    parent_type: reviewParentType || null,
                    child_grade: reviewGrade || null,
                    review_language: lang,
                  });
                  setShowReviewForm(false);
                  setReviewName("");
                  setReviewRating(0);
                  setReviewComment("");
                  setReviewParentType("");
                  setReviewGrade("");
                  setReviewSubmitted(true);
                }}
                className={`flex-1 rounded-xl py-3 text-[13px] font-bold transition-all ${
                  reviewRating > 0 && !submitting
                    ? "bg-[var(--color-text)] text-white active:scale-[0.98]"
                    : "cursor-not-allowed bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                }`}
              >
                {submitting ? t("reviewSubmitting") : t("reviewSubmit")}
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* ── Admission Zone ── */}
      {s.admissionZone && s.admissionZone.length > 0 && (
        <Section title={t("ageCalcAdmissionZone")}>
          <div className="flex flex-wrap gap-1.5">
            {s.admissionZone.map((zone: string) => (
              <span
                key={zone}
                className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--color-text)]"
              >
                {zone}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-[var(--color-text-secondary)]">
            {t("ageCalcZoneNote")}
          </p>
        </Section>
      )}

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-2 md:flex-row">
        {s.web && (
          <a
            href={s.web}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[14px] bg-[var(--color-text)] px-4 py-3.5 text-center text-sm font-bold text-white no-underline transition-all active:scale-[0.98]"
          >
            🌐 Website
          </a>
        )}
        {s.mq && (
          <a
            href={`https://maps.google.com/?q=${s.mq}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[14px] border border-[var(--color-border)] px-4 py-3.5 text-center text-sm font-medium text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.98]"
          >
            📍 Google Maps
          </a>
        )}
      </div>

      {/* Back */}
      <Link
        href="/results"
        className="mt-3 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backResults")}
      </Link>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-2xl bg-[var(--color-surface)] p-[18px]">
      <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
        {title}
      </div>
      {children}
    </div>
  );
}

function FeeCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center">
      <div className="text-[10px] uppercase text-[var(--color-text-secondary)]">
        {label}
      </div>
      <div className="mt-1 text-[17px] font-bold">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex items-start justify-between gap-2">
      <span className="text-[12px] font-medium text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span className="text-right text-[12px] font-medium">{value}</span>
    </div>
  );
}

function ProfileCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="text-[16px] leading-none">{icon}</div>
      <div className="mt-1.5 text-[10px] uppercase text-[var(--color-text-secondary)]">
        {label}
      </div>
      <div className="mt-0.5 text-[14px] font-semibold">{value}</div>
    </div>
  );
}
