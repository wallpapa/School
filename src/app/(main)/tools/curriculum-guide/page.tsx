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
  {
    id: "sg" as const,
    flag: "🇸🇬",
    name_th: "Singapore (สิงคโปร์)",
    name_en: "Singapore Curriculum",
    org_th: "MOE Singapore / Cambridge (SG-Cambridge)",
    org_en: "MOE Singapore / Cambridge (SG-Cambridge)",
    age: "6–18",
    color: "#FF9F0A",
    structure_th: "Primary → Lower Sec → Upper Sec → JC หรือ Poly",
    structure_en: "Primary → Lower Sec → Upper Sec → JC or Poly",
    subjects_th: "O-Level 7-8 วิชา / A-Level 3-4 วิชา (+ H1/H2/H3)",
    subjects_en: "O-Level 7-8 subjects / A-Level 3-4 (+ H1/H2/H3)",
    grading_th: "A1–F9 (O-Level) / A–U (A-Level) / PSLE T-Score",
    grading_en: "A1–F9 (O-Level) / A–U (A-Level) / PSLE T-Score",
    strengths_th: [
      "คณิตศาสตร์และวิทยาศาสตร์แข็งแกร่งมาก — อันดับ 1 PISA",
      "ระบบ 2 ภาษาบังคับ (English + Mother Tongue)",
      "มีชื่อเสียงด้านวินัยและมาตรฐานสูง ผลสัมฤทธิ์ทางวิชาการดีเยี่ยม",
    ],
    strengths_en: [
      "Exceptionally strong in math & science — ranked #1 in PISA",
      "Mandatory bilingual policy (English + Mother Tongue)",
      "Renowned for discipline, high standards, and excellent academic outcomes",
    ],
    fee_th: "200K–600K/ปี",
    fee_en: "200K–600K/yr",
    uni_th: "สิงคโปร์ (NUS, NTU), UK, ออสเตรเลีย",
    uni_en: "Singapore (NUS, NTU), UK, Australia",
  },
  {
    id: "au" as const,
    flag: "🇦🇺",
    name_th: "Australian (ออสเตรเลีย)",
    name_en: "Australian Curriculum",
    org_th: "ACARA / รัฐบาลออสเตรเลีย (WACE, HSC, VCE, QCE)",
    org_en: "ACARA / State-based (WACE, HSC, VCE, QCE)",
    age: "5–18",
    color: "#AF52DE",
    structure_th: "Foundation → Primary → Junior Sec → Senior Sec",
    structure_en: "Foundation → Primary → Junior Sec → Senior Sec",
    subjects_th: "Senior 5-6 วิชา (ATAR subjects + เลือกเสรี)",
    subjects_en: "Senior 5-6 subjects (ATAR subjects + electives)",
    grading_th: "ATAR (0–99.95) + Subject grades A–E",
    grading_en: "ATAR (0–99.95) + Subject grades A–E",
    strengths_th: [
      "สมดุลวิชาการ + ชีวิตจริง — เน้น wellbeing ไม่กดดันเกินไป",
      "ประเมินหลากหลาย: coursework + สอบ (ไม่ใช่สอบอย่างเดียว)",
      "ค่าเทอมจับต้องได้ เหมาะครอบครัวที่ต้องการคุณภาพราคาสมเหตุ",
    ],
    strengths_en: [
      "Balanced academics + real-world focus — emphasis on wellbeing without excessive pressure",
      "Diverse assessment: coursework + exams (not exam-only)",
      "Affordable fees — great value for quality education",
    ],
    fee_th: "200K–500K/ปี",
    fee_en: "200K–500K/yr",
    uni_th: "ออสเตรเลีย (Go8), นิวซีแลนด์, UK",
    uni_en: "Australia (Go8), New Zealand, UK",
  },
];

/* ── Comparison table ── */
const currHeaders = [
  { label: "🇬🇧 British", color: "#0071E3" },
  { label: "🇺🇸 American", color: "#FF3B30" },
  { label: "🌍 IB", color: "#34C759" },
  { label: "🇸🇬 Singapore", color: "#FF9F0A" },
  { label: "🇦🇺 Australian", color: "#AF52DE" },
];

interface CompareRow {
  label_th: string;
  label_en: string;
  values: { th: string; en: string }[];
}

const compareRows: CompareRow[] = [
  {
    label_th: "โครงสร้าง", label_en: "Structure",
    values: [
      { th: "KS1-4 → IGCSE → A-Level", en: "KS1-4 → IGCSE → A-Level" },
      { th: "Elem → Middle → High + AP", en: "Elem → Middle → High + AP" },
      { th: "PYP → MYP → DP", en: "PYP → MYP → DP" },
      { th: "Primary → Sec → JC/Poly", en: "Primary → Sec → JC/Poly" },
      { th: "Primary → Jr Sec → Sr Sec", en: "Primary → Jr Sec → Sr Sec" },
    ],
  },
  {
    label_th: "ช่วงอายุ", label_en: "Age Range",
    values: [
      { th: "3–18 ปี", en: "3–18 yrs" },
      { th: "5–18 ปี", en: "5–18 yrs" },
      { th: "3–19 ปี", en: "3–19 yrs" },
      { th: "6–18 ปี", en: "6–18 yrs" },
      { th: "5–18 ปี", en: "5–18 yrs" },
    ],
  },
  {
    label_th: "วิชาสอบ", label_en: "Exams",
    values: [
      { th: "IGCSE 7-9 / A-Lv 3-4", en: "IGCSE 7-9 / A-Lv 3-4" },
      { th: "AP ไม่จำกัด", en: "AP unlimited" },
      { th: "DP 6 วิชา (HL+SL)", en: "DP 6 (HL+SL)" },
      { th: "O-Lv 7-8 / A-Lv 3-4", en: "O-Lv 7-8 / A-Lv 3-4" },
      { th: "ATAR 5-6 วิชา", en: "ATAR 5-6 subjects" },
    ],
  },
  {
    label_th: "ระบบเกรด", label_en: "Grading",
    values: [
      { th: "A*–U", en: "A*–U" },
      { th: "GPA 4.0 + AP 1-5", en: "GPA 4.0 + AP 1-5" },
      { th: "1-7 (สูงสุด 45)", en: "1-7 (max 45)" },
      { th: "A1–F9 / PSLE T-Score", en: "A1–F9 / PSLE T-Score" },
      { th: "ATAR 0–99.95", en: "ATAR 0–99.95" },
    ],
  },
  {
    label_th: "จุดแข็ง", label_en: "Strength",
    values: [
      { th: "ลึก+เฉพาะทาง", en: "Deep specialization" },
      { th: "ยืดหยุ่น+กว้าง", en: "Flexible + broad" },
      { th: "สมดุล+คิดเชิงวิพากษ์", en: "Balanced + critical" },
      { th: "คณิต-วิทย์แข็ง+วินัย", en: "Math-Science + discipline" },
      { th: "สมดุล+ไม่กดดัน", en: "Balanced + low pressure" },
    ],
  },
  {
    label_th: "จุดอ่อน", label_en: "Weakness",
    values: [
      { th: "แคบ ถ้าเลือกผิด", en: "Narrow if wrong choice" },
      { th: "ขึ้นกับโรงเรียน", en: "Depends on school" },
      { th: "หนัก, เครียด, แพง", en: "Heavy, stressful, pricey" },
      { th: "กดดันสูง, แข่งขันมาก", en: "High pressure, competitive" },
      { th: "มีน้อยในไทย", en: "Few schools in Thailand" },
    ],
  },
  {
    label_th: "เหมาะกับ", label_en: "Best For",
    values: [
      { th: "เด็กรู้ว่าชอบอะไร", en: "Kids who know their path" },
      { th: "เด็กต้องการอิสระ", en: "Kids wanting freedom" },
      { th: "All-rounder ขยัน", en: "Hardworking all-rounders" },
      { th: "เด็กชอบคณิต-วิทย์", en: "Math-science lovers" },
      { th: "เด็กต้องการสมดุล", en: "Kids wanting balance" },
    ],
  },
  {
    label_th: "ค่าเทอม (ไทย)", label_en: "Fees (Thailand)",
    values: [
      { th: "300K–800K/ปี", en: "300K–800K/yr" },
      { th: "350K–900K/ปี", en: "350K–900K/yr" },
      { th: "400K–1M+/ปี", en: "400K–1M+/yr" },
      { th: "200K–600K/ปี", en: "200K–600K/yr" },
      { th: "200K–500K/ปี", en: "200K–500K/yr" },
    ],
  },
  {
    label_th: "มหาวิทยาลัย", label_en: "University Target",
    values: [
      { th: "UK, AUS, HK, SG", en: "UK, AUS, HK, SG" },
      { th: "US, Canada", en: "US, Canada" },
      { th: "ได้ทุกที่ทั่วโลก", en: "Everywhere" },
      { th: "SG, UK, AUS", en: "SG, UK, AUS" },
      { th: "AUS, NZ, UK", en: "AUS, NZ, UK" },
    ],
  },
];

/* ── Quiz ── */
type CurrKey = "uk" | "us" | "ib" | "sg" | "au";

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
      { label_th: "เจาะลึกเฉพาะทาง — เก่งไม่กี่วิชาแต่เก่งจริง", label_en: "Deep specialization — excel in fewer subjects", score: { uk: 2, us: 0, ib: 0, sg: 1, au: 0 } },
      { label_th: "กว้างหลากหลาย — ลองทุกอย่าง ยังไม่ตัดสินใจ", label_en: "Broad & diverse — try everything, decide later", score: { uk: 0, us: 2, ib: 0, sg: 0, au: 1 } },
      { label_th: "สมดุล — เรียน+กิจกรรม+ช่วยเหลือสังคม", label_en: "Balanced — academics + activities + community service", score: { uk: 0, us: 0, ib: 2, sg: 0, au: 1 } },
      { label_th: "เข้มข้นวิชาการ — โดยเฉพาะคณิตศาสตร์และวิทยาศาสตร์", label_en: "Academically rigorous — especially math & science", score: { uk: 1, us: 0, ib: 0, sg: 2, au: 0 } },
    ],
  },
  {
    q_th: "เป้าหมายมหาวิทยาลัยของลูก?",
    q_en: "Your child's university goal?",
    icon: "🎓",
    options: [
      { label_th: "UK / ฮ่องกง", label_en: "UK / Hong Kong", score: { uk: 2, us: 0, ib: 1, sg: 1, au: 0 } },
      { label_th: "US / แคนาดา", label_en: "US / Canada", score: { uk: 0, us: 2, ib: 1, sg: 0, au: 0 } },
      { label_th: "สิงคโปร์ / ออสเตรเลีย / เอเชีย", label_en: "Singapore / Australia / Asia", score: { uk: 0, us: 0, ib: 1, sg: 2, au: 2 } },
      { label_th: "ยังไม่แน่ใจ — ขอเปิดทางเลือกกว้างที่สุด", label_en: "Not sure yet — want maximum flexibility", score: { uk: 0, us: 1, ib: 2, sg: 0, au: 1 } },
    ],
  },
  {
    q_th: "ลูกรับมือกับความกดดันอย่างไร?",
    q_en: "How does your child handle pressure?",
    icon: "💪",
    options: [
      { label_th: "ชอบสอบแข่งขัน — ชิงอันดับได้", label_en: "Thrives on exams — competitive", score: { uk: 2, us: 0, ib: 0, sg: 2, au: 0 } },
      { label_th: "ชอบทำ project / portfolio มากกว่า", label_en: "Prefers projects / portfolio work", score: { uk: 0, us: 2, ib: 1, sg: 0, au: 1 } },
      { label_th: "รับได้ทั้งสอง ขอไม่กดดันเกิน", label_en: "Can handle both — not too much pressure", score: { uk: 0, us: 1, ib: 1, sg: 0, au: 2 } },
      { label_th: "ชอบความท้าทายสูง ยิ่งยากยิ่งสนุก", label_en: "Loves high challenge — the harder the better", score: { uk: 1, us: 0, ib: 2, sg: 1, au: 0 } },
    ],
  },
  {
    q_th: "สิ่งที่สำคัญที่สุดสำหรับผู้ปกครองคือ?",
    q_en: "What matters most to you as a parent?",
    icon: "⭐",
    options: [
      { label_th: "ความเชี่ยวชาญเฉพาะด้าน — ลึกและตรงเป้า", label_en: "Deep expertise — focused and targeted", score: { uk: 2, us: 0, ib: 0, sg: 1, au: 0 } },
      { label_th: "ความคิดสร้างสรรค์ + ประสบการณ์ + กิจกรรม", label_en: "Creativity + experiences + extracurriculars", score: { uk: 0, us: 2, ib: 0, sg: 0, au: 1 } },
      { label_th: "Critical thinking + มุมมองโลกกว้าง", label_en: "Critical thinking + global perspective", score: { uk: 0, us: 0, ib: 2, sg: 0, au: 0 } },
      { label_th: "วินัย + พื้นฐานวิชาการแน่น + 2 ภาษา", label_en: "Discipline + strong academic foundation + bilingual", score: { uk: 0, us: 0, ib: 0, sg: 2, au: 1 } },
    ],
  },
  {
    q_th: "งบประมาณค่าเทอมต่อปี?",
    q_en: "Annual tuition budget?",
    icon: "💰",
    options: [
      { label_th: "200K–400K บาท/ปี (ประหยัด)", label_en: "200K–400K THB/yr (budget-friendly)", score: { uk: 0, us: 0, ib: 0, sg: 2, au: 2 } },
      { label_th: "400K–700K บาท/ปี (ปานกลาง)", label_en: "400K–700K THB/yr (mid-range)", score: { uk: 2, us: 1, ib: 0, sg: 1, au: 1 } },
      { label_th: "700K–1M บาท/ปี (พรีเมียม)", label_en: "700K–1M THB/yr (premium)", score: { uk: 1, us: 2, ib: 1, sg: 0, au: 0 } },
      { label_th: "1M+ บาท/ปี (ไม่จำกัดงบ)", label_en: "1M+ THB/yr (no budget limit)", score: { uk: 0, us: 1, ib: 2, sg: 0, au: 0 } },
    ],
  },
];

/* ── Result descriptions ── */
const resultDescriptions: Record<CurrKey, { title_th: string; title_en: string; desc_th: string; desc_en: string; color: string; link: string }> = {
  uk: {
    title_th: "🇬🇧 British (IGCSE + A-Level) เหมาะที่สุด!",
    title_en: "🇬🇧 British (IGCSE + A-Level) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ British ที่เน้นความเชี่ยวชาญเจาะลึก เลือก 3-4 วิชาที่ถนัดจริงๆ แล้วเก่งให้สุดทาง เหมาะสำหรับเด็กที่รู้แล้วว่าอยากเป็นอะไร และพร้อมรับการประเมินแบบข้อสอบ",
    desc_en: "Your child fits the British system with its deep specialization approach. Focus on 3-4 subjects of true strength and excel to the fullest. Ideal for kids who know their direction and thrive under exam-based assessment.",
    color: "#0071E3",
    link: "/find",
  },
  us: {
    title_th: "🇺🇸 American (AP) เหมาะที่สุด!",
    title_en: "🇺🇸 American (AP) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ American ที่ให้อิสระในการเลือกวิชาและเน้นกิจกรรม เด็กได้พัฒนาทุกด้าน — วิชาการ กีฬา ศิลปะ ภาวะผู้นำ เหมาะสำหรับเด็กที่ยังสำรวจตัวเองอยู่",
    desc_en: "Your child fits the American system with its flexibility in subject choice and emphasis on extracurriculars. Kids develop holistically — academics, sports, arts, leadership. Great for explorers still finding their path.",
    color: "#FF3B30",
    link: "/find",
  },
  ib: {
    title_th: "🌍 IB (International Baccalaureate) เหมาะที่สุด!",
    title_en: "🌍 IB (International Baccalaureate) is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบ IB ที่สร้างเด็กรอบด้าน ฝึก Critical thinking, Research, และ Community service ต้องเรียนทั้ง 6 กลุ่มวิชา จึงไม่มีช่องว่าง เหมาะสำหรับเด็กที่ขยันและอยากไปได้ทุกมหาวิทยาลัย",
    desc_en: "Your child fits the IB system that builds well-rounded learners. It trains critical thinking, research, and community service across all 6 subject groups — leaving no gaps. Perfect for hardworking kids who want university options worldwide.",
    color: "#34C759",
    link: "/find",
  },
  sg: {
    title_th: "🇸🇬 Singapore (สิงคโปร์) เหมาะที่สุด!",
    title_en: "🇸🇬 Singapore Curriculum is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบสิงคโปร์ที่ขึ้นชื่อด้านคณิตศาสตร์และวิทยาศาสตร์ระดับโลก เน้นวินัย พื้นฐานแน่น และ 2 ภาษาบังคับ เหมาะสำหรับเด็กที่ชอบความท้าทายทางวิชาการและต้องการรากฐานที่แข็งแกร่ง",
    desc_en: "Your child fits the Singapore system, world-renowned for its math and science excellence. It emphasizes discipline, strong fundamentals, and mandatory bilingualism. Ideal for kids who enjoy academic challenges and want rock-solid foundations.",
    color: "#FF9F0A",
    link: "/find",
  },
  au: {
    title_th: "🇦🇺 Australian (ออสเตรเลีย) เหมาะที่สุด!",
    title_en: "🇦🇺 Australian Curriculum is your best fit!",
    desc_th: "ลูกของคุณเหมาะกับระบบออสเตรเลียที่เน้นสมดุลระหว่างวิชาการและความเป็นอยู่ที่ดี ไม่กดดันเกินไป ประเมินทั้ง coursework และสอบ ค่าเทอมจับต้องได้ เหมาะสำหรับเด็กที่ต้องการเรียนรู้อย่างมีความสุข",
    desc_en: "Your child fits the Australian system that balances academics with wellbeing. It avoids excessive pressure, uses both coursework and exams for assessment, and offers affordable fees. Perfect for kids who want to learn happily without burnout.",
    color: "#AF52DE",
    link: "/find",
  },
};

/* ── University pathways ── */
const pathways = [
  {
    flag: "🇬🇧", curr: "British", color: "#0071E3",
    steps_th: ["IGCSE (Y10-11)", "A-Level (Y12-13)", "UCAS Application", "Russell Group / UK Top Unis"],
    steps_en: ["IGCSE (Y10-11)", "A-Level (Y12-13)", "UCAS Application", "Russell Group / UK Top Unis"],
    note_th: "A*AA ขึ้นไปสำหรับ Oxbridge / Medicine",
    note_en: "A*AA or above for Oxbridge / Medicine",
  },
  {
    flag: "🇺🇸", curr: "American", color: "#FF3B30",
    steps_th: ["High School GPA", "AP Exams + SAT/ACT", "Common App / Coalition", "Ivy League / US Top Unis"],
    steps_en: ["High School GPA", "AP Exams + SAT/ACT", "Common App / Coalition", "Ivy League / US Top Unis"],
    note_th: "GPA 3.8+ & SAT 1500+ สำหรับ Top 20",
    note_en: "GPA 3.8+ & SAT 1500+ for Top 20",
  },
  {
    flag: "🌍", curr: "IB", color: "#34C759",
    steps_th: ["MYP (Y7-11)", "IBDP (Y12-13)", "ยื่นได้ทุก Platform", "มหาวิทยาลัยทั่วโลก"],
    steps_en: ["MYP (Y7-11)", "IBDP (Y12-13)", "Apply via any platform", "Universities worldwide"],
    note_th: "38+ คะแนนสำหรับ Top Universities",
    note_en: "38+ points for top universities",
  },
  {
    flag: "🇸🇬", curr: "Singapore", color: "#FF9F0A",
    steps_th: ["O-Level (Sec 4-5)", "A-Level (JC1-2)", "สมัครตรง NUS/NTU", "Go8 / Russell Group ก็ได้"],
    steps_en: ["O-Level (Sec 4-5)", "A-Level (JC1-2)", "Direct apply NUS/NTU", "Go8 / Russell Group too"],
    note_th: "SG A-Level ≈ Cambridge A-Level — ยื่น UK/AUS ได้เลย",
    note_en: "SG A-Level ≈ Cambridge A-Level — can apply to UK/AUS directly",
  },
  {
    flag: "🇦🇺", curr: "Australian", color: "#AF52DE",
    steps_th: ["Senior Secondary (Y11-12)", "ATAR Score", "สมัครตรง / UAC / VTAC", "Go8 / AUS Top Unis"],
    steps_en: ["Senior Secondary (Y11-12)", "ATAR Score", "Direct / UAC / VTAC", "Go8 / AUS Top Unis"],
    note_th: "ATAR 90+ สำหรับ Group of Eight (Go8) universities",
    note_en: "ATAR 90+ for Group of Eight (Go8) universities",
  },
];

/* ── FAQ ── */
const faqs = [
  {
    q_th: "ย้ายหลักสูตรกลางทางได้ไหม?",
    q_en: "Can I switch curricula mid-way?",
    a_th: "ได้ แต่ควรย้ายก่อน Year 10 (อายุ ~14) เพราะหลังจากนั้น IGCSE/MYP/AP จะเริ่มโปรแกรมเฉพาะทาง การย้ายจาก British→IB หรือ American→IB ค่อนข้างราบรื่นเพราะ IB ครอบคลุมทุกวิชา ส่วน Singapore→British ย้ายง่ายเพราะใช้ Cambridge เหมือนกัน",
    a_en: "Yes, but ideally before Year 10 (age ~14) since specialized programs begin then. British→IB or American→IB transitions are smooth as IB covers all subjects. Singapore→British is easy since both use Cambridge. Australian→others is also relatively smooth due to its balanced nature.",
  },
  {
    q_th: "เด็กไทยเรียนหลักสูตรไหนปรับตัวง่ายที่สุด?",
    q_en: "Which curriculum is easiest for Thai students to adapt to?",
    a_th: "American มักง่ายที่สุดเพราะยืดหยุ่นและให้คะแนนจาก GPA ตลอดปี Australian ก็ปรับตัวง่ายเพราะไม่กดดันเกิน Singapore อาจยากสำหรับเด็กที่ไม่ถนัดคณิตเพราะเน้นมาก IB หนักที่สุดเพราะต้องเรียนทุกวิชา + EE + TOK + CAS",
    a_en: "American is usually easiest due to flexibility and year-round GPA grading. Australian is also easy with its low-pressure approach. Singapore can be tough for kids not strong in math. IB is most demanding with mandatory subjects + EE + TOK + CAS.",
  },
  {
    q_th: "IB หนักจริงหรือ?",
    q_en: "Is IB really that hard?",
    a_th: "หนักจริง! นอกจาก 6 วิชา (3 HL + 3 SL) ยังต้องเขียน Extended Essay 4,000 คำ ผ่าน TOK และทำ CAS 150 ชม. แต่เด็กที่ผ่าน IB มักแข็งแกร่งมาก — มหาวิทยาลัยชั้นนำให้เครดิตสูง",
    a_en: "Yes! Beyond 6 subjects (3 HL + 3 SL), students must write a 4,000-word Extended Essay, pass TOK, and complete 150 hours of CAS. But IB graduates are typically very strong — top universities give them high credit.",
  },
  {
    q_th: "หลักสูตรสิงคโปร์ต่างจาก British อย่างไร?",
    q_en: "How is Singapore different from British?",
    a_th: "ทั้งสองใช้ Cambridge exam เหมือนกัน แต่สิงคโปร์เพิ่ม: 1) นโยบาย 2 ภาษาบังคับ (อังกฤษ + แม่ภาษา) 2) คณิตศาสตร์แบบ Singapore Math ที่เข้มข้นกว่ามาก 3) PSLE streaming ตั้งแต่ ป.6 4) วัฒนธรรมแข่งขันสูง ในไทย โรงเรียนสิงคโปร์มักเน้น Math-Science + ค่าเทอมถูกกว่า British",
    a_en: "Both use Cambridge exams, but Singapore adds: 1) Mandatory bilingual policy (English + Mother Tongue) 2) Singapore Math which is far more rigorous 3) PSLE streaming from Primary 6 4) Highly competitive culture. In Thailand, Singapore schools typically emphasize Math-Science and cost less than British schools.",
  },
  {
    q_th: "Australian curriculum มีข้อดีอะไรเหนือ British/US?",
    q_en: "What advantages does Australian have over British/US?",
    a_th: "ข้อดีหลัก: 1) ค่าเทอมจับต้องได้ (200K-500K vs British 300K-800K) 2) ไม่กดดันเท่า British (ไม่ใช่สอบอย่างเดียว มี coursework ด้วย) 3) เน้น student wellbeing 4) ATAR score เป็นที่ยอมรับในหลายประเทศ แต่ข้อเสียคือมีโรงเรียนในไทยน้อยกว่าระบบอื่น",
    a_en: "Key advantages: 1) Affordable fees (200K-500K vs British 300K-800K) 2) Less pressure than British (coursework + exams, not exam-only) 3) Student wellbeing focus 4) ATAR score recognized in many countries. Main downside: fewer schools in Thailand compared to other systems.",
  },
  {
    q_th: "ถ้ายังไม่รู้จะเรียนต่อประเทศไหน เลือกอะไรดี?",
    q_en: "If undecided on which country, what should I choose?",
    a_th: "IB เป็นตัวเลือกที่ปลอดภัยที่สุด เพราะมหาวิทยาลัยทั่วโลกรับ ถ้า IB แพงหรือหนักเกินไป American เป็นตัวเลือกรองที่ดี ส่วน Singapore A-Level ก็ยื่นได้หลายประเทศเพราะเป็น Cambridge-based",
    a_en: "IB is safest as universities worldwide accept it. If IB is too expensive or demanding, American is a good backup. Singapore A-Level also works for many countries since it's Cambridge-based.",
  },
  {
    q_th: "ค่าเทอมแต่ละหลักสูตรต่างกันมากแค่ไหน?",
    q_en: "How much do fees vary between curricula?",
    a_th: "ในไทยโดยเฉลี่ย: Australian ถูกสุด (200K-500K) → Singapore (200K-600K) → British (300K-800K) → American (350K-900K) → IB แพงสุด (400K-1M+) เพราะ IB ต้องจ่ายค่า authorization + ครูต้องผ่าน IB training ส่วน Australian/Singapore ค่า overhead น้อยกว่า",
    a_en: "In Thailand on average: Australian cheapest (200K-500K) → Singapore (200K-600K) → British (300K-800K) → American (350K-900K) → IB most expensive (400K-1M+). IB costs more due to authorization fees + mandatory teacher training. Australian/Singapore have lower overhead.",
  },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export default function CurriculumGuidePage() {
  const { lang } = useLang();
  const isThai = lang === "th";

  const [quizStep, setQuizStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scoreTotals = (): Record<CurrKey, number> => {
    const t: Record<CurrKey, number> = { uk: 0, us: 0, ib: 0, sg: 0, au: 0 };
    answers.forEach((ansIdx, qIdx) => {
      const opt = quizQuestions[qIdx]?.options[ansIdx];
      if (opt) { t.uk += opt.score.uk; t.us += opt.score.us; t.ib += opt.score.ib; t.sg += opt.score.sg; t.au += opt.score.au; }
    });
    return t;
  };

  const quizResult = (): CurrKey | null => {
    if (answers.length < quizQuestions.length) return null;
    const totals = scoreTotals();
    const max = Math.max(totals.uk, totals.us, totals.ib, totals.sg, totals.au);
    if (totals.ib === max) return "ib";
    if (totals.sg === max) return "sg";
    if (totals.au === max) return "au";
    if (totals.us === max) return "us";
    return "uk";
  };

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers, optIdx];
    setAnswers(newAnswers);
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(quizQuestions.length);
    }
  };

  const resetQuiz = () => { setQuizStep(-1); setAnswers([]); };

  const result = quizResult();
  const resultData = result ? resultDescriptions[result] : null;

  const allBars: { key: CurrKey; label: string; color: string }[] = [
    { key: "uk", label: "🇬🇧 British", color: "#0071E3" },
    { key: "us", label: "🇺🇸 American", color: "#FF3B30" },
    { key: "ib", label: "🌍 IB", color: "#34C759" },
    { key: "sg", label: "🇸🇬 Singapore", color: "#FF9F0A" },
    { key: "au", label: "🇦🇺 Australian", color: "#AF52DE" },
  ];

  return (
    <div className="animate-fade-up">
      {/* ═══ 1. Hero ═══ */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          📚
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "5 หลักสูตรนานาชาติ — เลือกที่ใช่สำหรับลูก"
            : "5 International Curricula — Choose the Right One"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "British, American, IB, Singapore, Australian — เปรียบเทียบโครงสร้าง ค่าเทอม จุดแข็ง-จุดอ่อน และเส้นทางมหาวิทยาลัย พร้อม Quiz ช่วยตัดสินใจ"
            : "British, American, IB, Singapore, Australian — compare structure, fees, pros & cons, and university pathways. Take our quiz to find your best fit."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">{isThai ? "5 หลักสูตร" : "5 curricula"}</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">{isThai ? "200+ โรงเรียนในไทย" : "200+ schools in TH"}</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">{isThai ? "เข้า ม.ได้ทั่วโลก" : "Universities worldwide"}</span>
        </div>
      </section>

      {/* ═══ 2. Curriculum Overview Cards ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">🏫</div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "ภาพรวม 5 หลักสูตร" : "Overview of 5 Curricula"}
          </h2>
        </div>
        <div className="space-y-4">
          {curricula.map((c) => (
            <div key={c.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{c.flag}</span>
                <h3 className="text-[15px] font-extrabold" style={{ color: c.color }}>
                  {isThai ? c.name_th : c.name_en}
                </h3>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2">
                {[
                  { lab: isThai ? "โครงสร้าง" : "Structure", val: isThai ? c.structure_th : c.structure_en },
                  { lab: isThai ? "ช่วงอายุ" : "Age Range", val: c.age },
                  { lab: isThai ? "วิชาสอบ" : "Exams", val: isThai ? c.subjects_th : c.subjects_en },
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
              <div className="mb-3 space-y-1.5">
                {(isThai ? c.strengths_th : c.strengths_en).map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--color-text)]">
                    <span className="mt-0.5 text-[10px]" style={{ color: c.color }}>●</span>
                    {s}
                  </div>
                ))}
              </div>
              <div className="mb-3 rounded-xl bg-[var(--color-bg)] px-3 py-2">
                <span className="text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">{isThai ? "มหาวิทยาลัย" : "Universities"}</span>
                <span className="ml-2 text-[12px] font-medium text-[var(--color-text)]">{isThai ? c.uni_th : c.uni_en}</span>
              </div>
              <Link
                href="/find"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-bold text-white no-underline transition-all active:scale-95"
                style={{ backgroundColor: c.color }}
              >
                {isThai ? "ดูโรงเรียนที่เปิดสอน →" : "View schools →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. Comparison Table ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-success)]/15 text-sm">📊</div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "ตารางเปรียบเทียบ 5 หลักสูตร" : "5-Curriculum Comparison Table"}
          </h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full min-w-[700px] text-[11px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-2.5 py-2.5 text-left text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {isThai ? "หัวข้อ" : "Category"}
                </th>
                {currHeaders.map((h) => (
                  <th key={h.label} className="px-2 py-2.5 text-center font-bold" style={{ color: h.color }}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i} className={i < compareRows.length - 1 ? "border-b border-[var(--color-border)]" : ""}>
                  <td className="px-2.5 py-2 font-bold text-[var(--color-text-secondary)]">
                    {isThai ? row.label_th : row.label_en}
                  </td>
                  {row.values.map((v, j) => (
                    <td key={j} className="px-2 py-2 text-center text-[var(--color-text)]">
                      {isThai ? v.th : v.en}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ 4. Quiz ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-warning)]/15 text-sm">🧩</div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Quiz: หลักสูตรไหนเหมาะกับลูก?" : "Quiz: Which Curriculum Fits Your Child?"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          {quizStep === -1 && (
            <div className="text-center">
              <div className="mx-auto mb-3 text-5xl">🎯</div>
              <p className="mb-4 text-[13px] text-[var(--color-text)]">
                {isThai ? "ตอบ 5 คำถามง่ายๆ แล้วเราจะแนะนำหลักสูตรที่เหมาะกับลูกของคุณ" : "Answer 5 simple questions and we'll recommend the best curriculum for your child."}
              </p>
              <button onClick={() => setQuizStep(0)} className="rounded-xl bg-[var(--color-text)] px-8 py-3 text-[14px] font-bold text-white transition-all active:scale-95">
                {isThai ? "เริ่ม Quiz →" : "Start Quiz →"}
              </button>
            </div>
          )}

          {quizStep >= 0 && quizStep < quizQuestions.length && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-bg)]">
                  <div className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500" style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} />
                </div>
                <span className="text-[11px] font-bold text-[var(--color-text-secondary)]">{quizStep + 1}/{quizQuestions.length}</span>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">{quizQuestions[quizStep].icon}</span>
                <h3 className="text-[15px] font-bold text-[var(--color-text)]">{isThai ? quizQuestions[quizStep].q_th : quizQuestions[quizStep].q_en}</h3>
              </div>
              <div className="space-y-2">
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3.5 text-left text-[13px] font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-accent)] active:scale-[0.98]">
                    {isThai ? opt.label_th : opt.label_en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizStep >= quizQuestions.length && resultData && (
            <div>
              <div className="mb-4 text-center">
                <div className="mx-auto mb-2 text-4xl">🎉</div>
                <h3 className="text-[18px] font-extrabold" style={{ color: resultData.color }}>{isThai ? resultData.title_th : resultData.title_en}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text)]">{isThai ? resultData.desc_th : resultData.desc_en}</p>
              </div>
              {(() => {
                const scores = scoreTotals();
                const maxScore = Math.max(...Object.values(scores), 1);
                return (
                  <div className="mb-4 space-y-2 rounded-xl bg-[var(--color-bg)] p-4">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">{isThai ? "คะแนนแต่ละหลักสูตร" : "Score Breakdown"}</div>
                    {allBars.map((item) => (
                      <div key={item.key}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[var(--color-text)]">{item.label}</span>
                          <span className="text-[13px] font-extrabold" style={{ color: item.color }}>{scores[item.key]}</span>
                        </div>
                        <div className="h-3.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(scores[item.key] / maxScore) * 100}%`, backgroundColor: item.color, opacity: 0.8 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div className="flex flex-wrap gap-2">
                <Link href={resultData.link} className="flex-1 rounded-xl px-4 py-3 text-center text-[13px] font-bold text-white no-underline transition-all active:scale-95" style={{ backgroundColor: resultData.color }}>
                  {isThai ? "ดูโรงเรียนที่เปิดสอน →" : "Browse schools →"}
                </Link>
                <button onClick={resetQuiz} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[13px] font-bold text-[var(--color-text)] transition-all active:scale-95">
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
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#AF52DE]/15 text-sm">🎓</div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">{isThai ? "เส้นทางเข้ามหาวิทยาลัย" : "University Pathways"}</h2>
        </div>
        <div className="space-y-3">
          {pathways.map((p) => (
            <div key={p.curr} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xl">{p.flag}</span>
                <span className="text-[14px] font-extrabold" style={{ color: p.color }}>{p.curr}</span>
              </div>
              <div className="mb-3 flex items-center gap-1 overflow-x-auto">
                {(isThai ? p.steps_th : p.steps_en).map((step, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-1">
                    <span className="rounded-lg bg-[var(--color-bg)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--color-text)]">{step}</span>
                    {i < p.steps_th.length - 1 && <span className="text-[var(--color-text-secondary)]">→</span>}
                  </div>
                ))}
              </div>
              <p className="text-[11px] italic text-[var(--color-text-secondary)]">💡 {isThai ? p.note_th : p.note_en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">❓</div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">{isThai ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3.5 text-left">
                <span className="text-[13px] font-bold text-[var(--color-text)]">{isThai ? faq.q_th : faq.q_en}</span>
                <span className="ml-2 text-[var(--color-text-secondary)] transition-transform duration-200" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
              </button>
              {openFaq === i && (
                <div className="border-t border-[var(--color-border)] px-4 py-3">
                  <p className="text-[12px] leading-relaxed text-[var(--color-text)]">{isThai ? faq.a_th : faq.a_en}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Back link ═══ */}
      <div className="text-center">
        <Link href="/learn" className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-surface)] px-5 py-3 text-[13px] font-medium text-[var(--color-text)] no-underline transition-all hover:bg-[var(--color-border)]">
          ← {isThai ? "กลับหน้าเรียนรู้" : "Back to Learn"}
        </Link>
      </div>
    </div>
  );
}
