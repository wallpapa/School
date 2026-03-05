"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── FAQ data ── */
const faqs = [
  {
    q_th: "ทำไมปฐมวัยสำคัญที่สุด?",
    q_en: "Why is early childhood the most important period?",
    a_th: "สมองเด็ก 0-5 ปีสร้างเชื่อมต่อซินแนปส์มากกว่า 1 ล้านจุดต่อวินาที (Harvard Center on the Developing Child) ซึ่งเป็นช่วงที่สมองมีความยืดหยุ่น (neuroplasticity) สูงที่สุดในชีวิต การลงทุนในช่วงนี้จึงให้ผลตอบแทนสูงกว่าช่วงอื่น ตามหลัก Heckman Curve",
    a_en: "The brain creates over 1 million synaptic connections per second during ages 0-5 (Harvard Center on the Developing Child). This is the period of highest neuroplasticity, making investments during this window yield the greatest returns, as demonstrated by the Heckman Curve.",
  },
  {
    q_th: "Perry Preschool คืออะไร?",
    q_en: "What is the Perry Preschool Program?",
    a_th: "Perry Preschool Project เป็นการทดลองแบบ Randomized Controlled Trial ที่ Ypsilanti, Michigan สหรัฐอเมริกา เริ่มปี 1962 กับเด็กอายุ 3-4 ปี จำนวน 123 คน ติดตามผลนานกว่า 40 ปี พบว่ากลุ่มที่ได้รับโปรแกรมมี ROI 7-10% ต่อปี มีรายได้สูงกว่า อาชญากรรมน้อยกว่า และจบการศึกษาสูงกว่า",
    a_en: "The Perry Preschool Project was a Randomized Controlled Trial in Ypsilanti, Michigan, USA, starting in 1962 with 123 children aged 3-4. Tracked for over 40 years, the treatment group showed 7-10% annual ROI, higher earnings, lower crime rates, and higher educational attainment.",
  },
  {
    q_th: "ROI 7-10% หมายความว่าอย่างไร?",
    q_en: "What does 7-10% ROI mean?",
    a_th: "ROI 7-10% ต่อปี หมายถึงทุก 1 ดอลลาร์ที่ลงทุนในโปรแกรมปฐมวัยคุณภาพ จะได้ผลตอบแทนกลับมาประมาณ 7-10 เซ็นต์ต่อปี คิดรวมตลอดอายุขัยจะได้คืนมากถึง 7-12 เท่า ซึ่งรวมถึงรายได้ที่สูงขึ้น สุขภาพดีขึ้น และค่าใช้จ่ายทางสังคมที่ลดลง เทียบได้กับผลตอบแทนตลาดหุ้น S&P 500",
    a_en: "A 7-10% annual ROI means every $1 invested in quality early childhood programs yields about 7-10 cents per year in returns. Over a lifetime, this compounds to 7-12x the initial investment, including higher earnings, better health outcomes, and reduced social costs — comparable to S&P 500 stock market returns.",
  },
  {
    q_th: "ต้องส่งลูกเรียนแพงไหม?",
    q_en: "Do I need to send my child to an expensive school?",
    a_th: "ไม่จำเป็น! งานวิจัย Perry Preschool และ ABC/CARE ใช้โปรแกรมที่เน้นคุณภาพการสอนและปฏิสัมพันธ์ ไม่ใช่สถานที่หรูหรา สิ่งสำคัญคือ: อัตราส่วนครูต่อเด็กต่ำ (1:5-1:8), ครูที่ได้รับการฝึกอบรม, หลักสูตรที่ส่งเสริม EF, และการมีส่วนร่วมของผู้ปกครอง",
    a_en: "Not necessarily! Perry Preschool and ABC/CARE used programs focused on teaching quality and interaction, not luxurious facilities. What matters: low teacher-child ratios (1:5-1:8), trained teachers, EF-promoting curricula, and parental involvement.",
  },
  {
    q_th: "อายุเท่าไหร่ควรเริ่มเรียน?",
    q_en: "What age should my child start school?",
    a_th: "งานวิจัย ABC/CARE เริ่มตั้งแต่อายุ 6 สัปดาห์ และ Perry Preschool เริ่มที่ 3 ปี ทั้งสองโปรแกรมได้ผลดี แต่ Heckman Curve แสดงว่ายิ่งเริ่มเร็วยิ่งดี สำหรับบริบทไทย เนิร์สเซอรี่ตั้งแต่ 1.5-2 ปี หรืออนุบาลตั้งแต่ 3 ปี เป็นช่วงเวลาที่เหมาะสม",
    a_en: "ABC/CARE started at 6 weeks old and Perry Preschool at age 3 — both showed significant results. The Heckman Curve demonstrates earlier is better. In the Thai context, nursery from 1.5-2 years or kindergarten from 3 years are appropriate starting points.",
  },
  {
    q_th: "เลือกเนิร์สเซอรี่ดูอะไร?",
    q_en: "What should I look for in a nursery?",
    a_th: "จากงานวิจัยที่รวบรวม ปัจจัยสำคัญ 6 ข้อ: 1) อัตราส่วนครูต่อเด็ก 1:5 หรือต่ำกว่า 2) ครูมีวุฒิปฐมวัย/ผ่านการอบรม 3) หลักสูตรเน้น play-based learning 4) สิ่งแวดล้อมปลอดภัยและกระตุ้นพัฒนาการ 5) การสื่อสารกับผู้ปกครองสม่ำเสมอ 6) มีการประเมินพัฒนาการเด็กรายบุคคล",
    a_en: "Based on the compiled research, 6 key factors: 1) Teacher-child ratio of 1:5 or lower 2) Teachers with ECE qualifications/training 3) Play-based learning curriculum 4) Safe and stimulating environment 5) Regular parent communication 6) Individual developmental assessment for each child",
  },
];

/* ── ROI comparison data ── */
const roiData = [
  { label_th: "Perry Preschool", label_en: "Perry Preschool", pct: 10, color: "var(--color-success)" },
  { label_th: "S&P 500 (เฉลี่ย)", label_en: "S&P 500 (avg)", pct: 7, color: "var(--color-accent)" },
  { label_th: "อสังหาริมทรัพย์", label_en: "Real Estate", pct: 4, color: "var(--color-warning)" },
  { label_th: "พันธบัตรรัฐบาล", label_en: "Govt Bonds", pct: 2, color: "var(--color-text-secondary)" },
];

export default function EarlyChildhoodPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-success)]/10 text-3xl">
          🌱
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "ลงทุนปฐมวัย — ผลตอบแทนสูงที่สุดในชีวิตลูก"
            : "Early Childhood Investment: The Highest ROI in Your Child's Life"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "งานวิจัยระดับโลกกว่า 40 ปี พิสูจน์แล้วว่า การลงทุนในเด็กปฐมวัยให้ผลตอบแทน 7-10% ต่อปี สูงกว่าตลาดหุ้นและอสังหาริมทรัพย์"
            : "Over 40 years of world-class research proves that investing in early childhood yields 7-10% annual returns — higher than the stock market and real estate."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Heckman (2010)</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Campbell (2014)</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Schweinhart (2005)</span>
        </div>
      </section>

      {/* ── Perry Preschool Section ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            🏫
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Perry Preschool Project" : "The Perry Preschool Project"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "การทดลองแบบ Randomized Controlled Trial (RCT) ที่ทรงอิทธิพลที่สุดในวงการการศึกษาปฐมวัย เริ่มในปี 1962 ที่เมือง Ypsilanti, Michigan สหรัฐอเมริกา"
              : "The most influential Randomized Controlled Trial (RCT) in early childhood education, launched in 1962 in Ypsilanti, Michigan, USA."}
          </p>
          {/* Key stats grid */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { val: "123", lab: isThai ? "เด็กในการทดลอง" : "Children studied" },
              { val: "40+", lab: isThai ? "ปีที่ติดตามผล" : "Years tracked" },
              { val: "7-10%", lab: isThai ? "ROI ต่อปี" : "Annual ROI" },
            ].map((s) => (
              <div key={s.lab} className="rounded-xl bg-[var(--color-bg)] py-3 text-center">
                <div className="text-[18px] font-extrabold text-[var(--color-accent)]">{s.val}</div>
                <div className="text-[10px] font-medium text-[var(--color-text-secondary)]">{s.lab}</div>
              </div>
            ))}
          </div>
          {/* Findings */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {isThai ? "ผลลัพธ์ที่อายุ 40 ปี (Schweinhart, 2005)" : "Outcomes at Age 40 (Schweinhart, 2005)"}
            </h3>
            {[
              { icon: "💰", th: "รายได้เฉลี่ยสูงกว่ากลุ่มควบคุม 36%", en: "36% higher average earnings vs control group" },
              { icon: "🎓", th: "จบ ม.ปลาย 77% (กลุ่มควบคุม 60%)", en: "77% high school graduation (vs 60% control)" },
              { icon: "🏠", th: "เป็นเจ้าของบ้าน 37% (กลุ่มควบคุม 28%)", en: "37% homeownership (vs 28% control)" },
              { icon: "⚖️", th: "ถูกจับกุม 5 ครั้งขึ้นไปน้อยกว่า 50%", en: "50% fewer arrests (5+ times)" },
            ].map((item) => (
              <div key={item.en} className="flex items-start gap-2.5 rounded-xl bg-[var(--color-bg)] px-3 py-2.5">
                <span className="text-sm">{item.icon}</span>
                <span className="text-[12px] leading-relaxed text-[var(--color-text)]">
                  {isThai ? item.th : item.en}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] italic text-[var(--color-text-secondary)]">
            {isThai
              ? "อ้างอิง: Schweinhart, L. J. et al. (2005). Lifetime Effects: The HighScope Perry Preschool Study Through Age 40. HighScope Press."
              : "Ref: Schweinhart, L. J. et al. (2005). Lifetime Effects: The HighScope Perry Preschool Study Through Age 40. HighScope Press."}
          </p>
        </div>
      </section>

      {/* ── ROI Comparison Bar Chart ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-success)]/15 text-sm">
            📊
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "เปรียบเทียบผลตอบแทนการลงทุน" : "Investment ROI Comparison"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="space-y-4">
            {roiData.map((item) => (
              <div key={item.label_en}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {isThai ? item.label_th : item.label_en}
                  </span>
                  <span className="text-[13px] font-extrabold" style={{ color: item.color }}>
                    {item.pct}%
                  </span>
                </div>
                <div className="h-5 w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(item.pct / 12) * 100}%`,
                      backgroundColor: item.color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-[var(--color-text-secondary)]">
            {isThai
              ? "* ผลตอบแทน Perry Preschool 7-10% ต่อปี คำนวณโดย Heckman et al. (2010) รวมผลตอบแทนทั้งส่วนบุคคลและสังคม"
              : "* Perry Preschool 7-10% annual return calculated by Heckman et al. (2010), including both private and social returns."}
          </p>
        </div>
      </section>

      {/* ── ABC/CARE Program ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-warning)]/15 text-sm">
            🧒
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "โปรแกรม ABC/CARE" : "The ABC/CARE Program"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "Abecedarian Project (ABC) และ Carolina Approach to Responsive Education (CARE) เป็นโปรแกรมปฐมวัยที่เริ่มตั้งแต่ทารกอายุ 6 สัปดาห์ ติดตามผลจนถึงอายุ 35 ปี ตีพิมพ์ในวารสาร Science (Campbell et al., 2014)"
              : "The Abecedarian Project (ABC) and Carolina Approach to Responsive Education (CARE) began with infants at 6 weeks old, tracked to age 35, published in Science (Campbell et al., 2014)."}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "❤️", th: "สุขภาพหัวใจดีกว่า", en: "Better cardiovascular health" },
              { icon: "🧠", th: "IQ สูงกว่า 5 จุดที่อายุ 21", en: "5-point higher IQ at age 21" },
              { icon: "📚", th: "เรียนมหาวิทยาลัย 4 เท่า", en: "4x more likely to attend college" },
              { icon: "💪", th: "โรคเมตาบอลิกน้อยกว่า", en: "Lower metabolic disease risk" },
            ].map((item) => (
              <div
                key={item.en}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-[var(--color-bg)] p-3 text-center"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[11px] font-medium leading-snug text-[var(--color-text)]">
                  {isThai ? item.th : item.en}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] italic text-[var(--color-text-secondary)]">
            {isThai
              ? "อ้างอิง: Campbell, F. et al. (2014). Early childhood investments substantially boost adult health. Science, 343(6178), 1478-1485."
              : "Ref: Campbell, F. et al. (2014). Early childhood investments substantially boost adult health. Science, 343(6178), 1478-1485."}
          </p>
        </div>
      </section>

      {/* ── Heckman Curve ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            📉
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Heckman Curve — ยิ่งเริ่มเร็วยิ่งคุ้ม" : "The Heckman Curve — Earlier is Better"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "James Heckman นักเศรษฐศาสตร์รางวัลโนเบล ค้นพบว่าผลตอบแทนจากการลงทุนในคนลดลงตามอายุ โดยช่วงปฐมวัย (0-5 ปี) ให้ผลตอบแทนสูงที่สุด"
              : "Nobel laureate economist James Heckman discovered that returns on human investment diminish with age, with early childhood (0-5 years) yielding the highest returns."}
          </p>
          {/* CSS Gradient Heckman Curve visualization */}
          <div className="relative mb-4 overflow-hidden rounded-xl bg-[var(--color-bg)] p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {isThai ? "ผลตอบแทนต่อการลงทุน (ROI)" : "Return on Investment (ROI)"}
            </div>
            <div className="relative h-32">
              {/* Curve approximation using CSS */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-3xl"
                style={{
                  height: "100%",
                  background: "linear-gradient(to right, var(--color-success) 0%, var(--color-accent) 25%, var(--color-warning) 50%, var(--color-error) 75%, var(--color-text-secondary) 100%)",
                  clipPath: "polygon(0% 5%, 5% 8%, 10% 12%, 15% 18%, 20% 25%, 30% 40%, 40% 55%, 50% 67%, 60% 76%, 70% 83%, 80% 88%, 90% 93%, 100% 96%, 100% 100%, 0% 100%)",
                  opacity: 0.2,
                }}
              />
              {/* Data points */}
              {[
                { left: "5%", bottom: "92%", label: isThai ? "0-3 ปี" : "0-3 yrs" },
                { left: "20%", bottom: "72%", label: isThai ? "3-5 ปี" : "3-5 yrs" },
                { left: "40%", bottom: "42%", label: isThai ? "6-12 ปี" : "6-12 yrs" },
                { left: "65%", bottom: "22%", label: isThai ? "มัธยม" : "Secondary" },
                { left: "85%", bottom: "10%", label: isThai ? "มหา'ลัย" : "University" },
              ].map((pt) => (
                <div
                  key={pt.label}
                  className="absolute flex flex-col items-center"
                  style={{ left: pt.left, bottom: pt.bottom }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-sm" />
                  <span className="mt-1 whitespace-nowrap text-[9px] font-bold text-[var(--color-text-secondary)]">
                    {pt.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] text-[var(--color-text-secondary)]">
              <span>{isThai ? "← ผลตอบแทนสูง" : "← High ROI"}</span>
              <span>{isThai ? "ผลตอบแทนต่ำ →" : "Low ROI →"}</span>
            </div>
          </div>
          <p className="text-[11px] italic text-[var(--color-text-secondary)]">
            {isThai
              ? "อ้างอิง: Heckman, J. J. et al. (2010). The Rate of Return to the HighScope Perry Preschool Program. Journal of Public Economics, 94(1-2), 114-128."
              : "Ref: Heckman, J. J. et al. (2010). The Rate of Return to the HighScope Perry Preschool Program. Journal of Public Economics, 94(1-2), 114-128."}
          </p>
        </div>
      </section>

      {/* ── Quality Markers for Thai Programs ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-success)]/15 text-sm">
            ✅
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "เกณฑ์คุณภาพโปรแกรมปฐมวัยในไทย" : "Quality Markers for Thai ECE Programs"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="space-y-3">
            {[
              {
                th: "อัตราส่วนครูต่อเด็ก",
                en: "Teacher-child ratio",
                detail_th: "เด็กเล็ก 1:3-1:5 / อนุบาล 1:8-1:10 (มาตรฐาน NAEYC)",
                detail_en: "Infants 1:3-1:5 / Preschool 1:8-1:10 (NAEYC standards)",
                check: true,
              },
              {
                th: "หลักสูตร Play-based",
                en: "Play-based curriculum",
                detail_th: "การเรียนรู้ผ่านการเล่นอย่างมีจุดมุ่งหมาย ไม่ใช่ท่องจำ",
                detail_en: "Purposeful learning through play, not rote memorization",
                check: true,
              },
              {
                th: "การส่งเสริม Executive Function",
                en: "Executive Function promotion",
                detail_th: "กิจกรรมที่ฝึก working memory, inhibitory control, cognitive flexibility",
                detail_en: "Activities training working memory, inhibitory control, cognitive flexibility",
                check: true,
              },
              {
                th: "การมีส่วนร่วมของผู้ปกครอง",
                en: "Parent involvement",
                detail_th: "โปรแกรม Perry & ABC/CARE ทั้งสองเน้นให้ผู้ปกครองมีส่วนร่วม",
                detail_en: "Both Perry & ABC/CARE emphasized strong parent involvement",
                check: true,
              },
              {
                th: "การประเมินพัฒนาการรายบุคคล",
                en: "Individual assessment",
                detail_th: "ไม่ใช่แค่ประเมินเหมือนกันทุกคน แต่ดูพัฒนาการของแต่ละเด็ก",
                detail_en: "Not one-size-fits-all, but tracking each child's developmental progress",
                check: true,
              },
            ].map((item) => (
              <div key={item.en} className="flex gap-3 rounded-xl bg-[var(--color-bg)] p-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/20">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 10l3 3 7-7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[var(--color-text)]">
                    {isThai ? item.th : item.en}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                    {isThai ? item.detail_th : item.detail_en}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nursery Selection Tips ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            🔍
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "วิธีเลือกเนิร์สเซอรี่จากหลักวิจัย" : "Research-Based Nursery Selection"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { step: "1", th: "สังเกตปฏิสัมพันธ์ครู-เด็ก", en: "Observe teacher-child interactions", desc_th: "ครูตอบสนองต่อเด็กอย่างอบอุ่นหรือไม่?", desc_en: "Does the teacher respond warmly to children?" },
              { step: "2", th: "ถามเรื่องหลักสูตร", en: "Ask about curriculum", desc_th: "เน้น play-based หรือนั่งเรียน?", desc_en: "Play-based or desk-based learning?" },
              { step: "3", th: "ดูอัตราส่วนครูต่อเด็ก", en: "Check teacher-child ratio", desc_th: "ยิ่งต่ำยิ่งดี โดยเฉพาะเด็กเล็ก", desc_en: "Lower is better, especially for toddlers" },
              { step: "4", th: "สอบถามการสื่อสารกับผู้ปกครอง", en: "Ask about parent communication", desc_th: "มีรายงานพัฒนาการสม่ำเสมอไหม?", desc_en: "Regular developmental reports?" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 rounded-xl bg-[var(--color-bg)] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[11px] font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <div className="text-[12px] font-bold text-[var(--color-text)]">
                    {isThai ? item.th : item.en}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                    {isThai ? item.desc_th : item.desc_en}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
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
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="pr-4 text-[13px] font-bold leading-snug text-[var(--color-text)]">
                    {isThai ? faq.q_th : faq.q_en}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={`shrink-0 text-[var(--color-text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-[var(--color-border)] px-4 pb-4 pt-3">
                    <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                      {isThai ? faq.a_th : faq.a_en}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="mb-8">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {isThai ? "อ่านวิจัยเพิ่มเติม" : "Related Research"}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/research/attachment", icon: "🤝", th: "ทฤษฎีความผูกพัน", en: "Attachment Theory" },
            { href: "/research/spacing-effect", icon: "⏱️", th: "Spacing Effect", en: "Spacing Effect" },
            { href: "/research/authoritative-parenting", icon: "👨‍👩‍👧", th: "เลี้ยงลูกแบบ Authoritative", en: "Authoritative Parenting" },
            { href: "/find", icon: "🔍", th: "ค้นหาโรงเรียน", en: "Find Schools" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center no-underline transition-all active:scale-[0.97] hover:border-[var(--color-text-secondary)]/30"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[12px] font-bold text-[var(--color-text)]">
                {isThai ? link.th : link.en}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Back to Research ── */}
      <Link
        href="/research"
        className="mb-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {isThai ? "← กลับหน้าวิจัยทั้งหมด" : "← Back to All Research"}
      </Link>

      {/* ── JSON-LD: Article ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "ลงทุนปฐมวัย — ผลตอบแทนสูงที่สุดในชีวิตลูก",
            alternativeHeadline: "Early Childhood Investment: The Highest ROI in Your Child's Life",
            description:
              "Perry Preschool ROI 7-10% ต่อปี, Heckman Curve, ABC/CARE program — งานวิจัย 40+ ปีพิสูจน์ว่าการลงทุนปฐมวัยคุ้มค่าที่สุด",
            url: "https://schoolfinder.app/research/early-childhood",
            datePublished: "2025-01-15",
            dateModified: "2026-03-05",
            author: {
              "@type": "Person",
              name: "Dr. Waleerat",
              alternateName: "หมอกวาง",
              jobTitle: "Pediatrician & Education Researcher",
              url: "https://instagram.com/doctorwaleerat",
            },
            publisher: {
              "@type": "Organization",
              name: "SchoolFinder by Dr. Waleerat",
              url: "https://schoolfinder.app",
            },
            inLanguage: ["th", "en"],
            about: [
              { "@type": "Thing", name: "Early Childhood Education" },
              { "@type": "Thing", name: "Perry Preschool Project" },
              { "@type": "Thing", name: "Heckman Curve" },
              { "@type": "Thing", name: "ABC/CARE Program" },
            ],
            citation: [
              "Heckman, J. J. et al. (2010). The Rate of Return to the HighScope Perry Preschool Program. Journal of Public Economics, 94(1-2), 114-128.",
              "Campbell, F. et al. (2014). Early childhood investments substantially boost adult health. Science, 343(6178), 1478-1485.",
              "Schweinhart, L. J. et al. (2005). Lifetime Effects: The HighScope Perry Preschool Study Through Age 40. HighScope Press.",
            ],
            isAccessibleForFree: true,
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
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q_th,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a_th,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
