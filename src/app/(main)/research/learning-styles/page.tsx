"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── FAQ Data ── */
const faqs = [
  {
    q: "Learning styles คืออะไร?",
    qEn: "What are learning styles?",
    a: "Learning styles คือแนวคิดที่ว่าคนแต่ละคนเรียนรู้ได้ดีที่สุดผ่านช่องทางใดช่องทางหนึ่ง เช่น Visual (ดู), Auditory (ฟัง), Kinesthetic (ลงมือทำ) หรือ Read/Write (อ่าน/เขียน) แม้จะเป็นที่นิยมในวงการศึกษามานานหลายทศวรรษ แต่งานวิจัยเชิงทดลองที่มีคุณภาพสูงไม่สามารถยืนยันว่าการจับคู่วิธีสอนกับ \"สไตล์\" ของเด็กช่วยให้เรียนรู้ดีขึ้นจริง",
    aEn: "Learning styles is the idea that each person learns best through a specific channel — Visual, Auditory, Kinesthetic, or Read/Write. Despite decades of popularity in education, high-quality experimental research has failed to confirm that matching instruction to a child's 'style' actually improves learning outcomes.",
  },
  {
    q: "ลูกชอบดูรูป = Visual learner จริงไหม?",
    qEn: "If my child likes pictures, are they a 'visual learner'?",
    a: "การที่ลูกชอบดูรูปภาพไม่ได้หมายความว่าลูกจะเรียนรู้ได้ดีที่สุดผ่านทางสายตาเท่านั้น งานวิจัยของ Pashler et al. (2008) ชี้ให้เห็นว่าแม้คนจะมี \"ความชอบ\" (preference) ในการรับข้อมูล แต่การสอนที่ตรงกับความชอบนั้นไม่ได้ช่วยให้ผลการเรียนดีขึ้น สิ่งที่ได้ผลจริงคือการนำเสนอเนื้อหาผ่านหลายช่องทาง (multiple representations) — ทั้งภาพ เสียง ข้อความ และการลงมือทำพร้อมกัน",
    aEn: "A child preferring pictures does not mean they learn best only through visuals. Pashler et al. (2008) showed that while people have 'preferences' for receiving information, matching instruction to those preferences does not improve outcomes. What actually works is presenting content through multiple channels simultaneously — visual, auditory, text, and hands-on.",
  },
  {
    q: "ทำไมครูยังใช้ learning styles?",
    qEn: "Why do teachers still use learning styles?",
    a: "Newton & Miah (2017) สำรวจพบว่ากว่า 90% ของครูยังเชื่อเรื่อง learning styles สาเหตุหลักคือ: (1) แนวคิดนี้ง่ายต่อการเข้าใจและฟังดูสมเหตุสมผล (2) ถูกสอนมาในหลักสูตรฝึกครูมานาน (3) อุตสาหกรรมสื่อการเรียนการสอนทำกำไรจากการขายแบบทดสอบและสื่อตาม \"สไตล์\" (4) การยอมรับว่าสิ่งที่เชื่อมานานไม่จริงนั้นเป็นเรื่องยากทางจิตวิทยา",
    aEn: "Newton & Miah (2017) found that over 90% of teachers still believe in learning styles. Key reasons: (1) the concept is intuitive and sounds logical, (2) it has been taught in teacher training for decades, (3) the education industry profits from selling style-based assessments, and (4) admitting a long-held belief is wrong is psychologically difficult.",
  },
  {
    q: "Multiple Intelligences vs Learning Styles ต่างกันยังไง?",
    qEn: "How are Multiple Intelligences different from Learning Styles?",
    a: "Howard Gardner ผู้สร้างทฤษฎี Multiple Intelligences (MI) ออกมาชี้แจงหลายครั้งว่า MI ไม่ใช่ learning styles — MI บอกว่าคนมีความสามารถหลายด้าน (ภาษา ดนตรี คณิตศาสตร์ ฯลฯ) ไม่ได้บอกว่าคนเรียนรู้ผ่าน \"ช่องทาง\" ใดช่องทางหนึ่ง Gardner เน้นว่าครูควรสอนเนื้อหาผ่านหลายมุมมอง (multiple entry points) ไม่ใช่จับคู่วิธีสอนกับ \"สไตล์\" ของเด็ก",
    aEn: "Howard Gardner, creator of Multiple Intelligences (MI), has repeatedly clarified that MI is not learning styles. MI says people have multiple abilities (linguistic, musical, mathematical, etc.) — it does not say people learn through one specific 'channel.' Gardner emphasizes teaching through multiple entry points, not matching instruction to a child's 'style.'",
  },
  {
    q: "โรงเรียนที่ดีควรสอนแบบไหน?",
    qEn: "How should a good school teach?",
    a: "งานวิจัยชี้ชัดว่าโรงเรียนที่ดีควรใช้ multiple representations — นำเสนอเนื้อหาผ่านหลายรูปแบบ (ภาพ เสียง ข้อความ ลงมือทำ) ให้นักเรียนทุกคน ไม่ใช่แบ่งเด็กตาม \"สไตล์\" ครูที่มีประสิทธิภาพจะปรับวิธีสอนตามเนื้อหา (content-dependent) ไม่ใช่ตามสไตล์เด็ก — สอนแผนที่ด้วยภาพ สอนจังหวะด้วยเสียง สอนทดลองด้วยการลงมือทำ",
    aEn: "Research clearly shows good schools use multiple representations — presenting content through diverse formats (visual, audio, text, hands-on) for all students, not sorting children by 'style.' Effective teachers adapt methods based on content (content-dependent) — teach maps visually, rhythm through sound, experiments through doing.",
  },
  {
    q: "ผู้ปกครองควรทำอย่างไรแทน?",
    qEn: "What should parents do instead?",
    a: "แทนที่จะหมกมุ่นกับ \"สไตล์การเรียนรู้\" ของลูก ผู้ปกครองควร: (1) ส่งเสริมให้ลูกเรียนรู้ผ่านหลายช่องทาง — อ่านหนังสือ ดูวิดีโอ ลงมือทำ พูดคุยอภิปราย (2) เลือกโรงเรียนที่ใช้หลักฐานเชิงวิจัยในการสอน (3) ไม่ติดป้าย \"Visual learner\" หรือ \"Kinesthetic learner\" ให้ลูก เพราะอาจจำกัดศักยภาพ (4) สอนลูกให้รู้จักวิธีเรียนรู้ที่มีประสิทธิภาพ เช่น spaced practice, retrieval practice, elaboration",
    aEn: "Instead of fixating on a child's 'learning style,' parents should: (1) encourage learning through multiple channels — reading, videos, hands-on, discussion, (2) choose schools that use evidence-based teaching, (3) avoid labeling children as 'visual' or 'kinesthetic' learners as it may limit potential, (4) teach effective study strategies like spaced practice, retrieval practice, and elaboration.",
  },
];

/* ── Key Research Studies ── */
const studies = [
  {
    id: "coffield",
    authors: "Coffield, Moseley, Hall & Ecclestone",
    year: 2004,
    title: "Learning styles and pedagogy in post-16 learning: A systematic and critical review",
    publisher: "Learning and Skills Research Centre",
    finding: "ทบทวน 71 โมเดล learning styles อย่างเป็นระบบ พบว่าส่วนใหญ่มีปัญหาด้านความน่าเชื่อถือ (reliability) และความตรง (validity) มีเพียงไม่กี่โมเดลที่ผ่านเกณฑ์ขั้นต่ำ",
    findingEn: "Systematically reviewed 71 learning style models. Most had poor reliability and validity — only a few met minimal psychometric standards.",
    color: "amber",
  },
  {
    id: "pashler",
    authors: "Pashler, McDaniel, Rohrer & Bjork",
    year: 2008,
    title: "Learning Styles: Concepts and Evidence",
    journal: "Psychological Science in the Public Interest, 9(3), 105-119",
    finding: "งานวิจัยนี้กำหนดเกณฑ์ที่ชัดเจนในการทดสอบ \"meshing hypothesis\" — ต้องแบ่งกลุ่มตามสไตล์ สุ่มวิธีสอน แล้ววัดผล ผลสรุป: ไม่มีหลักฐานเพียงพอที่จะสนับสนุนการจับคู่วิธีสอนกับสไตล์การเรียนรู้",
    findingEn: "Defined rigorous criteria for testing the 'meshing hypothesis' — classify by style, randomize instruction, measure outcomes. Conclusion: NO adequate evidence supports matching instruction to learning styles.",
    color: "red",
  },
  {
    id: "newton",
    authors: "Newton & Miah",
    year: 2017,
    title: "Evidence-Based Higher Education — Is the Learning Styles 'Myth' Important?",
    journal: "Frontiers in Psychology, 8, 444",
    finding: "สำรวจอาจารย์มหาวิทยาลัยพบว่า 90% ยังเชื่อว่า learning styles มีผลต่อการเรียนรู้ แม้หลักฐานจะขัดแย้ง แสดงให้เห็นช่องว่างระหว่างงานวิจัยกับการปฏิบัติจริง",
    findingEn: "Surveyed university educators and found 90% still believe learning styles affect learning outcomes, despite contradicting evidence. Reveals a gap between research and practice.",
    color: "purple",
  },
  {
    id: "gardner",
    authors: "Howard Gardner",
    year: 2013,
    title: "Multiple Intelligences Are Not Learning Styles",
    publisher: "The Washington Post (Opinion)",
    finding: "Gardner ผู้สร้างทฤษฎี Multiple Intelligences ชี้แจงว่า MI ไม่ใช่ learning styles — MI พูดถึงความสามารถหลายด้าน ไม่ได้พูดถึง \"ช่องทาง\" การรับข้อมูล ไม่ควรนำไปปนกัน",
    findingEn: "Gardner, creator of MI theory, clarified that MI is NOT learning styles — MI addresses multiple abilities, not sensory 'channels' for receiving information. They should not be conflated.",
    color: "blue",
  },
];

const colorMap: Record<string, { bg: string; dot: string; text: string; border: string }> = {
  amber: { bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700", border: "border-amber-200" },
  red: { bg: "bg-red-50", dot: "bg-red-500", text: "text-red-700", border: "border-red-200" },
  purple: { bg: "bg-purple-50", dot: "bg-purple-500", text: "text-purple-700", border: "border-purple-200" },
  blue: { bg: "bg-blue-50", dot: "bg-blue-500", text: "text-blue-700", border: "border-blue-200" },
};

export default function LearningStylesPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-3xl">
          🎭
        </div>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight md:text-[28px]">
          {isThai
            ? "Learning Styles — ตำนานที่ยังไม่มีหลักฐานรองรับ"
            : "The Learning Styles Myth: What the Evidence Really Says"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {isThai
            ? "71 โมเดลถูกทบทวน, 0 หลักฐานสนับสนุน meshing hypothesis, 90% ของครูยังเชื่อ — งานวิจัยบอกอะไรเราจริง ๆ?"
            : "71 models reviewed, 0 evidence for meshing, 90% of teachers still believe it — what does the research actually tell us?"}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Coffield 2004", "Pashler 2008", "Newton 2017", "Gardner 2013"].map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── Section 1: VAK/VARK Explanation ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "VAK / VARK คืออะไร?" : "What is VAK / VARK?"}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { letter: "V", label: isThai ? "Visual (ดู)" : "Visual", icon: "👁️", desc: isThai ? "ชอบแผนภาพ กราฟ สี" : "Prefers diagrams, graphs, colors" },
            { letter: "A", label: isThai ? "Auditory (ฟัง)" : "Auditory", icon: "👂", desc: isThai ? "ชอบฟัง พูดคุย อภิปราย" : "Prefers lectures, discussions" },
            { letter: "R", label: isThai ? "Read/Write (อ่าน)" : "Read/Write", icon: "📖", desc: isThai ? "ชอบอ่าน จดโน้ต เขียน" : "Prefers reading, note-taking" },
            { letter: "K", label: isThai ? "Kinesthetic (ลงมือทำ)" : "Kinesthetic", icon: "🤲", desc: isThai ? "ชอบทดลอง สัมผัส เคลื่อนไหว" : "Prefers hands-on, movement" },
          ].map((s) => (
            <div key={s.letter} className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[20px] font-extrabold text-[var(--color-accent)]">{s.letter}</span>
              <span className="text-[12px] font-bold text-[var(--color-text)]">{s.label}</span>
              <span className="text-[10px] leading-tight text-[var(--color-text-secondary)]">{s.desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 p-4">
          <p className="text-[12px] leading-relaxed text-[var(--color-text)]">
            <span className="font-bold text-[var(--color-warning)]">
              {isThai ? "ข้อควรระวัง:" : "Caution:"}
            </span>{" "}
            {isThai
              ? "แม้คนจะมี \"ความชอบ\" (preference) ในการรับข้อมูล แต่ไม่มีหลักฐานว่าการสอนให้ตรงกับความชอบนั้นช่วยให้เรียนรู้ได้ดีขึ้น ความชอบ ≠ ประสิทธิภาพ"
              : "While people do have preferences for receiving information, there is no evidence that matching instruction to those preferences improves learning. Preference ≠ effectiveness."}
          </p>
        </div>
      </section>

      {/* ── Section 2: Meshing Hypothesis ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Meshing Hypothesis คืออะไร?" : "The Meshing Hypothesis"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-error)]/10 text-lg">
              ❌
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-text)]">
                {isThai ? "สมมติฐานการจับคู่ (Meshing)" : "The Meshing Hypothesis"}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "ถ้าเด็กเป็น Visual learner → สอนด้วยภาพจะได้ผลดีกว่า / ถ้าเด็กเป็น Auditory → สอนด้วยเสียงจะดีกว่า"
                  : "If a child is a Visual learner → teaching with visuals works better / If Auditory → teaching with audio works better"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-error)]/10 text-lg">
              📊
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-text)]">
                {isThai ? "ผลจากงานวิจัย" : "Research Result"}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {isThai
                  ? "Pashler et al. (2008) ตั้งเกณฑ์ทดสอบ: แบ่งกลุ่มตามสไตล์ → สุ่มวิธีสอน → วัดผล → ต้องพบ interaction effect ผลลัพธ์: ไม่พบ interaction — ไม่มีหลักฐานว่า meshing ได้ผล"
                  : "Pashler et al. (2008) set criteria: classify by style → randomize instruction → measure outcomes → must find interaction effect. Result: NO interaction found — no evidence meshing works."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Key Research Studies ── */}
      <section className="mb-8">
        <h2 className="mb-4 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "งานวิจัยสำคัญ 4 ชิ้น" : "4 Key Research Studies"}
        </h2>
        <div className="flex flex-col gap-3">
          {studies.map((s) => {
            const c = colorMap[s.color];
            return (
              <div key={s.id} className={`rounded-2xl border p-4 ${c.border} ${c.bg}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${c.bg} ${c.text}`}>
                    {s.year}
                  </span>
                  <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]">
                    {s.authors}
                  </span>
                </div>
                <h3 className="text-[13px] font-bold leading-snug text-[var(--color-text)] md:text-[14px]">
                  {s.title}
                </h3>
                {s.journal && (
                  <p className="mt-1 text-[11px] italic text-[var(--color-text-secondary)]">{s.journal}</p>
                )}
                {s.publisher && (
                  <p className="mt-1 text-[11px] italic text-[var(--color-text-secondary)]">{s.publisher}</p>
                )}
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-text)]">
                  {isThai ? s.finding : s.findingEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 4: Coffield Deep Dive (71 Models) ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Coffield Review: 71 โมเดลถูกวิเคราะห์" : "Coffield Review: 71 Models Analyzed"}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "71", label: isThai ? "โมเดลที่ทบทวน" : "Models reviewed", color: "text-[var(--color-accent)]" },
            { value: "13", label: isThai ? "โมเดลที่วิเคราะห์ลึก" : "Analyzed in depth", color: "text-[var(--color-warning)]" },
            { value: "~3", label: isThai ? "ผ่านเกณฑ์ขั้นต่ำ" : "Met min. standards", color: "text-[var(--color-error)]" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-4 text-center">
              <div className={`text-[24px] font-extrabold tracking-tight ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] font-medium text-[var(--color-text-secondary)]">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
          {isThai
            ? "Coffield et al. (2004) จัดโมเดลทั้ง 71 แบบเข้า 5 กลุ่มใหญ่ตามสมมติฐานพื้นฐาน — ตั้งแต่แบบ \"ตายตัวทางพันธุกรรม\" ไปจนถึง \"ยืดหยุ่นเปลี่ยนแปลงได้\" พบว่าแม้แต่โมเดลที่ได้รับความนิยมสูงสุด เช่น Kolb, Honey & Mumford, Dunn & Dunn ก็มีปัญหาด้านความน่าเชื่อถือ"
            : "Coffield et al. (2004) categorized all 71 models into 5 families based on underlying assumptions — from 'genetically fixed' to 'flexibly changeable.' Even the most popular models like Kolb, Honey & Mumford, and Dunn & Dunn had reliability issues."}
        </p>
      </section>

      {/* ── Section 5: What Works Instead ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "แล้วอะไรได้ผลจริง?" : "What Actually Works?"}
        </h2>
        <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-5">
          <h3 className="mb-3 text-[14px] font-bold text-[var(--color-success)]">
            {isThai ? "Multiple Representations (หลายช่องทาง)" : "Multiple Representations"}
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: "🖼️", title: isThai ? "สอนเรื่องเดียวกันหลายรูปแบบ" : "Same concept, multiple formats", desc: isThai ? "แผนที่ + คำอธิบาย + กิจกรรม = ทุกคนได้ประโยชน์" : "Maps + explanation + activity = everyone benefits" },
              { icon: "🔄", title: isThai ? "Retrieval Practice" : "Retrieval Practice", desc: isThai ? "ทดสอบตัวเองบ่อย ๆ — ดึงความรู้ออกมาจากสมอง" : "Frequent self-testing — pull knowledge out of memory" },
              { icon: "📅", title: isThai ? "Spaced Practice" : "Spaced Practice", desc: isThai ? "กระจายการเรียนเป็นช่วง ๆ ไม่อัดรวดเดียว" : "Distribute learning over time, avoid cramming" },
              { icon: "🔗", title: isThai ? "Elaboration" : "Elaboration", desc: isThai ? "เชื่อมโยงความรู้ใหม่กับสิ่งที่รู้อยู่แล้ว อธิบายเป็นคำพูดตัวเอง" : "Connect new knowledge to existing understanding" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-[13px] font-bold text-[var(--color-text)]">{item.title}</div>
                  <div className="text-[11px] text-[var(--color-text-secondary)]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Gardner Clarification ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "Gardner: MI ≠ Learning Styles" : "Gardner: MI ≠ Learning Styles"}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="bg-[var(--color-surface)]">
                <th className="px-4 py-3 font-bold text-[var(--color-text)]"> </th>
                <th className="px-4 py-3 font-bold text-[var(--color-accent)]">Multiple Intelligences</th>
                <th className="px-4 py-3 font-bold text-[var(--color-error)]">Learning Styles</th>
              </tr>
            </thead>
            <tbody>
              {[
                [isThai ? "พูดถึง" : "About", isThai ? "ความสามารถหลายด้าน" : "Multiple abilities", isThai ? "ช่องทางการรับข้อมูล" : "Sensory channels"],
                [isThai ? "ผู้สร้าง" : "Creator", "Howard Gardner (1983)", "Neil Fleming (VARK, 1987)"],
                [isThai ? "หลักฐาน" : "Evidence", isThai ? "มีงานวิจัยสนับสนุนบางส่วน" : "Some supporting research", isThai ? "ไม่มีหลักฐานสนับสนุน meshing" : "No evidence for meshing"],
                [isThai ? "คำแนะนำ" : "Recommendation", isThai ? "สอนผ่านหลายมุมมอง" : "Teach through multiple entry points", isThai ? "ไม่ควรจับคู่สไตล์กับวิธีสอน" : "Do not match style to instruction"],
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
      </section>

      {/* ── Section 7: School Selection Implications ── */}
      <section className="mb-8">
        <h2 className="mb-3 text-[16px] font-bold tracking-tight md:text-[18px]">
          {isThai ? "ผลต่อการเลือกโรงเรียน" : "Implications for School Selection"}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { icon: "✅", label: isThai ? "สัญญาณที่ดี" : "Green Flags", items: isThai
                ? ["ใช้ multiple representations ในการสอน", "เน้น evidence-based strategies", "ครูปรับวิธีสอนตามเนื้อหา ไม่ใช่ตามสไตล์เด็ก", "ส่งเสริมการเรียนรู้ผ่านหลายช่องทาง"]
                : ["Uses multiple representations", "Emphasizes evidence-based strategies", "Teachers adapt to content, not child's style", "Promotes multi-channel learning"],
              color: "var(--color-success)" },
            { icon: "🚩", label: isThai ? "สัญญาณที่ควรระวัง" : "Red Flags", items: isThai
                ? ["โฆษณาว่าสอนตาม \"learning styles\" ของเด็ก", "ให้เด็กทำแบบทดสอบ VAK แล้วแบ่งกลุ่ม", "ติดป้ายนักเรียนว่าเป็น Visual/Auditory/Kinesthetic", "ขายหลักสูตร \"personalized by style\""]
                : ["Advertises teaching by 'learning styles'", "Administers VAK tests to group students", "Labels students as Visual/Auditory/Kinesthetic", "Sells 'personalized by style' curriculum"],
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
            { href: "/research/cognitive-load", icon: "🧠", title: isThai ? "Cognitive Load Theory" : "Cognitive Load Theory", desc: isThai ? "ทฤษฎีภาระทางปัญญา" : "Working memory limits" },
            { href: "/research", icon: "📚", title: isThai ? "Research Timeline" : "Research Timeline", desc: isThai ? "129 ปีงานวิจัยการศึกษา" : "129 years of research" },
            { href: "/find", icon: "🔍", title: isThai ? "ค้นหาโรงเรียน" : "Find Schools", desc: isThai ? "เลือกจากหลักฐานวิจัย" : "Evidence-based selection" },
            { href: "/quiz", icon: "🧪", title: isThai ? "ทดสอบสไตล์เลี้ยงลูก" : "Parenting Quiz", desc: isThai ? "แบบทดสอบ Baumrind" : "Baumrind-based quiz" },
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
            headline: "Learning Styles — ตำนานที่ยังไม่มีหลักฐานรองรับ",
            alternativeHeadline: "The Learning Styles Myth: What the Evidence Really Says",
            description:
              "Coffield reviewed 71 models. Pashler found NO meshing evidence. Newton & Miah: 90% of teachers still believe. Gardner: MI ≠ Learning Styles.",
            url: "https://schoolfinder.app/research/learning-styles",
            datePublished: "2025-01-15",
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
              { "@type": "DefinedTerm", name: "Learning Styles" },
              { "@type": "DefinedTerm", name: "VAK / VARK" },
              { "@type": "DefinedTerm", name: "Meshing Hypothesis" },
              { "@type": "DefinedTerm", name: "Multiple Intelligences" },
            ],
            citation: [
              "Coffield, F., Moseley, D., Hall, E. & Ecclestone, K. (2004). Learning styles and pedagogy in post-16 learning. Learning and Skills Research Centre.",
              "Pashler, H., McDaniel, M., Rohrer, D. & Bjork, R. (2008). Learning Styles: Concepts and Evidence. Psychological Science in the Public Interest, 9(3), 105-119.",
              "Newton, P. M. & Miah, M. (2017). Evidence-Based Higher Education — Is the Learning Styles 'Myth' Important? Frontiers in Psychology, 8, 444.",
              "Gardner, H. (2013). Multiple Intelligences Are Not Learning Styles. The Washington Post.",
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
