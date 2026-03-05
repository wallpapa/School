"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { SchoolUpdate, ExamResultLink, UpdateCategory } from "@/types/updates";

/* ── Fetch updates for a school or all schools ── */
export function useSchoolUpdates(schoolId?: number, category?: UpdateCategory) {
  const [updates, setUpdates] = useState<SchoolUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      let query = supabase
        .from("school_updates")
        .select("*")
        .order("data_updated_at", { ascending: false });

      if (schoolId) query = query.eq("school_id", schoolId);
      if (category) query = query.eq("category", category);

      const { data } = await query;
      setUpdates((data as SchoolUpdate[]) || []);
      setLoading(false);
    }
    fetch();
  }, [schoolId, category]);

  return { updates, loading };
}

/* ── Fetch upcoming events (event_date >= today) ── */
export function useUpcomingEvents(limit = 10) {
  const [events, setEvents] = useState<SchoolUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("school_updates")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(limit);

      setEvents((data as SchoolUpdate[]) || []);
      setLoading(false);
    }
    fetch();
  }, [limit]);

  return { events, loading };
}

/* ── Fetch exam result links for a school ── */
export function useExamResultLinks(schoolId?: number) {
  const [links, setLinks] = useState<ExamResultLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      let query = supabase
        .from("exam_result_links")
        .select("*")
        .order("exam_date", { ascending: true });

      if (schoolId) query = query.eq("school_id", schoolId);

      const { data } = await query;
      setLinks((data as ExamResultLink[]) || []);
      setLoading(false);
    }
    fetch();
  }, [schoolId]);

  return { links, loading };
}
