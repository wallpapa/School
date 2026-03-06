import type { SchoolData } from "@/data/schools";
import type { FinderState } from "@/context/FinderContext";

export interface MatchResult {
  school: SchoolData;
  score: number;        // 0–100
  reasons: string[];    // Thai reason strings
  breakdown: {
    budget: number;
    distance: number;
    style: number;
    curriculum: number;
    learning: number;
    parentFit: number;
    ef: number;
    bonus: number;
  };
}

// Haversine distance in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Zone to approximate lat/lng center
const zoneCenters: Record<string, [number, number]> = {
  sukhumvit: [13.7300, 100.5700],
  silom: [13.7280, 100.5330],
  ari: [13.7783, 100.5410],
  rama9: [13.7500, 100.5650],
  thonburi: [13.7260, 100.4860],
  chaengwattana: [13.8900, 100.5700],
  bangna: [13.6600, 100.6400],
  pathumwan: [13.7450, 100.5320],
  prawet: [13.6920, 100.6450],
  bangphli: [13.6300, 100.6800],
  riverside: [13.6950, 100.5280],
  bangphlat: [13.7700, 100.4800],
  ramintra: [13.8588, 100.6098],
  watthana: [13.7390, 100.5600],
};

// Map school tags/cur to style categories
function schoolMatchesStyle(school: SchoolData, styles: string[]): boolean {
  if (styles.length === 0) return true;
  for (const s of styles) {
    if (s === "international" && ["ib", "igcse", "us", "french"].includes(school.cur)) return true;
    if (s === "bilingual" && school.cur === "bilingual") return true;
    if (s === "trilingual" && school.cur === "trilingual") return true;
    if (s === "montessori" && (school.cur === "montessori" || school.tags.includes("montessori"))) return true;
    if (s === "thai_top" && school.cur === "thai") return true;
    if (s === "alternative" && school.tags.some((t) => ["waldorf", "reggio", "alternative"].includes(t))) return true;
  }
  return false;
}

export function matchSchools(
  allSchools: SchoolData[],
  state: FinderState,
  t?: (key: string) => string
): MatchResult[] {
  const tr = (key: string, fallback: string) => (t ? t(key) : fallback);
  const results: MatchResult[] = [];

  // Determine user location
  let userLat: number | null = state.lat;
  let userLng: number | null = state.lng;
  if (!userLat && state.zone && zoneCenters[state.zone]) {
    [userLat, userLng] = zoneCenters[state.zone];
  }

  for (const school of allSchools) {
    // Skip upcoming schools
    if (school.upcoming) continue;

    const reasons: string[] = [];
    let budget = 0;
    let distance = 0;
    let style = 0;
    let curriculum = 0;
    let learning = 0;
    let parentFit = 0;
    let ef = 0;
    let bonus = 0;

    // ─── Budget (max 40) ───
    const feeK = (school.tMin / 1000).toFixed(0);
    if (school.tMin <= state.budgetMax) {
      budget = 40;
      reasons.push(tr("matchBudgetOk", `Within budget (from ${feeK}K/yr)`).replace("{fee}", feeK));
    } else if (school.tMin <= state.budgetMax * 1.2) {
      budget = 20;
      reasons.push(tr("matchBudgetStretch", `Slightly over budget (from ${feeK}K/yr)`).replace("{fee}", feeK));
    }

    // ─── Distance (max 25) ───
    if (userLat && userLng) {
      const dist = haversine(userLat, userLng, school.lat, school.lng);
      const d = dist.toFixed(1);
      if (dist < 5) {
        distance = 25;
        reasons.push(tr("matchDistNear", `Close to home ${d} km`).replace("{d}", d));
      } else if (dist < 10) {
        distance = 20;
        reasons.push(tr("matchDistMid", `Distance ${d} km`).replace("{d}", d));
      } else if (dist < 20) {
        distance = 15;
        reasons.push(tr("matchDistFar", `${d} km away`).replace("{d}", d));
      } else {
        distance = 5;
      }
    } else {
      distance = 10; // No location data — neutral score
    }

    // ─── School Style (max 15) ───
    if (state.schoolStyles.length === 0) {
      style = 15;
    } else if (schoolMatchesStyle(school, state.schoolStyles)) {
      style = 15;
      reasons.push(tr("matchStyleHit", `Matches style: ${school.curL}`).replace("{cur}", school.curL));
    }

    // ─── Curriculum (max 20) ───
    if (state.curricula.length === 0) {
      curriculum = 20;
    } else if (state.curricula.includes(school.cur)) {
      curriculum = 20;
      reasons.push(tr("matchCurHit", `Curriculum: ${school.curL}`).replace("{cur}", school.curL));
    } else if (
      state.curricula.some((c) => school.tags.includes(c) || school.curL.toLowerCase().includes(c))
    ) {
      curriculum = 10;
    }

    // ─── Learning Style / VARK (max 15) ───
    if (state.learningStyles.length === 0) {
      learning = 15;
    } else {
      const overlap = state.learningStyles.filter((ls) => school.ls.includes(ls));
      learning = Math.round((overlap.length / state.learningStyles.length) * 15);
      if (overlap.length > 0) {
        reasons.push(tr("matchVarkHit", `Learning style match (${overlap.join(", ")})`).replace("{ls}", overlap.join(", ")));
      }
    }

    // ─── Parent Fit / Persona (max 20) ───
    if (state.persona) {
      const fitScore = school.parentFit[state.persona as keyof typeof school.parentFit] || 5;
      parentFit = fitScore * 2; // 1-10 → 2-20
      if (fitScore >= 8) {
        reasons.push(tr("matchParentFit", "Fits your parenting style"));
      }
    } else {
      parentFit = 14; // Neutral
    }

    // ─── EF Score (max 10) ───
    ef = school.efScore; // Already 1-10

    // ─── Bonus: University Goal (+10) ───
    if (state.uniGoal && school.track.topUni && school.track.topUni.length > 0) {
      if (state.uniGoal === "top20" || state.uniGoal === "top100") {
        bonus += 10;
        const unis = school.track.topUni.slice(0, 2).join(", ");
        reasons.push(tr("matchUniTrack", `Sends students to ${unis}`).replace("{unis}", unis));
      } else if (state.uniGoal === "uk" && school.track.topUni.some((u) => ["Oxford", "Cambridge", "Imperial", "LSE", "UCL"].includes(u))) {
        bonus += 10;
        reasons.push(tr("matchUniUK", "Sends students to UK Top universities"));
      } else if (state.uniGoal === "us" && school.track.topUni.some((u) => ["Stanford", "Harvard", "MIT", "Yale", "Columbia", "Brown", "UPenn", "Cornell"].includes(u))) {
        bonus += 10;
        reasons.push(tr("matchUniUS", "Sends students to Ivy League"));
      }
    }

    // ─── Bonus: Medical (+15) ───
    if (state.faculty === "medicine" && school.track.medical) {
      bonus += 15;
      reasons.push(tr("matchMedical", "Has Medical track"));
    }

    // ─── Total ───
    const raw = budget + distance + style + curriculum + learning + parentFit + ef + bonus;
    const maxPossible = 40 + 25 + 15 + 20 + 15 + 20 + 10; // 145
    const score = Math.min(100, Math.round((raw / maxPossible) * 100));

    if (score > 20) {
      results.push({
        school,
        score,
        reasons,
        breakdown: { budget, distance, style, curriculum, learning, parentFit, ef, bonus },
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results;
}
