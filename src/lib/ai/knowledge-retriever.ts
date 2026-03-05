// Retrieve relevant school data for the AI prompt
import { schools, schoolById } from "@/data/schools";
import type { SchoolData } from "@/data/schools";
import type { Intent } from "./intent-classifier";

interface RetrievedContext {
  schools: SchoolSummary[];
  totalSchools: number;
  metadata: string;
}

interface SchoolSummary {
  id: number;
  name: string;
  short: string;
  curriculum: string;
  location: string;
  feeRange: string;
  efScore: number;
  description: string;
  pros: string[];
  trackRecord: string;
  website?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  mapsQuery?: string;
  // enriched fields
  establishedYear?: number;
  usp?: string;
  topUniAcceptance?: string;
  foreignPassportRatio?: string;
  chineseStudentRatio?: string;
  avgClassSize?: number;
  competitionRate?: string;
  teacherStudentRatio?: string;
  teacherAccent?: string;
  avgTeacherTenure?: string;
  parentPraise?: string[];
}

function summarizeSchool(s: SchoolData): SchoolSummary {
  const trackParts: string[] = [];
  if (s.track.igcse) trackParts.push(`IGCSE: ${s.track.igcse}`);
  if (s.track.aLevel) trackParts.push(`A-Level: ${s.track.aLevel}`);
  if (s.track.ibAvg) trackParts.push(`IB avg: ${s.track.ibAvg}`);
  if (s.track.topUni) trackParts.push(`Top unis: ${s.track.topUni.join(", ")}`);
  if (s.track.medical) trackParts.push(`Medical: ${typeof s.track.medical === "string" ? s.track.medical : "Yes"}`);

  return {
    id: s.id,
    name: s.name,
    short: s.short,
    curriculum: s.curL,
    location: s.locL,
    feeRange: `฿${s.tMin.toLocaleString()}-${s.tMax.toLocaleString()}/year`,
    efScore: s.efScore,
    description: s.desc,
    pros: s.pros || [],
    trackRecord: trackParts.join(" | ") || "N/A",
    website: s.web,
    phone: s.phone,
    lat: s.lat,
    lng: s.lng,
    mapsQuery: s.mq,
    // enriched
    establishedYear: s.establishedYear,
    usp: s.usp,
    topUniAcceptance: s.topUniAcceptance,
    foreignPassportRatio: s.foreignPassportRatio,
    chineseStudentRatio: s.chineseStudentRatio,
    avgClassSize: s.avgClassSize,
    competitionRate: s.competitionRate,
    teacherStudentRatio: s.teacherStudentRatio,
    teacherAccent: s.teacherAccent,
    avgTeacherTenure: s.avgTeacherTenure,
    parentPraise: s.parentPraise,
  };
}

/** Retrieve schools relevant to the user's query */
export function retrieveContext(
  intent: Intent,
  message: string,
  mentionedSchoolIds: number[],
  preferences?: {
    budget_range?: [number, number];
    child_age?: string;
    curricula?: string[];
    location?: string;
  }
): RetrievedContext {
  let filtered: SchoolData[] = [];

  // If specific schools mentioned, include them
  if (mentionedSchoolIds.length > 0) {
    for (const id of mentionedSchoolIds) {
      const school = schoolById.get(id);
      if (school) filtered.push(school);
    }
  }

  // If recommendation or budget intent, filter by preferences
  if (
    intent === "recommendation" ||
    intent === "budget" ||
    intent === "location" ||
    intent === "curriculum"
  ) {
    let candidates = [...schools];

    // Budget filter
    if (preferences?.budget_range) {
      const [min, max] = preferences.budget_range;
      candidates = candidates.filter(
        (s) => s.tMin <= max && s.tMax >= min
      );
    }

    // Budget from message
    const budgetMatch = message.match(/(\d{2,3})[kK]|(\d{3,})(?:K|k|,000)/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1] || budgetMatch[2]) * (budgetMatch[1] ? 1000 : 1);
      candidates = candidates.filter(
        (s) => s.tMin <= budget * 1.3 && s.tMax >= budget * 0.5
      );
    }

    // Curriculum filter
    if (preferences?.curricula && preferences.curricula.length > 0) {
      candidates = candidates.filter((s) =>
        preferences.curricula!.includes(s.cur)
      );
    }

    // Sort by EF score desc, take top 10
    candidates.sort((a, b) => b.efScore - a.efScore);
    const topCandidates = candidates.slice(0, 10);

    // Merge with mentioned schools (avoid duplicates)
    for (const c of topCandidates) {
      if (!filtered.find((f) => f.id === c.id)) {
        filtered.push(c);
      }
    }
  }

  // If no schools found, provide top schools by EF score
  if (filtered.length === 0) {
    filtered = [...schools]
      .sort((a, b) => b.efScore - a.efScore)
      .slice(0, 10);
  }

  // Limit to 15 schools max
  filtered = filtered.slice(0, 15);

  return {
    schools: filtered.map(summarizeSchool),
    totalSchools: schools.length,
    metadata: `Total ${schools.length} schools in database. Showing ${filtered.length} most relevant.`,
  };
}

/** Get all school names for entity extraction */
export function getSchoolNames() {
  return schools.map((s) => ({ id: s.id, short: s.short, name: s.name }));
}
