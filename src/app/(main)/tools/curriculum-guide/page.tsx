"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ══════════════════════════════════════════════
   Curriculum data (inline bilingual)
   ══════════════════════════════════════════════ */

const curricula = [
  {
    id: "uk" as const,
    flag: "🇬🇧",
    name_th: "British (IGCSE + A-Level)",
    name_en: "British (IGCSE + A-Level)",
    org_th: "Cambridge / Pearson Edexcel",
    org_en: "Cambridge / Pearson Edexcel",
    age: "3–18",
    color: "#0071E3",
    structure_th: "KS1 → KS2 → KS3 → IGCSE → A-Level",
    structure_en: "KS1 → KS2 → KS3 → IGCSE → A-Level",
    subjects_th: "IGCSE 7-9 วิชา, A-Level 3-4 วิชา",
    subjects_en: "IGCSE 7-9 subjects, A-Level 3-4 subjects",
    grading_th: "A*–U (letter grade)",
    grading_en: "A*–U (letter grade)",
    strengths_th: [
      "เจาะลึกเฉพาะทาง — เลือก 3-4 วิชาที่ถนัดจริงๆ",
      "เป็นที่ยอมรับทั่วโลก โดยเฉพาะ UK, ออสเตรเลีย, ฮ่องกง",
      "โครงสร้างชัดเจน ประเมินด้วยข้อสอบปลายภาค",
    ],
    strengths_en: [
      "Deep specialization — focus on 3-4 subjects of true strength",
      "Globally recognized, especially in UK, Australia, Hong Kong",
      "Clear structure with end-of-course exam-based assessment",
    ],
    fee_th: "300K–800K/ปี",
    fee_en: "300K–800K/yr",
    uni_th: "UK, ออสเตรเลีย, ฮ่องกง, สิงคโปร์",
    uni_en: "UK, Australia, Hong Kong, Singapore",
  },
  {
    id: "us" as const,
    flag: "🇺🇸",
    name_th: "American (AP)",
    name_en: "American (AP)",
    org_th: "College Board",
    org_en: "College Board",
    age: "5–18",
    color: "#FF3B30",
    structure_th: "Elementary → Middle → High School + AP",
    structure_en: "Elementary → Middle → High School + AP",
    subjects_th: "AP เลือกได้ไม่จำกัด (มี 38+ วิชา)",
    subjects_en: "Unlimited AP choices (38+ subjects available)",
    grading_th: "GPA 4.0 + AP Score 1-5",
    grading_en: "GPA 4.0 + AP Score 1-5",
    strengths_th: [
      "ยืดหยุ่นสูง — เลือกวิชา AP ได้ตามใจ ไม่มีขั้นต่ำ",
      "เน้นกิจกรรมนอกหลักสูตร (Extracurricular) + ทักษะรอบด้าน",
      "เข้า US/Canada ง่าย ด้วย Common App + SAT/ACT",
    ],
    strengths_en: [
      "Highly flexible — choose AP subjects freely, no minimum required",
      "Strong emphasis on extracurricular activities + holistic development",
      "Easy pathway to US/Canada via Common App + SAT/ACT",
    ],
    fee_th: "350K–900K/ปี",
    fee_en: "350K–900K/yr",
    uni_th: "US, แคนาดา, ยุโรป",
    uni_en: "US, Canada, Europe",
  },
  {
    id: "ib" as const,
    flag: "🌍",
    name_th: "IB (International Baccalaureate)",
    name_en: "IB (International Baccalaureate)",
    org_th: "International Baccalaureate Organization (IBO)",
    org_en: "International Baccalaureate Organization (IBO)",
    age: "3–19",
    color: "#34C759",
    structure_th: "PYP → MYP → DP (Diploma Programme)",
    structure_en: "PYP → MYP → DP (Diploma Programme)",
    subjects_th: "DP 6 วิชา (3 HL + 3 SL) + EE + TOK + CAS",
    subjects_en: "DP 6 subjects (3 HL + 3 SL) + EE + TOK + CAS",
    grading_th: "1-7 ต่อวิชา (รวมสูงสุด 45 คะแนน)",
    grading_en: "1-7 per subject (max total 45 points)",
    strengths_th: [
      "สมดุลวิชาการ + ทักษะชีวิต — บังคับเรียนทั้ง 6 กลุ่มวิชา",
      "เน้น Critical thinking, Research, Community service (CAS)",
      "ได้รับการยอมรับจากมหาวิทยาลัยทั่วโลก ทุกประเทศ",
    ],
    strengths_en: [
      "Balanced academics + life skills — mandatory study across all 6 subject groups",
      "Emphasis on critical thinking, research, and community service (CAS)",
      "Universally accepted by universities worldwide in every country",
    ],
    fee_th: "400K–1M+/ปี",
    fee_en: "400K–1M+/yr",
    uni_th: "ได้ทุกที่ทั่วโลก",
    uni_en: "Accepted everywhere worldwide",
  },
];

/* ── Comparison table rows ── */
const compareRows = [
  {
    label_th: "โครงสร้าง",
    label_en: "Structure",
    uk_th: "KS1-4 → IGCSE → A-Level",
    uk_en: "KS1-4 → IGCSE → A-Level",
    us_th: "Elementary → Middle → High + AP",
    us_en: "Elementary → Middle → High + AP",
    ib_th: "PYP → MYP → DP",
    ib_en: "PYP → MYP → DP",
  },
  {
    label_th: "ช่วงอายุ",
    label_en: "Age Range",
    uk_th: "3–18 ปี", uk_en: "3–18 years",
    us_th: "5–18 ปี", us_en: "5–18 years",
    ib_th: "3–19 ปี", ib_en: "3–19 years",
  },
  {
    label_th: "จำนวนวิชาสอบ",
    label_en: "Exam Subjects",
    uk_th: "IGCSE 7-9 / A-Level 3-4",
    uk_en: "IGCSE 7-9 / A-Level 3-4",
    us_th: "AP เลือกได้ (ไม่จำกัด)",
    us_en: "AP elective (unlimited)",
    ib_th: "6 วิชา (3 HL + 3 SL)",
    ib_en: "6 subjects (3 HL + 3 SL)",
  },
  {
    label_th: "ระบบเกรด",
    label_en: "Grading",
    uk_th: "A*–U (letter)",
    uk_en: "A*–U (letter)",
    us_th: "GPA 4.0 + AP 1-5",
    us_en: "GPA 4.0 + AP 1-5",
    ib_th: "1-7 (สูงสุด 45 คะแนน)",
    ib_en: "1-7 (max 45 points)",
  },
  {
    label_th: "จุดแข็ง",
    label_en: "Strength",
    uk_th: "ลึก+เฉพาะทาง",
    uk_en: "Deep specialization",
    us_th: "ยืดหยุ่น+กว้าง",
    us_en: "Flexible + broad",
    ib_th: "สมดุล+คิดเชิงวิพากษ์",
    ib_en: "Balanced + critical thinking",
  },
  {
    label_th: "จุดอ่อน",
    label_en: "Weakness",
    uk_th: "แคบ — เลือกผิดอาจต้องเริ่มใหม่",
    uk_en: "Narrow — wrong choices may require restart",
    us_th: "คุณภาพขึ้นอยู่กับโรงเรียน",
    us_en: "Quality depends on school",
    ib_th: "หนักมาก, เครียด, ค่าเทอมสูง",
    ib_en: "Very demanding, stressful, high fees",
  },
  {
    label_th: "เหมาะกับ",
    label_en: "Best For",
    uk_th: "เด็กที่รู้แล้วว่าชอบอะไร",
    uk_en: "Kids who know what they want",
    us_th: "เด็กที่ต้องการอิสระ",
    us_en: "Kids who want freedom",
    ib_th: "เด็ก all-rounder ที่ขยัน",
    ib_en: "Hardworking all-rounders",
  },
  {
    label_th: "ค่าเทอมเฉลี่ย (ไทย)",
    label_en: "Avg Fees (Thailand)",
    uk_th: "300K–800K/ปี",
    uk_en: "300K–800K/yr",
    us_th: "350K–900K/ปี",
    us_en: "350K–900K/yr",
    ib_th: "400K–1M+/ปี",
    ib_en: "400K–1M+/yr",
  },
  {
    label_th: "มหาวิทยาลัยเป้าหมาย",
    label_en: "University Target",
    uk_th: "UK, AUS, HK, SG",
    uk_en: "UK, AUS, HK, SG",
    us_th: "US, Canada",
    us_en: "US, Canada",
    ib_th: "ได้ทุกที่ทั่วโลก",
    ib_en: "Everywhere worldwide",
  },
];

/* ── Quiz questions ── */
type CurrKey = "uk" | "us" | "ib";

interface QuizOption {
  label_th: string;
  label_en: string;
  score: Record<CurrKey, number>;
}

interface QuizQuestion {
  q_th: string;
  q_en: string;
  icon: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    q_th: "ลูกชอบเรียนแบบไหน?",
    q_en: "How does your child prefer to learn?",
    icon: "📖",
    options: [
      { label_th: "เจาะลึกเฉพาะทาง — เก่งไม่กี่วิชาแต่เก่งจริง", label_en: "Deep specialization — excel in fewer subjects", score: { uk: 2, us: 0, ib: 0 } },
      { label_th: "กว้างหลากหลาย — ลองทุกอย่าง ยังไม่ตัดสินใจ", label_en: "Broad & diverse — try everything, decide later", score: { uk: 0, us: 2, ib: 0 } },
      { label_th: "สมดุล — เรียน+กิจกรรม+ช่วยเหลือสังคม", label_en: "Balanced — academics + activities + community service", score: { uk: 0, us: 0, ib: 2 } },
    ],
  },
  {
    q_th: "เป้าหมายมหาวิทยาลัยของลูก?",
    q_en: "Your child's university goal?",
    icon: "🎓",
    options: [
      { label_th: "UK / ออสเตรเลีย / ฮ่องกง", label_en: "UK / Australia / Hong Kong", score: { uk: 2, us: 0, ib: 1 } },
      { label_th: "US / แคนาดา", label_en: "US / Canada", score: { uk: 0, us: 2, ib: 1 } },
      { label_th: "ยังไม่แน่ใจ — ขอเปิดทางเลือกกว้างที่สุด", label_en: "Not sure yet — want maximum flexibility", score: { uk: 0, us: 1, ib: 2 } },
    ],
  },
  {
    q_th: "ลูกรับมือกับความกดดันอย่างไร?",
    q_en: "How does your child handle pressure?",
    icon: "💪",
    options: [
      { label_th: "ชอบสอบแข่งขัน — ชิงอันดับได้", label_en: "Thrives on exams — competitive", score: { uk: 2, us: 0, ib: 1 } },
      { label_th: "ชอบทำ project / portfolio มากกว่า", label_en: "Prefers projects / portfolio work", score: { uk: 0, us: 2, ib: 1 } },
      { label_th: "รับได้ทั้งสองแบบ ขอมี balance", label_en: "Can handle both — needs balance", score: { uk: 0, us: 1, ib: 2 } },
    ],
  },
  {
    q_th: "สิ่งที่สำคัญที่สุดสำหรับผู้ปกครองคือ?",
    q_en: "What matters most to you as a parent?",
    icon: "⭐",
    options: [
      { label_th: "ความเชี่ยวชาญเฉพาะด้าน — ลึกและตรงเป้า", label_en: "Deep expertise — focused and targeted", score: { uk: 2, us: 0, ib: 0 } },
      { label_th: "ความคิดสร้างสรรค์ + ประสบการณ์ + กิจกรรม", label_en: "Creativity + experiences + extracurriculars", score: { uk: 0, us: 2, ib: 0 } },
      { label_th: "Critical thinking + มุมมองโลกกว้าง", label_en: "Critical thinking + global perspective", score: { uk: 0, us: 0, ib: 2 } },
    ],
  },
  {
    q_th: "งบประมาณค่าเทอมต่อปี?",
    q_en: "Annual tuition budget?",
    icon: "💰",
    options: [
      { label_th: "300K–500K บาท/ปี", label_en: "300K–500K THB/yr", score: { uk: 2, us: 1, ib: 0 } },
      { label_th: "500K–800K บาท/ปี", label_en: "500K–800K THB/yr", score: { uk: 1, us: 2, ib: 1 } },
      { label_th: "800K+ บาท/ปี", label_en: "800K+ THB/yr", score: { uk: 1, us: 1, ib: 2 } },
    ],
  },
];

/* ── Quiz result descriptions ── */
const resultDescriptions: Record<CurrKey, { title_th: string; title_en: string; desc_th: string; desc_en: string; color: string; link: string }> = {
  uk: {
    title_th: "🇬🇧 British (IGCSE + A-Level) เหมาะที่สุด!",
    title_en: "🇬🇧 British (IGCSE + A-Level) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ British ที่เน้นความเชี่ยวชาญเจาะลึก เลือก 3-4 วิชาที่ถนัดจริงๆ แล้วเก่งให้สุดทาง เหมาะสำหรับเด็กที่รู้แล้วว่าอยากเป็นอะไร และพร้อมรับการประเมินแบบข้อสอบ",
    desc_en: "Your child fits the British system with its deep specialization approach. Focus on 3-4 subjects of true strength and excel to the fullest. Ideal for kids who know their direction and thrive under exam-based assessment.",
    color: "#0071E3",
    link: "/find?curriculum=igcse",
  },
  us: {
    title_th: "🇺🇸 American (AP) เหมาะที่สุด!",
    title_en: "🇺🇸 American (AP) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ American ที่ให้อิสระในการเลือกวิชาและเน้นกิจกรรม เด็กได้พัฒนาทุกด้าน — วิชาการ กีฬา ศิลปะ ภาวะผู้นำ เหมาะสำหรับเด็กที่ยังสำรวจตัวเองอยู่",
    desc_en: "Your child fits the American system with its flexibility in subject choice and emphasis on extracurriculars. Kids develop holistically — academics, sports, arts, leadership. Great for explorers still finding their path.",
    color: "#FF3B30",
    link: "/find?curriculum=us",
  },
  ib: {
    title_th: "🌍 IB (International Baccalaureate) เหมาะที่สุด!",
    title_en: "🌍 IB (International Baccalaureate) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ IB ที่สร้างเด็กรอบด้าน ฝึก Critical thinking, Research, และ Community service ต้องเรียนทั้ง 6 กลุ่มวิชา จึงไม่มีช่องว่าง เหมาะสำหรับเด็กที่ขยันและอยากไปได้ทุกมหาวิทยาลัย",
    desc_en: "Your child fits the IB system that builds well-rounded learners. It trains critical thinking, research, and community service across all 6 subject groups — leaving no gaps. Perfect for hardworking kids who want university options worldwide.",
    color: "#34C759",
    link: "/find?curriculum=ib",
  },
};

/* ── University pathway data ── */
const pathways = [
  {
    flag: "🇬🇧",
    curr: "British",
    color: "#0071E3",
    steps_th: ["IGCSE (Y10-11)", "A-Level (Y12-13)", "UCAS Application", "Russell Group / UK Top Unis"],
    steps_en: ["IGCSE (Y10-11)", "A-Level (Y12-13)", "UCAS Application", "Russell Group / UK Top Unis"],
    note_th: "A*AA ขึ้นไปสำหรับ Oxbridge / Medicine",
    note_en: "A*AA or above for Oxbridge / Medicine",
  },
  {
    flag: "🇺🇸",
    curr: "American",
    color: "#FF3B30",
    steps_th: ["High School GPA", "AP Exams + SAT/ACT", "Common App / Coalition", "Ivy League / US Top Unis"],
    steps_en: ["High School GPA", "AP Exams + SAT/ACT", "Common App / Coalition", "Ivy League / US Top Unis"],
    note_th: "GPA 3.8+ & SAT 1500+ สำหรับ Top 20",
    note_en: "GPA 3.8+ & SAT 1500+ for Top 20",
  },
  {
    flag: "🌍",
    curr: "IB",
    color: "#34C759",
    steps_th: ["MYP (Y7-11)", "IBDP (Y12-13)", "ยื่นได้ทุก Platform", "มหาวิทยาลัยทั่วโลก"],
    steps_en: ["MYP (Y7-11)", "IBDP (Y12-13)", "Apply via any platform", "Universities worldwide"],
    note_th: "38+ คะแนนสำหรับ Top Universities",
    note_en: "38+ points for top universities",
  },
];

/* ── FAQ data ── */
const faqs = [
  {
    q_th: "ย้ายหลักสูตรกลางทางได้ไหม?",
    q_en: "Can I switch curricula mid-way?",
    a_th: "ได้ แต่ควรย้ายก่อน Year 10 (อายุ ~14) เพราะหลังจากนั้น IGCSE/MYP/AP จะเริ่มโปรแกรมเฉพาะทาง การย้ายจาก British→IB หรือ American→IB ค่อนข้างราบรื่นเพราะ IB ครอบคลุมทุกวิชา แต่ย้ายจาก IB→British อาจยากเพราะ A-Level เน้นวิชาน้อยแต่ลึกกว่า",
    a_en: "Yes, but ideally before Year 10 (age ~14) since IGCSE/MYP/AP specialized programs begin after that. Switching from British→IB or American→IB is relatively smooth as IB covers all subjects. However, IB→British can be challenging since A-Level focuses on fewer but deeper subjects.",
  },
  {
    q_th: "เด็กไทยเรียนหลักสูตรไหนปรับตัวง่ายที่สุด?",
    q_en: "Which curriculum is easiest for Thai students to adapt to?",
    a_th: "American มักง่ายที่สุดสำหรับเด็กไทยเพราะยืดหยุ่น ไม่บังคับวิชายาก ให้คะแนนจาก class participation + GPA ตลอดปี ส่วน British อาจกดดันจากข้อสอบปลายภาค และ IB หนักที่สุดเพราะต้องเรียนทุกวิชา + ทำ EE + TOK + CAS",
    a_en: "American is usually the easiest adjustment for Thai students due to its flexibility, no mandatory difficult subjects, and year-round GPA + class participation grading. British can be stressful with end-of-term exams, and IB is the most demanding as it requires studying all subjects plus completing EE, TOK, and CAS.",
  },
  {
    q_th: "IB หนักจริงหรือ?",
    q_en: "Is IB really that hard?",
    a_th: "หนักจริง! นอกจาก 6 วิชา (3 HL ลึก + 3 SL) แล้ว ยังต้องเขียน Extended Essay 4,000 คำ ผ่านวิชา Theory of Knowledge (TOK) และทำ CAS (Creativity, Activity, Service) 150 ชม. แต่เด็กที่ผ่าน IB มักแข็งแกร่งมาก — มหาวิทยาลัยชั้นนำให้เครดิตสูง",
    a_en: "Yes, it's truly demanding! Beyond 6 subjects (3 HL deep + 3 SL), students must write a 4,000-word Extended Essay, pass Theory of Knowledge (TOK), and complete 150 hours of CAS (Creativity, Activity, Service). But IB graduates are typically very strong — top universities give them high credit.",
  },
  {
    q_th: "IGCSE กับ A-Level ต่างกันยังไง?",
    q_en: "What's the difference between IGCSE and A-Level?",
    a_th: "IGCSE (Year 10-11) เป็นการสอบ 7-9 วิชาพื้นฐาน ทุกคนต้องสอบ เพื่อได้ certificate ส่วน A-Level (Year 12-13) เลือกเรียนแค่ 3-4 วิชาที่ถนัด เป็นตัวชี้วัดเข้ามหาวิทยาลัย IGCSE เหมือน ม.ปลายต้น ส่วน A-Level เหมือน entrance exam",
    a_en: "IGCSE (Year 10-11) tests 7-9 foundational subjects that everyone must take for a certificate. A-Level (Year 12-13) focuses on just 3-4 chosen subjects and is the key university entrance qualifier. Think of IGCSE as early secondary completion and A-Level as the university gateway exam.",
  },
  {
    q_th: "ถ้ายังไม่รู้จะเรียนต่อประเทศไหน เลือกอะไรดี?",
    q_en: "If undecided on which country, what should I choose?",
    a_th: "IB เป็นตัวเลือกที่ปลอดภัยที่สุด เพราะมหาวิทยาลัยทั่วโลกรับ ไม่ว่าจะ UK, US, ยุโรป, เอเชีย ทุกที่ยอมรับ IBDP ถ้า IB แพงหรือหนักเกินไป American เป็นตัวเลือกรองเพราะ GPA + AP scores ยื่นได้หลากหลาย",
    a_en: "IB is the safest choice since universities worldwide accept it — UK, US, Europe, Asia. Every major university recognizes IBDP. If IB is too expensive or demanding, American is the next best option as GPA + AP scores can be submitted to many different systems.",
  },
  {
    q_th: "ค่าเทอม IB แพงกว่าจริงหรือ?",
    q_en: "Are IB fees really higher?",
    a_th: "โดยเฉลี่ยใช่ IB แพงกว่า British/American ประมาณ 20-30% เพราะโรงเรียนต้องจ่ายค่า IB authorization + ครูต้องผ่าน IB training + ทรัพยากรสอน EE/TOK/CAS ในไทยค่าเทอม IB มักเริ่ม 400K+/ปี ขณะที่ British เริ่มประมาณ 300K/ปี",
    a_en: "On average, yes — IB is about 20-30% more expensive than British/American because schools must pay IB authorization fees, teachers need IB-specific training, and resources are needed for EE/TOK/CAS components. In Thailand, IB fees typically start at 400K+/yr while British starts around 300K/yr.",
  },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export default function CurriculumGuidePage() {
  const { lang } = useLang();
  const isThai = lang === "th";

  /* Quiz state */
  const [quizStep, setQuizStep] = useState(-1); // -1 = not started
  const [answers, setAnswers] = useState<number[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizResult = (): CurrKey | null => {
    if (answers.length < quizQuestions.length) return null;
    const totals: Record<CurrKey, number> = { uk: 0, us: 0, ib: 0 };
    answers.forEach((ansIdx, qIdx) => {
      const opt = quizQuestions[qIdx].options[ansIdx];
      if (opt) {
        totals.uk += opt.score.uk;
        totals.us += opt.score.us;
        totals.ib += opt.score.ib;
      }
    });
    const max = Math.max(totals.uk, totals.us, totals.ib);
    if (totals.ib === max) return "ib";
    if (totals.us === max) return "us";
    return "uk";
  };

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers, optIdx];
    setAnswers(newAnswers);
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(quizQuestions.length); // show result
    }
  };

  const resetQuiz = () => {
    setQuizStep(-1);
    setAnswers([]);
  };

  const result = quizResult();
  const resultData = result ? resultDescriptions[result] : null;

  /* Score breakdown for result bar chart */
  const scoreTotals = (): Record<CurrKey, number> => {
    const t: Record<CurrKey, number> = { uk: 0, us: 0, ib: 0 };
    answers.forEach((ansIdx, qIdx) => {
      const opt = quizQuestions[qIdx]?.options[ansIdx];
      if (opt) { t.uk += opt.score.uk; t.us += opt.score.us; t.ib += opt.score.ib; }
    });
    return t;
  };

  return (
    <div className="animate-fade-up">
      {/* ═══ 1. Hero ═══ */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          📚
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "UK vs US vs IB — เลือกหลักสูตรที่ใช่สำหรับลูก"
            : "UK vs US vs IB — Choose the Right Curriculum for Your Child"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "3 หลักสูตรนานาชาติยอดนิยมในประเทศไทย — เปรียบเทียบโครงสร้าง ค่าเทอม จุดแข็ง-จุดอ่อน และเส้นทางมหาวิทยาลัย พร้อม Quiz ช่วยเลือก"
            : "The 3 most popular international curricula in Thailand — compare structure, fees, pros & cons, and university pathways. Take our quiz to find your best fit."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">
            {isThai ? "3 หลักสูตรหลัก" : "3 main curricula"}
          </span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">
            {isThai ? "200+ โรงเรียนในไทย" : "200+ schools in Thailand"}
          </span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">
            {isThai ? "เข้า ม.ได้ทั่วโลก" : "Universities worldwide"}
          </span>
        </div>
      </section>

      {/* ═══ 2. Curriculum Overview Cards ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            🏫
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "ภาพรวม 3 หลักสูตร" : "Overview of 3 Curricula"}
          </h2>
        </div>

        <div className="space-y-4">
          {curricula.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{c.flag}</span>
                <h3 className="text-[15px] font-extrabold" style={{ color: c.color }}>
                  {isThai ? c.name_th : c.name_en}
                </h3>
              </div>

              {/* Key facts grid */}
              <div className="mb-3 grid grid-cols-2 gap-2">
                {[
                  { lab: isThai ? "โครงสร้าง" : "Structure", val: isThai ? c.structure_th : c.structure_en },
                  { lab: isThai ? "ช่วงอายุ" : "Age Range", val: c.age },
                  { lab: isThai ? "จำนวนวิชาสอบ" : "Exam Subjects", val: isThai ? c.subjects_th : c.subjects_en },
                  { lab: isThai ? "ระบบเกรด" : "Grading", val: isThai ? c.grading_th : c.grading_en },
                  { lab: isThai ? "องค์กร" : "Organization", val: isThai ? c.org_th : c.org_en },
                  { lab: isThai ? "ค่าเทอม" : "Fees", val: isThai ? c.fee_th : c.fee_en },
                ].map((f) => (
                  <div key={f.lab} className="rounded-xl bg-[var(--color-bg)] px-3 py-2">
                    <div className="text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">{f.lab}</div>
                    <div className="mt-0.5 text-[12px] font-medium text-[var(--color-text)]">{f.val}</div>
                  </div>
                ))}
              </div>

              {/* Strengths */}
              <div className="mb-3 space-y-1.5">
                {(isThai ? c.strengths_th : c.strengths_en).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--color-text)]">
                    <span className="mt-0.5 text-[10px]" style={{ color: c.color }}>●</span>
                    {s}
                  </div>
                ))}
              </div>

              {/* Uni pathway */}
              <div className="mb-3 rounded-xl bg-[var(--color-bg)] px-3 py-2">
                <span className="text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {isThai ? "มหาวิทยาลัย" : "Universities"}
                </span>
                <span className="ml-2 text-[12px] font-medium text-[var(--color-text)]">
                  {isThai ? c.uni_th : c.uni_en}
                </span>
              </div>

              <Link
                href={`/find`}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-bold text-white no-underline transition-all active:scale-95"
                style={{ backgroundColor: c.color }}
              >
                {isThai ? "ดูโรงเรียนที่เปิดสอน →" : "View schools offering this →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. Side-by-Side Comparison Table ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-success)]/15 text-sm">
            📊
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "ตารางเปรียบเทียบ" : "Comparison Table"}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-3 py-3 text-left text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {isThai ? "หัวข้อ" : "Category"}
                </th>
                <th className="px-3 py-3 text-center font-bold" style={{ color: "#0071E3" }}>🇬🇧 British</th>
                <th className="px-3 py-3 text-center font-bold" style={{ color: "#FF3B30" }}>🇺🇸 American</th>
                <th className="px-3 py-3 text-center font-bold" style={{ color: "#34C759" }}>🌍 IB</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i} className={i < compareRows.length - 1 ? "border-b border-[var(--color-border)]" : ""}>
                  <td className="px-3 py-2.5 text-[11px] font-bold text-[var(--color-text-secondary)]">
                    {isThai ? row.label_th : row.label_en}
                  </td>
                  <td className="px-3 py-2.5 text-center text-[var(--color-text)]">
                    {isThai ? row.uk_th : row.uk_en}
                  </td>
                  <td className="px-3 py-2.5 text-center text-[var(--color-text)]">
                    {isThai ? row.us_th : row.us_en}
                  </td>
                  <td className="px-3 py-2.5 text-center text-[var(--color-text)]">
                    {isThai ? row.ib_th : row.ib_en}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ 4. Interactive Quiz ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-warning)]/15 text-sm">
            🧩
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Quiz: หลักสูตรไหนเหมาะกับลูก?" : "Quiz: Which Curriculum Fits Your Child?"}
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          {/* Not started */}
          {quizStep === -1 && (
            <div className="text-center">
              <div className="mx-auto mb-3 text-5xl">🎯</div>
              <p className="mb-4 text-[13px] text-[var(--color-text)]">
                {isThai
                  ? "ตอบ 5 คำถามง่ายๆ แล้วเราจะแนะนำหลักสูตรที่เหมาะกับลูกของคุณ"
                  : "Answer 5 simple questions and we'll recommend the best curriculum for your child."}
              </p>
              <button
                onClick={() => setQuizStep(0)}
                className="rounded-xl bg-[var(--color-text)] px-8 py-3 text-[14px] font-bold text-white transition-all active:scale-95"
              >
                {isThai ? "เริ่ม Quiz →" : "Start Quiz →"}
              </button>
            </div>
          )}

          {/* Questions */}
          {quizStep >= 0 && quizStep < quizQuestions.length && (
            <div>
              {/* Progress */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-bg)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">
                  {quizStep + 1}/{quizQuestions.length}
                </span>
              </div>

              {/* Question */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">{quizQuestions[quizStep].icon}</span>
                <h3 className="text-[15px] font-bold text-[var(--color-text)]">
                  {isThai ? quizQuestions[quizStep].q_th : quizQuestions[quizStep].q_en}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3.5 text-left text-[13px] font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-accent)] active:scale-[0.98]"
                  >
                    {isThai ? opt.label_th : opt.label_en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {quizStep >= quizQuestions.length && resultData && (
            <div>
              {/* Result header */}
              <div className="mb-4 text-center">
                <div className="mx-auto mb-2 text-4xl">🎉</div>
                <h3 className="text-[18px] font-extrabold" style={{ color: resultData.color }}>
                  {isThai ? resultData.title_th : resultData.title_en}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text)]">
                  {isThai ? resultData.desc_th : resultData.desc_en}
                </p>
              </div>

              {/* Score breakdown bar chart */}
              {(() => {
                const scores = scoreTotals();
                const maxScore = Math.max(scores.uk, scores.us, scores.ib, 1);
                return (
                  <div className="mb-4 space-y-2 rounded-xl bg-[var(--color-bg)] p-4">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                      {isThai ? "คะแนนแต่ละหลักสูตร" : "Score Breakdown"}
                    </div>
                    {([
                      { key: "uk" as CurrKey, label: "🇬🇧 British", color: "#0071E3" },
                      { key: "us" as CurrKey, label: "🇺🇸 American", color: "#FF3B30" },
                      { key: "ib" as CurrKey, label: "🌍 IB", color: "#34C759" },
                    ]).map((item) => (
                      <div key={item.key}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[var(--color-text)]">{item.label}</span>
                          <span className="text-[13px] font-extrabold" style={{ color: item.color }}>
                            {scores[item.key]}
                          </span>
                        </div>
                        <div className="h-4 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(scores[item.key] / maxScore) * 100}%`,
                              backgroundColor: item.color,
                              opacity: 0.8,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={resultData.link}
                  className="flex-1 rounded-xl px-4 py-3 text-center text-[13px] font-bold text-white no-underline transition-all active:scale-95"
                  style={{ backgroundColor: resultData.color }}
                >
                  {isThai ? "ดูโรงเรียนที่เปิดสอน →" : "Browse schools →"}
                </Link>
                <button
                  onClick={resetQuiz}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[13px] font-bold text-[var(--color-text)] transition-all active:scale-95"
                >
                  {isThai ? "ทำ Quiz อีกครั้ง" : "Retake Quiz"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 5. University Pathways ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#AF52DE]/15 text-sm">
            🎓
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "เส้นทางเข้ามหาวิทยาลัย" : "University Pathways"}
          </h2>
        </div>

        <div className="space-y-3">
          {pathways.map((p) => (
            <div
              key={p.curr}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{p.flag}</span>
                <span className="text-[14px] font-extrabold" style={{ color: p.color }}>{p.curr}</span>
              </div>

              {/* Step flow */}
              <div className="mb-3 flex items-center gap-1 overflow-x-auto">
                {(isThai ? p.steps_th : p.steps_en).map((step, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-1">
                    <span className="rounded-lg bg-[var(--color-bg)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--color-text)]">
                      {step}
                    </span>
                    {i < p.steps_th.length - 1 && (
                      <span className="text-[var(--color-text-secondary)]">→</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-[11px] italic text-[var(--color-text-secondary)]">
                💡 {isThai ? p.note_th : p.note_en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            ❓
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="text-[13px] font-bold text-[var(--color-text)]">
                  {isThai ? faq.q_th : faq.q_en}
                </span>
                <span
                  className="ml-2 text-[var(--color-text-secondary)] transition-transform duration-200"
                  style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}
                >
                  ▾
                </span>
              </button>
              {openFaq === i && (
                <div className="border-t border-[var(--color-border)] px-4 py-3">
                  <p className="text-[12px] leading-relaxed text-[var(--color-text)]">
                    {isThai ? faq.a_th : faq.a_en}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Back link ═══ */}
      <div className="text-center">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-surface)] px-5 py-3 text-[13px] font-medium text-[var(--color-text)] no-underline transition-all hover:bg-[var(--color-border)]"
        >
          ← {isThai ? "กลับหน้าเรียนรู้" : "Back to Learn"}
        </Link>
      </div>
    </div>
  );
}
