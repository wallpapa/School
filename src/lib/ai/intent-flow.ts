// Intent flow prediction — predicts next likely user intent based on conversation flow
// Complex logic behind clean UI: parents see smart suggestions, not the machinery
import type { Intent } from "./intent-classifier";

/* ── Transition map: current intent → likely next intents ── */
const INTENT_FLOWS: Record<Intent, Intent[]> = {
  budget:         ["recommendation", "compare", "location"],
  curriculum:     ["compare", "recommendation", "exam"],
  location:       ["recommendation", "compare", "budget"],
  recommendation: ["compare", "budget", "location", "school_info"],
  compare:        ["school_info", "budget", "timeline"],
  school_info:    ["compare", "timeline", "transfer"],
  transfer:       ["timeline", "exam", "school_info"],
  timeline:       ["exam", "school_info", "recommendation"],
  exam:           ["compare", "recommendation", "timeline"],
  teacher:        ["safety", "school_info", "compare"],
  safety:         ["counseling", "teacher", "school_info"],
  leadership:     ["teacher", "school_info", "compare"],
  counseling:     ["safety", "school_info", "compare"],
  birth_date:     ["curriculum", "transfer", "timeline", "recommendation"],
  general:        ["recommendation", "curriculum", "budget"],
};

/* ── Intent → Thai + English suggestion labels ── */
const INTENT_SUGGESTIONS: Record<Intent, Record<string, string[]>> = {
  budget: {
    th: ["งบประมาณต่อปีเท่าไหร่ดี?", "ค่าใช้จ่ายจริงๆ รวมทุกอย่าง?"],
    en: ["What's a good annual budget?", "What are the real total costs?"],
  },
  curriculum: {
    th: ["หลักสูตรไหนเหมาะกับลูก?", "IB กับ IGCSE ต่างกันยังไง?"],
    en: ["Which curriculum suits my child?", "IB vs IGCSE differences?"],
  },
  location: {
    th: ["โรงเรียนแถวไหนดี?", "ใกล้ BTS/MRT มั้ย?"],
    en: ["Which area has good schools?", "Any schools near BTS/MRT?"],
  },
  recommendation: {
    th: ["แนะนำโรงเรียนให้หน่อย", "โรงเรียนไหนเหมาะกับลูก?"],
    en: ["Recommend schools for me", "Which school suits my child?"],
  },
  compare: {
    th: ["เปรียบเทียบโรงเรียน", "ดูข้อดี-ข้อเด่นแต่ละที่"],
    en: ["Compare these schools", "See strengths of each"],
  },
  school_info: {
    th: ["ดูข้อมูลโรงเรียนเพิ่มเติม", "โทรถามโรงเรียนเลย"],
    en: ["See more school details", "Call the school directly"],
  },
  transfer: {
    th: ["ย้ายโรงเรียนต้องเตรียมอะไร?", "ขั้นตอนการย้ายหลักสูตร"],
    en: ["What to prepare for transfer?", "Steps for switching curriculum"],
  },
  timeline: {
    th: ["ปฏิทินการรับสมัคร", "เปิดรับสมัครเมื่อไหร่?"],
    en: ["Admission calendar", "When do applications open?"],
  },
  exam: {
    th: ["เตรียมสอบเข้าอย่างไร?", "ดูผลสอบโรงเรียน"],
    en: ["How to prepare for entrance?", "See exam results"],
  },
  teacher: {
    th: ["สัดส่วนครูต่อนักเรียน?", "ครู native กี่ %?"],
    en: ["Student-teacher ratio?", "% of native teachers?"],
  },
  safety: {
    th: ["นโยบายความปลอดภัย?", "ดูแลเด็กแพ้อาหารยังไง?"],
    en: ["Safety policies?", "How are food allergies handled?"],
  },
  leadership: {
    th: ["ผู้บริหารโรงเรียนเป็นใคร?", "ผลงานระดับชาติ?"],
    en: ["Who runs the school?", "National achievements?"],
  },
  counseling: {
    th: ["ระบบดูแลนักเรียน?", "มี counselor กี่คน?"],
    en: ["Student care system?", "How many counselors?"],
  },
  birth_date: {
    th: ["ลูกเกิดเดือน... อยู่ชั้นไหน?", "ดูตาราง cutoff dates"],
    en: ["Which grade for my child's birth month?", "See cutoff date table"],
  },
  general: {
    th: ["ค้นหาโรงเรียน", "ทำแบบทดสอบสไตล์การเลี้ยงลูก"],
    en: ["Search for schools", "Take parenting style quiz"],
  },
};

/**
 * Predict next suggestion chips based on conversation flow.
 * Filters out already-answered intents so suggestions stay fresh.
 */
export function predictNextSuggestions(
  currentIntent: Intent,
  mentionedSchools: string[],
  answeredIntents: Intent[],
  lang: string = "th"
): string[] {
  const nextIntents = INTENT_FLOWS[currentIntent] || INTENT_FLOWS.general;

  // Filter out intents the user has already explored
  const fresh = nextIntents.filter((i) => !answeredIntents.includes(i));
  const candidates = fresh.length > 0 ? fresh : nextIntents.slice(0, 2);

  const suggestions: string[] = [];

  // If schools were mentioned, inject a compare suggestion
  if (mentionedSchools.length > 0 && currentIntent !== "compare") {
    const compareLabel =
      lang === "th"
        ? `เปรียบเทียบ ${mentionedSchools[0]} กับโรงเรียนอื่น`
        : `Compare ${mentionedSchools[0]} with other schools`;
    suggestions.push(compareLabel);
  }

  // Pick one suggestion from each predicted next intent
  for (const intent of candidates) {
    const labels = INTENT_SUGGESTIONS[intent]?.[lang] || INTENT_SUGGESTIONS[intent]?.th || [];
    if (labels.length > 0) {
      // Pick the first label that hasn't been added yet
      const label = labels.find((l) => !suggestions.includes(l));
      if (label) suggestions.push(label);
    }
    if (suggestions.length >= 3) break;
  }

  return suggestions.slice(0, 3);
}

/**
 * Extract answered intents from conversation history.
 * Used server-side to build the answeredIntents list.
 */
export function extractAnsweredIntents(
  conversationHistory?: { role: string; content: string; intent?: string }[]
): Intent[] {
  if (!conversationHistory?.length) return [];
  const intents = new Set<Intent>();
  for (const msg of conversationHistory) {
    if (msg.intent) intents.add(msg.intent as Intent);
  }
  return [...intents];
}
