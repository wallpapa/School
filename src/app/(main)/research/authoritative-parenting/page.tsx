"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── 4 Parenting Styles (2x2 grid data) ── */
const parentingStyles = [
  {
    type: "Authoritative",
    typeTh: "Authoritative (อบอุ่น+มีกรอบ)",
    warmth: "high",
    control: "high",
    color: "bg-emerald-50 border-emerald-200",
    dotColor: "bg-emerald-500",
    tagColor: "text-emerald-700 bg-emerald-100",
    descTh:
      "ตั้งกฎชัดเจน อธิบายเหตุผล รับฟังความคิดเห็นเด็ก ให้อิสระภายในกรอบ ให้ความอบอุ่นและสนับสนุน ผลลัพธ์: เด็กมี self-esteem สูง ผลการเรียนดี ทักษะสังคมดี",
    descEn:
      "Sets clear rules with explanations, listens to child's opinions, allows autonomy within boundaries, provides warmth and support. Outcomes: high self-esteem, good academics, strong social skills.",
  },
  {
    type: "Authoritarian",
    typeTh: "Authoritarian (เข้มงวด)",
    warmth: "low",
    control: "high",
    color: "bg-rose-50 border-rose-200",
    dotColor: "bg-rose-500",
    tagColor: "text-rose-700 bg-rose-100",
    descTh:
      "ตั้งกฎเข้มงวด เน้นการเชื่อฟัง ไม่อธิบายเหตุผล ลงโทษเมื่อฝ่าฝืน ให้ความอบอุ่นน้อย ผลลัพธ์: เด็กเชื่อฟังแต่มี self-esteem ต่ำ วิตกกังวลสูง",
    descEn:
      "Strict rules, emphasizes obedience, little explanation, punishes non-compliance, low warmth. Outcomes: obedient but lower self-esteem, higher anxiety.",
  },
  {
    type: "Permissive",
    typeTh: "Permissive (ตามใจ)",
    warmth: "high",
    control: "low",
    color: "bg-amber-50 border-amber-200",
    dotColor: "bg-amber-500",
    tagColor: "text-amber-700 bg-amber-100",
    descTh:
      "ให้ความรัก อบอุ่นมาก แต่ตั้งกฎน้อย ไม่ค่อยลงโทษ ปล่อยให้เด็กตัดสินใจเอง ผลลัพธ์: เด็กขาดวินัย ควบคุมตัวเองยาก อาจมีปัญหาพฤติกรรม",
    descEn:
      "Very warm and loving but few rules, rarely punishes, lets child make own decisions. Outcomes: lack of discipline, poor self-regulation, potential behavior issues.",
  },
  {
    type: "Uninvolved",
    typeTh: "Uninvolved (ละเลย)",
    warmth: "low",
    control: "low",
    color: "bg-gray-50 border-gray-200",
    dotColor: "bg-gray-500",
    tagColor: "text-gray-700 bg-gray-100",
    descTh:
      "ให้ความสนใจน้อย ไม่ตั้งกฎ ไม่ค่อยมีส่วนร่วม อาจเกิดจากความเครียดหรือภาวะซึมเศร้า ผลลัพธ์: เด็กมีปัญหาหลายด้าน self-esteem ต่ำสุด",
    descEn:
      "Little attention, no rules, minimal involvement. May result from stress or depression. Outcomes: multi-domain problems, lowest self-esteem.",
  },
];

/* ── Pinquart (2017) Meta-analysis Results ── */
const pinquartResults = [
  {
    outcomeTh: "ผลการเรียน (Academic)",
    outcomeEn: "Academic Achievement",
    authoritative: "+",
    authoritarian: "−",
    permissive: "−",
    uninvolved: "−−",
  },
  {
    outcomeTh: "Self-esteem",
    outcomeEn: "Self-esteem",
    authoritative: "++",
    authoritarian: "−",
    permissive: "0/+",
    uninvolved: "−−",
  },
  {
    outcomeTh: "ปัญหาพฤติกรรม (Externalizing)",
    outcomeEn: "Externalizing Problems",
    authoritative: "−",
    authoritarian: "+",
    permissive: "+",
    uninvolved: "++",
  },
  {
    outcomeTh: "วิตกกังวล/ซึมเศร้า (Internalizing)",
    outcomeEn: "Internalizing Problems",
    authoritative: "−",
    authoritarian: "+",
    permissive: "0",
    uninvolved: "+",
  },
];

/* ── Cross-cultural points ── */
const crossCulturalPoints = [
  {
    authorTh: "Chao (2001)",
    authorEn: "Chao (2001)",
    pointTh:
      "แนวคิด 'chiao shun' (การสั่งสอน) ของจีนมีความแตกต่างจาก Authoritarian ของตะวันตก — มีองค์ประกอบของความรัก การเสียสละ และความคาดหวังสูงที่ไม่ถูกจับในโมเดล 2 มิติ",
    pointEn:
      "The Chinese concept of 'chiao shun' (training) differs from Western Authoritarian — it contains elements of love, sacrifice, and high expectations not captured by the 2D model.",
  },
  {
    authorTh: "Sorkhabi (2005)",
    authorEn: "Sorkhabi (2005)",
    pointTh:
      "วิเคราะห์ข้ามวัฒนธรรมพบว่า Authoritative ยังคงได้ผลดีในทุกวัฒนธรรม แต่ Authoritarian ไม่เป็นอันตรายเท่าในวัฒนธรรมที่เน้นลำดับชั้น เพราะเด็กตีความว่าเป็นความรัก",
    pointEn:
      "Cross-cultural analysis found Authoritative is universally beneficial, but Authoritarian is less harmful in hierarchical cultures because children interpret it as care.",
  },
  {
    authorTh: "บริบทไทย",
    authorEn: "Thai Context",
    pointTh:
      "สังคมไทยเน้น 'เกรงใจ' และความกตัญญู ผู้ปกครองไทยมักผสมผสาน Authoritative + Authoritarian — มีความอบอุ่นแต่ก็คาดหวังความเคารพ การปรับใช้ต้องเข้าใจบริบทวัฒนธรรม",
    pointEn:
      "Thai society emphasizes 'kreng jai' (deference) and gratitude. Thai parents often blend Authoritative + Authoritarian — warm but expecting respect. Application must consider cultural context.",
  },
];

/* ── FAQ ── */
const faqs = [
  {
    qTh: "Authoritative parenting คืออะไร?",
    qEn: "What is authoritative parenting?",
    aTh: "Authoritative parenting คือสไตล์การเลี้ยงลูกที่ผสมผสานความอบอุ่น (responsiveness) กับการตั้งกฎชัดเจน (demandingness) อย่างสมดุล พ่อแม่รับฟัง อธิบายเหตุผล แต่ยังคงมีขอบเขตที่ชัดเจน ตามแนวคิดของ Diana Baumrind (1966)",
    aEn: "Authoritative parenting combines warmth (responsiveness) with clear rules (demandingness) in balance. Parents listen, explain reasoning, but maintain clear boundaries, as defined by Diana Baumrind (1966).",
  },
  {
    qTh: "4 สไตล์การเลี้ยงลูกคืออะไร?",
    qEn: "What are the 4 parenting styles?",
    aTh: "Diana Baumrind (1966) กำหนด 3 แบบ: Authoritative (อบอุ่น+มีกรอบ), Authoritarian (เข้มงวด), Permissive (ตามใจ) ต่อมา Maccoby & Martin (1983) เพิ่ม Uninvolved (ละเลย) โดยใช้ตาราง 2 มิติ: ความอบอุ่น (สูง/ต่ำ) x การควบคุม (สูง/ต่ำ)",
    aEn: "Baumrind (1966) defined 3 styles: Authoritative, Authoritarian, Permissive. Maccoby & Martin (1983) added Uninvolved using a 2×2 grid: Warmth (high/low) x Control (high/low).",
  },
  {
    qTh: "สไตล์ไหนดีที่สุดตามงานวิจัย?",
    qEn: "Which style is best according to research?",
    aTh: "Pinquart (2017) วิเคราะห์ 1,435 งานวิจัยพบว่า Authoritative ให้ผลดีที่สุดในทุกด้าน: ผลการเรียน, self-esteem, ทักษะสังคม และป้องกันปัญหาพฤติกรรม ผลนี้คงที่ข้ามวัฒนธรรม แม้ขนาดอิทธิพลอาจแตกต่างกันบ้าง",
    aEn: "Pinquart (2017) analyzed 1,435 studies and found Authoritative yields the best outcomes across all measures: academics, self-esteem, social skills, and behavior problems. This holds across cultures, though effect sizes may vary.",
  },
  {
    qTh: "เลี้ยงลูกแบบเอเชียผิดไหม?",
    qEn: "Is Asian parenting style wrong?",
    aTh: "ไม่ — การวิจัยข้ามวัฒนธรรม (Chao, 2001; Sorkhabi, 2005) พบว่าแนวทางเอเชียมีมิติเพิ่มเติมที่โมเดลตะวันตกไม่ครอบคลุม เช่น การเสียสละเพื่อลูก ความคาดหวังสูงจากความรัก สิ่งสำคัญคือสมดุลระหว่างความอบอุ่นกับโครงสร้าง ไม่ใช่การลงโทษทางกาย",
    aEn: "No — cross-cultural research (Chao, 2001; Sorkhabi, 2005) shows Asian approaches have dimensions not covered by Western models, such as sacrifice and high expectations from love. What matters is balancing warmth with structure, not physical punishment.",
  },
  {
    qTh: "โรงเรียนควรมีวินัยแบบไหน?",
    qEn: "What discipline approach should schools use?",
    aTh: "โรงเรียนที่ใช้แนวทาง Authoritative — มีกฎชัดเจน อธิบายเหตุผล ให้เด็กมีส่วนร่วม และรักษาความสัมพันธ์อบอุ่น — มีผลลัพธ์ดีที่สุด ตรงข้ามกับโรงเรียนที่เน้นลงโทษ (Authoritarian) หรือปล่อยตามใจ (Permissive)",
    aEn: "Schools using an Authoritative approach — clear rules, explanations, student involvement, and warm relationships — produce the best outcomes. This contrasts with punishment-focused (Authoritarian) or laissez-faire (Permissive) schools.",
  },
  {
    qTh: "จะปรับสไตล์การเลี้ยงลูกได้อย่างไร?",
    qEn: "How can I adjust my parenting style?",
    aTh: "1) สำรวจตัวเอง — คุณเน้นกฎหรือความอบอุ่นมากกว่า? 2) เพิ่มด้านที่ขาด: ถ้าเข้มงวด ให้เพิ่มการรับฟังและอธิบาย ถ้าตามใจ ให้เพิ่มกฎที่ชัดเจน 3) อธิบายเหตุผลของกฎ 4) ให้ทางเลือกภายในกรอบ 5) ซ่อมแซมความสัมพันธ์เมื่อผิดพลาด 6) ดูแลตัวเอง — parental burnout ส่งผลต่อสไตล์การเลี้ยงลูก",
    aEn: "1) Self-assess — do you lean toward rules or warmth? 2) Add what's lacking: if strict, add listening and explaining; if permissive, add clear rules 3) Explain the reasoning behind rules 4) Offer choices within boundaries 5) Repair the relationship after mistakes 6) Self-care — parental burnout affects parenting style.",
  },
];

export default function AuthoritativeParentingPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          👨‍👩‍👧
        </div>
        <h1 className="text-[22px] font-extrabold tracking-tight md:text-[28px]">
          {isThai
            ? "Authoritative Parenting — เลี้ยงลูกแบบอบอุ่น+มีกรอบ"
            : "Authoritative Parenting: The Evidence-Based Approach"}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "สไตล์การเลี้ยงลูก 4 แบบของ Baumrind & Maccoby-Martin, meta-analysis จาก 1,435 งานวิจัย และมุมมองข้ามวัฒนธรรมเอเชีย"
            : "Baumrind & Maccoby-Martin's 4 parenting styles, meta-analysis of 1,435 studies, and cross-cultural Asian perspectives"}
        </p>
      </div>

      {/* ── Baumrind's History ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "จาก 3 สไตล์สู่ 4 สไตล์" : "From 3 Styles to 4 Styles"}
        </h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "Diana Baumrind (1966, 1967) ศึกษาครอบครัวอเมริกันและระบุ 3 สไตล์: Authoritative, Authoritarian, Permissive ต่อมา Maccoby & Martin (1983) จัดระบบใหม่เป็นตาราง 2 มิติ — ความอบอุ่น (Responsiveness) x การควบคุม (Demandingness) — ได้ 4 สไตล์ โดยเพิ่ม Uninvolved/Neglectful"
            : "Diana Baumrind (1966, 1967) studied American families and identified 3 styles: Authoritative, Authoritarian, Permissive. Maccoby & Martin (1983) reorganized them into a 2×2 grid — Responsiveness x Demandingness — yielding 4 styles with the addition of Uninvolved/Neglectful."}
        </p>
        <div className="mb-3 space-y-1">
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Baumrind, D. (1966). Effects of authoritative parental control on child behavior. <em>Child Development, 37</em>(4), 887–907.
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Maccoby, E. E., & Martin, J. A. (1983). Socialization in the context of the family. In <em>Handbook of Child Psychology</em> (Vol. 4). Wiley.
          </p>
        </div>
      </section>

      {/* ── 2x2 Grid: 4 Styles ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-bold md:text-[18px]">
          {isThai ? "4 สไตล์การเลี้ยงลูก (Maccoby-Martin 2×2)" : "4 Parenting Styles (Maccoby-Martin 2×2)"}
        </h2>

        {/* Axis labels */}
        <div className="mb-2 flex items-center justify-center gap-4 text-[11px] font-bold text-[var(--color-text-secondary)]">
          <span>{isThai ? "↕ ความอบอุ่น (Responsiveness)" : "↕ Responsiveness (Warmth)"}</span>
          <span>×</span>
          <span>{isThai ? "↔ การควบคุม (Demandingness)" : "↔ Demandingness (Control)"}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {parentingStyles.map((style) => (
            <div
              key={style.type}
              className={`rounded-2xl border p-4 ${style.color}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${style.dotColor}`} />
                <h3 className="text-[13px] font-bold">
                  {isThai ? style.typeTh : style.type}
                </h3>
              </div>
              <div className="mb-2 flex gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${style.tagColor}`}>
                  {isThai ? "อบอุ่น" : "Warmth"}: {style.warmth === "high" ? (isThai ? "สูง" : "High") : (isThai ? "ต่ำ" : "Low")}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${style.tagColor}`}>
                  {isThai ? "ควบคุม" : "Control"}: {style.control === "high" ? (isThai ? "สูง" : "High") : (isThai ? "ต่ำ" : "Low")}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? style.descTh : style.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pinquart Meta-Analysis Table ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "Meta-Analysis: Pinquart (2017)" : "Meta-Analysis: Pinquart (2017)"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "Pinquart วิเคราะห์ 1,435 งานวิจัย ครอบคลุมหลายร้อยหลายพันครอบครัว พบว่า Authoritative ให้ผลดีที่สุดทุกด้าน (++ = ผลบวกมาก, + = ผลบวก, 0 = ไม่มีผล, − = ผลลบ, −− = ผลลบมาก)"
            : "Pinquart analyzed 1,435 studies covering hundreds of thousands of families, finding Authoritative yields the best outcomes across all measures (++ = strong positive, + = positive, 0 = none, − = negative, −− = strong negative)"}
        </p>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                <th className="px-3 py-2.5 text-left font-bold">{isThai ? "ผลลัพธ์" : "Outcome"}</th>
                <th className="px-3 py-2.5 text-center font-bold text-emerald-600">Auth&apos;tive</th>
                <th className="px-3 py-2.5 text-center font-bold text-rose-600">Auth&apos;rian</th>
                <th className="px-3 py-2.5 text-center font-bold text-amber-600">Permissive</th>
                <th className="px-3 py-2.5 text-center font-bold text-gray-600">Uninvolved</th>
              </tr>
            </thead>
            <tbody>
              {pinquartResults.map((row) => (
                <tr key={row.outcomeEn} className="border-b border-[var(--color-border)] last:border-b-0">
                  <td className="px-3 py-2.5 font-medium">{isThai ? row.outcomeTh : row.outcomeEn}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-emerald-600">{row.authoritative}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-rose-600">{row.authoritarian}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-amber-600">{row.permissive}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-gray-600">{row.uninvolved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-[var(--color-text-secondary)]">
          Pinquart, M. (2017). Associations of parenting dimensions and styles with externalizing problems. <em>Dev. Psychol., 53</em>(5), 873–932.
        </p>
      </section>

      {/* ── Cross-Cultural Asian Context ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "บริบทข้ามวัฒนธรรม: มุมมองเอเชีย" : "Cross-Cultural Context: Asian Perspectives"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "โมเดล Baumrind พัฒนาจากครอบครัวอเมริกันผิวขาวชนชั้นกลาง จึงมีข้อจำกัดเมื่อใช้ข้ามวัฒนธรรม นักวิจัยเอเชียพบว่า:"
            : "Baumrind's model was developed from white middle-class American families, so it has limitations when applied cross-culturally. Asian researchers found:"}
        </p>
        <div className="flex flex-col gap-3">
          {crossCulturalPoints.map((point) => (
            <div
              key={point.authorEn}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-accent)]">
                  {isThai ? point.authorTh : point.authorEn}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai ? point.pointTh : point.pointEn}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Chao, R. K. (2001). Extending research on the consequences of parenting style for Chinese Americans and European Americans. <em>Child Development, 72</em>(6), 1832–1843.
          </p>
          <p className="text-[11px] text-[var(--color-text-secondary)]">
            Sorkhabi, N. (2005). Applicability of Baumrind&apos;s parent typology to collective cultures. <em>Int. J. Behavioral Development, 29</em>(6), 552–563.
          </p>
        </div>
      </section>

      {/* ── School Discipline Philosophy Match ── */}
      <section className="mb-8">
        <h2 className="mb-1 text-[16px] font-bold md:text-[18px]">
          {isThai ? "การเลือกโรงเรียนให้ตรงกับสไตล์" : "Matching School Discipline to Parenting Style"}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "งานวิจัยชี้ว่าเด็กพัฒนาดีที่สุดเมื่อสไตล์ของบ้านและโรงเรียนสอดคล้องกัน โดยเฉพาะแนว Authoritative"
            : "Research shows children develop best when home and school styles are aligned, especially in the Authoritative direction."}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: "✅",
              titleTh: "โรงเรียนแนว Authoritative",
              titleEn: "Authoritative Schools",
              descTh: "กฎชัดเจน + อธิบาย + รับฟัง + อบอุ่น = วินัยเชิงบวก (Positive Discipline)",
              descEn: "Clear rules + explanation + listening + warmth = Positive Discipline",
              highlight: true,
            },
            {
              icon: "⚠️",
              titleTh: "โรงเรียนแนว Authoritarian",
              titleEn: "Authoritarian Schools",
              descTh: "เน้นลงโทษ เข้มงวด ไม่อธิบาย — เด็กเชื่อฟังจากความกลัว ไม่ใช่ความเข้าใจ",
              descEn: "Punishment-focused, strict, no explanations — compliance from fear, not understanding",
              highlight: false,
            },
            {
              icon: "⚠️",
              titleTh: "โรงเรียนแนว Permissive",
              titleEn: "Permissive Schools",
              descTh: "ไม่มีโครงสร้าง ปล่อยอิสระเกินไป — เด็กขาดทักษะ self-regulation",
              descEn: "No structure, too much freedom — children lack self-regulation skills",
              highlight: false,
            },
          ].map((item) => (
            <div
              key={item.titleEn}
              className={`rounded-2xl border p-4 ${item.highlight ? "border-emerald-200 bg-emerald-50" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}
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
              href: "/research/attachment",
              icon: "🤱",
              titleTh: "Secure Attachment",
              titleEn: "Secure Attachment",
              descTh: "ทฤษฎีความผูกพัน Bowlby & Ainsworth",
              descEn: "Bowlby & Ainsworth attachment theory",
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
              descTh: "จับคู่โรงเรียนกับสไตล์การเลี้ยงลูก",
              descEn: "Match schools to your parenting style",
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
            headline: "Authoritative Parenting — เลี้ยงลูกแบบอบอุ่น+มีกรอบ",
            description:
              "Baumrind & Maccoby-Martin 4 parenting styles: Authoritative, Authoritarian, Permissive, Uninvolved. Meta-analysis from Pinquart (2017) of 1,435 studies with cross-cultural Asian perspectives.",
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
            url: "https://schoolfinder.app/research/authoritative-parenting",
            inLanguage: ["th", "en"],
            datePublished: "2025-01-20",
            dateModified: "2025-05-01",
            keywords: [
              "parenting styles",
              "authoritative parenting",
              "Baumrind",
              "Maccoby Martin",
              "Pinquart meta-analysis",
              "Asian parenting",
              "สไตล์การเลี้ยงลูก",
              "วินัยเชิงบวก",
            ],
            citation: [
              "Baumrind, D. (1966). Effects of authoritative parental control on child behavior. Child Development, 37(4), 887–907.",
              "Maccoby, E. E., & Martin, J. A. (1983). Socialization in the context of the family. In Handbook of Child Psychology (Vol. 4). Wiley.",
              "Pinquart, M. (2017). Associations of parenting dimensions and styles with externalizing problems. Dev. Psychol., 53(5), 873–932.",
              "Chao, R. K. (2001). Extending research on the consequences of parenting style. Child Development, 72(6), 1832–1843.",
              "Sorkhabi, N. (2005). Applicability of Baumrind's parent typology to collective cultures. Int. J. Behavioral Development, 29(6), 552–563.",
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
