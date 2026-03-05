"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── FAQ Data ── */
const faqs = [
  {
    q_th: "Retrieval practice คืออะไร?",
    q_en: "What is retrieval practice?",
    a_th: "Retrieval practice คือการดึงข้อมูลออกจากความจำด้วยตัวเอง เช่น ทำแบบทดสอบ เขียนสิ่งที่จำได้ หรือใช้ flashcard แทนการอ่านซ้ำ งานวิจัยพบว่าวิธีนี้ช่วยสร้างเส้นทางความจำที่แข็งแรงกว่าการทบทวนแบบ passive มาก",
    a_en: "Retrieval practice is the act of pulling information from memory on your own, such as taking quizzes, writing what you remember, or using flashcards instead of re-reading. Research shows this builds much stronger memory traces than passive review.",
  },
  {
    q_th: "ทำไมสอบช่วยจำดีกว่าอ่านซ้ำ?",
    q_en: "Why does testing help memory more than re-reading?",
    a_th: "เมื่อเราพยายามดึงข้อมูลออกมา สมองต้องทำงานหนักขึ้น (desirable difficulty) ซึ่งเสริมสร้าง memory trace ให้แข็งแรง ขณะที่อ่านซ้ำให้ความรู้สึกว่าจำได้ (illusion of competence) แต่ไม่ได้สร้างเส้นทางความจำจริงๆ",
    a_en: "When you try to retrieve information, your brain works harder (desirable difficulty), which strengthens the memory trace. Re-reading creates an illusion of competence without actually building durable memory pathways.",
  },
  {
    q_th: "ใช้กับเด็กอายุเท่าไหร่?",
    q_en: "What age can children start using retrieval practice?",
    a_th: "งานวิจัยของ Agarwal et al. (2021) พบว่าใช้ได้ตั้งแต่ชั้นประถมต้น (อายุ 6-7 ปี) โดยปรับรูปแบบให้เหมาะสม เช่น เกมถาม-ตอบ, วาดภาพสิ่งที่จำได้ หรือเล่าเรื่องให้พ่อแม่ฟัง ไม่จำเป็นต้องเป็นการสอบแบบเป็นทางการ",
    a_en: "Research by Agarwal et al. (2021) shows it works from early primary school (age 6-7) when adapted appropriately. Examples include Q&A games, drawing from memory, or telling parents what they learned. It doesn't need to be formal testing.",
  },
  {
    q_th: "Flashcard ดีจริงไหม?",
    q_en: "Are flashcards really effective?",
    a_th: "ใช่ flashcard เป็นเครื่องมือ retrieval practice ที่ดีมาก เพราะบังคับให้คิดคำตอบก่อนดูเฉลย แต่ต้องใช้ให้ถูกวิธี คือต้องพยายามตอบก่อนพลิก ไม่ใช่แค่อ่านหน้า-หลัง และควรใช้ร่วมกับ spaced repetition จะได้ผลสูงสุด",
    a_en: "Yes, flashcards are an excellent retrieval practice tool because they force you to generate an answer before seeing the solution. But they must be used correctly: try to answer before flipping, don't just read front-back. Combining with spaced repetition maximizes effectiveness.",
  },
  {
    q_th: "Spacing + retrieval ร่วมกันได้ไหม?",
    q_en: "Can spacing and retrieval be combined?",
    a_th: "ได้ และเป็นวิธีที่ทรงพลังที่สุด! Dunlosky et al. (2013) จัดอันดับทั้ง practice testing และ distributed practice เป็น 'high utility' ร่วมกัน เมื่อใช้ retrieval practice แบบเว้นระยะ (เช่น ทบทวน flashcard ทุก 2-3 วัน) จะได้ผลดีกว่าทั้งสองวิธีแยกกัน",
    a_en: "Yes, and it's the most powerful combination! Dunlosky et al. (2013) rated both practice testing and distributed practice as 'high utility'. When you use spaced retrieval (e.g., reviewing flashcards every 2-3 days), it's more effective than either method alone.",
  },
  {
    q_th: "โรงเรียนควรมีแบบทดสอบบ่อยแค่ไหน?",
    q_en: "How often should schools give quizzes?",
    a_th: "งานวิจัยแนะนำว่าควรมี low-stakes quiz บ่อยๆ (สัปดาห์ละ 1-2 ครั้ง) แทนการสอบใหญ่ไม่กี่ครั้ง การทดสอบบ่อยๆ แบบไม่นับคะแนน (formative assessment) ช่วยทั้งการเรียนรู้และลดความเครียดจากการสอบ เพราะเด็กจะคุ้นเคยกับการดึงความจำ",
    a_en: "Research suggests frequent low-stakes quizzes (1-2 times per week) rather than a few high-stakes exams. Frequent formative assessments help both learning and reduce test anxiety, because children become accustomed to retrieval.",
  },
];

/* ── Types of Retrieval Practice ── */
const techniques = [
  { emoji: "📝", key_th: "Free recall", desc_th: "เขียนทุกอย่างที่จำได้หลังเรียนจบ", desc_en: "Write everything you remember after a lesson" },
  { emoji: "🃏", key_th: "Flashcards", desc_th: "ทำ flashcard ถาม-ตอบ ใช้กับ spaced repetition", desc_en: "Create Q&A flashcards with spaced repetition" },
  { emoji: "🧠", key_th: "Brain dump", desc_th: "วาด concept map จากความจำ ไม่ดูหนังสือ", desc_en: "Draw a concept map from memory without notes" },
  { emoji: "👥", key_th: "Peer quizzing", desc_th: "ถามตอบกับเพื่อน สลับกันเป็นผู้ถาม", desc_en: "Quiz each other, taking turns as questioner" },
  { emoji: "📊", key_th: "Practice tests", desc_th: "ทำข้อสอบเก่า / แบบฝึกหัดท้ายบท", desc_en: "Take past exams or end-of-chapter exercises" },
  { emoji: "🗣️", key_th: "Teach someone", desc_th: "อธิบายสิ่งที่เรียนให้คนอื่นฟัง", desc_en: "Explain what you learned to someone else" },
];

export default function RetrievalPracticePage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-2xl">
          🧪
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "Retrieval Practice — ดึงความจำออกมาใช้ ยิ่งจำได้ดี"
            : "Retrieval Practice: The Testing Effect That Boosts Learning"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "งานวิจัยกว่า 100 ปีพิสูจน์ว่า 'การทดสอบ' ไม่ใช่แค่วัดผล แต่คือเครื่องมือเรียนรู้ที่ทรงพลังที่สุด"
            : "Over 100 years of research prove that 'testing' is not just assessment — it's the most powerful learning tool available."}
        </p>
      </div>

      {/* ── Section 1: The Testing Effect ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Testing Effect คืออะไร?" : "What Is the Testing Effect?"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-[13px] leading-relaxed text-[var(--color-text)] md:text-[14px]">
            {isThai
              ? "Testing Effect คือปรากฏการณ์ที่การทดสอบตัวเอง (self-testing) ช่วยให้จำเนื้อหาได้ดีกว่าการอ่านซ้ำ (re-reading) อย่างมีนัยสำคัญ แนวคิดนี้ถูกศึกษาตั้งแต่ต้นศตวรรษที่ 20 แต่งานวิจัยสำคัญที่สุดคืองานของ Roediger & Karpicke (2006) ที่ตีพิมพ์ใน Psychological Science ซึ่งพิสูจน์อย่างชัดเจนว่า retrieval practice ให้ผลเหนือกว่า re-study อย่างมากในระยะยาว"
              : "The Testing Effect is the finding that self-testing produces significantly better long-term retention than re-reading. While this concept has been studied since the early 20th century, the landmark study by Roediger & Karpicke (2006) published in Psychological Science provided definitive evidence that retrieval practice substantially outperforms re-study over time."}
          </p>
        </div>
      </section>

      {/* ── Section 2: Roediger & Karpicke Experiment ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai
            ? "การทดลองของ Roediger & Karpicke (2006)"
            : "The Roediger & Karpicke (2006) Experiment"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)] md:text-[14px]">
            {isThai
              ? "นักศึกษาแบ่งเป็น 2 กลุ่ม อ่านบทความเดียวกัน: กลุ่ม A อ่านซ้ำ 4 รอบ (SSSS) กลุ่ม B อ่าน 1 รอบ แล้วทดสอบ 3 รอบ (STTT) ผลหลัง 5 นาที: กลุ่มอ่านซ้ำจำได้ดีกว่าเล็กน้อย แต่หลัง 1 สัปดาห์: กลุ่ม retrieval จำได้ 56% ขณะที่กลุ่มอ่านซ้ำเหลือเพียง 42%"
              : "Students were split into two groups reading the same passage: Group A re-read 4 times (SSSS), Group B read once then tested 3 times (STTT). After 5 minutes, the re-study group scored slightly higher. But after 1 week, the retrieval group retained 56% while re-study dropped to only 42%."}
          </p>

          {/* ── CSS Bar Chart ── */}
          <div className="rounded-xl bg-[var(--color-bg)] p-4">
            <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {isThai ? "ผลทดสอบหลัง 1 สัปดาห์" : "Test Results After 1 Week"}
            </div>
            <div className="space-y-3">
              {/* Re-study bar */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {isThai ? "อ่านซ้ำ (Re-study)" : "Re-study (SSSS)"}
                  </span>
                  <span className="text-[13px] font-extrabold text-[var(--color-error)]">42%</span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-[var(--color-error)]/70 pr-2 transition-all duration-1000"
                    style={{ width: "42%" }}
                  >
                    <span className="text-[10px] font-bold text-white">42%</span>
                  </div>
                </div>
              </div>
              {/* Retrieval bar */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {isThai ? "ดึงความจำ (Retrieval)" : "Retrieval Practice (STTT)"}
                  </span>
                  <span className="text-[13px] font-extrabold text-[var(--color-success)]">56%</span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-[var(--color-success)]/70 pr-2 transition-all duration-1000"
                    style={{ width: "56%" }}
                  >
                    <span className="text-[10px] font-bold text-white">56%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[10px] text-[var(--color-text-secondary)]">
              Roediger & Karpicke (2006), Psychological Science, 17(3), 249-255
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Supporting Evidence ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "หลักฐานเพิ่มเติม" : "Supporting Evidence"}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              year: "2011",
              author: "Roediger & Butler",
              journal: "Trends in Cognitive Sciences",
              desc_th: "สรุปว่า retrieval practice ช่วยมากกว่าแค่จำ — ยังช่วย transfer ความรู้ไปใช้ในบริบทใหม่ได้ดีกว่าด้วย",
              desc_en: "Concluded retrieval practice does more than boost memory — it also improves knowledge transfer to new contexts.",
            },
            {
              year: "2013",
              author: "Dunlosky et al.",
              journal: "Psychological Science in the Public Interest",
              desc_th: "ทบทวนเทคนิคการเรียน 10 วิธี จัดอันดับ practice testing เป็น 'high utility' ร่วมกับ distributed practice (เว้นระยะ)",
              desc_en: "Reviewed 10 study techniques and rated practice testing as 'high utility' alongside distributed practice (spacing).",
            },
            {
              year: "2021",
              author: "Agarwal et al.",
              journal: "Systematic Review",
              desc_th: "ทบทวนงานวิจัย retrieval practice ในห้องเรียนจริง พบว่าได้ผลดีทั้งระดับประถมและมัธยม ทุกวิชา ทุกกลุ่มนักเรียน",
              desc_en: "Systematic review of retrieval practice in real classrooms. Found it works across primary and secondary levels, all subjects, and all student groups.",
            },
          ].map((study) => (
            <div
              key={study.year}
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

      {/* ── Section 4: Types of Retrieval Practice ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "6 วิธี Retrieval Practice" : "6 Types of Retrieval Practice"}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {techniques.map((t) => (
            <div
              key={t.key_th}
              className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center"
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-[12px] font-bold text-[var(--color-text)]">{t.key_th}</span>
              <span className="text-[11px] leading-snug text-[var(--color-text-secondary)]">
                {isThai ? t.desc_th : t.desc_en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Limitations ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ข้อจำกัดที่ควรรู้" : "Limitations to Consider"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 p-4">
          <ul className="space-y-2 text-[13px] leading-relaxed text-[var(--color-text)]">
            <li className="flex gap-2">
              <span className="shrink-0 text-[var(--color-warning)]">!</span>
              {isThai
                ? "ถ้าดึงข้อมูลผิด (retrieval errors) ซ้ำๆ อาจทำให้จำข้อมูลผิดได้ ควรตรวจคำตอบหลังทดสอบทุกครั้ง (feedback)"
                : "Repeated retrieval errors can consolidate wrong information. Always check answers after testing (feedback)."}
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-[var(--color-warning)]">!</span>
              {isThai
                ? "High-stakes testing ที่สร้างความเครียดมากไม่ใช่สิ่งเดียวกับ retrieval practice แนะนำ low-stakes quiz ที่ไม่นับคะแนน"
                : "High-stakes testing that creates anxiety is not the same as retrieval practice. Low-stakes no-grade quizzes are recommended."}
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-[var(--color-warning)]">!</span>
              {isThai
                ? "ไม่เหมาะกับเนื้อหาที่ต้องการความเข้าใจเชิงลึกเพียงอย่างเดียว ควรใช้ร่วมกับ elaborative interrogation"
                : "Not ideal for deep conceptual understanding alone. Best combined with elaborative interrogation techniques."}
            </li>
          </ul>
        </div>
      </section>

      {/* ── Section 6: Home Application ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ใช้ที่บ้านอย่างไร?" : "How to Apply at Home"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="space-y-3 text-[13px] leading-relaxed text-[var(--color-text)]">
            {[
              { n: 1, th: "หลังลูกกลับจากโรงเรียน ถามว่า \"วันนี้เรียนอะไรบ้าง?\" — นี่คือ free recall", en: "After school, ask \"What did you learn today?\" — this is free recall." },
              { n: 2, th: "ทำ flashcard ง่ายๆ ร่วมกับลูก ใช้ก่อนนอน 5-10 นาที", en: "Make simple flashcards together. Review for 5-10 minutes before bedtime." },
              { n: 3, th: "เปลี่ยนการบ้านจาก \"อ่านหน้า 20-25\" เป็น \"เขียนสิ่งที่จำได้จากหน้า 20-25\"", en: "Change homework from \"read pages 20-25\" to \"write what you remember from pages 20-25\"." },
              { n: 4, th: "ใช้เทคนิค teach-back: ให้ลูกสอนเราในสิ่งที่เรียนมา", en: "Use the teach-back technique: let your child teach you what they learned." },
              { n: 5, th: "เว้นระยะ ไม่ต้อง drill ทุกวัน — ทดสอบวันเว้นวันได้ผลดีกว่า", en: "Space it out — testing every other day works better than daily drilling." },
            ].map((step) => (
              <div key={step.n} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[11px] font-bold text-[var(--color-accent)]">
                  {step.n}
                </span>
                <span>{isThai ? step.th : step.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: School Selection ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "เลือกโรงเรียน: สังเกตอะไร?" : "School Selection: What to Look For"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-4">
          <div className="space-y-2 text-[13px] leading-relaxed text-[var(--color-text)]">
            {[
              { th: "โรงเรียนใช้ formative assessment บ่อยแค่ไหน? (quiz สั้นๆ ทุกสัปดาห์ดีกว่าสอบใหญ่เทอมละครั้ง)", en: "How often does the school use formative assessment? (Weekly short quizzes are better than one big exam per term.)" },
              { th: "ครูให้ feedback หลังทดสอบหรือไม่? (Retrieval ที่ไม่มี feedback ไม่ช่วยแก้ความเข้าใจผิด)", en: "Do teachers give feedback after testing? (Retrieval without feedback won't correct misconceptions.)" },
              { th: "โรงเรียนสอนเทคนิคการเรียน (study skills) ให้นักเรียนไหม?", en: "Does the school teach study skills (learning techniques) to students?" },
              { th: "ระบบ spaced review มีไหม? เช่น spiral curriculum ที่กลับมาทบทวนเนื้อหาเก่า", en: "Is there a spaced review system? e.g., a spiral curriculum that revisits previous content." },
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
            { href: "/research/sleep-learning", icon: "😴", title: isThai ? "การนอน & การเรียนรู้" : "Sleep & Learning", desc: isThai ? "นอนพอ = เรียนดี" : "Sleep shapes performance" },
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
            headline: "Retrieval Practice — ดึงความจำออกมาใช้ ยิ่งจำได้ดี",
            alternativeHeadline: "Retrieval Practice: The Testing Effect That Boosts Learning",
            description:
              "Roediger & Karpicke (2006) testing effect: retrieval 56% vs re-study 42% after 1 week. Dunlosky (2013) rated practice testing as high utility.",
            url: "https://schoolfinder.app/research/retrieval-practice",
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
              "retrieval practice",
              "testing effect",
              "Roediger",
              "flashcards",
              "self-testing",
              "การทดสอบ",
              "ดึงความจำ",
            ],
            citation: [
              "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. Psychological Science, 17(3), 249-255.",
              "Roediger, H. L., & Butler, A. C. (2011). The critical role of retrieval practice in long-term retention. Trends in Cognitive Sciences, 15(1), 20-27.",
              "Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4-58.",
              "Agarwal, P. K., Nunes, L. D., & Blunt, J. R. (2021). Retrieval practice consistently benefits student learning: A systematic review of applied research in school classrooms. Educational Psychology Review, 33, 1409-1453.",
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
