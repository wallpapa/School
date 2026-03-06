export interface SchoolReview {
  id: number;
  school_id: number;
  school_name: string | null;
  reviewer_name: string | null;
  rating: number;
  score_overall: number | null;
  score_academics: number | null;
  score_ef: number | null;
  score_communication: number | null;
  score_value: number | null;
  comment_text: string | null;
  parent_type: string | null;
  child_grade: string | null;
  review_language: string;
  source: string | null;
  is_verified: boolean;
  created_at: string;
}
