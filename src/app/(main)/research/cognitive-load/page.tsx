"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── FAQ Data ── */
const faqs = [
  {
    q: "CLT คืออะไร?",
    qEn: "What is Cognitive Load Theory?",
    a: "Cognitive Load Theory (CLT) คือทฤษฎีที่พัฒนาโดย John Sweller ในปี 1988 อธิบายว่าหน่วยความจำใช้งาน (working memory) ของมนุษย์มีความจุจำกัด — ประมาณ 7±2 หน่วยข้อมูลในเวลาเดียวกัน การเรียนรู้จะเกิดขึ้นได้ดีที่สุดเมื่อ \"ภาระทางปัญญา\" (cognitive load) อยู่ในระดับที่เหมาะสม ไม่มากไม่น้อยเกินไป CLT แบ่ง load เป็น 3 ประเภท: intrinsic (ความยากของเนื้อหา), extraneous (สิ่งรบกวน), germane (การสร้าง schema)",
    aEn: "Cognitive Load Theory (CLT), developed by John Sweller in 1988, explains that human working memory has limited capacity — roughly 7±2 items at a time. Learning is optimized when 'cognitive load' is at the right level. CLT identifies 3 types: intrinsic (content difficulty), extraneous (distractions), and germane (schema building).",
  },
  {
    q: "Working memory จำกัดแค่ไหน?",
    qEn: "How limited is working memory?",
    a: "George Miller (1956) พบว่า working memory เก็บข้อมูลได้ประมาณ 7±2 หน่วย (chunks) ในเวลาเดียวกัน งานวิจัยล่าสุดของ Cowan (2001) ชี้ว่าอาจน้อยกว่านั้น — ประมาณ 4±1 หน่วยเท่านั้น ข้อมูลจะอยู่ใน working memory ได้เพียง 15-30 วินาทีหากไม่มีการทวน (rehearsal) นี่คือเหตุผลว่าทำไมการยัดข้อมูลมากเกินไปในครั้งเดียวจึงทำให้เด็กจำไม่ได้",
    aEn: "George Miller (1956) found working memory holds about 7±2 chunks at a time. More recent research by Cowan (2001) suggests it may be even less — about 4±1 chunks. Information stays in working memory for only 15-30 seconds without rehearsal. This is why cramming too much information at once causes children to forget.",
  },
  {
    q: "Discovery learning ไม่ดีหรือ?",
    qEn: "Is discovery learning bad?",
    a: "ไม่ใช่ว่า discovery learning ไม่ดีเสมอไป แต่ Kirschner, Sweller & Clark (2006) ชี้ว่า minimal guidance (การสอนแบบให้เด็กค้นพบเองโดยไม่มีตัวช่วย) ไม่ได้ผลกับเด็กที่เพิ่งเริ่มเรียนเรื่องใหม่ เพราะ working memory ถูกใช้ไปกับการค้นหาคำตอบจนไม่เหลือพื้นที่สำหรับการเรียนรู้จริง ๆ แต่เมื่อเด็กมีพื้นฐานแล้ว การค้นพบด้วยตัวเองจะได้ผลดีกว่า (expertise reversal effect)",
    aEn: "Discovery learning is not always bad, but Kirschner, Sweller & Clark (2006) showed that minimal guidance fails for beginners learning new material — working memory gets consumed by searching for answers, leaving no capacity for actual learning. However, once students have foundational knowledge, self-discovery becomes more effective (expertise reversal effect).",
  },
  {
    q: "CLT ใช้กับเด็กเล็กได้ไหม?",
    qEn: "Does CLT apply to young children?",
    a: "ใช้ได้อย่างยิ่ง — เด็กเล็กมี working memory ที่จำกัดกว่าผู้ใหญ่มาก เด็กอนุบาลอาจเก็บข้อมูลได้เพียง 2-3 หน่วยเท่านั้น ดังนั้นการสอนเด็กเล็กต้องลดภาระทางปัญญาให้มากที่สุด — สอนทีละขั้น ใช้ตัวอย่างที่ทำให้ดูก่อน ลดสิ่งรบกวน ใช้สื่อที่ไม่ซับซ้อน โรงเรียนอนุบาลที่ดีจะไม่ยัดข้อมูลมากเกินไปในครั้งเดียว",
    aEn: "Absolutely — young children have even more limited working memory than adults. Preschoolers may hold only 2-3 items. Teaching young children requires minimizing cognitive load: step-by-step instruction, worked examples first, reducing distractions, using simple materials. A good kindergarten does not overload children with too much information at once.",
  },
  {
    q: "การบ้านที่ดีตาม CLT เป็นแบบไหน?",
    qEn: "What does good homework look like under CLT?",
    a: "การบ้านที่ดีตาม CLT ควร: (1) เน้นเรื่องที่สอนในชั้นเรียนวันนั้น — ไม่ใช่เรื่องใหม่ (2) มีจำนวนพอเหมาะ — ไม่มากจนท่วม working memory (3) มี worked examples ให้ดูก่อนทำ — โดยเฉพาะเนื้อหาใหม่ (4) ค่อย ๆ ลด scaffolding (guidance fading) เมื่อเด็กเก่งขึ้น (5) หลีกเลี่ยงโจทย์ที่มีข้อมูลซ้ำซ้อนหรือรบกวน (split attention effect)",
    aEn: "Good CLT-aligned homework should: (1) focus on what was taught that day, not new material, (2) be appropriately sized to not overwhelm working memory, (3) include worked examples before practice, especially for new content, (4) gradually reduce scaffolding as mastery develops (guidance fading), (5) avoid problems with redundant or distracting information (split attention effect).",
  },
  {
    q: "โรงเรียนที่ใช้ CLT มีลักษณะอย่างไร?",
    qEn: "What does a CLT-informed school look like?",
    a: "โรงเรียนที่ใช้หลัก CLT จะมีลักษณะเด่น: (1) สอนทีละขั้น ไม่ยัดข้อมูล — ครูแบ่งเนื้อหาเป็นส่วนย่อย (2) ใช้ worked examples ก่อนให้เด็กทำเอง (3) ลดสิ่งรบกวนที่ไม่จำเป็นในห้องเรียน — ทั้งภาพและเสียง (4) ปรับระดับ scaffolding ตามความสามารถของเด็ก (5) ครูรู้จักผลกระทบของ split attention และ redundancy ในสื่อการสอน (6) ไม่บังคับให้เด็ก \"ค้นพบเอง\" ในเนื้อหาที่ยังไม่มีพื้นฐาน",
    aEn: "A CLT-informed school features: (1) step-by-step instruction, no information overload, (2) worked examples before independent practice, (3) reduced unnecessary distractions in classrooms, (4) scaffolding adjusted to student ability, (5) teachers aware of split attention and redundancy effects, (6) does not force 'discovery' in topics where students lack foundational knowledge.",
  },
];

/* ── Three Types of Load ── */
const loadTypes = [
  {
    type: "Intrinsic",
    typeTh: "Intrinsic Load",
    subtitle: (isThai: boolean) => isThai ? "ความยากของเนื้อหา" : "Content complexity",
    desc: (isThai: boolean) => isThai
      ? "ความซับซ้อนที่อยู่ในตัวเนื้อหาเอง — ลดได้โดยแบ่งเนื้อหาเป็นส่วนย่อย (chunking) และสอนทีละขั้น (sequencing)"
      : "Complexity inherent to the material — reducible by chunking content and proper sequencing of instruction.",
    color: "var(--color-accent)",
    bg: "bg-[var(--color-accent)]/10",
    icon: "📐",
    example: (isThai: boolean) => isThai ? "เช่น สมการพีชคณิต ยากกว่า 2+3" : "e.g. algebra equations are harder than 2+3",
  },
  {
    type: "Extraneous",
    typeTh: "Extraneous Load",
    subtitle: (isThai: boolean) => isThai ? "สิ่งรบกวนที่ไม่จำเป็น" : "Unnecessary distractions",
    desc: (isThai: boolean) => isThai
      ? "ภาระที่เกิดจากการออกแบบสื่อการสอนที่ไม่ดี — ต้องลดให้มากที่สุด เช่น ข้อมูลซ้ำซ้อน คำอธิบายอยู่ไกลจากรูป"
      : "Load from poor instructional design — must be minimized. e.g. redundant info, explanations far from diagrams.",
    color: "var(--color-error)",
    bg: "bg-[var(--color-error)]/10",
    icon: "🚫",
    example: (isThai: boolean) => isThai ? "เช่น สไลด์ที่มีข้อความล้นจอ + เสียงเล่าซ้ำ" : "e.g. slides overloaded with text + narration repeating it",
  },
  {
    type: "Germane",
    typeTh: "Germane Load",
    subtitle: (isThai: boolean) => isThai ? "การสร้าง Schema" : "Schema construction",
    desc: (isThai: boolean) => isThai
      ? "ภาระทางปัญญาที่ \"ดี\" — ใช้ในการจัดระเบียบและเชื่อมโยงข้อมูลใหม่เข้ากับความรู้เดิม สร้าง mental model ควรเพิ่มให้มากที่สุด"
      : "The 'good' load — used for organizing and connecting new info with existing knowledge, building mental models. Should be maximized.",
    color: "var(--color-success)",
    bg: "bg-[var(--color-success)]/10",
    icon: "🧩",
    example: (isThai: boolean) => isThai ? "เช่น เชื่อมบทเรียนใหม่กับสิ่งที่รู้แล้ว" : "e.g. connecting new lesson to prior knowledge",
  },
];

export default function CognitiveLoadPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          🧠
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "Cognitive Load Theory — สมองมี 'ห้องเก็บชั่วคราว' จำกัด"
            : "Cognitive Load Theory: Why Working Memory Matters for Learning"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "Working memory เก็บได้แค่ 7±2 หน่วย — Sweller (1988) สร้างทฤษฎีที่เปลี่ยนวิธีออกแบบการสอนทั่วโลก"
            : "Working memory holds only 7±2 items — Sweller (1988) created a theory that transformed instructional design worldwide."}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Sweller 1988", "Miller 7±2", "Kirschner 2006", "Worked Examples"].map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Section 1: Working Memory (Miller 7±2) ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Working Memory คืออะไร?" : "What is Working Memory?"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">
              <span className="text-[24px] font-extrabold text-[var(--color-accent)]">7±2</span>
              <span className="text-[9px] font-medium text-[var(--color-text-secondary)]">chunks</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-text)]">
                {isThai ? "กฎของ Miller (1956)" : "Miller's Law (1956)"}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "หน่วยความจำใช้งานเก็บข้อมูลได้ประมาณ 7±2 หน่วย (chunks) ข้อมูลอยู่ได้เพียง 15-30 วินาทีหากไม่ทวน"
                  : "Working memory holds about 7±2 chunks of information. Data persists for only 15-30 seconds without rehearsal."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--color-bg)] p-3 text-center">
              <div className="text-[18px] font-extrabold text-[var(--color-warning)]">4±1</div>
              <div className="text-[10px] text-[var(--color-text-secondary)]">
                {isThai ? "Cowan (2001) ปรับลดลง" : "Cowan (2001) revised down"}
              </div>
            </div>
            <div className="rounded-xl bg-[var(--color-bg)] p-3 text-center">
              <div className="text-[18px] font-extrabold text-[var(--color-error)]">15-30s</div>
              <div className="text-[10px] text-[var(--color-text-secondary)]">
                {isThai ? "ข้อมูลหายถ้าไม่ทวน" : "Gone without rehearsal"}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-3">
            <p className="text-[12px] leading-relaxed text-[var(--color-text)]">
              <span className="font-bold text-[var(--color-accent)]">
                {isThai ? "เปรียบเทียบ:" : "Analogy:"}
              </span>{" "}
              {isThai
                ? "Working memory เหมือนโต๊ะทำงาน — มีพื้นที่จำกัด ถ้าวางของเยอะเกินไปจะตกหล่นหมด Long-term memory เหมือนตู้เก็บของ — จุได้แทบไม่จำกัด แต่ต้องจัดระเบียบดีจึงหาเจอ"
                : "Working memory is like a desk — limited space, put too much and things fall off. Long-term memory is like a filing cabinet — nearly unlimited capacity, but must be organized to retrieve."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Three Types of Load (CSS Visual Cards) ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ภาระทางปัญญา 3 ประเภท" : "3 Types of Cognitive Load"}
        </h2>
        <div className="flex flex-col gap-3">
          {loadTypes.map((lt) => (
            <div key={lt.type} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${lt.bg} text-xl`}>
                  {lt.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold" style={{ color: lt.color }}>
                    {lt.type} Load
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">{lt.subtitle(isThai)}</p>
                </div>
              </div>
              <p className="mb-2 text-[12px] leading-relaxed text-[var(--color-text)]">
                {lt.desc(isThai)}
              </p>
              <div className="rounded-lg bg-[var(--color-bg)] px-3 py-2">
                <p className="text-[11px] italic text-[var(--color-text-secondary)]">
                  {lt.example(isThai)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4">
          <h3 className="mb-2 text-[13px] font-bold text-[var(--color-accent)]">
            {isThai ? "สูตร CLT:" : "CLT Formula:"}
          </h3>
          <div className="text-center text-[14px] font-bold text-[var(--color-text)]">
            Intrinsic + Extraneous + Germane ≤ Working Memory Capacity
          </div>
          <p className="mt-2 text-center text-[11px] text-[var(--color-text-secondary)]">
            {isThai
              ? "ถ้าผลรวมเกิน capacity → เด็กจำไม่ได้ → การเรียนรู้ล้มเหลว"
              : "If the total exceeds capacity → child cannot remember → learning fails"}
          </p>
        </div>
      </section>

      {/* ── Section 3: Worked Example Effect ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Worked Example Effect" : "The Worked Example Effect"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-success)]/10 text-xl">
              📝
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-text)]">
                {isThai ? "ทำให้ดูก่อน แล้วค่อยให้ทำเอง" : "Show how first, then let them try"}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "งานวิจัยของ Sweller พบว่าเด็กที่ได้ดูตัวอย่างที่ทำเสร็จแล้ว (worked example) เรียนรู้ได้เร็วกว่าเด็กที่ต้องแก้โจทย์เองตั้งแต่แรก เพราะ worked example ช่วยลด extraneous load — เด็กไม่ต้องเสียพลังสมองค้นหาวิธีแก้ปัญหา แต่ได้ใช้พลังสมองในการทำความเข้าใจ (germane load)"
                  : "Sweller's research found that students who study worked examples learn faster than those who problem-solve from scratch. Worked examples reduce extraneous load — students don't waste cognitive resources searching for solutions, instead using capacity for understanding (germane load)."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--color-success)]/20 bg-[var(--color-success)]/5 p-3">
              <div className="mb-1 text-[11px] font-bold text-[var(--color-success)]">
                {isThai ? "✅ Worked Example" : "✅ Worked Example"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "ดูตัวอย่าง → เข้าใจขั้นตอน → ลองทำเอง → สำเร็จ"
                  : "Study example → understand steps → try independently → succeed"}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-3">
              <div className="mb-1 text-[11px] font-bold text-[var(--color-error)]">
                {isThai ? "❌ Problem Solving" : "❌ Problem Solving First"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "ลองเอง → สับสน → ลองผิดลองถูก → ท้อ → ลืม"
                  : "Try alone → confused → trial & error → frustrated → forget"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Expertise Reversal Effect ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Expertise Reversal Effect" : "The Expertise Reversal Effect"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[12px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "สิ่งที่ช่วยมือใหม่อาจกลายเป็นอุปสรรคสำหรับผู้เชี่ยวชาญ เมื่อเด็กมี schema ที่แข็งแรงแล้ว worked examples ที่ละเอียดเกินไปจะกลายเป็น extraneous load — เพราะสมองต้องประมวลผลข้อมูลที่ซ้ำซ้อนกับสิ่งที่รู้อยู่แล้ว"
              : "What helps beginners can hinder experts. Once students have strong schemas, overly detailed worked examples become extraneous load — the brain wastes resources processing redundant information it already knows."}
          </p>
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-[var(--color-bg)]">
                  <th className="px-4 py-2.5 font-bold text-[var(--color-text)]"> </th>
                  <th className="px-4 py-2.5 font-bold text-[var(--color-success)]">
                    {isThai ? "มือใหม่" : "Beginners"}
                  </th>
                  <th className="px-4 py-2.5 font-bold text-[var(--color-accent)]">
                    {isThai ? "ผู้เชี่ยวชาญ" : "Experts"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [isThai ? "Worked examples" : "Worked examples", isThai ? "✅ ช่วยมาก" : "✅ Very helpful", isThai ? "❌ อาจเป็นอุปสรรค" : "❌ Can be redundant"],
                  [isThai ? "Problem solving" : "Problem solving", isThai ? "❌ ท่วม WM" : "❌ Overwhelms WM", isThai ? "✅ ท้าทายเหมาะสม" : "✅ Appropriate challenge"],
                  [isThai ? "Scaffolding" : "Scaffolding", isThai ? "มาก (high)" : "High", isThai ? "น้อย (low)" : "Low"],
                ].map((row, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-2.5 font-semibold text-[var(--color-text-secondary)]">{row[0]}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text)]">{row[1]}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text)]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 5: Guidance Fading ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Guidance Fading — ลด scaffolding อย่างค่อยเป็นค่อยไป" : "Guidance Fading"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-4 text-[12px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "เพื่อหลีกเลี่ยง expertise reversal ครูควร \"ค่อย ๆ ลด\" (fade) การช่วยเหลือเมื่อเด็กเก่งขึ้น — เริ่มจาก full worked example → partial example (เว้นบางขั้นให้เติม) → problem solving อิสระ"
              : "To avoid expertise reversal, teachers should gradually reduce guidance as students improve — starting from full worked examples → partial examples (leave some steps to fill) → independent problem solving."}
          </p>
          <div className="flex items-center gap-2">
            {[
              { step: "1", label: isThai ? "ตัวอย่างเต็ม" : "Full example", color: "bg-[var(--color-success)]" },
              { step: "2", label: isThai ? "เว้นบางส่วน" : "Partial example", color: "bg-[var(--color-warning)]" },
              { step: "3", label: isThai ? "ทำเองทั้งหมด" : "Independent", color: "bg-[var(--color-accent)]" },
            ].map((s, i) => (
              <div key={s.step} className="flex flex-1 items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white ${s.color}`}>
                  {s.step}
                </div>
                <span className="text-[11px] font-medium text-[var(--color-text)]">{s.label}</span>
                {i < 2 && <span className="text-[var(--color-text-secondary)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Kirschner, Sweller & Clark (2006) ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ทำไม Minimal Guidance ไม่ได้ผล?" : "Why Minimal Guidance Does Not Work"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[var(--color-error)]/15 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-error)]">2006</span>
            <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]">Kirschner, Sweller & Clark</span>
          </div>
          <h3 className="mb-2 text-[13px] font-bold text-[var(--color-text)]">
            &ldquo;Why Minimal Guidance During Instruction Does Not Work&rdquo;
          </h3>
          <p className="mb-3 text-[12px] leading-relaxed text-[var(--color-text)]">
            {isThai
              ? "งานวิจัยนี้ท้าทายแนวคิดการสอนแบบ discovery, inquiry-based, problem-based และ constructivist ที่ให้เด็กค้นพบเองโดยไม่มีตัวช่วย (minimal guidance) — โดยใช้ CLT อธิบายว่าเด็กมือใหม่ต้องใช้ working memory ทั้งหมดไปกับการค้นหาคำตอบ จนไม่เหลือพื้นที่สำหรับการเรียนรู้จริง ๆ"
              : "This landmark paper challenged discovery, inquiry-based, problem-based, and constructivist approaches that provide minimal guidance. Using CLT, they explained that beginners must use all working memory for searching, leaving no capacity for actual learning."}
          </p>
          <div className="rounded-xl bg-white/50 p-3">
            <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
              {isThai
                ? "หมายเหตุ: งานนี้ไม่ได้บอกว่า discovery learning ไม่ดีเสมอไป — แต่บอกว่าเด็กต้องมีพื้นฐานก่อน จึงจะ discover ได้อย่างมีประสิทธิภาพ (ดู expertise reversal effect ด้านบน)"
                : "Note: This paper does not say discovery learning is always bad — rather that students need foundational knowledge before they can discover effectively (see expertise reversal effect above)."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 7: School Selection Implications ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ผลต่อการเลือกโรงเรียน" : "Implications for School Selection"}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { icon: "✅", label: isThai ? "สัญญาณที่ดี (CLT-aligned)" : "Green Flags (CLT-aligned)", items: isThai
                ? ["สอนทีละขั้น — แบ่งเนื้อหาเป็นส่วนย่อย", "ใช้ worked examples ก่อนให้ทำเอง", "ปรับ scaffolding ตามระดับเด็ก", "ห้องเรียนไม่มีสิ่งรบกวนมากเกินไป", "ครูรู้จัก split attention effect"]
                : ["Step-by-step instruction with chunked content", "Worked examples before independent practice", "Scaffolding adjusted to student level", "Classroom minimizes unnecessary distractions", "Teachers aware of split attention effect"],
              color: "var(--color-success)" },
            { icon: "🚩", label: isThai ? "สัญญาณที่ควรระวัง" : "Red Flags", items: isThai
                ? ["บังคับให้เด็กค้นพบเองตั้งแต่แรกเสมอ", "สื่อการสอนที่มีข้อมูลล้นเกิน", "ไม่มีการ scaffold หรือ fade guidance", "การบ้านเยอะเกินจน WM ท่วม", "ไม่เคยใช้ worked examples"]
                : ["Forces discovery-first for all beginners", "Instructional materials with information overload", "No scaffolding or guidance fading", "Excessive homework overwhelming WM", "Never uses worked examples"],
              color: "var(--color-error)" },
          ].map((group) => (
            <div key={group.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{group.icon}</span>
                <h3 className="text-[13px] font-bold" style={{ color: group.color }}>{group.label}</h3>
              </div>
              <ul className="flex flex-col gap-1.5">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-[var(--color-text)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: group.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-bold tracking-tight md:text-[18px]">
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
                  <span className="pr-4 text-[13px] font-bold leading-snug text-[var(--color-text)]">
                    {isThai ? faq.q : faq.qEn}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 20 20" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className={`shrink-0 text-[var(--color-text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="border-t border-[var(--color-border)] px-4 pb-4 pt-3">
                    <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                      {isThai ? faq.a : faq.aEn}
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
        <h2 className="mb-3 text-[14px] font-bold tracking-tight">
          {isThai ? "อ่านเพิ่มเติม" : "Further Reading"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/research/learning-styles", icon: "🎭", title: isThai ? "Learning Styles Myth" : "Learning Styles Myth", desc: isThai ? "ตำนานที่ยังไม่มีหลักฐาน" : "71 models, 0 evidence" },
            { href: "/research", icon: "📚", title: isThai ? "Research Timeline" : "Research Timeline", desc: isThai ? "129 ปีงานวิจัยการศึกษา" : "129 years of research" },
            { href: "/find", icon: "🔍", title: isThai ? "ค้นหาโรงเรียน" : "Find Schools", desc: isThai ? "เลือกจากหลักฐานวิจัย" : "Evidence-based selection" },
            { href: "/guide", icon: "📖", title: isThai ? "คู่มือผู้ปกครอง" : "Parent Guide", desc: isThai ? "แนวทางเลือกโรงเรียน" : "School selection guide" },
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
        className="mb-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
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
            headline: "Cognitive Load Theory — สมองมี 'ห้องเก็บชั่วคราว' จำกัด",
            alternativeHeadline: "Cognitive Load Theory: Why Working Memory Matters for Learning",
            description:
              "Sweller (1988) CLT: working memory 7±2 items. 3 types of load. Worked example effect, expertise reversal, guidance fading. Kirschner, Sweller & Clark (2006): minimal guidance does not work.",
            url: "https://schoolfinder.app/research/cognitive-load",
            datePublished: "2025-01-20",
            dateModified: "2025-06-01",
            inLanguage: ["th", "en"],
            author: {
              "@type": "Person",
              name: "Dr. Waleerat",
              jobTitle: "Pediatrician & Education Researcher",
              url: "https://instagram.com/doctorwaleerat",
            },
            publisher: {
              "@type": "Organization",
              name: "SchoolFinder by Dr. Waleerat",
              url: "https://schoolfinder.app",
            },
            about: [
              { "@type": "DefinedTerm", name: "Cognitive Load Theory" },
              { "@type": "DefinedTerm", name: "Working Memory" },
              { "@type": "DefinedTerm", name: "Worked Example Effect" },
              { "@type": "DefinedTerm", name: "Expertise Reversal Effect" },
              { "@type": "DefinedTerm", name: "Guidance Fading" },
            ],
            citation: [
              "Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. Cognitive Science, 12(2), 257-285.",
              "Kirschner, P. A., Sweller, J. & Clark, R. E. (2006). Why Minimal Guidance During Instruction Does Not Work. Educational Psychologist, 41(2), 75-86.",
              "Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63(2), 81-97.",
              "Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24(1), 87-114.",
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
              name: faq.qEn,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.aEn,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
