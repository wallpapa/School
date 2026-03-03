export type SchoolCategory =
  | "international"
  | "bilingual"
  | "trilingual"
  | "ep_program"
  | "thai_top_government"
  | "thai_top_private"
  | "thai_satit"
  | "alternative_montessori"
  | "alternative_waldorf"
  | "alternative_buddhist"
  | "alternative_reggio"
  | "special_needs"
  | "gifted"
  | "upcoming";

export type CurriculumType =
  | "ib"
  | "igcse"
  | "us"
  | "french"
  | "bilingual"
  | "trilingual"
  | "thai"
  | "montessori"
  | "waldorf"
  | "buddhist"
  | "reggio"
  | "special_ed"
  | "singapore";

export type TierLevel = "tier_1" | "tier_2" | "tier_3";

export interface School {
  id: number;
  uuid: string;
  name: string;
  name_th: string | null;
  short_name: string;
  slug: string;
  category: SchoolCategory;
  curriculum: CurriculumType;
  curriculum_label: string | null;
  tier: TierLevel | null;
  flag: string | null;
  city: string | null;
  district: string | null;
  district_th: string | null;
  latitude: number | null;
  longitude: number | null;
  fee_min: number | null;
  fee_max: number | null;
  learning_styles: string[];
  ef_score: number | null;
  ef_note: string | null;
  parent_fit_authoritative: number | null;
  parent_fit_authoritarian: number | null;
  parent_fit_permissive: number | null;
  parent_fit_neglectful: number | null;
  description: string | null;
  description_th: string | null;
  pros: string[];
  tags: string[];
  has_homework: boolean;
  has_testing: boolean;
  has_shadow_teacher: boolean;
  has_ep_program: boolean;
  has_boarding: boolean;
  is_inclusive: boolean;
  is_upcoming: boolean;
  shadow_teacher_detail: string | null;
  you_time_detail: string | null;
  extra_curriculum: string | null;
  website: string | null;
  maps_query: string | null;
  facebook: string | null;
  line_id: string | null;
  search_keywords: string[];
  search_volume_monthly: number;
  trending_score: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ExamResult {
  id: number;
  school_id: number;
  exam: string;
  year: number;
  average_score: number | null;
  percentage_top_grade: number | null;
  pass_rate: number | null;
  max_score: number | null;
  cohort_size: number | null;
  world_average: number | null;
  uk_average: number | null;
  tier: TierLevel | null;
  notes: string | null;
  source_url: string | null;
  created_at: string;
}

export interface UniversityDestination {
  id: number;
  school_id: number;
  university_name: string;
  country: string | null;
  is_top_50: boolean;
  is_medical: boolean;
  year: number | null;
  count: number;
}

export const CATEGORY_LABELS: Record<SchoolCategory, string> = {
  international: "International",
  bilingual: "Bilingual",
  trilingual: "Trilingual",
  ep_program: "EP Program",
  thai_top_government: "Thai Government",
  thai_top_private: "Thai Private",
  thai_satit: "Satit (Lab School)",
  alternative_montessori: "Montessori",
  alternative_waldorf: "Waldorf",
  alternative_buddhist: "Buddhist",
  alternative_reggio: "Reggio Emilia",
  special_needs: "Special Needs",
  gifted: "Gifted",
  upcoming: "Upcoming",
};

export const CURRICULUM_LABELS: Record<CurriculumType, string> = {
  ib: "IB",
  igcse: "IGCSE / A-Level",
  us: "American",
  french: "French",
  bilingual: "Bilingual",
  trilingual: "Trilingual",
  thai: "Thai",
  montessori: "Montessori",
  waldorf: "Waldorf",
  buddhist: "Buddhist",
  reggio: "Reggio Emilia",
  special_ed: "Special Education",
  singapore: "Singapore Math",
};

export const TIER_LABELS: Record<TierLevel, string> = {
  tier_1: "Tier 1",
  tier_2: "Tier 2",
  tier_3: "Tier 3",
};
