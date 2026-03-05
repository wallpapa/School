/* ── SchoolFinder: Live Updates & Exam Types ── */

export type UpdateCategory =
  | "acceptance_rate"
  | "applicant_count"
  | "university_admission"
  | "medical_admission"
  | "engineering_admission"
  | "china_university"
  | "language_program"
  | "teaching_method"
  | "tuition_update"
  | "open_house"
  | "exam_date"
  | "result_announcement"
  | "scholarship"
  | "new_program"
  | "general_news";

export interface SchoolUpdate {
  id: string;
  school_id: number;
  category: UpdateCategory;
  title_th: string;
  title_en: string;
  body_th: string | null;
  body_en: string | null;
  data_value: string | null;
  data_unit: string | null;
  event_date: string | null;
  source_url: string | null;
  source_name: string | null;
  is_verified: boolean;
  data_updated_at: string;
  created_at: string;
}

export interface ExamResultLink {
  id: string;
  school_id: number;
  exam_type: string;
  title_th: string;
  title_en: string;
  exam_date: string | null;
  result_date: string | null;
  registration_url: string | null;
  result_url: string | null;
  is_official: boolean;
  is_active: boolean;
  academic_year: string | null;
  data_updated_at: string;
  created_at: string;
}

/* ── Category config: icon + color + i18n key ── */
export const CATEGORY_CONFIG: Record<
  UpdateCategory,
  { icon: string; color: string; labelKey: string }
> = {
  acceptance_rate: { icon: "📊", color: "#0071E3", labelKey: "catAcceptanceRate" },
  applicant_count: { icon: "👥", color: "#5856D6", labelKey: "catApplicantCount" },
  university_admission: { icon: "🎓", color: "#34C759", labelKey: "catUniversityAdmission" },
  medical_admission: { icon: "🩺", color: "#FF3B30", labelKey: "catMedicalAdmission" },
  engineering_admission: { icon: "⚙️", color: "#FF9F0A", labelKey: "catEngineeringAdmission" },
  china_university: { icon: "🇨🇳", color: "#FF2D55", labelKey: "catChinaUniversity" },
  language_program: { icon: "🌐", color: "#5AC8FA", labelKey: "catLanguageProgram" },
  teaching_method: { icon: "📚", color: "#AF52DE", labelKey: "catTeachingMethod" },
  tuition_update: { icon: "💰", color: "#FF9500", labelKey: "catTuitionUpdate" },
  open_house: { icon: "🏫", color: "#30B0C7", labelKey: "catOpenHouse" },
  exam_date: { icon: "📝", color: "#FF6482", labelKey: "catExamDate" },
  result_announcement: { icon: "📢", color: "#32D74B", labelKey: "catResultAnnouncement" },
  scholarship: { icon: "🏅", color: "#FFD60A", labelKey: "catScholarship" },
  new_program: { icon: "✨", color: "#BF5AF2", labelKey: "catNewProgram" },
  general_news: { icon: "📰", color: "#86868B", labelKey: "catGeneralNews" },
};

/* ── Helper: relative time string ── */
export function relativeTime(dateStr: string, lang: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    if (lang === "th") return `อีก ${absDays} วัน`;
    if (lang === "zh") return `${absDays}天后`;
    if (lang === "ja") return `${absDays}日後`;
    return `in ${absDays} days`;
  }
  if (diffDays === 0) {
    if (lang === "th") return "วันนี้";
    if (lang === "zh") return "今天";
    if (lang === "ja") return "今日";
    return "today";
  }
  if (diffDays === 1) {
    if (lang === "th") return "เมื่อวาน";
    if (lang === "zh") return "昨天";
    if (lang === "ja") return "昨日";
    return "yesterday";
  }
  if (diffDays < 7) {
    if (lang === "th") return `${diffDays} วันที่แล้ว`;
    if (lang === "zh") return `${diffDays}天前`;
    if (lang === "ja") return `${diffDays}日前`;
    return `${diffDays}d ago`;
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    if (lang === "th") return `${weeks} สัปดาห์ที่แล้ว`;
    if (lang === "zh") return `${weeks}周前`;
    if (lang === "ja") return `${weeks}週間前`;
    return `${weeks}w ago`;
  }
  const months = Math.floor(diffDays / 30);
  if (lang === "th") return `${months} เดือนที่แล้ว`;
  if (lang === "zh") return `${months}个月前`;
  if (lang === "ja") return `${months}ヶ月前`;
  return `${months}mo ago`;
}

/* ── Helper: days until a future date ── */
export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
