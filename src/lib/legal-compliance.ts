/**
 * Legal Compliance Module — Thai Law Awareness
 *
 * Covers:
 * 1. พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) — Personal Data Protection Act
 * 2. พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ — Computer Crime Act
 * 3. พ.ร.บ.คุ้มครองเด็ก — Child Protection Act (as school data involves minors)
 *
 * This module provides:
 * - Legal disclaimers for all chat responses
 * - Data handling guidelines
 * - Content filtering for legal compliance
 * - Compliance check helpers
 */

/* ── Disclaimer Templates ── */
export const DISCLAIMERS = {
  chat: {
    th: "⚠️ ข้อมูลนี้เป็นเพียงข้อมูลเบื้องต้นเพื่อประกอบการตัดสินใจ ไม่ใช่คำแนะนำทางการศึกษาอย่างเป็นทางการ ไม่ถือเป็นการให้คำปรึกษาวิชาชีพ กรุณาติดต่อโรงเรียนโดยตรงเพื่อยืนยันข้อมูล",
    en: "⚠️ This information is for preliminary reference only. It does not constitute official educational or professional advice. Please contact schools directly to verify.",
    zh: "⚠️ 本信息仅供初步参考，不构成官方教育或专业建议。请直接联系学校确认。",
    ja: "⚠️ この情報は予備的な参考情報であり、公式な教育的または専門的なアドバイスではありません。詳細は学校に直接お問い合わせください。",
  },
  privacy: {
    th: "🔒 ข้อมูลของท่านถูกเก็บรักษาตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) และ พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์",
    en: "🔒 Your data is protected under Thailand's Personal Data Protection Act (PDPA) and Computer Crime Act.",
    zh: "🔒 您的数据受泰国个人数据保护法（PDPA）和计算机犯罪法保护。",
    ja: "🔒 お客様のデータはタイの個人データ保護法（PDPA）およびコンピュータ犯罪法に基づいて保護されています。",
  },
  dataUsage: {
    th: "📋 ข้อมูลการสนทนาถูกใช้เพื่อปรับปรุงระบบ ไม่มีการเก็บข้อมูลส่วนบุคคลที่สามารถระบุตัวตนได้ เว้นแต่ท่านจะยินยอม",
    en: "📋 Chat data is used to improve the system. No personally identifiable information is stored without your consent.",
    zh: "📋 聊天数据用于改进系统。未经您的同意，不会存储任何可识别个人身份的信息。",
    ja: "📋 チャットデータはシステムの改善に使用されます。同意なしに個人を特定できる情報は保存されません。",
  },
} as const;

/* ── Content Safety Rules ── */

/** Topics that the AI should refuse to answer or redirect */
export const BLOCKED_TOPICS = [
  // ข้อมูลส่วนบุคคลของเด็ก (Child personal data)
  "ชื่อเด็ก",
  "เลขบัตร",
  "ที่อยู่บ้าน",
  "เบอร์ผู้ปกครอง",
  // ข้อมูลที่อาจผิดกฎหมาย (Potentially illegal info)
  "วิธีโกง",
  "ข้อสอบรั่ว",
  "ซื้อใบปริญญา",
  "หมิ่นประมาท",
] as const;

/** Check if a message contains sensitive content */
export function containsSensitiveContent(message: string): {
  isSensitive: boolean;
  reason?: string;
} {
  const lower = message.toLowerCase();

  // Check for child personal data requests
  const childDataPatterns = [
    /ชื่อ.*เด็ก|ชื่อ.*นักเรียน|รายชื่อ.*เด็ก/,
    /เลขบัตร|บัตรประชาชน|passport.*number/i,
    /ที่อยู่.*บ้าน.*เด็ก|home.*address.*student/i,
    /เบอร์.*ผู้ปกครอง|parent.*phone/i,
  ];

  for (const pattern of childDataPatterns) {
    if (pattern.test(lower)) {
      return {
        isSensitive: true,
        reason: "ไม่สามารถให้ข้อมูลส่วนบุคคลของเด็กหรือผู้ปกครองได้ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
      };
    }
  }

  // Check for exam fraud
  if (/ข้อสอบ.*รั่ว|ซื้อ.*ข้อสอบ|โกง.*สอบ|exam.*leak|cheat.*exam/i.test(lower)) {
    return {
      isSensitive: true,
      reason: "ไม่สามารถให้ข้อมูลที่เกี่ยวกับการทุจริตสอบได้",
    };
  }

  return { isSensitive: false };
}

/* ── PDPA Compliance Helpers ── */

/** Data that must be anonymized before storage */
export function anonymizeForStorage(text: string): string {
  // Remove phone numbers
  let cleaned = text.replace(/(\+?66|0)\d{8,9}/g, "[PHONE_REDACTED]");
  // Remove email addresses
  cleaned = cleaned.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[EMAIL_REDACTED]"
  );
  // Remove Thai national ID patterns
  cleaned = cleaned.replace(/\d{1}-\d{4}-\d{5}-\d{2}-\d{1}/g, "[ID_REDACTED]");
  return cleaned;
}

/* ── Law Review Tracking ── */

/** Laws that should be periodically reviewed */
export const LAWS_TO_MONITOR = [
  {
    name: "พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
    nameEn: "Personal Data Protection Act B.E. 2562 (PDPA)",
    lastReviewed: "2026-03-01",
    nextReview: "2026-06-01",
    referenceUrl: "https://www.pdpc.or.th",
    relevance: "Data collection, storage, and processing in chat and session tracking",
  },
  {
    name: "พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ (ฉบับที่ 2) พ.ศ. 2560",
    nameEn: "Computer Crime Act (No. 2) B.E. 2560",
    lastReviewed: "2026-03-01",
    nextReview: "2026-06-01",
    referenceUrl: "https://www.mdes.go.th",
    relevance: "Content moderation, data storage, user tracking, AI-generated content liability",
  },
  {
    name: "พ.ร.บ.คุ้มครองเด็ก พ.ศ. 2546",
    nameEn: "Child Protection Act B.E. 2546",
    lastReviewed: "2026-03-01",
    nextReview: "2026-06-01",
    referenceUrl: "https://www.opp.go.th",
    relevance: "School data involving children, safety protocols disclosure",
  },
  {
    name: "พ.ร.บ.การศึกษาแห่งชาติ พ.ศ. 2542",
    nameEn: "National Education Act B.E. 2542",
    lastReviewed: "2026-03-01",
    nextReview: "2026-06-01",
    referenceUrl: "https://www.moe.go.th",
    relevance: "Educational information accuracy, school data representation",
  },
] as const;

/** Get disclaimer for a given language */
export function getDisclaimer(
  type: keyof typeof DISCLAIMERS,
  lang: string
): string {
  const langKey = lang as keyof (typeof DISCLAIMERS)[typeof type];
  return DISCLAIMERS[type][langKey] || DISCLAIMERS[type].th;
}

/** Get full legal footer for chat */
export function getChatLegalFooter(lang: string): string {
  return `${getDisclaimer("chat", lang)}\n${getDisclaimer("privacy", lang)}`;
}
