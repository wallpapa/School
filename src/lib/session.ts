// Anonymous session management — no login required
import { supabase } from "./supabase";

const SESSION_KEY = "sf-session-id";

function generateId(): string {
  return crypto.randomUUID();
}

/** Get or create anonymous session ID from localStorage */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Log a page visit (debounced per page) */
export async function trackPageVisit(sessionId: string, path: string) {
  if (!sessionId) return;
  try {
    // Upsert session, append page if not already tracked
    const { data: existing } = await supabase
      .from("user_sessions")
      .select("pages_visited, schools_viewed")
      .eq("session_id", sessionId)
      .single();

    if (existing) {
      const pages = existing.pages_visited || [];
      if (!pages.includes(path)) {
        await supabase
          .from("user_sessions")
          .update({
            pages_visited: [...pages, path],
            last_seen: new Date().toISOString(),
          })
          .eq("session_id", sessionId);
      } else {
        await supabase
          .from("user_sessions")
          .update({ last_seen: new Date().toISOString() })
          .eq("session_id", sessionId);
      }
    } else {
      await supabase.from("user_sessions").insert({
        session_id: sessionId,
        pages_visited: [path],
      });
    }
  } catch {
    // Silent fail — tracking is non-critical
  }
}

/** Log a school view */
export async function trackSchoolView(sessionId: string, schoolId: number) {
  if (!sessionId) return;
  try {
    const { data } = await supabase
      .from("user_sessions")
      .select("schools_viewed")
      .eq("session_id", sessionId)
      .single();

    if (data) {
      const viewed = data.schools_viewed || [];
      if (!viewed.includes(schoolId)) {
        await supabase
          .from("user_sessions")
          .update({
            schools_viewed: [...viewed, schoolId],
            last_seen: new Date().toISOString(),
          })
          .eq("session_id", sessionId);
      }
    }
  } catch {
    // Silent fail
  }
}

/** Update session with quiz persona */
export async function setSessionPersona(sessionId: string, persona: string) {
  if (!sessionId) return;
  try {
    await supabase
      .from("user_sessions")
      .update({ persona, updated_at: new Date().toISOString() })
      .eq("session_id", sessionId);
  } catch {
    // Silent fail
  }
}

/** Update session preferences from finder */
export async function setSessionPreferences(
  sessionId: string,
  preferences: Record<string, unknown>
) {
  if (!sessionId) return;
  try {
    await supabase
      .from("user_sessions")
      .update({ preferences, updated_at: new Date().toISOString() })
      .eq("session_id", sessionId);
  } catch {
    // Silent fail
  }
}

/** Get session data for chat context */
export async function getSessionData(sessionId: string) {
  if (!sessionId) return null;
  try {
    const { data } = await supabase
      .from("user_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .single();
    return data;
  } catch {
    return null;
  }
}
