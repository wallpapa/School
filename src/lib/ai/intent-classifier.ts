// Rule-based intent classification for chat messages
import { predictNextSuggestions } from "./intent-flow";

export type Intent =
  | "budget"
  | "curriculum"
  | "location"
  | "compare"
  | "transfer"
  | "timeline"
  | "exam"
  | "school_info"
  | "recommendation"
  | "teacher"
  | "safety"
  | "leadership"
  | "counseling"
  | "birth_date"
  | "general";

interface IntentRule {
  intent: Intent;
  keywords: string[];
  weight: number;
}

const RULES: IntentRule[] = [
  {
    intent: "budget",
    keywords: [
      "งบ", "ค่าเทอม", "ราคา", "เงิน", "แพง", "ถูก", "ทุน", "scholarship",
      "budget", "tuition", "fee", "cost", "expensive", "cheap", "affordable",
      "baht", "บาท", "ค่าใช้จ่าย", "ส่วนลด", "discount",
    ],
    weight: 2,
  },
  {
    intent: "curriculum",
    keywords: [
      "หลักสูตร", "IB", "IGCSE", "A-Level", "AP", "curriculum", "program",
      "montessori", "waldorf", "bilingual", "trilingual", "สองภาษา", "สามภาษา",
      "EP", "English Program", "British", "American", "French", "อินเตอร์",
    ],
    weight: 2,
  },
  {
    intent: "location",
    keywords: [
      "ใกล้", "ไกล", "ย่าน", "โซน", "สุขุมวิท", "สาทร", "บางนา", "ดอนเมือง",
      "เขต", "ที่ตั้ง", "ริเวอร์ไซด์", "location", "near", "area", "zone",
      "distance", "ระยะทาง", "BTS", "MRT", "รถไฟฟ้า", "ทำเลดี", "แถว",
    ],
    weight: 2,
  },
  {
    intent: "compare",
    keywords: [
      "เปรียบเทียบ", "เทียบ", "ต่าง", "ดีกว่า", "compare", "versus", "vs",
      "difference", "better", "แตกต่าง", "เหมือน", "similar", "ข้อดี", "ข้อเสีย",
    ],
    weight: 2,
  },
  {
    intent: "transfer",
    keywords: [
      "ย้าย", "เปลี่ยน", "โอน", "transfer", "switch", "move", "ถอน",
      "ออกจาก", "เข้าใหม่", "ปรับตัว", "adapt",
    ],
    weight: 2,
  },
  {
    intent: "timeline",
    keywords: [
      "เมื่อไหร่", "สมัคร", "เปิดรับ", "ปิดรับ", "deadline", "when", "apply",
      "registration", "เปิดเทอม", "ปิดเทอม", "term", "semester", "วันสอบ",
      "ไทม์ไลน์", "timeline", "calendar", "schedule", "ตาราง",
    ],
    weight: 1.5,
  },
  {
    intent: "exam",
    keywords: [
      "สอบ", "ผลสอบ", "คะแนน", "exam", "test", "score", "result",
      "เกรด", "grade", "ONET", "SAT", "TOEFL", "IELTS", "ประเมิน",
      "สัมภาษณ์", "interview", "entrance", "สอบเข้า",
    ],
    weight: 1.5,
  },
  {
    intent: "school_info",
    keywords: [
      "ข้อมูล", "รายละเอียด", "เว็บ", "โทร", "ติดต่อ", "info", "detail",
      "website", "contact", "phone", "address", "ที่อยู่", "แผนที่", "map",
    ],
    weight: 1,
  },
  {
    intent: "recommendation",
    keywords: [
      "แนะนำ", "เหมาะ", "ดีไหม", "ที่ไหนดี", "recommend", "suggest", "best",
      "suitable", "เหมาะกับ", "ลูก", "child", "kid", "อายุ", "age",
      "ขวบ", "years old", "เรียนที่ไหน",
    ],
    weight: 1.5,
  },
  // ── New: Teacher intent ──
  {
    intent: "teacher",
    keywords: [
      "ครู", "อาจารย์", "teacher", "instructor", "สัดส่วนครู", "ครูต่อนักเรียน",
      "student-teacher", "ratio", "TA", "teacher assistant", "ผู้ช่วยครู",
      "native", "เจ้าของภาษา", "native english", "ต่างชาติ", "foreign teacher",
      "ใบอนุญาต", "license", "วุฒิ", "ปริญญา", "degree", "qualification",
      "ตรงสาขา", "ประสบการณ์ครู", "teacher experience", "teaching experience",
      "ลาออก", "turnover", "retention", "อยู่นาน",
    ],
    weight: 2,
  },
  // ── New: Safety & Welfare intent ──
  {
    intent: "safety",
    keywords: [
      "bully", "bullying", "กลั่นแกล้ง", "รังแก", "ความปลอดภัย", "safety",
      "อุบัติเหตุ", "accident", "ห้องพยาบาล", "nurse", "พยาบาล", "infirmary",
      "โรงพยาบาล", "hospital", "ส่งตัว", "transfer hospital", "ประกัน", "insurance",
      "แพ้", "allergy", "แพ้อาหาร", "food allergy", "แพ้ยา", "drug allergy",
      "เงื่อนไขพิเศษ", "special needs", "special condition", "สวัสดิภาพ", "welfare",
      "ความขัดแย้ง", "conflict", "protocol",
    ],
    weight: 2,
  },
  // ── New: Leadership intent ──
  {
    intent: "leadership",
    keywords: [
      "ครูใหญ่", "ผู้อำนวยการ", "principal", "director", "head of school",
      "headmaster", "headmistress", "ผู้บริหาร", "ผอ", "หัวหน้า",
      "curriculum director", "academic director", "ผู้อำนวยการหลักสูตร",
      "ชื่อเสียง", "famous", "รางวัล", "award", "ผลงาน", "achievement",
      "ระดับชาติ", "ระดับนานาชาติ", "national", "international achievement",
    ],
    weight: 2,
  },
  // ── Birth Date & Grade Eligibility intent ──
  {
    intent: "birth_date",
    keywords: [
      "วันเกิด", "เดือนเกิด", "ปีเกิด", "อายุเข้าเรียน", "cutoff", "ตัดรอบ",
      "birth date", "birth month", "birthday", "age cutoff", "relative age",
      "ซ้ำชั้น", "grade repetition", "redshirt", "academic redshirting",
      "คลอด", "C-section", "อายุเกณฑ์", "เกณฑ์อายุ", "กี่ขวบ",
      "อยู่ชั้นไหน", "อยู่เกรดไหน", "อยู่ year ไหน",
    ],
    weight: 2,
  },
  // ── New: Counseling intent ──
  {
    intent: "counseling",
    keywords: [
      "แนะแนว", "counselor", "counseling", "counsellor", "guidance",
      "ที่ปรึกษา", "advisor", "นักจิตวิทยา", "psychologist",
      "ดูแลเด็ก", "pastoral", "pastoral care", "ระบบดูแล",
      "student support", "student welfare", "เด็กพิเศษ", "ADHD",
      "learning difficulty", "บำบัด", "therapy",
    ],
    weight: 2,
  },
];

/** Compound keywords that should be matched FIRST (before single-word keywords)
 *  These override their component parts — e.g. "ครูใหญ่" → leadership, not teacher */
const COMPOUND_RULES: { pattern: string; intent: Intent; weight: number }[] = [
  // Leadership compounds (prevent "ครู" from stealing these)
  { pattern: "ครูใหญ่", intent: "leadership", weight: 4 },
  { pattern: "ผู้อำนวยการ", intent: "leadership", weight: 4 },
  { pattern: "head of school", intent: "leadership", weight: 4 },
  { pattern: "ชื่อเสียง", intent: "leadership", weight: 3 },
  // Transfer compounds (prevent "อินเตอร์" from stealing these)
  { pattern: "ย้ายไปอินเตอร์", intent: "transfer", weight: 4 },
  { pattern: "ย้ายจาก", intent: "transfer", weight: 4 },
  { pattern: "ย้ายโรงเรียน", intent: "transfer", weight: 4 },
  { pattern: "เปลี่ยนโรงเรียน", intent: "transfer", weight: 4 },
  // Budget compounds
  { pattern: "ค่าเทอม", intent: "budget", weight: 3 },
  { pattern: "ค่าใช้จ่าย", intent: "budget", weight: 3 },
  // Location compounds (ensure location wins over curriculum for area-based questions)
  { pattern: "แถวบางนา", intent: "location", weight: 4 },
  { pattern: "แถวสุขุมวิท", intent: "location", weight: 4 },
  { pattern: "ใกล้บ้าน", intent: "location", weight: 4 },
  { pattern: "อยู่แถว", intent: "location", weight: 3 },
  { pattern: "แถวไหน", intent: "location", weight: 3 },
  // Safety compounds
  { pattern: "แพ้อาหาร", intent: "safety", weight: 4 },
  { pattern: "ห้องพยาบาล", intent: "safety", weight: 4 },
  // Counseling compounds
  { pattern: "เด็กพิเศษ", intent: "counseling", weight: 4 },
  { pattern: "ดูแลเด็ก", intent: "counseling", weight: 3 },
  // Birth date compounds
  { pattern: "วันเกิดลูก", intent: "birth_date", weight: 4 },
  { pattern: "เดือนเกิด", intent: "birth_date", weight: 4 },
  { pattern: "ปีเกิดลูก", intent: "birth_date", weight: 4 },
  { pattern: "อายุเข้าเรียน", intent: "birth_date", weight: 4 },
  { pattern: "cutoff date", intent: "birth_date", weight: 4 },
  { pattern: "ซ้ำชั้น", intent: "birth_date", weight: 3 },
  { pattern: "ลูกเกิด", intent: "birth_date", weight: 4 },
  { pattern: "กี่ขวบเข้า", intent: "birth_date", weight: 4 },
  { pattern: "อยู่ชั้นไหน", intent: "birth_date", weight: 3 },
  { pattern: "อยู่ year ไหน", intent: "birth_date", weight: 3 },
  { pattern: "อยู่เกรดไหน", intent: "birth_date", weight: 3 },
];

/** Classify user message intent using keyword matching */
export function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase();
  const scores: Record<Intent, number> = {
    budget: 0,
    curriculum: 0,
    location: 0,
    compare: 0,
    transfer: 0,
    timeline: 0,
    exam: 0,
    school_info: 0,
    recommendation: 0,
    teacher: 0,
    safety: 0,
    leadership: 0,
    counseling: 0,
    birth_date: 0,
    general: 0.5, // baseline
  };

  // 1) Match compound keywords first (higher priority)
  for (const rule of COMPOUND_RULES) {
    if (lower.includes(rule.pattern.toLowerCase())) {
      scores[rule.intent] += rule.weight;
    }
  }

  // 2) Match single keywords
  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        scores[rule.intent] += rule.weight;
      }
    }
  }

  // 3) Budget number pattern boost: "งบ" + numeric (e.g., 300K, 500k, 300000)
  if (/งบ\s*\d|budget\s*\d|\d+\s*k\b/i.test(lower)) {
    scores.budget += 3;
  }

  // Find highest score
  let bestIntent: Intent = "general";
  let bestScore = 0;
  for (const [intent, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent as Intent;
    }
  }

  return bestIntent;
}

/** Extract mentioned school IDs from message */
export function extractSchoolIds(
  message: string,
  schoolNames: { id: number; short: string; name: string }[]
): number[] {
  const lower = message.toLowerCase();
  const found: number[] = [];

  for (const s of schoolNames) {
    if (
      lower.includes(s.short.toLowerCase()) ||
      lower.includes(s.name.toLowerCase())
    ) {
      found.push(s.id);
    }
  }

  return [...new Set(found)];
}

/** Generate suggestion chips based on intent + conversation flow */
export function getSuggestions(
  intent: Intent,
  mentionedSchools: string[],
  answeredIntents?: Intent[],
  lang?: string
): string[] {
  // Use flow-aware prediction when we have conversation history
  if (answeredIntents && answeredIntents.length > 0) {
    return predictNextSuggestions(intent, mentionedSchools, answeredIntents, lang || "th");
  }

  // Fallback: static suggestions for first message
  const base: Record<Intent, string[]> = {
    budget: ["ดูโรงเรียนทุนการศึกษา", "เปรียบเทียบค่าเทอม"],
    curriculum: ["IB กับ IGCSE ต่างกันยังไง?", "ดูโรงเรียน IB ทั้งหมด"],
    location: ["ดูแผนที่โรงเรียนใกล้บ้าน", "โรงเรียนใกล้ BTS"],
    compare: ["ดูหน้าเปรียบเทียบ", "เปรียบเทียบค่าเทอม"],
    transfer: ["ขั้นตอนการย้ายโรงเรียน", "ข้อควรรู้เมื่อเปลี่ยนหลักสูตร"],
    timeline: ["ดูปฏิทินการรับสมัคร", "เตรียมสอบเข้าอย่างไร"],
    exam: ["ดูผลสอบโรงเรียน", "เตรียมสอบอย่างไร"],
    school_info: ["ดูหน้าโรงเรียน", "ดูแผนที่"],
    recommendation: ["ทำแบบทดสอบค้นหาโรงเรียน", "เปรียบเทียบ Top 5"],
    teacher: ["สัดส่วนครูต่อนักเรียน", "ครู native กี่เปอร์เซ็นต์?", "ดูประสบการณ์ครู"],
    safety: ["นโยบาย Anti-Bullying", "การจัดการเด็กแพ้อาหาร", "ประกันอุบัติเหตุ"],
    leadership: ["ครูใหญ่เป็นใคร?", "ครูที่มีชื่อเสียง", "ผลงานระดับชาติ"],
    counseling: ["ระบบแนะแนวเป็นอย่างไร?", "มี counselor กี่คน?", "ดูแลเด็กพิเศษ"],
    birth_date: ["ดูตาราง cutoff dates", "ลูกเกิดเดือน... อยู่ชั้นไหน?", "ย้ายหลักสูตรต้องซ้ำชั้นไหม?"],
    general: ["ค้นหาโรงเรียน", "ทำแบบทดสอบสไตล์การเลี้ยงลูก"],
  };

  const suggestions = [...base[intent]];

  if (mentionedSchools.length > 0 && intent !== "compare") {
    suggestions.unshift(`เปรียบเทียบ ${mentionedSchools[0]} กับโรงเรียนอื่น`);
  }

  return suggestions.slice(0, 3);
}
