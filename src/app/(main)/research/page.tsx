"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { supabase } from "@/lib/supabase";
import Chip from "@/components/ui/Chip";

/* ── Types ── */
interface TimelineEntry {
  id: string;
  year: number;
  year_end: number | null;
  era: number;
  era_title: string;
  researcher: string;
  title: string;
  description_th: string;
  description_en: string;
  impact: string;
  sort_order: number;
  mindmap_slugs: string[];
  references: { author: string; year: number; title: string; journal?: string; publisher?: string; volume?: string; pages?: string; doi?: string; url?: string }[];
  metadata: Record<string, unknown>;
}

interface Takeaway {
  id: string;
  sort_order: number;
  statement_th: string;
  statement_en: string;
  supporting_slugs: string[];
  mindmap_slugs: string[];
  confidence: "strong" | "moderate" | "emerging";
}

/* ── Era color map ── */
const eraColors: Record<number, { bg: string; dot: string; text: string; border: string }> = {
  1: { bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700", border: "border-amber-200" },
  2: { bg: "bg-blue-50", dot: "bg-blue-500", text: "text-blue-700", border: "border-blue-200" },
  3: { bg: "bg-purple-50", dot: "bg-purple-500", text: "text-purple-700", border: "border-purple-200" },
  4: { bg: "bg-rose-50", dot: "bg-rose-500", text: "text-rose-700", border: "border-rose-200" },
};

const confidenceColor: Record<string, string> = {
  strong: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
  moderate: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
  emerging: "bg-[var(--color-accent)]/15 text-[var(--color-accent)]",
};

/* ── Slug display names ── */
const slugLabels: Record<string, string> = {
  evidence_based_strategies: "Evidence-Based",
  metacognition: "Metacognition",
  executive_function: "Executive Function",
  cognitive_load: "Cognitive Load",
  attachment: "Attachment",
  parenting_styles: "Parenting Styles",
  assessment: "Assessment",
  attention: "Attention",
  equity: "Equity",
  education_policy: "Education Policy",
  mi_not_styles: "MI \u2260 Styles",
  myths: "Myths",
  flynn_effect: "Flynn Effect",
  learning_styles: "Learning Styles",
  cross_cultural_parenting: "Cross-Cultural",
  pisa_timss_pirls: "PISA/TIMSS",
  teacher_quality: "Teacher Quality",
  reverse_flynn: "Reverse Flynn",
  parental_burnout: "Parental Burnout",
  distraction: "Distraction",
  screen_time: "Screen Time",
  edtech_effectiveness: "EdTech",
};

export default function ResearchPage() {
  const { t, lang } = useLang();
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [takeaways, setTakeaways] = useState<Takeaway[]>([]);
  const [selectedEra, setSelectedEra] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── Fetch data ── */
  useEffect(() => {
    async function load() {
      const [{ data: tl }, { data: tk }] = await Promise.all([
        supabase.from("research_timeline").select("*").order("year").order("sort_order"),
        supabase.from("evidence_takeaways").select("*").order("sort_order"),
      ]);
      if (tl) setEntries(tl);
      if (tk) setTakeaways(tk);
      setLoading(false);
    }
    load();
  }, []);

  /* ── Filter ── */
  const filtered = useMemo(
    () => (selectedEra ? entries.filter((e) => e.era === selectedEra) : entries),
    [entries, selectedEra]
  );

  /* ── Group by era ── */
  const grouped = useMemo(() => {
    const map = new Map<number, TimelineEntry[]>();
    for (const e of filtered) {
      const list = map.get(e.era) || [];
      list.push(e);
      map.set(e.era, list);
    }
    return map;
  }, [filtered]);

  const eraFullKeys = ["", "researchEra1Full", "researchEra2Full", "researchEra3Full", "researchEra4Full"];

  const isThai = lang === "th";

  if (loading) {
    return (
      <div className="animate-fade-up flex flex-col items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-text)]" />
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 className="text-[24px] font-extrabold tracking-tight md:text-[28px]">
          {t("researchTitle")}
        </h1>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-secondary)] md:text-[14px]">
          {t("researchSub")}
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { value: "29", label: t("researchStudies") },
          { value: "129", label: t("researchYears") },
          { value: "42+", label: t("researchCountries") },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-[var(--color-surface)] py-3 text-center">
            <div className="text-[20px] font-extrabold tracking-tight">{stat.value}</div>
            <div className="text-[10px] font-medium text-[var(--color-text-secondary)]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Era Filter Chips ── */}
      <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-1">
        <Chip label={t("researchAllEras")} active={selectedEra === null} onClick={() => setSelectedEra(null)} />
        <Chip label={t("researchEra1")} active={selectedEra === 1} onClick={() => setSelectedEra(1)} />
        <Chip label={t("researchEra2")} active={selectedEra === 2} onClick={() => setSelectedEra(2)} />
        <Chip label={t("researchEra3")} active={selectedEra === 3} onClick={() => setSelectedEra(3)} />
        <Chip label={t("researchEra4")} active={selectedEra === 4} onClick={() => setSelectedEra(4)} />
      </div>

      {/* ── Timeline ── */}
      {[1, 2, 3, 4].map((era) => {
        const items = grouped.get(era);
        if (!items) return null;
        const colors = eraColors[era];

        return (
          <section key={era} className="mb-8">
            {/* Era header */}
            <div className="mb-4 flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
              <h2 className="text-[14px] font-bold tracking-tight md:text-[15px]">
                {t(eraFullKeys[era])}
              </h2>
            </div>

            {/* Timeline line + cards */}
            <div className="relative ml-1.5 border-l-2 border-[var(--color-border)] pl-6">
              {items.map((entry) => {
                const isOpen = expandedId === entry.id;
                return (
                  <div key={entry.id} className="relative mb-4 last:mb-0">
                    {/* Dot on timeline */}
                    <div className={`absolute -left-[31px] top-[18px] h-2.5 w-2.5 rounded-full border-2 border-[var(--color-bg)] ${colors.dot}`} />

                    {/* Card */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : entry.id)}
                      className={`w-full rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] ${
                        isOpen
                          ? `${colors.bg} ${colors.border}`
                          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-secondary)]/30"
                      }`}
                    >
                      <div className="p-4">
                        {/* Year + Researcher */}
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${colors.bg} ${colors.text}`}>
                            {entry.year}{entry.year_end ? `–${entry.year_end}` : ""}
                          </span>
                          <span className="text-[12px] font-semibold text-[var(--color-text-secondary)]">
                            {entry.researcher}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[14px] font-bold leading-snug text-[var(--color-text)] md:text-[15px]">
                          {entry.title}
                        </h3>

                        {/* Impact one-liner (always visible) */}
                        <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                          {entry.impact}
                        </p>

                        {/* Expand indicator */}
                        <div className="mt-2 flex items-center justify-end">
                          <svg
                            width="16" height="16" viewBox="0 0 20 20" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            className={`text-[var(--color-text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          >
                            <path d="M6 8l4 4 4-4" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Detail */}
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-2 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className={`rounded-2xl border p-4 ${colors.bg} ${colors.border}`}>
                        {/* Full description */}
                        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text)]">
                          {isThai ? entry.description_th : entry.description_en}
                        </p>

                        {/* Related topics */}
                        {entry.mindmap_slugs.length > 0 && (
                          <div className="mb-4">
                            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                              {t("researchRelated")}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {entry.mindmap_slugs.map((slug) => (
                                <span key={slug} className="rounded-full bg-[var(--color-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-text-secondary)]">
                                  {slugLabels[slug] || slug}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* References with DOI links */}
                        {entry.references.length > 0 && (
                          <div>
                            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                              {t("researchRef")}
                            </div>
                            {entry.references.map((ref, ri) => (
                              <p key={ri} className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                                {ref.author} ({ref.year}). <em>{ref.title}</em>.
                                {ref.journal && ` ${ref.journal}`}
                                {ref.volume && `, ${ref.volume}`}
                                {ref.pages && `, ${ref.pages}`}
                                {ref.publisher && ` ${ref.publisher}`}
                                {ref.doi && (
                                  <>
                                    .{" "}
                                    <a
                                      href={`https://doi.org/${ref.doi}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)]"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      DOI ↗
                                    </a>
                                  </>
                                )}
                                {!ref.doi && ref.url && (
                                  <>
                                    .{" "}
                                    <a
                                      href={ref.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)]"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Source ↗
                                    </a>
                                  </>
                                )}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* ── Evidence Takeaways ── */}
      {takeaways.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--color-success)]/15">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 10l3 3 7-7" />
              </svg>
            </div>
            <h2 className="text-[14px] font-bold tracking-tight md:text-[15px]">
              {t("researchTakeaways")}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {takeaways.map((tk) => (
              <div key={tk.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-text)] text-[11px] font-bold text-white">
                    {tk.sort_order}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${confidenceColor[tk.confidence]}`}>
                    {t(`research${tk.confidence.charAt(0).toUpperCase() + tk.confidence.slice(1)}`)}
                  </span>
                </div>
                <p className="text-[13px] font-medium leading-relaxed text-[var(--color-text)]">
                  {isThai ? tk.statement_th : tk.statement_en}
                </p>
                {tk.mindmap_slugs.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {tk.mindmap_slugs.map((slug) => (
                      <span key={slug} className="rounded-full bg-[var(--color-bg)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-text-secondary)]">
                        {slugLabels[slug] || slug}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Internal Links: How Research Connects ── */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--color-accent)]/15">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 12l4-4M7 8H4a2 2 0 0 0 0 4h3M13 12h3a2 2 0 0 0 0-4h-3" />
            </svg>
          </div>
          <h2 className="text-[14px] font-bold tracking-tight md:text-[15px]">
            {isThai ? "ข้อมูลวิจัยเชื่อมโยงกับ" : "How Research Connects"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { href: "/find", icon: "🔍", title: isThai ? "ค้นหาโรงเรียน" : "Find Schools", desc: isThai ? "EF Score จาก Piaget & Bloom" : "EF Scores from Piaget & Bloom" },
            { href: "/quiz", icon: "🧪", title: isThai ? "ทดสอบสไตล์เลี้ยงลูก" : "Parenting Quiz", desc: isThai ? "ทฤษฎี Baumrind & Maccoby" : "Baumrind & Maccoby theory" },
            { href: "/transfer", icon: "🔄", title: isThai ? "คู่มือย้ายโรงเรียน" : "School Transfer Guide", desc: isThai ? "Erikson stages + EF" : "Erikson stages + EF" },
            { href: "/path", icon: "🛤️", title: isThai ? "เส้นทางโรงเรียน" : "School Path", desc: isThai ? "วิจัย Feeder School" : "Feeder School Research" },
            { href: "/birth-date", icon: "🎂", title: isThai ? "วันเกิด & การศึกษา" : "Birth Date & Education", desc: isThai ? "Cutoff Dates & RAE" : "Cutoff Dates & RAE" },
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

      {/* ── Research Deep Dives ── */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9M15 3l-6 6" />
            </svg>
          </div>
          <h2 className="text-[14px] font-bold tracking-tight md:text-[15px]">
            {isThai ? "บทความวิจัยเชิงลึก" : "Research Deep Dives"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { href: "/research/attachment", icon: "🤱", title: isThai ? "Secure Attachment" : "Secure Attachment", desc: isThai ? "ทฤษฎีความผูกพัน Bowlby" : "Bowlby's Attachment Theory" },
            { href: "/research/authoritative-parenting", icon: "👨‍👩‍👧", title: isThai ? "Authoritative Parenting" : "Authoritative Parenting", desc: isThai ? "อบอุ่น+มีกรอบ Baumrind" : "Baumrind's Evidence-Based Style" },
            { href: "/research/learning-styles", icon: "🎭", title: isThai ? "Learning Styles Myth" : "Learning Styles Myth", desc: isThai ? "ตำนานที่ไม่มีหลักฐาน" : "No Evidence for Meshing" },
            { href: "/research/cognitive-load", icon: "🧠", title: isThai ? "Cognitive Load" : "Cognitive Load Theory", desc: isThai ? "สมองมีห้องเก็บจำกัด" : "Working Memory Limits" },
            { href: "/research/early-childhood", icon: "🌱", title: isThai ? "ลงทุนปฐมวัย" : "Early Childhood ROI", desc: isThai ? "Heckman: ROI 7-10%" : "Heckman: ROI 7-10%" },
            { href: "/research/spacing-effect", icon: "⏱️", title: isThai ? "Spacing Effect" : "Spacing Effect", desc: isThai ? "ทบทวนเว้นระยะ จำนาน" : "Learn Less, Remember More" },
            { href: "/research/retrieval-practice", icon: "🧪", title: isThai ? "Retrieval Practice" : "Retrieval Practice", desc: isThai ? "ดึงความจำ ยิ่งจำดี" : "Testing Effect Boosts Learning" },
            { href: "/research/sleep-learning", icon: "😴", title: isThai ? "การนอน & การเรียน" : "Sleep & Learning", desc: isThai ? "นอนพอ = เรียนดี" : "Sleep Shapes Performance" },
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

      {/* ── External Resources ── */}
      <section className="mb-8">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {isThai ? "แหล่งข้อมูลภายนอก" : "External Resources"}
        </div>
        <div className="flex flex-col gap-2">
          {[
            { url: "https://scholar.google.com/", label: "Google Scholar", desc: isThai ? "ค้นหางานวิจัยเพิ่มเติม" : "Search for more research" },
            { url: "https://www.oecd.org/pisa/", label: "OECD PISA", desc: isThai ? "ผลสอบ PISA นานาชาติ" : "International PISA Results" },
            { url: "https://visible-learning.org/", label: "Visible Learning", desc: isThai ? "Meta-analysis ของ John Hattie" : "John Hattie's Meta-analysis" },
            { url: "https://doi.org/", label: "DOI.org", desc: isThai ? "ค้นหางานวิจัยจาก DOI" : "Find research by DOI" },
          ].map((ext) => (
            <a
              key={ext.url}
              href={ext.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 no-underline transition-all active:scale-[0.98]"
            >
              <div>
                <div className="text-[13px] font-bold text-[var(--color-text)]">{ext.label}</div>
                <div className="text-[11px] text-[var(--color-text-secondary)]">{ext.desc}</div>
              </div>
              <span className="text-[var(--color-text-secondary)]">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Back button ── */}
      <Link
        href="/"
        className="mt-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backHome")}
      </Link>

      {/* ── JSON-LD Structured Data (all 29 entries for AI crawlers) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Research Timeline — 129 Years of Education & Parenting Research",
            description:
              "29 landmark studies from 1897–2026 across education, parenting, learning science, and psychometrics. Organized in 4 eras with full APA references and DOI links.",
            url: "https://schoolfinder.app/research",
            about: [
              { "@type": "Thing", name: "Education Research" },
              { "@type": "Thing", name: "Child Development" },
              { "@type": "Thing", name: "Parenting Styles" },
              { "@type": "Thing", name: "Evidence-Based Education" },
              { "@type": "Thing", name: "Executive Function" },
              { "@type": "Thing", name: "Flynn Effect" },
              { "@type": "Thing", name: "Learning Styles Myth" },
            ],
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
            inLanguage: ["th", "en", "zh", "ja"],
            numberOfItems: entries.length,
            dateModified: new Date().toISOString().split("T")[0],
            isAccessibleForFree: true,
            license: "https://creativecommons.org/licenses/by-nc/4.0/",
            mainEntity: entries.map((e) => ({
              "@type": "ScholarlyArticle",
              name: e.title,
              author: { "@type": "Person", name: e.researcher },
              datePublished: `${e.year}`,
              description: e.description_en || e.impact,
              about: e.mindmap_slugs.map((s) => ({ "@type": "DefinedTerm", name: slugLabels[s] || s })),
              ...(e.references[0]?.doi
                ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: e.references[0].doi } }
                : {}),
              ...(e.references[0]?.doi
                ? { url: `https://doi.org/${e.references[0].doi}` }
                : {}),
              citation: e.references.map((r) =>
                `${r.author} (${r.year}). ${r.title}.${r.journal ? ` ${r.journal}` : ""}${r.doi ? ` https://doi.org/${r.doi}` : ""}`
              ).join("; "),
            })),
          }),
        }}
      />

      {/* ── FAQ JSON-LD for AI Featured Snippets ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is evidence-based education research?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Evidence-based education research covers 129 years of peer-reviewed studies (1897-2026) on teaching methods, parenting styles, child development, and learning science. Key researchers include Dewey, Montessori, Piaget, Vygotsky, Baumrind, Hattie, and Duckworth.",
                },
              },
              {
                "@type": "Question",
                name: "What are the 4 parenting styles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Diana Baumrind (1966) identified Authoritative, Authoritarian, and Permissive styles. Maccoby & Martin (1983) added Neglectful/Uninvolved as the 4th type using a 2×2 grid of responsiveness and demandingness.",
                },
              },
              {
                "@type": "Question",
                name: "Is the learning styles theory supported by evidence?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Coffield et al. (2004) reviewed 71 learning style models and found weak evidence. Pashler et al. (2008) conducted a rigorous review and concluded there is no adequate evidence for matching instruction to learning styles.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Flynn Effect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "James Flynn (1984) discovered IQ scores rose ~3 points per decade across 14 nations. However, Bratsberg & Røgeberg (2018) found the effect reversed in Norway after 1975, with scores declining within families, suggesting environmental rather than genetic factors.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
