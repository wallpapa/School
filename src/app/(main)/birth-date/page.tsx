"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Cutoff Date Data ── */
const cutoffData = [
  { key: "uk", flag: "🇬🇧", curriculum: "UK (British)", cutoff: "1 September", schoolStart: "September", grade: "Reception (age 4-5)", color: "from-blue-50 to-blue-100", dot: "bg-blue-500", note: "เด็กเกิด ก.ย. = อายุมากสุดในชั้น ✅" },
  { key: "us", flag: "🇺🇸", curriculum: "US (American)", cutoff: "1 September*", schoolStart: "Aug/Sep", grade: "Kindergarten (age 5)", color: "from-red-50 to-red-100", dot: "bg-red-500", note: "แตกต่างตามรัฐ — บางรัฐ ส.ค. หรือ ธ.ค." },
  { key: "sg", flag: "🇸🇬", curriculum: "Singapore", cutoff: "1 January", schoolStart: "January", grade: "Primary 1 (age 6-7)", color: "from-green-50 to-green-100", dot: "bg-green-500", note: "เด็กเกิด ม.ค. = อายุมากสุดในชั้น ✅" },
  { key: "th", flag: "🇹🇭", curriculum: "Thai Public", cutoff: "16 May (เกณฑ์)", schoolStart: "Mid-May", grade: "ป.1 (อายุ 6 ปี)", color: "from-orange-50 to-orange-100", dot: "bg-orange-500", note: "เด็กเกิด พ.ค.-มิ.ย. = อายุมากสุดในชั้น" },
  { key: "chula", flag: "🏛️", curriculum: "สาธิตจุฬา", cutoff: "อายุ 6 ปี ภายใน พ.ค.", schoolStart: "May/June", grade: "ป.1 (สอบ ก.พ.-มี.ค.)", color: "from-purple-50 to-purple-100", dot: "bg-purple-500", note: "สอบคัดเลือกวันเดียวกับสาธิตอื่น" },
  { key: "kaset", flag: "🌾", curriculum: "สาธิตเกษตร", cutoff: "อายุ 5 ปี 6 เดือน+", schoolStart: "May/June", grade: "ป.1 (สอบ มี.ค.)", color: "from-amber-50 to-amber-100", dot: "bg-amber-500", note: "เกณฑ์อายุต่างจากสาธิตจุฬาเล็กน้อย" },
  { key: "ib", flag: "🌍", curriculum: "IB (International Baccalaureate)", cutoff: "ตามประเทศเจ้าภาพ", schoolStart: "Varies", grade: "PYP/MYP/DP", color: "from-teal-50 to-teal-100", dot: "bg-teal-500", note: "ในไทย ส่วนใหญ่ใช้ Sep 1 (UK pattern)" },
];

/* ── Research Studies ── */
const studies = [
  {
    id: "bedard",
    authors: "Bedard & Dhuey",
    year: 2006,
    title: "The Persistence of Early Childhood Maturity: International Evidence of Long-Run Age Effects",
    journal: "Quarterly Journal of Economics",
    vol: "Vol. 121, pp. 1437-1472",
    finding: "เด็กที่อายุน้อยที่สุดในชั้นเรียนทำคะแนนสอบต่ำกว่าเด็กที่อายุมากที่สุด 4-12 เปอร์เซ็นไทล์ ในชั้น ป.4",
    findingEn: "Youngest in cohort score 4-12 percentiles lower than oldest in grade 4",
    impact: "high",
    url: "https://doi.org/10.1162/qjec.121.4.1437",
  },
  {
    id: "crawford",
    authors: "Crawford, Dearden & Meghir",
    year: 2010,
    title: "When You Are Born Matters: The Impact of Date of Birth on Educational Outcomes in England",
    journal: "Institute for Fiscal Studies (IFS)",
    vol: "Working Paper W10/06",
    finding: "เด็กเกิด สิงหาคม (อายุน้อยสุดในชั้น UK) มีโอกาสเข้ามหาวิทยาลัยน้อยกว่าเด็กเกิด กันยายน 2.3%",
    findingEn: "August-born children are 2.3 percentage points less likely to attend university than September-born",
    impact: "high",
    url: "https://ifs.org.uk/sites/default/files/output_url_files/wp201307.pdf",
  },
  {
    id: "systematic",
    authors: "Cobley et al.",
    year: 2021,
    title: "The Relative Age Effects in Educational Development: A Systematic Review and Meta-Analysis",
    journal: "PMC / Frontiers in Psychology",
    vol: "PMC 8431425",
    finding: "Meta-analysis ยืนยันว่า Relative Age Effect มีผลในทุกระดับการศึกษา ตั้งแต่ประถมถึงมหาวิทยาลัย",
    findingEn: "Systematic review confirms RAE persists across all educational levels",
    impact: "high",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8431425/",
  },
  {
    id: "plos",
    authors: "Navarro, Garcia-Rubio & Olivares",
    year: 2015,
    title: "The Relative Age Effect and Its Influence on Academic Performance",
    journal: "PLOS ONE",
    vol: "10(10): e0141895",
    finding: "RAE มีผลต่อผลการเรียน โดยเฉพาะในเด็กชาย และลดลงเมื่ออายุมากขึ้นแต่ไม่หายไปหมด",
    findingEn: "RAE affects academic performance, especially in boys, and diminishes but persists with age",
    impact: "medium",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0141895",
  },
  {
    id: "strategic",
    authors: "Buckles & Hungerman",
    year: 2013,
    title: "Season of Birth and Later Outcomes: Old Questions, New Answers",
    journal: "Review of Economics and Statistics",
    vol: "Vol. 95(3), pp. 711-724",
    finding: "พบความสัมพันธ์ระหว่างเดือนเกิดกับ SES ของครอบครัว — ครอบครัวที่มีการศึกษาสูงมีแนวโน้มวางแผนเดือนเกิดลูก",
    findingEn: "Birth season correlates with family SES — educated families tend to plan birth timing",
    impact: "medium",
    url: "https://doi.org/10.1162/REST_a_00314",
  },
];

/* ── Grade Mapping Table ── */
const gradeMapping = [
  { age: "5-6", uk: "Year 1", us: "Kindergarten", sg: "Primary 1", th: "ป.1", risk: false },
  { age: "6-7", uk: "Year 2", us: "Grade 1", sg: "Primary 2", th: "ป.2", risk: false },
  { age: "7-8", uk: "Year 3", us: "Grade 2", sg: "Primary 3", th: "ป.3", risk: false },
  { age: "8-9", uk: "Year 4", us: "Grade 3", sg: "Primary 4", th: "ป.4", risk: false },
  { age: "9-10", uk: "Year 5", us: "Grade 4", sg: "Primary 5", th: "ป.5", risk: false },
  { age: "10-11", uk: "Year 6", us: "Grade 5", sg: "Primary 6", th: "ป.6", risk: true },
  { age: "11-12", uk: "Year 7", us: "Grade 6", sg: "Secondary 1", th: "ม.1", risk: true },
  { age: "12-13", uk: "Year 8", us: "Grade 7", sg: "Secondary 2", th: "ม.2", risk: false },
  { age: "13-14", uk: "Year 9", us: "Grade 8", sg: "Secondary 3", th: "ม.3", risk: true },
  { age: "14-15", uk: "Year 10 (IGCSE)", us: "Grade 9", sg: "Secondary 4", th: "ม.4", risk: true },
  { age: "15-16", uk: "Year 11 (IGCSE)", us: "Grade 10", sg: "—", th: "ม.5", risk: true },
  { age: "16-17", uk: "Year 12 (A-Level)", us: "Grade 11", sg: "JC1", th: "ม.6", risk: true },
  { age: "17-18", uk: "Year 13 (A-Level)", us: "Grade 12", sg: "JC2", th: "—", risk: false },
];

/* ── RAE Achievement Gap Data ── */
const raeGapData = [
  { stage: "KS1 (ป.1-2)", gap: 25, color: "bg-red-500" },
  { stage: "KS2 (ป.4-6)", gap: 12, color: "bg-orange-500" },
  { stage: "KS3 (ม.1-3)", gap: 9, color: "bg-amber-500" },
  { stage: "KS4 (ม.4-5)", gap: 6, color: "bg-yellow-500" },
  { stage: "A-Level", gap: 1, color: "bg-green-500" },
];

/* ── Transfer Risk Scenarios ── */
const transferRisks = [
  { from: "🇬🇧 UK", to: "🇸🇬 Singapore", risk: "high", gap: "Cutoff ต่างกัน 8 เดือน (Sep→Jan) — เด็กเกิด Jan-Aug อาจต้องซ้ำชั้น", riskEn: "Sep→Jan cutoff = potential 8-month gap" },
  { from: "🇹🇭 Thai", to: "🇬🇧 UK", risk: "medium", gap: "Cutoff ต่างกัน (May→Sep) — อาจได้เปรียบหรือเสียเปรียบขึ้นกับเดือนเกิด", riskEn: "May→Sep cutoff shift" },
  { from: "🇺🇸 US", to: "🇬🇧 UK", risk: "low", gap: "Cutoff คล้ายกัน (Sep) — แต่ Grade numbering ต่างกัน 1 ปี", riskEn: "Similar cutoff but grade numbering differs by 1" },
  { from: "🇸🇬 Singapore", to: "🇹🇭 Thai", risk: "medium", gap: "Jan→May cutoff — เด็กเกิด Jan-Apr อาจถูกจัดชั้นสูงขึ้นหรือต่ำลง", riskEn: "Jan→May shift affects grade placement" },
  { from: "🇹🇭 Thai", to: "🌍 IB (ในไทย)", risk: "low", gap: "IB ส่วนใหญ่ในไทยใช้ Sep cutoff — ต้องเช็คเป็นรายโรงเรียน", riskEn: "Most IB schools in Thailand use Sep cutoff" },
];

/* ── FAQ Data ── */
const faqData = [
  {
    q: "ลูกเกิดเดือนอะไร ได้เปรียบที่สุด?",
    qEn: "Which birth month gives the most advantage?",
    a: "ขึ้นอยู่กับหลักสูตร — UK: เด็กเกิด ก.ย. ได้เปรียบ (อายุมากสุดในชั้น), Singapore: เด็กเกิด ม.ค. ได้เปรียบ, Thai: เด็กเกิด พ.ค.-มิ.ย. ได้เปรียบ งานวิจัยพบว่าเด็กที่อายุมากกว่าในชั้นเรียนมีพัฒนาการทางสมองสูงกว่า ทำให้ได้เปรียบในการสอบ",
    aEn: "It depends on the curriculum. UK: September-born children have the advantage. Singapore: January-born. Thai: May-June born. Research shows older children in a cohort have more developed cognitive abilities, giving them an edge in exams.",
  },
  {
    q: "Relative Age Effect คืออะไร?",
    qEn: "What is the Relative Age Effect?",
    a: "Relative Age Effect (RAE) คือปรากฏการณ์ที่เด็กที่อายุมากกว่าในชั้นเรียนเดียวกันมีผลการเรียนดีกว่า เพราะพัฒนาการทางสมองสูงกว่า 6-12 เดือน — งานวิจัยพบว่าความแตกต่างนี้ลดลงเมื่อโตขึ้น แต่ยังคงมีผลจนถึงระดับมหาวิทยาลัย",
    aEn: "The Relative Age Effect (RAE) is the phenomenon where older children in the same grade perform better academically due to having 6-12 months more cognitive development. Research shows this gap narrows with age but persists through university.",
  },
  {
    q: "ย้ายจากหลักสูตร UK ไป Singapore ลูกจะต้องซ้ำชั้นไหม?",
    qEn: "Will my child repeat a year when transferring from UK to Singapore curriculum?",
    a: "เป็นไปได้ — เพราะ cutoff date ต่างกัน 8 เดือน (UK: Sep 1 vs SG: Jan 1) เด็กที่เกิด Jan-Aug อาจถูกจัดให้อยู่ชั้นต่ำกว่า ต้องตรวจสอบกับโรงเรียนปลายทางเป็นรายกรณี",
    aEn: "It's possible — the 8-month cutoff difference (UK: Sep 1 vs SG: Jan 1) means children born Jan-Aug may be placed in a lower year. Check with the receiving school on a case-by-case basis.",
  },
  {
    q: "วางแผนผ่าคลอดตามวันเกิด คุ้มไหม?",
    qEn: "Is it worth planning a C-section for educational advantage?",
    a: "งานวิจัยพบว่าครอบครัวที่มีการศึกษาสูงมีแนวโน้มวางแผนเดือนเกิดลูก แต่ควรปรึกษาแพทย์เรื่องความเสี่ยงทางสุขภาพเป็นหลัก — การเกิดก่อนกำหนด (37 สัปดาห์) มีความเสี่ยงต่อพัฒนาการ หน้านี้ไม่ได้ให้คำแนะนำทางการแพทย์",
    aEn: "Research shows educated families tend to plan birth timing, but always consult your doctor about health risks first — premature birth (before 37 weeks) carries developmental risks. This page does not provide medical advice.",
  },
  {
    q: "เดือนเกิดมีผลต่อการสอบเข้าแพทย์จริงไหม?",
    qEn: "Does birth month really affect medical school admission?",
    a: "งานวิจัยพบว่า Relative Age Effect มีผลต่อเนื่องจนถึงระดับมหาวิทยาลัย เด็กที่อายุมากกว่าในรุ่นเดียวกันมีพัฒนาการทางสมองสูงกว่าเมื่อสอบในรอบเดียวกัน ซึ่งอาจส่งผลต่อโอกาสสอบเข้าคณะที่มีการแข่งขันสูง เช่น แพทยศาสตร์",
    aEn: "Research shows RAE persists through university. Older children in the same cohort have more cognitive maturity during competitive exams, which may affect chances of entering highly competitive programs like medicine.",
  },
  {
    q: "SchoolFinder เก็บข้อมูลส่วนตัวไหม?",
    qEn: "Does SchoolFinder collect personal data?",
    a: "ไม่เก็บ — SchoolFinder ใช้เฉพาะเดือน/ปีเกิดเพื่อคำนวณชั้นเรียนเท่านั้น ไม่มีการเก็บชื่อ นามสกุล เลขบัตรประชาชน หรือข้อมูลส่วนตัวใดๆ ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) พ.ศ. 2562",
    aEn: "No — SchoolFinder only uses birth month/year for grade calculation. We do not collect names, ID numbers, or any personal data, in compliance with Thailand's PDPA Act B.E. 2562.",
  },
];

/* ── Advice Items ── */
const adviceItems = [
  { emoji: "📅", text: "เช็ค cutoff date ก่อนเลือกหลักสูตร — แต่ละระบบตัดรอบอายุต่างกัน", textEn: "Check cutoff dates before choosing a curriculum — each system has different age requirements" },
  { emoji: "⏸️", text: "ถ้าลูกอายุน้อยกว่าเกณฑ์ ลองพิจารณาเริ่มเรียนช้า 1 ปี (academic redshirting) — ไม่ใช่เรื่องเสียหาย", textEn: "If your child is young for their grade, consider academic redshirting — delaying school entry by 1 year is a valid strategy" },
  { emoji: "🔄", text: "เมื่อย้ายหลักสูตร ตรวจสอบ grade equivalency กับโรงเรียนปลายทางเสมอ", textEn: "When transferring curricula, always verify grade equivalency with the receiving school" },
  { emoji: "💬", text: "ใช้ SchoolFinder AI Chat คำนวณว่าลูกจะอยู่ชั้นไหนในแต่ละหลักสูตร", textEn: "Use SchoolFinder AI Chat to calculate which grade your child would be in for each curriculum" },
  { emoji: "🏫", text: "ถ้าวางแผนส่งลูกไป boarding school ต่างประเทศ เช็ค cutoff ของประเทศปลายทางล่วงหน้า", textEn: "If planning for overseas boarding school, check the destination country's cutoff dates in advance" },
  { emoji: "⚠️", text: "ข้อมูล cutoff อาจเปลี่ยนแปลง — ตรวจสอบกับโรงเรียนโดยตรงก่อนตัดสินใจ", textEn: "Cutoff dates may change — always verify with the school directly before making decisions" },
];

export default function BirthDatePage() {
  const { t, lang } = useLang();
  const isThai = lang === "th";
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="animate-page-enter space-y-4 px-5 pb-10 pt-6 md:px-8 lg:px-10">
      {/* ── Hero ── */}
      <div className="text-center">
        <div className="text-[48px] leading-none">🎂</div>
        <h1 className="mt-2 text-[22px] font-bold leading-tight md:text-[28px]">
          {isThai ? "วันเกิดลูก กำหนดอนาคตการศึกษา" : "Your Child's Birthday Shapes Their Education"}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "Cutoff dates ต่างกันในแต่ละหลักสูตร ทำให้วันเกิดลูกมีผลต่อการสมัครเรียน ผลสอบ การย้ายหลักสูตร ไปจนถึงโอกาสสอบเข้าแพทย์"
            : "Different curriculum cutoff dates mean your child's birth month affects school admission, exam performance, curriculum transfers, and even medical school chances"}
        </p>
      </div>

      {/* ── PDPA Notice ── */}
      <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[14px]">🔒</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            {isThai ? "ความเป็นส่วนตัว (PDPA)" : "Privacy (PDPA)"}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "หน้านี้กล่าวถึงเดือน/ปีเกิดเท่านั้นเพื่อวางแผนการศึกษา ไม่มีการเก็บข้อมูลส่วนบุคคลใดๆ (ชื่อ เลขบัตรประชาชน ฯลฯ) ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562"
            : "This page discusses birth month/year only for educational planning. No personal data is collected (no names, ID numbers, etc.) in compliance with Thailand PDPA Act B.E. 2562."}
        </p>
      </div>

      {/* ── Section 1: Cutoff Date Comparison ── */}
      <Section
        emoji="🗓️"
        title={isThai ? "Cutoff Dates เปรียบเทียบ 7 ระบบ" : "Cutoff Date Comparison — 7 Systems"}
        subtitle={isThai ? "แต่ละหลักสูตรกำหนดอายุขั้นต่ำต่างกัน — วันเกิดเดียวกัน อาจอยู่คนละชั้น" : "Each curriculum has different age requirements — the same birthday may place your child in different grades"}
      >
        <div className="space-y-2">
          {cutoffData.map((c) => (
            <div key={c.key} className={`rounded-xl bg-gradient-to-r ${c.color} p-3`}>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                <span className="text-[13px] font-semibold">{c.flag} {c.curriculum}</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-0.5 pl-[18px]">
                <div className="text-[11px] text-[var(--color-text-secondary)]">Cutoff</div>
                <div className="text-[11px] font-medium">{c.cutoff}</div>
                <div className="text-[11px] text-[var(--color-text-secondary)]">{isThai ? "ชั้นเข้า" : "Entry Grade"}</div>
                <div className="text-[11px] font-medium">{c.grade}</div>
              </div>
              <div className="mt-1 pl-[18px] text-[10px] text-[var(--color-text-secondary)]">{c.note}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 2: Relative Age Effect ── */}
      <Section
        emoji="📊"
        title={isThai ? "Relative Age Effect — เด็กเกิดปลายปีเสียเปรียบจริงไหม?" : "Relative Age Effect — Are Younger Children Really Disadvantaged?"}
        subtitle={isThai ? "งานวิจัยจากหลายประเทศยืนยัน: อายุมากกว่าในชั้น = ได้เปรียบ" : "Research from multiple countries confirms: older in the cohort = advantage"}
      >
        {/* RAE Bar Chart */}
        <div className="mb-4 rounded-xl bg-white p-3.5">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {isThai ? "ช่องว่างผลสอบ: เด็กเกิดต้นปี vs ปลายปี (UK)" : "Achievement Gap: Oldest vs Youngest in Cohort (UK)"}
          </div>
          <div className="space-y-2">
            {raeGapData.map((d) => (
              <div key={d.stage} className="flex items-center gap-2">
                <div className="w-[80px] text-right text-[10px] font-medium text-[var(--color-text-secondary)]">{d.stage}</div>
                <div className="flex-1">
                  <div className={`h-5 rounded-full ${d.color}`} style={{ width: `${d.gap * 4}%`, minWidth: "12px" }}>
                    <span className="pl-2 text-[10px] font-bold text-white">{d.gap}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-[var(--color-text-secondary)]">
            {isThai ? "ที่มา: Crawford, Dearden & Meghir (2010), IFS — เด็ก UK ที่เกิดเดือน ส.ค. vs ก.ย." : "Source: Crawford, Dearden & Meghir (2010), IFS — UK children Aug-born vs Sep-born"}
          </p>
        </div>

        {/* Research Cards */}
        <div className="space-y-2">
          {studies.map((s) => (
            <button
              key={s.id}
              className="w-full rounded-xl bg-white p-3 text-left transition-all active:scale-[0.98]"
              onClick={() => setExpandedStudy(expandedStudy === s.id ? null : s.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-[12px] font-semibold">{s.authors} ({s.year})</div>
                  <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                    {isThai ? s.finding : s.findingEn}
                  </div>
                </div>
                <span className={`mt-1 text-[10px] transition-transform ${expandedStudy === s.id ? "rotate-180" : ""}`}>▼</span>
              </div>
              {expandedStudy === s.id && (
                <div className="mt-2 border-t border-[var(--color-border)] pt-2 text-[11px] text-[var(--color-text-secondary)]">
                  <div className="font-medium text-[var(--color-text)]">{s.title}</div>
                  <div className="mt-1">{s.journal}, {s.vol}</div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[var(--color-accent)] underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isThai ? "อ่านงานวิจัย →" : "Read paper →"}
                  </a>
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Grade Mapping Table ── */}
      <Section
        emoji="🔄"
        title={isThai ? "เทียบชั้นเรียนข้ามหลักสูตร" : "Cross-Curriculum Grade Mapping"}
        subtitle={isThai ? "UK Year ↔ US Grade ↔ Singapore Primary ↔ Thai ป./ม." : "UK Year ↔ US Grade ↔ Singapore Primary ↔ Thai"}
      >
        <div className="overflow-x-auto rounded-xl bg-white">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-2 py-2 text-left font-bold text-[var(--color-text-secondary)]">{isThai ? "อายุ" : "Age"}</th>
                <th className="px-2 py-2 text-left font-bold text-[var(--color-text-secondary)]">🇬🇧 UK</th>
                <th className="px-2 py-2 text-left font-bold text-[var(--color-text-secondary)]">🇺🇸 US</th>
                <th className="px-2 py-2 text-left font-bold text-[var(--color-text-secondary)]">🇸🇬 SG</th>
                <th className="px-2 py-2 text-left font-bold text-[var(--color-text-secondary)]">🇹🇭 Thai</th>
              </tr>
            </thead>
            <tbody>
              {gradeMapping.map((row) => (
                <tr key={row.age} className={`border-b border-[var(--color-border)]/50 ${row.risk ? "bg-[var(--color-warning)]/5" : ""}`}>
                  <td className="px-2 py-1.5 font-semibold">{row.age}</td>
                  <td className="px-2 py-1.5">{row.uk}</td>
                  <td className="px-2 py-1.5">{row.us}</td>
                  <td className="px-2 py-1.5">{row.sg}</td>
                  <td className="px-2 py-1.5">{row.th}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] text-[var(--color-text-secondary)]">
          {isThai
            ? "⚠️ แถวสีเหลือง = ชั้นที่มีความเสี่ยงซ้ำชั้นเมื่อย้ายหลักสูตร (เช่น เริ่ม IGCSE, เริ่ม A-Level)"
            : "⚠️ Yellow rows = grades with higher risk of repetition when transferring curricula"}
        </p>
      </Section>

      {/* ── Section 4: Transfer Risks ── */}
      <Section
        emoji="⚠️"
        title={isThai ? "ความเสี่ยงซ้ำชั้นเมื่อย้ายหลักสูตร" : "Grade Repetition Risk When Transferring"}
        subtitle={isThai ? "Cutoff date ต่างกัน = เสี่ยงถูกจัดชั้นใหม่" : "Different cutoff dates = risk of grade re-assignment"}
      >
        <div className="space-y-2">
          {transferRisks.map((tr, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 ${
                tr.risk === "high"
                  ? "border-[var(--color-error)]/30 bg-[var(--color-error)]/5"
                  : tr.risk === "medium"
                    ? "border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5"
                    : "border-[var(--color-success)]/30 bg-[var(--color-success)]/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">{tr.from} → {tr.to}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  tr.risk === "high"
                    ? "bg-[var(--color-error)]/20 text-[var(--color-error)]"
                    : tr.risk === "medium"
                      ? "bg-[var(--color-warning)]/20 text-[var(--color-warning)]"
                      : "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                }`}>
                  {tr.risk === "high" ? "สูง" : tr.risk === "medium" ? "ปานกลาง" : "ต่ำ"}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">{isThai ? tr.gap : tr.riskEn}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 5: Medical School & Birth Month ── */}
      <Section
        emoji="🩺"
        title={isThai ? "สอบเข้าแพทย์ กับเดือนเกิด" : "Medical School Admission & Birth Month"}
        subtitle={isThai ? "Relative Age Effect มีผลต่อเนื่องจนถึงระดับมหาวิทยาลัย" : "RAE persists through higher education"}
      >
        <div className="rounded-xl bg-white p-3.5">
          <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
            {isThai
              ? "งานวิจัยของ Crawford, Dearden & Meghir (2010) พบว่าเด็กที่เกิดเดือนสิงหาคม (อายุน้อยสุดในระบบ UK) มีโอกาสเข้ามหาวิทยาลัยน้อยกว่าเด็กเกิดกันยายน 2.3% — เมื่อการแข่งขันสูง เช่น การสอบเข้าแพทย์ ความต่างแม้เพียงเล็กน้อยก็มีผลอย่างมาก"
              : "Crawford, Dearden & Meghir (2010) found that August-born children (youngest in UK system) are 2.3% less likely to attend university — in highly competitive contexts like medical school admission, even small differences have significant impact."}
          </p>
          <div className="mt-3 rounded-lg bg-[var(--color-surface)] p-3">
            <div className="text-[11px] font-bold text-[var(--color-text)]">
              {isThai ? "ทำไมเด็กเกิดต้นปีสอบเข้าแพทย์ได้มากกว่า?" : "Why do older-in-cohort children pass medical exams more often?"}
            </div>
            <ul className="mt-1.5 space-y-1 text-[11px] text-[var(--color-text-secondary)]">
              <li>• {isThai ? "พัฒนาการทางสมองสูงกว่า 6-12 เดือนเมื่อสอบในรอบเดียวกัน" : "6-12 months more cognitive development when taking the same exam"}</li>
              <li>• {isThai ? "ความจำ สมาธิ และทักษะการวิเคราะห์สมบูรณ์กว่า" : "More mature memory, attention, and analytical skills"}</li>
              <li>• {isThai ? "ความมั่นใจสูงกว่า — เคยเป็น \"เด็กเก่ง\" ในห้องตลอด" : "Higher confidence from consistently being \"the smart kid\" in class"}</li>
              <li>• {isThai ? "ผลกระทบสะสม: ได้เรียนกลุ่มเก่ง → ได้ครูดี → ได้ทรัพยากรมากกว่า" : "Cumulative effect: placed in advanced groups → better teachers → more resources"}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Section 6: Strategic Birth Timing ── */}
      <Section
        emoji="🤔"
        title={isThai ? "วางแผนคลอด ให้ลูกได้เปรียบ?" : "Planning Birth Timing for Educational Advantage?"}
        subtitle={isThai ? "สิ่งที่ต้องพิจารณาก่อนตัดสินใจ" : "What to consider before deciding"}
      >
        <div className="rounded-xl bg-white p-3.5">
          <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
            {isThai
              ? "งานวิจัยของ Buckles & Hungerman (2013) ใน Review of Economics and Statistics พบว่าครอบครัวที่มีการศึกษาสูงมีแนวโน้มวางแผนเดือนเกิดลูก — ในหลายประเทศ ผู้ปกครองเลือกผ่าคลอดเพื่อให้ลูกเป็นเด็กที่อายุมากในชั้นเรียน"
              : "Buckles & Hungerman (2013) in the Review of Economics and Statistics found that higher-educated families tend to plan birth timing — in many countries, parents choose C-sections to make their child older in the cohort."}
          </p>

          <div className="mt-3 space-y-2">
            <div className="rounded-lg bg-[var(--color-success)]/5 border border-[var(--color-success)]/20 p-2.5">
              <div className="text-[11px] font-bold text-[var(--color-success)]">✅ {isThai ? "ข้อดี" : "Potential Benefits"}</div>
              <ul className="mt-1 space-y-0.5 text-[11px] text-[var(--color-text-secondary)]">
                <li>• {isThai ? "ลูกเป็นเด็กอายุมากในชั้น — ได้เปรียบ RAE" : "Child is oldest in cohort — RAE advantage"}</li>
                <li>• {isThai ? "พัฒนาการสมบูรณ์กว่าเมื่อเริ่มเรียน" : "More mature development when starting school"}</li>
                <li>• {isThai ? "ลดความเสี่ยงซ้ำชั้นเมื่อย้ายหลักสูตรในอนาคต" : "Reduces grade repetition risk when transferring curricula"}</li>
              </ul>
            </div>
            <div className="rounded-lg bg-[var(--color-error)]/5 border border-[var(--color-error)]/20 p-2.5">
              <div className="text-[11px] font-bold text-[var(--color-error)]">⚠️ {isThai ? "ข้อควรระวัง" : "Important Considerations"}</div>
              <ul className="mt-1 space-y-0.5 text-[11px] text-[var(--color-text-secondary)]">
                <li>• {isThai ? "การคลอดก่อนกำหนดมีความเสี่ยงต่อสุขภาพลูก" : "Early delivery carries health risks for the baby"}</li>
                <li>• {isThai ? "ปรึกษาแพทย์เสมอ — สุขภาพแม่และลูกมาก่อน" : "Always consult your doctor — mother and baby's health comes first"}</li>
                <li>• {isThai ? "RAE ลดลงเมื่อเด็กโตขึ้น — ไม่ใช่ปัจจัยเดียวที่กำหนดอนาคต" : "RAE decreases with age — it's not the only factor determining future success"}</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 p-2.5">
            <p className="text-[10px] font-medium text-[var(--color-warning)]">
              {isThai
                ? "⚕️ หน้านี้ไม่ได้ให้คำแนะนำทางการแพทย์ — กรุณาปรึกษาสูตินรีแพทย์เรื่องการคลอดเสมอ"
                : "⚕️ This page does not provide medical advice — always consult your obstetrician regarding delivery decisions."}
            </p>
          </div>
        </div>
      </Section>

      {/* ── Section 7: Actionable Advice ── */}
      <Section
        emoji="✅"
        title={isThai ? "สิ่งที่พ่อแม่ทำได้" : "What Parents Can Do"}
        subtitle={isThai ? "คำแนะนำที่ปฏิบัติได้จริง" : "Practical actionable advice"}
      >
        <div className="space-y-2">
          {adviceItems.map((item, i) => (
            <div key={i} className="flex gap-3 rounded-xl bg-white p-3">
              <span className="text-[18px]">{item.emoji}</span>
              <p className="flex-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? item.text : item.textEn}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 8: FAQ Accordion ── */}
      <Section
        emoji="❓"
        title={isThai ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
        subtitle={isThai ? "เกี่ยวกับวันเกิดและการศึกษา" : "About birth dates and education"}
      >
        <div className="space-y-1.5">
          {faqData.map((faq, i) => (
            <button
              key={i}
              className="w-full rounded-xl bg-white p-3 text-left transition-all active:scale-[0.98]"
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex-1 text-[12px] font-semibold">{isThai ? faq.q : faq.qEn}</span>
                <span className={`text-[10px] transition-transform ${expandedFaq === i ? "rotate-180" : ""}`}>▼</span>
              </div>
              {expandedFaq === i && (
                <p className="mt-2 border-t border-[var(--color-border)] pt-2 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                  {isThai ? faq.a : faq.aEn}
                </p>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* ── Data Disclaimer ── */}
      <div className="rounded-2xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "⚠️ ข้อมูล cutoff dates และนโยบายการรับสมัครอาจเปลี่ยนแปลงได้ — กรุณาตรวจสอบกับสถานศึกษาโดยตรงก่อนตัดสินใจ ข้อมูลในแอปนี้เป็นข้อมูลประมาณการและอาจมีข้อผิดพลาด"
            : "⚠️ Cutoff dates and admission policies may change — please verify with educational institutions directly before making decisions. Data in this app is approximate and may contain errors."}
        </p>
      </div>

      {/* ── CTA Links ── */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { href: "/compare", emoji: "📊", label: isThai ? "เปรียบเทียบโรงเรียน" : "Compare Schools" },
          { href: "/calendar", emoji: "📅", label: isThai ? "ปฏิทินรับสมัคร" : "Admission Calendar" },
          { href: "/transfer", emoji: "🔄", label: isThai ? "ย้ายหลักสูตร" : "Transfer Guide" },
          { href: "/path", emoji: "🛤️", label: isThai ? "เส้นทางการเรียน" : "Learning Pathways" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 rounded-xl bg-[var(--color-surface)] p-3 transition-all hover:bg-[var(--color-accent)]/5 active:scale-[0.97]"
          >
            <span className="text-[16px]">{link.emoji}</span>
            <span className="text-[12px] font-medium">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* ── Back Link ── */}
      <div className="pt-2 text-center">
        <Link href="/" className="text-[12px] text-[var(--color-accent)]">
          ← {isThai ? "กลับหน้าหลัก" : "Back to home"}
        </Link>
      </div>

      {/* ── JSON-LD: Article ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "วันเกิดลูกกำหนดอนาคตการศึกษา — Birth Date Effects on School Admission",
            description: "เปรียบเทียบ cutoff dates 7 หลักสูตร, Relative Age Effect, การย้ายหลักสูตร, สอบเข้าแพทย์ตามเดือนเกิด",
            author: { "@type": "Person", name: "Dr. Waleerat", alternateName: "หมอกวาง" },
            publisher: { "@type": "Organization", name: "SchoolFinder by Dr. Waleerat", url: "https://schoolfinder.app" },
            datePublished: "2026-03-05",
            dateModified: "2026-03-05",
            inLanguage: ["th", "en"],
            url: "https://schoolfinder.app/birth-date",
            mainEntityOfPage: "https://schoolfinder.app/birth-date",
            about: [
              { "@type": "Thing", name: "Relative Age Effect" },
              { "@type": "Thing", name: "School Admission Cutoff Dates" },
              { "@type": "Thing", name: "Curriculum Transfer" },
              { "@type": "Thing", name: "Medical School Admission" },
            ],
            citation: [
              "Bedard, K., & Dhuey, E. (2006). The Persistence of Early Childhood Maturity: International Evidence of Long-Run Age Effects. Quarterly Journal of Economics, 121(4), 1437-1472.",
              "Crawford, C., Dearden, L., & Meghir, C. (2010). When You Are Born Matters: The Impact of Date of Birth on Educational Outcomes in England. IFS Working Paper W10/06.",
              "Cobley, S. et al. (2021). The Relative Age Effects in Educational Development: A Systematic Review. Frontiers in Psychology / PMC 8431425.",
              "Navarro, J. J., Garcia-Rubio, J., & Olivares, P. R. (2015). The Relative Age Effect and Its Influence on Academic Performance. PLOS ONE, 10(10): e0141895.",
              "Buckles, K. S., & Hungerman, D. M. (2013). Season of Birth and Later Outcomes: Old Questions, New Answers. Review of Economics and Statistics, 95(3), 711-724.",
            ],
          }),
        }}
      />

      {/* ── JSON-LD: FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

/* ── Helper: Section Component ── */
function Section({
  emoji,
  title,
  subtitle,
  children,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-up rounded-2xl bg-[var(--color-surface)] p-[18px]">
      <div className="mb-0.5 text-[18px]">{emoji}</div>
      <h2 className="text-[15px] font-bold leading-tight">{title}</h2>
      <p className="mt-0.5 mb-3 text-[11px] text-[var(--color-text-secondary)]">{subtitle}</p>
      {children}
    </div>
  );
}
