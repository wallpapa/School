"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getSessionId,
  trackPageVisit,
  trackSchoolView,
  setSessionPersona,
  setSessionPreferences,
} from "@/lib/session";

export function useSession() {
  const [sessionId, setSessionId] = useState("");

  // Initialize session on mount
  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);
  }, []);

  // Track current page visit
  useEffect(() => {
    if (!sessionId || typeof window === "undefined") return;
    trackPageVisit(sessionId, window.location.pathname);
  }, [sessionId]);

  // Expose tracking functions
  const logSchoolView = useCallback(
    (schoolId: number) => {
      if (sessionId) trackSchoolView(sessionId, schoolId);
    },
    [sessionId]
  );

  const setPersona = useCallback(
    (persona: string) => {
      if (sessionId) setSessionPersona(sessionId, persona);
    },
    [sessionId]
  );

  const setPreferences = useCallback(
    (prefs: Record<string, unknown>) => {
      if (sessionId) setSessionPreferences(sessionId, prefs);
    },
    [sessionId]
  );

  return {
    sessionId,
    logSchoolView,
    setPersona,
    setPreferences,
  };
}
