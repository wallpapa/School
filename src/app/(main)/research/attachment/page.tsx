"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Bowlby's 4 Properties ── */
const bowlbyProperties = [
  {
    icon: "🧲",
    titleTh: "Proximity Maintenance",
    titleEn: "Proximity Maintenance",
    descTh: "เด็กต้องการอยู่ใกล้ผู้ดูแลหลัก โดยเฉพาะเมื่อรู้สึกไม่ปลอดภัย",
    descEn: "Children seek to stay close to their primary caregiver, especially when feeling unsafe.",
  },
  {
    icon: "🏠",
    titleTh: "Safe Haven",
    titleEn: "Safe Haven",
    descTh: "เมื่อเด็กรู้สึกกลัวหรือถูกคุกคาม จะกลับหาผู้ดูแลเพื่อปลอบโยนและปกป้อง",
    descEn: "When frightened or threatened, the child returns to the caregiver for comfort and protection.",
  },
  {
    icon: "🚀",
    titleTh: "Secure Base",
    titleEn: "Secure Base",
    descTh: "ผู้ดูแลเป็นฐานที่มั่นคงให้เด็กออกสำรวจโลก รู้ว่ามีที่พึ่งกลับมาได้เสมอ",
    descEn: "The caregiver acts as a secure base from which the child can explore, knowing they can always return.",
  },
  {
    icon: "😢",
    titleTh: "Separation Distress",
    titleEn: "Separation Distress",
    descTh: "เด็กแสดงความทุกข์เมื่อถูกแยกจากผู้ดูแล — เป็นสัญญาณปกติของ attachment",
    descEn: "Children show distress when separated from the caregiver — a normal sign of attachment.",
  },
];

/* ── 4 Attachment Styles ── */
const attachmentStyles = [
  {
    type: "Secure",
    typeTh: "Secure (มั่นคง)",
    pct: "~60%",
    color: "bg-emerald-50 border-emerald-200",
    dotColor: "bg-emerald-500",
    descTh:
      "เด็กทุกข์เมื่อแม่ออก แต่ปลอบได้ง่ายเมื่อแม่กลับมา สำรวจสิ่งแวดล้อมได้ดี ผู้ดูแลตอบสนองอย่างสม่ำเสมอ",
    descEn:
      "Child is distressed when mother leaves but easily comforted upon return. Explores confidently. Caregiver is consistently responsive.",
  },
  {
    type: "Avoidant",
    typeTh: "Avoidant (หลีกเลี่ยง)",
    pct: "~20%",
    color: "bg-blue-50 border-blue-200",
    dotColor: "bg-blue-500",
    descTh:
      "เด็กไม่แสดงอารมณ์เมื่อแม่ออกหรือกลับ อิสระเกินไป ผู้ดูแลมักปฏิเสธหรือไม่ตอบสนองทางอารมณ์",
    descEn:
      "Child shows little emotion when mother leaves or returns. Overly independent. Caregiver tends to be rejecting or emotionally unavailable.",
  },
  {
    type: "Anxious/Resistant",
    typeTh: "Anxious/Resistant (วิตกกังวล)",
    pct: "~10%",
    color: "bg-amber-50 border-amber-200",
    dotColor: "bg-amber-500",
    descTh:
      "เด็กทุกข์มากเมื่อแม่ออก ปลอบยาก เมื่อแม่กลับมาทั้งเกาะติดและโกรธ ผู้ดูแลตอบสนองไม่สม่ำเสมอ",
    descEn:
      "Child is very distressed when mother leaves, hard to soothe. Both clingy and angry on return. Caregiver is inconsistently responsive.",
  },
  {
    type: "Disorganized",
    typeTh: "Disorganized (สับสน)",
    pct: "~10%",
    color: "bg-rose-50 border-rose-200",
    dotColor: "bg-rose-500",
    descTh:
      "เด็กแสดงพฤติกรรมขัดแย้ง: เดินเข้าหาแม่แล้วหันหนี แข็งทื่อ มักพบในครอบครัวที่มีปัญหา/ผู้ดูแลที่น่ากลัว",
    descEn:
      "Child shows contradictory behavior: approaches then turns away, freezes. Often found in families with frightening/abusive caregivers.",
  },
];

/* ── Meta-analysis bar data ── */
const metaBars = [
  {
    labelTh: "Secure → Socioemotional (Groh 2017)",
    labelEn: "Secure → Socioemotional (Groh 2017)",
    d: 0.35,
    color: "bg-emerald-500",
    notesTh: "d = 0.2–0.4, meta-analysis จาก 80+ งานวิจัย",
    notesEn: "d = 0.2–0.4, meta-analysis of 80+ studies",
  },
  {
    labelTh: "Insecure → Externalizing (Fearon 2010)",
    labelEn: "Insecure → Externalizing (Fearon 2010)",
    d: 0.31,
    color: "bg-rose-500",
    notesTh: "d = 0.31, 69 งานวิจัย, N > 5,900",
    notesEn: "d = 0.31, 69 studies, N > 5,900",
  },
  {
    labelTh: "Secure → Social Competence",
    labelEn: "Secure → Social Competence",
    d: 0.39,
    color: "bg-blue-500",
    notesTh: "d ≈ 0.39 จากงาน longitudinal หลายงาน",
    notesEn: "d ≈ 0.39 from multiple longitudinal studies",
  },
];

/* ── FAQ ── */
const faqs = [
  {
    qTh: "Secure attachment คืออะไร?",
    qEn: "What is secure attachment?",
    aTh: "Secure attachment คือรูปแบบความผูกพันที่เด็กรู้สึกมั่นใจว่าผู้ดูแลจะตอบสนองความต้องการอย่างสม่ำเสมอ ทำให้เด็กกล้าสำรวจโลก มีพื้นฐานทางอารมณ์ที่มั่นคง ตามทฤษฎีของ Bowlby (1969) และงานวิจัยของ Ainsworth (1978)",
    aEn: "Secure attachment is a bond where the child feels confident the caregiver will consistently respond to their needs, enabling exploration and emotional stability. Based on Bowlby (1969) and Ainsworth (1978).",
  },
  {
    qTh: "Attachment style เปลี่ยนได้ไหม?",
    qEn: "Can attachment style change?",
    aTh: "ได้ แม้ attachment style จะมีแนวโน้มคงที่ แต่สามารถเปลี่ยนแปลงได้ผ่านประสบการณ์ความสัมพันธ์ใหม่ การบำบัด หรือการเปลี่ยนแปลงสภาพแวดล้อมครอบครัว งานวิจัย longitudinal พบว่า 20–30% ของเด็กเปลี่ยน attachment style ระหว่างวัยเด็กถึงวัยรุ่น",
    aEn: "Yes. While attachment style tends to be stable, it can change through new relationship experiences, therapy, or changes in the family environment. Longitudinal research shows 20–30% of children change attachment style between childhood and adolescence.",
  },
  {
    qTh: "ส่งลูกเนิร์สเซอรี่ทำลาย attachment ไหม?",
    qEn: "Does daycare/nursery harm attachment?",
    aTh: "งานวิจัย NICHD (2006) พบว่าคุณภาพของเนิร์สเซอรี่สำคัญกว่าการเข้าเนิร์สเซอรี่เอง เนิร์สเซอรี่คุณภาพสูงที่มีอัตราส่วนครูต่อเด็กเหมาะสม (1:3 สำหรับทารก) และครูตอบสนองความต้องการอย่างสม่ำเสมอ ไม่ทำลาย attachment กับพ่อแม่",
    aEn: "The NICHD study (2006) found quality of daycare matters more than attendance itself. High-quality nurseries with appropriate teacher-child ratios (1:3 for infants) and consistently responsive caregivers do not harm parent-child attachment.",
  },
  {
    qTh: "Attachment มีผลต่อผลการเรียนไหม?",
    qEn: "Does attachment affect academic outcomes?",
    aTh: "งาน meta-analysis ของ Groh et al. (2017) พบว่า secure attachment สัมพันธ์กับพัฒนาการ socioemotional ที่ดีกว่า (d = 0.2–0.4) ซึ่งเป็นพื้นฐานของการเรียนรู้ เด็กที่มี secure attachment มี executive function ดีกว่า ให้ความร่วมมือกับครูมากกว่า และมีแรงจูงใจในการเรียนสูงกว่า",
    aEn: "Groh et al. (2017) meta-analysis found secure attachment is linked to better socioemotional development (d = 0.2–0.4), which underpins learning. Securely attached children show better executive function, greater cooperation with teachers, and higher learning motivation.",
  },
  {
    qTh: "ครูมีบทบาทอย่างไรในการสร้าง attachment?",
    qEn: "What role do teachers play in attachment?",
    aTh: "ครูเป็น secondary attachment figure ที่สำคัญ โดยเฉพาะในช่วง 0–5 ปี ครูที่ตอบสนองอย่างอ่อนโยนและสม่ำเสมอช่วยสร้าง secure base ในโรงเรียน ส่งเสริมให้เด็กกล้าสำรวจ เรียนรู้ และสร้างความสัมพันธ์กับเพื่อน",
    aEn: "Teachers serve as crucial secondary attachment figures, especially in ages 0–5. Teachers who respond warmly and consistently create a secure base at school, encouraging exploration, learning, and peer relationships.",
  },
  {
    qTh: "ผู้ปกครองสร้าง secure attachment ได้อย่างไร?",
    qEn: "How can parents build secure attachment?",
    aTh: "1) ตอบสนองอย่างสม่ำเสมอเมื่อลูกร้องไห้หรือต้องการ 2) ให้ความสนใจและสบตาขณะเล่นและพูดคุย 3) เป็น safe haven เมื่อลูกกลัวหรือเครียด 4) สนับสนุนให้สำรวจแต่พร้อมเสมอ 5) จัดกิจวัตรประจำวันให้คาดเดาได้ 6) ซ่อมแซมความสัมพันธ์เมื่อเกิดความขัดแย้ง",
    aEn: "1) Respond consistently when child cries or needs you 2) Give attention and eye contact during play and conversation 3) Be a safe haven when child is scared or stressed 4) Support exploration while being available 5) Create predictable daily routines 6) Repair the relationship after conflicts.",
  },
];

export default function AttachmentPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          🤱
        </div>
        <h1 className="text-[22px] font-extrabold tracking-tight md:text-[28px]">
          {isThai
            ? "Secure Attachment — ทฤษฎีความผูกพันที่มั่นคง"
            : "Secure Attachment Theory & Child Development"}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "ทำความเข้าใจทฤษฎี Bowlby & Ainsworth: 4 แบบความผูกพัน, หลักฐานจาก meta-analysis และแนวทางเลือกโรงเรียนที่ส่งเสริมพัฒนาการทางอารมณ์"
            : "Understanding Bowlby & Ainsworth: 4 attachment styles, meta-analytic evidence, and how to choose schools that support emotional development"}
        </p>
      </div>

      {/* ── Bowlby's Theory: 4 Properties ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "ทฤษฎี Attachment ของ Bowlby (1958/1969)" : "Bowlby's Attachment Theory (1958/1969)"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "John Bowlby เสนอว่าเด็กมีความต้องการทางชีวภาพที่จะสร้างความผูกพันกับผู้ดูแลหลัก (primary caregiver) เพื่อความอยู่รอดและพัฒนาการ โดยมี 4 คุณสมบัติหลัก"
            : "John Bowlby proposed that children have a biological need to form attachment bonds with primary caregivers for survival and development, characterized by 4 key properties."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {bowlbyProperties.map((prop) => (
            <div
              key={prop.titleEn}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-2 text-2xl">{prop.icon}</div>
              <h3 className="mb-1 text-[13px] font-bold">
                {isThai ? prop.titleTh : prop.titleEn}
              </h3>
              <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? prop.descTh : prop.descEn}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[var(--color-text-secondary)]">
          Bowlby, J. (1969). <em>Attachment and Loss: Vol. 1. Attachment.</em> Basic Books.
        </p>
      </section>

      {/* ── Strange Situation: 4 Styles ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai
            ? "Strange Situation — 4 แบบความผูกพัน (Ainsworth, 1978)"
            : "The Strange Situation — 4 Attachment Styles (Ainsworth, 1978)"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "Mary Ainsworth ออกแบบการทดลอง Strange Situation เพื่อสังเกตพฤติกรรมเด็กเมื่อแยกจากและกลับมาหาแม่ พบ 4 รูปแบบ (Main & Solomon เพิ่ม Disorganized ในปี 1986)"
            : "Mary Ainsworth designed the Strange Situation experiment to observe child behavior during separation and reunion with the mother, identifying 4 patterns (Main & Solomon added Disorganized in 1986)."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {attachmentStyles.map((style) => (
            <div
              key={style.type}
              className={`rounded-2xl border p-4 ${style.color}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${style.dotColor}`} />
                <h3 className="text-[13px] font-bold">
                  {isThai ? style.typeTh : style.type}
                </h3>
                <span className="ml-auto rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold">
                  {style.pct}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? style.descTh : style.descEn}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[var(--color-text-secondary)]">
          Ainsworth, M. D. S., Blehar, M. C., Waters, E., & Wall, S. (1978).{" "}
          <em>Patterns of Attachment.</em> Erlbaum.
        </p>
      </section>

      {/* ── Meta-Analysis Bar Chart ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "หลักฐาน Meta-Analysis" : "Meta-Analytic Evidence"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "ขนาดอิทธิพล (Cohen's d) จากงาน meta-analysis สำคัญ: d = 0.2 เล็ก, d = 0.5 ปานกลาง, d = 0.8 ใหญ่"
            : "Effect sizes (Cohen's d) from key meta-analyses: d = 0.2 small, d = 0.5 medium, d = 0.8 large"}
        </p>
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          {metaBars.map((bar) => (
            <div key={bar.labelEn}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[12px] font-semibold">
                  {isThai ? bar.labelTh : bar.labelEn}
                </span>
                <span className="text-[12px] font-bold">d = {bar.d}</span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded-full bg-[var(--color-bg)]">
                <div
                  className={`h-full rounded-full ${bar.color} transition-all duration-700`}
                  style={{ width: `${(bar.d / 0.8) * 100}%` }}
                />
              </div>
              <p className="mt-0.5 text-[10px] text-[var(--color-text-secondary)]">
                {isThai ? bar.notesTh : bar.notesEn}
              </p>
            </div>
          ))}
          <p className="text-[10px] text-[var(--color-text-secondary)]">
            {isThai ? "แกนแสดงสัดส่วนเทียบกับ d = 0.8 (ขนาดใหญ่)" : "Scale relative to d = 0.8 (large effect)"}
          </p>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Groh, A. M., et al. (2017). Attachment and temperament in the early life course. <em>Dev. Psychopathol., 29</em>(1), 5–13.
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Fearon, R. P., et al. (2010). The significance of insecure attachment and disorganization. <em>J. Child Psychol. Psychiatry, 51</em>(4), 435–456.
          </p>
        </div>
      </section>

      {/* ── School Relevance ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "ความเกี่ยวข้องกับการเลือกโรงเรียน" : "Relevance to School Selection"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "ทฤษฎี attachment มีนัยสำคัญต่อการเลือกเนิร์สเซอรี่และโรงเรียนอนุบาล เพราะเด็กต้องสร้าง secondary attachment กับครู"
            : "Attachment theory has significant implications for nursery and kindergarten selection, as children must form secondary attachment bonds with teachers."}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: "👩‍🏫",
              titleTh: "อัตราส่วนครู:เด็ก",
              titleEn: "Teacher:Child Ratio",
              descTh: "ทารก 1:3, เตาะแตะ 1:5, อนุบาล 1:8 — ยิ่งเล็กยิ่งต้องใกล้ชิด",
              descEn: "Infants 1:3, toddlers 1:5, pre-K 1:8 — smaller ratios for younger children",
            },
            {
              icon: "🔄",
              titleTh: "ความต่อเนื่อง",
              titleEn: "Continuity of Care",
              descTh: "ครูประจำไม่เปลี่ยนบ่อย ให้เด็กสร้างความสัมพันธ์ได้ลึก",
              descEn: "Consistent caregivers allow children to build deep relationships",
            },
            {
              icon: "🌡️",
              titleTh: "ความอบอุ่นของครู",
              titleEn: "Teacher Warmth",
              descTh: "สังเกตว่าครูตอบสนองอย่างไรเมื่อเด็กร้องไห้หรือต้องการความช่วยเหลือ",
              descEn: "Observe how teachers respond when children cry or need help",
            },
          ].map((item) => (
            <div
              key={item.titleEn}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center"
            >
              <div className="mb-2 text-2xl">{item.icon}</div>
              <h3 className="mb-1 text-[12px] font-bold">
                {isThai ? item.titleTh : item.titleEn}
              </h3>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? item.descTh : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-bold md:text-[18px]">
          {isThai ? "คำถามที่พบบ่อย (FAQ)" : "Frequently Asked Questions"}
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="pr-4 text-[13px] font-bold leading-snug">
                    {isThai ? faq.qTh : faq.qEn}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
                    <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                      {isThai ? faq.aTh : faq.aEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Internal Link Cards ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[14px] font-bold tracking-tight md:text-[15px]">
          {isThai ? "อ่านงานวิจัยที่เกี่ยวข้อง" : "Related Research"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              href: "/research/authoritative-parenting",
              icon: "👨‍👩‍👧",
              titleTh: "Authoritative Parenting",
              titleEn: "Authoritative Parenting",
              descTh: "สไตล์การเลี้ยงลูก 4 แบบ Baumrind",
              descEn: "Baumrind's 4 parenting styles",
            },
            {
              href: "/research",
              icon: "📚",
              titleTh: "ไทม์ไลน์งานวิจัย",
              titleEn: "Research Timeline",
              descTh: "29 งานวิจัยสำคัญ 129 ปี",
              descEn: "29 landmark studies, 129 years",
            },
            {
              href: "/quiz",
              icon: "🧪",
              titleTh: "ทดสอบสไตล์เลี้ยงลูก",
              titleEn: "Parenting Style Quiz",
              descTh: "ค้นพบสไตล์ของคุณ",
              descEn: "Discover your style",
            },
            {
              href: "/find",
              icon: "🔍",
              titleTh: "ค้นหาโรงเรียน",
              titleEn: "Find Schools",
              descTh: "โรงเรียนที่ส่งเสริม attachment",
              descEn: "Schools that foster attachment",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center no-underline transition-all active:scale-[0.97] hover:border-[var(--color-text-secondary)]/30"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[12px] font-bold text-[var(--color-text)]">
                {isThai ? link.titleTh : link.titleEn}
              </span>
              <span className="text-[10px] leading-tight text-[var(--color-text-secondary)]">
                {isThai ? link.descTh : link.descEn}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Back Link ── */}
      <Link
        href="/research"
        className="mt-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {isThai ? "← กลับไปหน้างานวิจัย" : "← Back to Research"}
      </Link>

      {/* ── JSON-LD: Article ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Secure Attachment Theory & Child Development — ทฤษฎีความผูกพันที่มั่นคง",
            description:
              "Bowlby & Ainsworth attachment theory: 4 attachment styles from the Strange Situation, meta-analytic evidence from Groh (2017) and Fearon (2010), and nursery/school selection guidance.",
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
            url: "https://schoolfinder.app/research/attachment",
            inLanguage: ["th", "en"],
            datePublished: "2025-01-15",
            dateModified: "2025-05-01",
            keywords: [
              "attachment theory",
              "secure attachment",
              "Bowlby",
              "Ainsworth",
              "Strange Situation",
              "child development",
              "nursery selection",
              "ทฤษฎีความผูกพัน",
            ],
            citation: [
              "Bowlby, J. (1969). Attachment and Loss: Vol. 1. Attachment. Basic Books.",
              "Ainsworth, M. D. S., Blehar, M. C., Waters, E., & Wall, S. (1978). Patterns of Attachment. Erlbaum.",
              "Groh, A. M., et al. (2017). Attachment and temperament in the early life course. Dev. Psychopathol., 29(1), 5–13.",
              "Fearon, R. P., et al. (2010). The significance of insecure attachment. J. Child Psychol. Psychiatry, 51(4), 435–456.",
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
