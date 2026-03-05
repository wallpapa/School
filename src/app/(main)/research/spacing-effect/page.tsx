"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── FAQ data ── */
const faqs = [
  {
    q_th: "Spacing effect คืออะไร?",
    q_en: "What is the spacing effect?",
    a_th: "Spacing effect คือปรากฏการณ์ที่การทบทวนแบบเว้นระยะ (distributed practice) ช่วยให้จำข้อมูลได้นานกว่าการอ่านรวดเดียว (massed practice) ค้นพบโดย Hermann Ebbinghaus ตั้งแต่ปี 1885 และได้รับการยืนยันจาก meta-analysis ของ Cepeda et al. (2006) ที่รวบรวม 254 งานวิจัย",
    a_en: "The spacing effect is the phenomenon where distributed practice (reviewing at intervals) leads to longer retention than massed practice (cramming). Discovered by Hermann Ebbinghaus in 1885 and confirmed by Cepeda et al. (2006) meta-analysis of 254 studies.",
  },
  {
    q_th: "ทำไมอ่านคืนก่อนสอบไม่ได้ผล?",
    q_en: "Why doesn't cramming the night before work?",
    a_th: "การอ่านรวดเดียว (cramming/massed practice) สร้างความรู้สึกว่า 'เข้าใจแล้ว' แต่เป็นเพียง illusion of competence สมองยังไม่ได้ผ่านกระบวนการ consolidation อย่างเต็มที่ งานวิจัยแสดงว่าการทบทวนเว้นระยะ 3 ครั้ง ให้ผลลัพธ์ดีกว่าการอ่าน 3 ชั่วโมงรวดเดียว",
    a_en: "Cramming (massed practice) creates an 'illusion of competence' — you feel like you understand, but your brain hasn't fully consolidated the information. Research shows 3 spaced review sessions outperform 3 hours of continuous study.",
  },
  {
    q_th: "ระยะเวลาทบทวนที่ดีที่สุด?",
    q_en: "What is the optimal review interval?",
    a_th: "Cepeda et al. (2008) พบว่าระยะห่างที่เหมาะสมขึ้นอยู่กับระยะเวลาที่ต้องการจำ: ถ้าต้องจำ 1 สัปดาห์ → ทบทวนทุก 1-2 วัน, จำ 1 เดือน → ทบทวนทุก 1 สัปดาห์, จำ 1 ปี → ทบทวนทุก 3-4 สัปดาห์ อัตราส่วนคร่าว ๆ คือ 10-20% ของระยะเวลาที่ต้องการจำ",
    a_en: "Cepeda et al. (2008) found optimal intervals depend on how long you need to remember: 1 week retention → review every 1-2 days, 1 month → review weekly, 1 year → review every 3-4 weeks. The rough ratio is 10-20% of the desired retention period.",
  },
  {
    q_th: "Interleaving vs Spacing?",
    q_en: "Interleaving vs Spacing — what's the difference?",
    a_th: "Spacing คือการเว้นระยะระหว่างการทบทวนเรื่องเดียวกัน (เช่น ทบทวนคณิตวันจันทร์ แล้วทบทวนอีกทีวันพฤหัสฯ) ส่วน Interleaving คือการสลับหัวข้อในการทบทวนแต่ละครั้ง (เช่น ทำโจทย์บวก ลบ คูณ สลับกัน แทนที่จะทำบวกทั้งหมดก่อน) ทั้งสองเทคนิคเสริมกันและใช้ร่วมกันได้ผลดีที่สุด",
    a_en: "Spacing is leaving time gaps between reviewing the same topic (e.g., review math Monday, then again Thursday). Interleaving is mixing different topics within each study session (e.g., alternating addition, subtraction, multiplication problems). Both techniques complement each other and work best together.",
  },
  {
    q_th: "ลูกอายุเท่าไหร่ถึงใช้ได้?",
    q_en: "What age can children start using this?",
    a_th: "Spacing effect ได้ผลกับทุกวัย แม้แต่เด็กทารก 3-6 เดือนก็แสดง spacing effect ในงานวิจัยของ Rovee-Collier (1995) สำหรับเด็กอนุบาล ผู้ปกครองสามารถเริ่มใช้โดยทบทวนสิ่งที่เรียนก่อนนอน และทบทวนอีกครั้งในวันถัดไป สำหรับเด็กประถม สามารถใช้ flashcard หรือแอป spaced repetition ได้",
    a_en: "The spacing effect works at all ages — even 3-6 month old infants show it (Rovee-Collier, 1995). Kindergarteners can start with bedtime review of what they learned, then review the next day. Primary school children can use flashcards or spaced repetition apps.",
  },
  {
    q_th: "โรงเรียนไหนใช้ spacing?",
    q_en: "Which schools use spacing?",
    a_th: "โรงเรียนที่ใช้หลักสูตร Montessori, IB (International Baccalaureate), และ Singapore Math มักมีองค์ประกอบของ spacing และ interleaving ในการออกแบบหลักสูตร โรงเรียนที่เน้น mastery-based learning ก็มักใช้หลัก spiral curriculum ซึ่งเป็นรูปแบบหนึ่งของ spacing ใช้เครื่องมือ SchoolFinder เพื่อค้นหาโรงเรียนที่ใช้แนวทางเหล่านี้",
    a_en: "Schools using Montessori, IB (International Baccalaureate), and Singapore Math curricula often incorporate spacing and interleaving. Schools with mastery-based learning typically use spiral curricula — a form of spacing. Use SchoolFinder to search for schools using these approaches.",
  },
];

/* ── Dunlosky technique ranking ── */
const dunloskyRanking = [
  { rank: 1, tech_th: "Practice Testing", tech_en: "Practice Testing", util: "high", color: "var(--color-success)" },
  { rank: 2, tech_th: "Distributed Practice (Spacing)", tech_en: "Distributed Practice (Spacing)", util: "high", color: "var(--color-success)" },
  { rank: 3, tech_th: "Interleaved Practice", tech_en: "Interleaved Practice", util: "moderate", color: "var(--color-warning)" },
  { rank: 4, tech_th: "Elaborative Interrogation", tech_en: "Elaborative Interrogation", util: "moderate", color: "var(--color-warning)" },
  { rank: 5, tech_th: "Self-Explanation", tech_en: "Self-Explanation", util: "moderate", color: "var(--color-warning)" },
  { rank: 6, tech_th: "Highlighting / Underlining", tech_en: "Highlighting / Underlining", util: "low", color: "var(--color-error)" },
  { rank: 7, tech_th: "Rereading", tech_en: "Rereading", util: "low", color: "var(--color-error)" },
  { rank: 8, tech_th: "Summarization", tech_en: "Summarization", util: "low", color: "var(--color-error)" },
];

export default function SpacingEffectPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          ⏱️
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "Spacing Effect — ทบทวนเว้นระยะ เรียนน้อยแต่จำนาน"
            : "The Spacing Effect: Learn Less, Remember More"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "วิทยาศาสตร์ 140 ปี ตั้งแต่ Ebbinghaus (1885) ถึง meta-analysis 254 งานวิจัย พิสูจน์แล้วว่าการทบทวนเว้นระยะช่วยจำได้ดีกว่าอ่านรวดเดียวถึง 2 เท่า"
            : "140 years of science from Ebbinghaus (1885) to a 254-study meta-analysis proves that spaced review doubles retention compared to cramming."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Ebbinghaus (1885)</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Cepeda (2006)</span>
          <span className="rounded-full bg-[var(--color-surface)] px-3 py-1">Dunlosky (2013)</span>
        </div>
      </section>

      {/* ── Forgetting Curve ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-error)]/15 text-sm">
            📉
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Forgetting Curve — เส้นโค้งแห่งการลืม" : "The Forgetting Curve"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "Hermann Ebbinghaus (1885) ค้นพบว่าความจำเสื่อมลงอย่างรวดเร็วหลังจากเรียน โดยลืม 50% ภายใน 1 ชั่วโมง และ 70% ภายใน 24 ชั่วโมง หากไม่มีการทบทวน"
              : "Hermann Ebbinghaus (1885) discovered that memory decays rapidly after learning — 50% forgotten within 1 hour and 70% within 24 hours without review."}
          </p>

          {/* CSS Forgetting Curve visualization */}
          <div className="relative mb-4 overflow-hidden rounded-xl bg-[var(--color-bg)] p-4">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {isThai ? "% ที่จำได้" : "% Retained"}
            </div>
            <div className="relative h-36">
              {/* Without review curve (red/fading) */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: "100%",
                  background: "var(--color-error)",
                  clipPath: "polygon(0% 0%, 5% 25%, 10% 40%, 15% 50%, 25% 60%, 40% 68%, 60% 75%, 80% 80%, 100% 84%, 100% 100%, 0% 100%)",
                  opacity: 0.12,
                }}
              />
              {/* With spacing curve (green, retains more) */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: "100%",
                  background: "var(--color-success)",
                  clipPath: "polygon(0% 0%, 10% 8%, 20% 14%, 25% 10%, 30% 6%, 35% 12%, 40% 8%, 50% 15%, 55% 10%, 65% 16%, 70% 12%, 80% 18%, 90% 16%, 100% 20%, 100% 100%, 0% 100%)",
                  opacity: 0.15,
                }}
              />
              {/* Time labels */}
              {[
                { left: "0%", label: isThai ? "เรียน" : "Learn", top: true },
                { left: "10%", label: "20 min", top: false },
                { left: "25%", label: "1 hr", top: false },
                { left: "50%", label: "1 day", top: false },
                { left: "75%", label: "1 wk", top: false },
                { left: "95%", label: "1 mo", top: false },
              ].map((pt) => (
                <div
                  key={pt.label}
                  className="absolute bottom-0 flex flex-col items-center"
                  style={{ left: pt.left }}
                >
                  <div className="h-full w-px bg-[var(--color-border)] opacity-30" style={{ height: "100%" }} />
                  <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-[var(--color-text-secondary)]">
                    {pt.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="mt-3 flex items-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-error)", opacity: 0.5 }} />
                <span className="text-[var(--color-text-secondary)]">{isThai ? "ไม่ทบทวน" : "No review"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-success)", opacity: 0.5 }} />
                <span className="text-[var(--color-text-secondary)]">{isThai ? "ทบทวนเว้นระยะ" : "Spaced review"}</span>
              </div>
            </div>
          </div>

          {/* Decay stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { time_th: "20 นาที", time_en: "20 min", pct: "42%", desc_th: "หายไป", desc_en: "forgotten" },
              { time_th: "1 ชั่วโมง", time_en: "1 hour", pct: "56%", desc_th: "หายไป", desc_en: "forgotten" },
              { time_th: "24 ชั่วโมง", time_en: "24 hours", pct: "67%", desc_th: "หายไป", desc_en: "forgotten" },
            ].map((d) => (
              <div key={d.pct} className="rounded-xl bg-[var(--color-bg)] py-2.5 text-center">
                <div className="text-[10px] font-medium text-[var(--color-text-secondary)]">
                  {isThai ? d.time_th : d.time_en}
                </div>
                <div className="text-[18px] font-extrabold text-[var(--color-error)]">{d.pct}</div>
                <div className="text-[9px] text-[var(--color-text-secondary)]">{isThai ? d.desc_th : d.desc_en}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] italic text-[var(--color-text-secondary)]">
            {isThai
              ? "อ้างอิง: Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology."
              : "Ref: Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology."}
          </p>
        </div>
      </section>

      {/* ── Spacing vs Massing ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            ⚡
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Spacing vs Massing — เว้นระยะ vs อ่านรวด" : "Spacing vs Massing"}
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {/* Massing */}
          <div className="rounded-2xl border border-[var(--color-error)]/30 bg-[var(--color-surface)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-error)]/15 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-error)]">
                {isThai ? "อ่านรวด (Massing)" : "Massing (Cramming)"}
              </span>
            </div>
            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 flex-1 rounded"
                  style={{ backgroundColor: "var(--color-error)", opacity: 0.15 + i * 0.05 }}
                />
              ))}
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              {isThai
                ? "อ่าน 5 ชั่วโมงรวดวันเดียว — รู้สึกเข้าใจแต่ลืมเร็ว (illusion of competence)"
                : "5 hours straight in one day — feels effective but forgotten quickly (illusion of competence)"}
            </p>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-[var(--color-error)]/10 px-3 py-2">
              <span className="text-[12px]">❌</span>
              <span className="text-[11px] font-medium text-[var(--color-error)]">
                {isThai ? "จำได้ ~20% หลัง 1 สัปดาห์" : "~20% retained after 1 week"}
              </span>
            </div>
          </div>

          {/* Spacing */}
          <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-surface)] p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-success)]/15 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-success)]">
                {isThai ? "เว้นระยะ (Spacing)" : "Spacing (Distributed)"}
              </span>
            </div>
            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                  <div
                    className="h-8 w-full rounded"
                    style={{ backgroundColor: "var(--color-success)", opacity: 0.2 + i * 0.08 }}
                  />
                  <span className="text-[7px] text-[var(--color-text-secondary)]">
                    {isThai ? `วัน ${i}` : `Day ${i}`}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              {isThai
                ? "อ่านวันละ 1 ชั่วโมง เป็นเวลา 5 วัน — ลืมบ้างแล้วจำใหม่ = แข็งแรงขึ้น"
                : "1 hour per day for 5 days — forget a little, then re-strengthen = stronger memory"}
            </p>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-[var(--color-success)]/10 px-3 py-2">
              <span className="text-[12px]">✅</span>
              <span className="text-[11px] font-medium text-[var(--color-success)]">
                {isThai ? "จำได้ ~60% หลัง 1 สัปดาห์" : "~60% retained after 1 week"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cepeda Meta-Analysis ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            📚
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Cepeda Meta-Analysis — 254 งานวิจัย" : "Cepeda Meta-Analysis — 254 Studies"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "Cepeda et al. (2006) ทำ meta-analysis รวบรวม 254 งานวิจัยที่เกี่ยวกับ spacing effect ครอบคลุมผู้เข้าร่วมกว่า 14,000 คน ข้อสรุปชัดเจน: spacing ดีกว่า massing ในแทบทุกสถานการณ์"
              : "Cepeda et al. (2006) conducted a meta-analysis of 254 studies on the spacing effect, covering over 14,000 participants. The conclusion was clear: spacing beats massing in virtually every scenario."}
          </p>
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { val: "254", lab: isThai ? "งานวิจัย" : "Studies" },
              { val: "14K+", lab: isThai ? "ผู้เข้าร่วม" : "Participants" },
              { val: "3x", lab: isThai ? "จำได้ดีกว่า" : "Better retention" },
            ].map((s) => (
              <div key={s.lab} className="rounded-xl bg-[var(--color-bg)] py-3 text-center">
                <div className="text-[18px] font-extrabold text-[var(--color-accent)]">{s.val}</div>
                <div className="text-[10px] font-medium text-[var(--color-text-secondary)]">{s.lab}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { icon: "✅", th: "Spacing ดีกว่า massing ใน 259 จาก 271 เงื่อนไข (96%)", en: "Spacing beat massing in 259 of 271 conditions (96%)" },
              { icon: "📏", th: "Effect size เฉลี่ย d = 0.46 (medium effect)", en: "Average effect size d = 0.46 (medium effect)" },
              { icon: "🌍", th: "ได้ผลกับทุกวัย ทุกเนื้อหา ทุกวัฒนธรรม", en: "Works across all ages, subjects, and cultures" },
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
              ? "อ้างอิง: Cepeda, N. J. et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin, 132(3), 354-380."
              : "Ref: Cepeda, N. J. et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin, 132(3), 354-380."}
          </p>
        </div>
      </section>

      {/* ── Dunlosky Ranking ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-warning)]/15 text-sm">
            🏆
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Dunlosky Ranking — เทคนิคไหนได้ผลจริง?" : "Dunlosky Ranking — What Really Works?"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "Dunlosky et al. (2013) ตีพิมพ์ในวารสาร Psychological Science in the Public Interest ประเมินเทคนิคการเรียน 10 วิธี จัดอันดับความมีประสิทธิภาพเป็น 3 ระดับ: สูง ปานกลาง และต่ำ"
              : "Dunlosky et al. (2013), published in Psychological Science in the Public Interest, evaluated 10 learning techniques and ranked their effectiveness as high, moderate, or low utility."}
          </p>
          <div className="space-y-2">
            {dunloskyRanking.map((item) => (
              <div
                key={item.rank}
                className="flex items-center gap-3 rounded-xl bg-[var(--color-bg)] px-3 py-2.5"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.rank}
                </span>
                <span className="flex-1 text-[12px] font-semibold text-[var(--color-text)]">
                  {isThai ? item.tech_th : item.tech_en}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: item.color,
                    color: "white",
                    opacity: 0.85,
                  }}
                >
                  {item.util === "high"
                    ? isThai ? "สูง" : "High"
                    : item.util === "moderate"
                    ? isThai ? "ปานกลาง" : "Moderate"
                    : isThai ? "ต่ำ" : "Low"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] italic text-[var(--color-text-secondary)]">
            {isThai
              ? "อ้างอิง: Dunlosky, J. et al. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58."
              : "Ref: Dunlosky, J. et al. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58."}
          </p>
        </div>
      </section>

      {/* ── Interleaving ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            🔀
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "Interleaving — สลับหัวข้อ เรียนลึกกว่า" : "Interleaving — Mix Topics, Learn Deeper"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "Interleaving คือการสลับหัวข้อหรือประเภทโจทย์ในการฝึก แทนที่จะฝึกอย่างเดียวจนจบ (blocked practice) เทคนิคนี้ช่วยให้สมองแยกแยะความแตกต่างระหว่างหัวข้อได้ดีขึ้น"
              : "Interleaving means mixing different topics or problem types during practice, rather than completing one type before moving to the next (blocked practice). This helps the brain better discriminate between concepts."}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {/* Blocked */}
            <div className="rounded-xl bg-[var(--color-bg)] p-3">
              <div className="mb-2 text-[11px] font-bold text-[var(--color-error)]">
                {isThai ? "❌ Blocked Practice" : "❌ Blocked Practice"}
              </div>
              <div className="flex gap-1">
                {["A", "A", "A", "B", "B", "B", "C", "C", "C"].map((letter, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{
                      backgroundColor:
                        letter === "A" ? "var(--color-error)" : letter === "B" ? "var(--color-warning)" : "var(--color-accent)",
                      opacity: 0.7,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            {/* Interleaved */}
            <div className="rounded-xl bg-[var(--color-bg)] p-3">
              <div className="mb-2 text-[11px] font-bold text-[var(--color-success)]">
                {isThai ? "✅ Interleaved Practice" : "✅ Interleaved Practice"}
              </div>
              <div className="flex gap-1">
                {["A", "B", "C", "A", "C", "B", "C", "A", "B"].map((letter, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{
                      backgroundColor:
                        letter === "A" ? "var(--color-error)" : letter === "B" ? "var(--color-warning)" : "var(--color-accent)",
                      opacity: 0.7,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Home Application ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-success)]/15 text-sm">
            🏠
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "ใช้ Spacing ที่บ้านอย่างไร?" : "How to Use Spacing at Home"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="space-y-3">
            {[
              {
                age_th: "อนุบาล (3-6 ปี)",
                age_en: "Preschool (3-6 yrs)",
                tips_th: "ทบทวนสิ่งที่เรียนก่อนนอน ถามคำถามเปิดเกี่ยวกับสิ่งที่เรียนเมื่อวาน ร้องเพลงที่เรียนซ้ำเว้นวัน",
                tips_en: "Review what they learned before bed. Ask open questions about yesterday's lesson. Sing learned songs every other day.",
              },
              {
                age_th: "ประถม (7-12 ปี)",
                age_en: "Primary (7-12 yrs)",
                tips_th: "ใช้ flashcard ทบทวนคำศัพท์ทุก 2-3 วัน ทำโจทย์คณิตเก่าสลับกับโจทย์ใหม่ (interleaving) สร้างปฏิทินทบทวนรายสัปดาห์",
                tips_en: "Use flashcards to review vocabulary every 2-3 days. Mix old and new math problems (interleaving). Create a weekly review calendar.",
              },
              {
                age_th: "มัธยม (13-18 ปี)",
                age_en: "Secondary (13-18 yrs)",
                tips_th: "ใช้แอป spaced repetition เช่น Anki ทำ practice test แทนการอ่านซ้ำ วางแผนทบทวน 3-4 สัปดาห์ก่อนสอบ ไม่ใช่คืนก่อนสอบ",
                tips_en: "Use spaced repetition apps like Anki. Do practice tests instead of rereading. Plan review 3-4 weeks before exams, not the night before.",
              },
            ].map((item) => (
              <div key={item.age_en} className="rounded-xl bg-[var(--color-bg)] p-4">
                <div className="mb-2 text-[13px] font-bold text-[var(--color-accent)]">
                  {isThai ? item.age_th : item.age_en}
                </div>
                <p className="text-[12px] leading-relaxed text-[var(--color-text)]">
                  {isThai ? item.tips_th : item.tips_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── School Selection ── */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-sm">
            🏫
          </div>
          <h2 className="text-[16px] font-bold tracking-tight md:text-[18px]">
            {isThai ? "เลือกโรงเรียนที่ใช้หลัก Spacing" : "Schools That Apply Spacing Principles"}
          </h2>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="space-y-2">
            {[
              { icon: "🔄", th: "Spiral Curriculum — หลักสูตรที่กลับมาทบทวนซ้ำอย่างเป็นระบบ เช่น Singapore Math", en: "Spiral Curriculum — systematically revisiting concepts, e.g. Singapore Math" },
              { icon: "🎲", th: "Montessori — เด็กเลือกทำซ้ำกิจกรรมที่สนใจ ซึ่งเป็นรูปแบบ natural spacing", en: "Montessori — children repeat chosen activities, a natural form of spacing" },
              { icon: "🌍", th: "IB (International Baccalaureate) — เน้น inquiry cycle ที่กลับมาทบทวน concept", en: "IB — emphasizes inquiry cycles that revisit concepts" },
              { icon: "📝", th: "Mastery-Based Learning — ต้องเข้าใจจริงก่อนไปต่อ มักใช้ spacing ในการประเมิน", en: "Mastery-Based Learning — must truly understand before advancing, uses spacing in assessment" },
            ].map((item) => (
              <div key={item.en} className="flex items-start gap-2.5 rounded-xl bg-[var(--color-bg)] px-3 py-2.5">
                <span className="text-sm">{item.icon}</span>
                <span className="text-[12px] leading-relaxed text-[var(--color-text)]">
                  {isThai ? item.th : item.en}
                </span>
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
            { href: "/research/early-childhood", icon: "🌱", th: "ลงทุนปฐมวัย", en: "Early Childhood ROI" },
            { href: "/research/attachment", icon: "🤝", th: "ทฤษฎีความผูกพัน", en: "Attachment Theory" },
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
            headline: "Spacing Effect — ทบทวนเว้นระยะ เรียนน้อยแต่จำนาน",
            alternativeHeadline: "The Spacing Effect: Learn Less, Remember More",
            description:
              "Ebbinghaus Forgetting Curve, Cepeda meta-analysis 254 งานวิจัย, Dunlosky Ranking — เทคนิคทบทวนที่วิทยาศาสตร์พิสูจน์แล้วว่าได้ผลที่สุด",
            url: "https://schoolfinder.app/research/spacing-effect",
            datePublished: "2025-02-01",
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
              { "@type": "Thing", name: "Spacing Effect" },
              { "@type": "Thing", name: "Forgetting Curve" },
              { "@type": "Thing", name: "Spaced Repetition" },
              { "@type": "Thing", name: "Interleaving" },
              { "@type": "Thing", name: "Learning Science" },
            ],
            citation: [
              "Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology.",
              "Cepeda, N. J. et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin, 132(3), 354-380.",
              "Dunlosky, J. et al. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58.",
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
