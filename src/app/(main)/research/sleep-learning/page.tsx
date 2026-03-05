"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Sleep needs by age (NSF) ── */
const sleepNeeds = [
  { age_th: "ทารก (4-12 เดือน)", age_en: "Infant (4-12 mo)", hours: "12-16", bar: 100, color: "var(--color-accent)" },
  { age_th: "วัยเตาะแตะ (1-2 ปี)", age_en: "Toddler (1-2 yr)", hours: "11-14", bar: 87, color: "#5AC8FA" },
  { age_th: "ก่อนวัยเรียน (3-5 ปี)", age_en: "Preschool (3-5 yr)", hours: "10-13", bar: 81, color: "#34C759" },
  { age_th: "วัยเรียน (6-12 ปี)", age_en: "School-age (6-12 yr)", hours: "9-12", bar: 75, color: "#FF9500" },
  { age_th: "วัยรุ่น (13-18 ปี)", age_en: "Teen (13-18 yr)", hours: "8-10", bar: 62, color: "#FF3B30" },
  { age_th: "ผู้ใหญ่ (18+ ปี)", age_en: "Adult (18+ yr)", hours: "7-9", bar: 56, color: "#8E8E93" },
];

/* ── FAQ Data ── */
const faqs = [
  {
    q_th: "เด็กต้องนอนกี่ชั่วโมง?",
    q_en: "How many hours of sleep do children need?",
    a_th: "ขึ้นอยู่กับอายุ ตามคำแนะนำของ National Sleep Foundation: ทารก 12-16 ชม., เด็กก่อนวัยเรียน 10-13 ชม., วัยเรียน 9-12 ชม., วัยรุ่น 8-10 ชม. ที่สำคัญคือต้องนอนอย่างมีคุณภาพ ไม่ใช่แค่นับชั่วโมง",
    a_en: "It depends on age, per National Sleep Foundation guidelines: infants 12-16 hrs, preschoolers 10-13 hrs, school-age 9-12 hrs, teens 8-10 hrs. Quality matters as much as quantity.",
  },
  {
    q_th: "นอนดึกแต่ครบ 8 ชม. ได้ไหม?",
    q_en: "Is sleeping late but getting 8 hours still OK?",
    a_th: "ไม่เท่ากัน เพราะ circadian rhythm ของร่างกายมีผลต่อคุณภาพการนอน การนอนผิดเวลา (เช่น ตี 2 - 10 โมง) ให้คุณภาพ REM sleep ต่ำกว่าการนอนช่วง 4 ทุ่ม - ตี 4 แม้จะนอนเท่ากัน 8 ชั่วโมง งานวิจัยพบว่าการนอนผิดจังหวะ circadian ทำให้ memory consolidation แย่ลง",
    a_en: "Not quite. Circadian rhythm affects sleep quality. Sleeping 2AM-10AM yields lower quality REM sleep than 10PM-6AM, even though both are 8 hours. Research shows misaligned circadian sleep disrupts memory consolidation.",
  },
  {
    q_th: "โรงเรียนเริ่มสายกว่าดีจริงไหม?",
    q_en: "Is a later school start time really better?",
    a_th: "ใช่ งานวิจัยของ Wahlstrom et al. (2014) ศึกษาโรงเรียน 9,000+ แห่งในสหรัฐฯ พบว่าโรงเรียนที่เริ่มเรียน 8:30 น. หรือหลังกว่า มีผลการเรียนดีกว่า, อุบัติเหตุรถยนต์ลดลง, สุขภาพจิตนักเรียนดีขึ้น AAP แนะนำให้โรงเรียนมัธยมเริ่มไม่ก่อน 8:30 น.",
    a_en: "Yes. Wahlstrom et al. (2014) studied 9,000+ US schools and found that schools starting at 8:30 AM or later had better academic outcomes, fewer car accidents, and improved student mental health. AAP recommends middle and high schools start no earlier than 8:30 AM.",
  },
  {
    q_th: "Screen time ก่อนนอนมีผลไหม?",
    q_en: "Does screen time before bed affect sleep?",
    a_th: "มีผลมาก แสงสีฟ้าจากหน้าจอยับยั้งการหลั่ง melatonin ทำให้นอนหลับยากขึ้น เนื้อหาที่กระตุ้นอารมณ์ (เกม, โซเชียล) ทำให้สมองตื่นตัว แนะนำหยุดใช้หน้าจออย่างน้อย 1 ชั่วโมงก่อนนอน และไม่ควรมีอุปกรณ์ในห้องนอน",
    a_en: "Significantly. Blue light from screens suppresses melatonin production, making it harder to fall asleep. Stimulating content (games, social media) keeps the brain alert. Recommended to stop screens at least 1 hour before bed with no devices in the bedroom.",
  },
  {
    q_th: "นอนกลางวันช่วยเรื่องเรียนไหม?",
    q_en: "Do daytime naps help with learning?",
    a_th: "สำหรับเด็กเล็ก (3-5 ปี) การงีบกลางวัน 30-60 นาทีช่วยเรื่อง memory consolidation อย่างมาก สำหรับเด็กโตและวัยรุ่น การงีบสั้น 20-30 นาทีช่วยฟื้นฟูสมาธิ แต่ไม่ควรงีบนานเกินไปเพราะจะรบกวนการนอนกลางคืน",
    a_en: "For young children (3-5 yr), 30-60 minute naps significantly help memory consolidation. For older children and teens, short 20-30 minute naps restore attention. But napping too long can disrupt nighttime sleep.",
  },
  {
    q_th: "ลูกนอนไม่หลับก่อนสอบ ทำอย่างไร?",
    q_en: "My child can't sleep before exams. What should I do?",
    a_th: "1) สร้าง routine ก่อนนอนที่ผ่อนคลาย เช่น อาบน้ำอุ่น อ่านหนังสือเบาๆ 2) หลีกเลี่ยงการอ่านหนังสือบนเตียง ให้เตียงเป็นที่นอนเท่านั้น 3) ไม่ควร cram ดึก — retrieval practice ก่อนหน้า + นอนเพียงพอ ให้ผลดีกว่ามาก 4) ถ้าเครียดมาก ฝึก deep breathing 4-7-8 (หายใจเข้า 4 วิ กลั้น 7 วิ เป่าออก 8 วิ)",
    a_en: "1) Build a relaxing bedtime routine: warm bath, light reading. 2) Don't study in bed — keep the bed for sleep only. 3) Avoid late-night cramming — retrieval practice beforehand + adequate sleep is far more effective. 4) For high anxiety, practice 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s).",
  },
];

/* ── Sleep Hygiene Tips ── */
const hygieneTips = [
  { emoji: "🌙", th: "กำหนดเวลานอน-ตื่นให้สม่ำเสมอ แม้วันหยุด", en: "Keep consistent sleep-wake times, even on weekends" },
  { emoji: "📵", th: "หยุดหน้าจออย่างน้อย 1 ชม. ก่อนนอน", en: "Stop screens at least 1 hour before bed" },
  { emoji: "🌡️", th: "ห้องนอนเย็น มืด เงียบ (18-22°C)", en: "Cool, dark, quiet bedroom (18-22°C)" },
  { emoji: "☕", th: "ไม่ดื่มคาเฟอีนหลังเที่ยง (สำหรับวัยรุ่น)", en: "No caffeine after noon (for teens)" },
  { emoji: "🏃", th: "ออกกำลังกายตอนกลางวัน ไม่ใช่ก่อนนอน", en: "Exercise during the day, not before bed" },
  { emoji: "📖", th: "สร้าง routine ก่อนนอน: อ่านหนังสือ ฟังเพลงเบาๆ", en: "Create bedtime routine: reading, soft music" },
];

export default function SleepLearningPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-2xl">
          😴
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "การนอน & การเรียนรู้ — นอนพอ = เรียนดี"
            : "Sleep & Learning: How Sleep Shapes Academic Performance"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "Meta-analysis ยืนยัน: คุณภาพการนอนเป็นตัวทำนายผลการเรียนที่ดีที่สุดตัวหนึ่ง AAP แนะนำโรงเรียนเริ่มเรียน 8:30 น. ขึ้นไป"
            : "Meta-analyses confirm: sleep quality is one of the strongest predictors of academic performance. AAP recommends schools start at 8:30 AM or later."}
        </p>
      </div>

      {/* ── Section 1: Sleep Needs by Age (NSF Table + CSS Visual) ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "เด็กต้องนอนกี่ชั่วโมง? (National Sleep Foundation)" : "How Much Sleep Do Children Need? (NSF)"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="space-y-3">
            {sleepNeeds.map((s) => (
              <div key={s.age_en}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {isThai ? s.age_th : s.age_en}
                  </span>
                  <span className="text-[12px] font-extrabold" style={{ color: s.color }}>
                    {s.hours} {isThai ? "ชม." : "hrs"}
                  </span>
                </div>
                <div className="h-5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="flex h-full items-center justify-end rounded-full pr-2 transition-all duration-700"
                    style={{ width: `${s.bar}%`, backgroundColor: s.color, opacity: 0.7 }}
                  >
                    <span className="text-[9px] font-bold text-white">{s.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-[var(--color-text-secondary)]">
            Source: National Sleep Foundation & American Academy of Sleep Medicine
          </p>
        </div>
      </section>

      {/* ── Section 2: Meta-analysis Findings ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ผลวิจัย Meta-analysis" : "Meta-analysis Findings"}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              year: "2010",
              author: "Dewald et al.",
              journal: "Sleep Medicine Reviews",
              desc_th: "Meta-analysis จาก 17 งานวิจัย (n = 3,000+) พบว่าคุณภาพการนอน (sleep quality) มีความสัมพันธ์กับผลการเรียนมากกว่าระยะเวลาการนอน (sleep duration) และนอนตรงเวลา (sleepiness) สัมพันธ์เชิงลบกับเกรดอย่างชัดเจน",
              desc_en: "Meta-analysis of 17 studies (n = 3,000+) found sleep quality predicts academic performance more strongly than sleep duration. Daytime sleepiness was clearly negatively associated with grades.",
            },
            {
              year: "2014",
              author: "Wahlstrom et al.",
              journal: "US Multi-District Study",
              desc_th: "ศึกษาโรงเรียนมัธยม 9,000+ แห่งทั่วสหรัฐฯ พบว่าโรงเรียนที่เลื่อนเวลาเริ่มเรียนไปเป็น 8:30 น. ขึ้นไป มีผล: เกรดดีขึ้น, ขาดเรียนน้อยลง, อุบัติเหตุรถยนต์ลดลง, อาการซึมเศร้าลดลง",
              desc_en: "Studied 9,000+ US secondary schools. Schools that delayed start to 8:30 AM+ saw: improved grades, reduced absenteeism, fewer car accidents, and decreased depression symptoms.",
            },
            {
              year: "2016",
              author: "Minges & Redeker",
              journal: "Journal of School Health",
              desc_th: "ทบทวนงานวิจัยเรื่อง delayed school start times พบว่าการเริ่มเรียนสายขึ้น 25-60 นาที ทำให้วัยรุ่นนอนเพิ่มขึ้นเฉลี่ย 25-77 นาทีต่อคืน และมีผลดีต่อสุขภาพจิตและผลการเรียน",
              desc_en: "Review of delayed start time studies found that delaying school by 25-60 minutes increased teen sleep by 25-77 minutes per night, with positive effects on mental health and academics.",
            },
            {
              year: "2014",
              author: "AAP (American Academy of Pediatrics)",
              journal: "Policy Statement",
              desc_th: "ออกแถลงการณ์อย่างเป็นทางการแนะนำว่าโรงเรียนมัธยมต้นและมัธยมปลายควรเริ่มเรียนไม่ก่อน 8:30 น. เพื่อให้สอดคล้องกับ circadian rhythm ของวัยรุ่น",
              desc_en: "Officially recommended that middle and high schools start no earlier than 8:30 AM to align with adolescent circadian biology.",
            },
          ].map((study) => (
            <div
              key={`${study.year}-${study.author}`}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-accent)]">
                  {study.year}
                </span>
                <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]">
                  {study.author}
                </span>
              </div>
              <div className="mb-1 text-[11px] italic text-[var(--color-text-secondary)]">
                {study.journal}
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--color-text)]">
                {isThai ? study.desc_th : study.desc_en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: School Start Times Debate ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "เวลาเริ่มเรียน: ถกเถียงอย่างไร?" : "The School Start Times Debate"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Pro side */}
            <div className="rounded-xl bg-[var(--color-success)]/5 p-3">
              <div className="mb-2 text-[12px] font-bold text-[var(--color-success)]">
                {isThai ? "ข้อดีของเริ่มเรียนสาย" : "Benefits of Later Start"}
              </div>
              <ul className="space-y-1.5 text-[12px] leading-relaxed text-[var(--color-text)]">
                <li className="flex gap-1.5"><span className="text-[var(--color-success)]">+</span>{isThai ? "นักเรียนนอนเพิ่ม 25-77 นาที" : "Students sleep 25-77 min more"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-success)]">+</span>{isThai ? "เกรดเฉลี่ยดีขึ้น" : "Higher GPA"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-success)]">+</span>{isThai ? "ขาดเรียน/มาสายลดลง" : "Reduced tardiness & absences"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-success)]">+</span>{isThai ? "สุขภาพจิตดีขึ้น" : "Better mental health"}</li>
              </ul>
            </div>
            {/* Challenge side */}
            <div className="rounded-xl bg-[var(--color-warning)]/5 p-3">
              <div className="mb-2 text-[12px] font-bold text-[var(--color-warning)]">
                {isThai ? "ความท้าทาย" : "Challenges"}
              </div>
              <ul className="space-y-1.5 text-[12px] leading-relaxed text-[var(--color-text)]">
                <li className="flex gap-1.5"><span className="text-[var(--color-warning)]">~</span>{isThai ? "กระทบตารางรถรับส่งนักเรียน" : "Bus schedule complications"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-warning)]">~</span>{isThai ? "ปัญหาเรื่องเวลาทำงานของผู้ปกครอง" : "Parent work schedule conflicts"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-warning)]">~</span>{isThai ? "เลิกเรียนสายกว่า กระทบกิจกรรมนอกหลักสูตร" : "Later dismissal affects extracurriculars"}</li>
                <li className="flex gap-1.5"><span className="text-[var(--color-warning)]">~</span>{isThai ? "ต้องปรับระบบทั้งเขตการศึกษา" : "Requires district-wide restructuring"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Adolescent Circadian Rhythm ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Circadian Rhythm ของวัยรุ่น" : "Adolescent Circadian Rhythm"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "เมื่อเข้าสู่วัยรุ่น (puberty) นาฬิกาชีวภาพจะเลื่อนไปประมาณ 2 ชั่วโมง ทำให้ melatonin หลั่งช้าลง วัยรุ่นจึงง่วงช้ากว่าเด็กเล็กโดยธรรมชาติ ไม่ใช่เพราะขี้เกียจ การบังคับให้ตื่นเช้ามาก (เช่น 5:30 น.) เท่ากับบังคับให้ผู้ใหญ่ตื่น ตี 3:30 ตาม circadian rhythm เทียบเท่า"
              : "During puberty, the biological clock shifts approximately 2 hours later, causing delayed melatonin secretion. Teens naturally feel sleepy later — not due to laziness. Forcing a 5:30 AM wake-up for a teen is biologically equivalent to a 3:30 AM alarm for an adult."}
          </p>
          {/* Circadian visual */}
          <div className="rounded-xl bg-[var(--color-bg)] p-4">
            <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {isThai ? "เวลาหลั่ง Melatonin เทียบตามอายุ" : "Melatonin Onset by Age"}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-20 text-right text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {isThai ? "เด็ก 6-12" : "Child 6-12"}
                </span>
                <div className="relative h-4 flex-1 rounded-full bg-[var(--color-border)]">
                  <div className="absolute left-[54%] h-full w-[30%] rounded-full bg-[#5AC8FA]/70" />
                  <span className="absolute left-[54%] top-full mt-0.5 text-[9px] text-[var(--color-text-secondary)]">~20:00</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-right text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {isThai ? "วัยรุ่น 13-18" : "Teen 13-18"}
                </span>
                <div className="relative h-4 flex-1 rounded-full bg-[var(--color-border)]">
                  <div className="absolute left-[68%] h-full w-[30%] rounded-full bg-[#FF9500]/70" />
                  <span className="absolute left-[68%] top-full mt-0.5 text-[9px] text-[var(--color-text-secondary)]">~22:00</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-[10px] text-[var(--color-text-secondary)]">
              {isThai ? "วัยรุ่นหลั่ง melatonin ช้ากว่า ~2 ชม. โดยธรรมชาติ" : "Teens release melatonin ~2 hrs later naturally"}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Sleep Hygiene ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Sleep Hygiene — สุขอนามัยการนอน" : "Sleep Hygiene Tips"}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {hygieneTips.map((tip) => (
            <div
              key={tip.emoji}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center"
            >
              <span className="text-2xl">{tip.emoji}</span>
              <span className="text-[11px] leading-snug text-[var(--color-text)]">
                {isThai ? tip.th : tip.en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6: School Selection ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "เลือกโรงเรียน: สังเกตเรื่องการนอน" : "School Selection: Sleep Factors"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-4">
          <div className="space-y-2 text-[13px] leading-relaxed text-[var(--color-text)]">
            {[
              { th: "โรงเรียนเริ่มเรียนกี่โมง? สำหรับเด็กมัธยม 8:30 น. ขึ้นไปเป็นอุดมคติ", en: "What time does school start? For secondary students, 8:30 AM+ is ideal." },
              { th: "รวมเวลาเดินทาง — ถ้าโรงเรียนเริ่ม 7:30 แต่ต้องตื่น 5:30 เพื่อเดินทาง ลูกจะนอนไม่พอ", en: "Factor in commute — if school starts at 7:30 but wake-up is 5:30 for travel, sleep will suffer." },
              { th: "โรงเรียนมี nap time สำหรับเด็กอนุบาลไหม? (ควรมี 30-60 นาที)", en: "Does the school offer nap time for kindergarteners? (Should be 30-60 min.)" },
              { th: "ปริมาณการบ้าน — การบ้านมากเกินไปทำให้เด็กนอนดึก", en: "Homework load — excessive homework pushes bedtime later." },
              { th: "โรงเรียนสอน sleep education ให้นักเรียนไหม?", en: "Does the school teach sleep education to students?" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 text-[var(--color-success)]">&#10003;</span>
                <span>{isThai ? item.th : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="pr-4 text-[13px] font-bold text-[var(--color-text)]">
                    {isThai ? faq.q_th : faq.q_en}
                  </span>
                  <svg
                    width="16"
                    height="16"
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
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="border-t border-[var(--color-border)] px-4 pb-4 pt-3">
                    <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
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
        <h2 className="mb-3 text-[14px] font-bold tracking-tight md:text-[15px]">
          {isThai ? "อ่านงานวิจัยเพิ่มเติม" : "Related Research"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/research/retrieval-practice", icon: "🧪", title: isThai ? "Retrieval Practice" : "Retrieval Practice", desc: isThai ? "ดึงความจำ = จำดี" : "Testing boosts learning" },
            { href: "/research/attachment", icon: "🤱", title: isThai ? "ทฤษฎีความผูกพัน" : "Attachment Theory", desc: isThai ? "Bowlby & Ainsworth" : "Bowlby & Ainsworth" },
            { href: "/research/learning-styles", icon: "🎨", title: isThai ? "Learning Styles Myth" : "Learning Styles Myth", desc: isThai ? "ตำนานที่ไม่มีหลักฐาน" : "No evidence for meshing" },
            { href: "/find", icon: "🔍", title: isThai ? "ค้นหาโรงเรียน" : "Find Schools", desc: isThai ? "ค้นหาโรงเรียนที่เหมาะสม" : "Find the right school" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center no-underline transition-all active:scale-[0.97] hover:border-[var(--color-text-secondary)]/30"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[12px] font-bold text-[var(--color-text)]">{link.title}</span>
              <span className="text-[10px] leading-tight text-[var(--color-text-secondary)]">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Back to Research ── */}
      <Link
        href="/research"
        className="mt-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {isThai ? "← กลับหน้า Research" : "← Back to Research"}
      </Link>

      {/* ── JSON-LD: Article ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "การนอน & การเรียนรู้ — นอนพอ = เรียนดี",
            alternativeHeadline: "Sleep & Learning: How Sleep Shapes Academic Performance",
            description:
              "Meta-analysis: sleep quality strongly predicts academic performance. AAP recommends 8:30 AM+ school start. Dewald (2010), Wahlstrom (2014), circadian rhythm & school selection.",
            url: "https://schoolfinder.app/research/sleep-learning",
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
            datePublished: "2025-01-15",
            dateModified: "2025-05-01",
            keywords: [
              "sleep",
              "academic performance",
              "school start times",
              "การนอน",
              "ผลการเรียน",
              "circadian rhythm",
              "วัยรุ่น",
            ],
            citation: [
              "Dewald, J. F., Meijer, A. M., Oort, F. J., Kerkhof, G. A., & Bogels, S. M. (2010). The influence of sleep quality, sleep duration, and sleepiness on school performance in children and adolescents. Sleep Medicine Reviews, 14(3), 179-189.",
              "Minges, K. E., & Redeker, N. S. (2016). Delayed school start times and adolescent sleep: A systematic review of the experimental evidence. Sleep Health, 2(3), 210-219.",
              "Wahlstrom, K., Dretzke, B., Gordon, M., Peterson, K., Edwards, K., & Gdula, J. (2014). Examining the impact of later high school start times on the health and academic performance of high school students. Center for Applied Research and Educational Improvement, University of Minnesota.",
              "American Academy of Pediatrics (2014). School start times for adolescents. Pediatrics, 134(3), 642-649.",
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
              name: faq.q_en,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a_en,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
