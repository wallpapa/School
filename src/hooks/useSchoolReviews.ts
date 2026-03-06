"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";
import type { SchoolReview } from "@/types/review";

export function useSchoolReviews(schoolId: number) {
  const [reviews, setReviews] = useState<SchoolReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getSupabase()
        .from("school_reviews")
        .select("*")
        .eq("school_id", schoolId)
        .order("created_at", { ascending: false });
      setReviews((data as SchoolReview[]) || []);
    } catch {
      // offline-first: keep empty
    }
    setLoading(false);
  }, [schoolId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (review: {
    school_name: string;
    reviewer_name: string | null;
    rating: number;
    comment_text: string | null;
    parent_type: string | null;
    child_grade: string | null;
    review_language: string;
  }) => {
    setSubmitting(true);
    try {
      await getSupabase()
        .from("school_reviews")
        .insert({
          school_id: schoolId,
          ...review,
          source: "school_page_review",
          is_verified: false,
        });
      await fetchReviews();
    } catch {
      // silently handle
    }
    setSubmitting(false);
  };

  return { reviews, loading, addReview, submitting };
}
