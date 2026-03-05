import type { PersonaType } from "./quiz";

export interface PersonaData {
  emoji: string;
  title: string;
  thai: string;
  nick: string;
  bgClass: string;
  demHigh: boolean;
  resHigh: boolean;
  strengths: string[];
  efNote: string;
  schoolRec: string;
  schoolTypes: string[];
}

export const personaData: Record<PersonaType, PersonaData> = {
  authoritative: {
    emoji: "🧭",
    title: "The Guide",
    thai: "มีกรอบ มีเหตุผล",
    nick: '"พ่อแม่โค้ช"',
    bgClass: "auth-bg",
    demHigh: true,
    resHigh: true,
    strengths: [
      "ลูกได้ฝึกคิดและตัดสินใจเอง",
      "มีกฎชัดเจน พร้อมอธิบายเหตุผล",
      "ได้ฝึกเจรจาต่อรอง",
      "รู้สึกปลอดภัยและมั่นคง",
    ],
    efNote:
      "สไตล์นี้ช่วยสร้าง EF ให้ลูกได้ดีมาก — โรงเรียนที่เปิดให้คิดเองจะยิ่งเสริมพลัง",
    schoolRec:
      "โรงเรียน Inquiry-based / PBL จะเข้ากับสไตล์ครอบครัวคุณได้ดี",
    schoolTypes: [
      "IB schools (NIST, KIS, ICS)",
      "PBL / Alternative (VERSO)",
      "Shrewsbury, Harrow",
      "UWC, Prem",
    ],
  },
  authoritarian: {
    emoji: "🏔️",
    title: "The Driver",
    thai: "มุ่งมั่น ชัดเจน",
    nick: '"พ่อแม่เข้มแข็ง"',
    bgClass: "autr-bg",
    demHigh: true,
    resHigh: false,
    strengths: [
      "ตั้งเป้าหมายชัดเจนให้ลูก",
      "มีระเบียบวินัยสูง",
      "สร้างความมุ่งมั่นให้ลูก",
      "ลูกรู้ว่าอะไรถูก-ผิด",
    ],
    efNote:
      "จุดแข็งคือวินัย — โรงเรียนที่เปิดให้ลูกคิดเองจะช่วยเสริม EF ด้านความยืดหยุ่น",
    schoolRec:
      "โรงเรียน Inquiry-based จะช่วยเสริมด้านที่บ้านอาจไม่ได้เน้น",
    schoolTypes: [
      "IB schools (NIST, KIS) — ฝึกคิดเอง",
      "Inquiry-based (Shrewsbury, Wells)",
      "โรงเรียนที่มี Counseling ดี",
      "Pastoral care อบอุ่น",
    ],
  },
  permissive: {
    emoji: "🌊",
    title: "The Nurturer",
    thai: "เปิดกว้าง อบอุ่น",
    nick: '"พ่อแม่เพื่อนสนิท"',
    bgClass: "perm-bg",
    demHigh: false,
    resHigh: true,
    strengths: [
      "ลูกกล้าแสดงออก กล้าลอง",
      "บ้านอบอุ่น เต็มไปด้วยความรัก",
      "ลูกมีอิสระทางความคิด",
      "สัมพันธ์ใกล้ชิดกับลูก",
    ],
    efNote:
      "จุดแข็งคือความอบอุ่น — โรงเรียนที่มีโครงสร้างชัดจะช่วยเสริมวินัยให้ลูก",
    schoolRec:
      "โรงเรียนที่มีโครงสร้างชัดเจนจะช่วยเสริมจุดที่บ้านอาจไม่ได้เน้น",
    schoolTypes: [
      "British curriculum (โครงสร้างชัด)",
      "Harrow, Shrewsbury, Patana",
      "IGCSE/A-Level track",
      "โรงเรียนที่มีวินัย + อบอุ่น",
    ],
  },
  neglectful: {
    emoji: "🦅",
    title: "The Liberator",
    thai: "ให้พื้นที่ ให้โต",
    nick: '"พ่อแม่ปล่อยบิน"',
    bgClass: "negl-bg",
    demHigh: false,
    resHigh: false,
    strengths: [
      "ลูกพึ่งตัวเองได้",
      "มีอิสระสูง เรียนรู้จากประสบการณ์",
      "ไม่กดดันลูก",
      "ลูกได้เผชิญโลกด้วยตัวเอง",
    ],
    efNote:
      "จุดแข็งคือความอิสระ — โรงเรียนที่ดูแลใกล้ชิดจะเป็น safety net ที่ดีให้ลูก",
    schoolRec:
      "โรงเรียนที่มี Pastoral Care เข้มแข็งจะช่วยเสริมการดูแลให้ลูก",
    schoolTypes: [
      "โรงเรียนที่ดูแลใกล้ชิด Full-day",
      "Pastoral Care เด่น (St Andrews, Shrewsbury HQP)",
      "Small class size (ISB, ICS)",
      "โรงเรียนที่อบอุ่นเหมือนบ้าน",
    ],
  },
};
