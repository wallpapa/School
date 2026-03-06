"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { useSchoolUpdates, useUpcomingEvents } from "@/hooks/useSchoolUpdates";
import UpdateCard from "@/components/ui/UpdateCard";
import { schools } from "@/data/schools";
import {
  IconBookOpen, IconMicroscope, IconNewspaper, IconChevronRight,
  IconSchoolThai, IconSchoolEP, IconSchoolBilingual, IconSchoolTrilingual,
  IconSchoolInter, IconSchoolAlt, IconHeart, IconFamily, IconBrain,
  IconLightning, IconBaby, IconCalendar, IconFlask, IconMoon,
  IconBook, IconCake, IconCompare,
} from "@/components/ui/Icons";

/* ── Tab definitions with SVG icons ── */
const tabs: { key: TabKey; labelKey: string; icon: ReactNode }[] = [
  { key: "guide", labelKey: "learnTabGuide", icon: <IconBookOpen className="h-4 w-4" /> },
  { key: "research", labelKey: "learnTabResearch", icon: <IconMicroscope className="h-4 w-4" /> },
  { key: "updates", labelKey: "learnTabUpdates", icon: <IconNewspaper className="h-4 w-4" /> },
];

type TabKey = "guide" | "research" | "updates";

/* ── School type cards with SVG icons ── */
const schoolTypes: { icon: ReactNode; nameKey: string; feeRange: string; ageRange: string; accent: string }[] = [
  { icon: <IconSchoolThai className="h-5 w-5" />, nameKey: "guideThaiName", feeRange: "3K–30K/yr", ageRange: "อ.1 – ม.6", accent: "text-[#FF3B30] bg-[#FF3B30]/8" },
  { icon: <IconSchoolEP className="h-5 w-5" />, nameKey: "guideEpName", feeRange: "20K–60K/yr", ageRange: "อ.1 – ม.6", accent: "text-[#0071E3] bg-[#0071E3]/8" },
  { icon: <IconSchoolBilingual className="h-5 w-5" />, nameKey: "guideBiName", feeRange: "50K–200K/yr", ageRange: "อ.1 – ม.6", accent: "text-[#5856D6] bg-[#5856D6]/8" },
  { icon: <IconSchoolTrilingual className="h-5 w-5" />, nameKey: "guideTriName", feeRange: "50K–280K/yr", ageRange: "อ.1 – ม.6", accent: "text-[#FF9F0A] bg-[#FF9F0A]/8" },
  { icon: <IconSchoolInter className="h-5 w-5" />, nameKey: "guideInterName", feeRange: "200K–1M+/yr", ageRange: "EY – Y13", accent: "text-[#34C759] bg-[#34C759]/8" },
  { icon: <IconSchoolAlt className="h-5 w-5" />, nameKey: "guideAltName", feeRange: "60K–300K/yr", ageRange: "อ.1 – ป.6", accent: "text-[#AF52DE] bg-[#AF52DE]/8" },
];

/* ── Research deep-dive links with SVG icons ── */
const deepDives: { slug: string; icon: ReactNode; titleKey: string; accent: string }[] = [
  { slug: "attachment", icon: <IconHeart className="h-5 w-5" />, titleKey: "rdAttachment", accent: "text-[#FF3B30] bg-[#FF3B30]/8" },
  { slug: "authoritative-parenting", icon: <IconFamily className="h-5 w-5" />, titleKey: "rdParenting", accent: "text-[#0071E3] bg-[#0071E3]/8" },
  { slug: "learning-styles", icon: <IconBrain className="h-5 w-5" />, titleKey: "rdLearningStyles", accent: "text-[#AF52DE] bg-[#AF52DE]/8" },
  { slug: "cognitive-load", icon: <IconLightning className="h-5 w-5" />, titleKey: "rdCognitiveLoad", accent: "text-[#FF9F0A] bg-[#FF9F0A]/8" },
  { slug: "early-childhood", icon: <IconBaby className="h-5 w-5" />, titleKey: "rdEarlyChildhood", accent: "text-[#34C759] bg-[#34C759]/8" },
  { slug: "spacing-effect", icon: <IconCalendar className="h-5 w-5" />, titleKey: "rdSpacingEffect", accent: "text-[#5856D6] bg-[#5856D6]/8" },
  { slug: "retrieval-practice", icon: <IconFlask className="h-5 w-5" />, titleKey: "rdRetrieval", accent: "text-[#0071E3] bg-[#0071E3]/8" },
  { slug: "sleep-learning", icon: <IconMoon className="h-5 w-5" />, titleKey: "rdSleep", accent: "text-[#5856D6] bg-[#5856D6]/8" },
];

/* ── Section title component (Visual Hierarchy: Typography Hierarchy + Repetition) ── */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-[var(--color-text-secondary)]">
      {children}
    </h2>
  );
}

/* ── Arrow link component (Repetition: consistent navigation pattern) ── */
function ArrowLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3.5 text-[13px] font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-text-secondary)]"
    >
      <span className="flex items-center gap-2.5">
        <span className="text-[var(--color-text-secondary)]">{icon}</span>
        {label}
      </span>
      <IconChevronRight className="h-4 w-4 text-[var(--color-text-secondary)] opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-70" />
    </Link>
  );
}

export default function LearnPage() {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabKey>("guide");
  const { updates, loading: updatesLoading } = useSchoolUpdates();
  const { events } = useUpcomingEvents(4);

  return (
    <div className="animate-page-enter">
      {/* ── Hero — clean SVG icon, clear hierarchy ── */}
      <div className="mb-8 pt-2 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
          <IconBook className="h-7 w-7" />
        </div>
        <h1 className="mb-1 text-[22px] font-extrabold tracking-tight text-[var(--color-text)] md:text-[26px]">
          {t("learnTitle")}
        </h1>
        <p className="text-[14px] text-[var(--color-text-secondary)]">
          {t("learnSub")}
        </p>
      </div>

      {/* ── Tab bar — segmented control with SVG icons (Hick's Law: 3 clear choices) ── */}
      <div className="mb-8 flex gap-1 rounded-2xl bg-[var(--color-surface)] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab.icon}
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* ══════════ Guide Tab ══════════ */}
      {activeTab === "guide" && (
        <div className="space-y-6">
          {/* School types grid — color-coded icons (Colour & Contrast) */}
          <div>
            <SectionTitle>{t("guideSchoolTypesTitle")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
              {schoolTypes.map((st, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5"
                >
                  <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${st.accent}`}>
                    {st.icon}
                  </div>
                  <div className="text-[13px] font-bold leading-tight text-[var(--color-text)]">
                    {t(st.nameKey)}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--color-text-secondary)]">
                    {st.feeRange} · {st.ageRange}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links (Alignment: consistent arrow-link pattern) */}
          <div className="space-y-2">
            <ArrowLink href="/guide" icon={<IconBookOpen className="h-4 w-4" />} label={t("learnGuideFullLink")} />
            <ArrowLink href="/tools/curriculum-guide" icon={<IconCompare className="h-4 w-4" />} label={t("rdCurriculum")} />
            <ArrowLink href="/birth-date" icon={<IconCake className="h-4 w-4" />} label={t("learnBirthDateLink")} />
          </div>
        </div>
      )}

      {/* ══════════ Research Tab ══════════ */}
      {activeTab === "research" && (
        <div className="space-y-6">
          {/* Stats row (Visual Hierarchy: bold numbers draw attention) */}
          <div className="flex gap-2.5">
            {[
              { val: "29", label: t("researchStatStudies") },
              { val: "129", label: t("researchStatYears") },
              { val: "42+", label: t("researchStatCountries") },
            ].map((s, i) => (
              <div
                key={i}
                className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 text-center"
              >
                <div className="text-[20px] font-extrabold tracking-tight text-[var(--color-text)]">
                  {s.val}
                </div>
                <div className="mt-0.5 text-[10px] font-medium text-[var(--color-text-secondary)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Deep-dive grid — color-coded icon circles (Colour & Contrast + Repetition) */}
          <div>
            <SectionTitle>{t("learnDeepDivesTitle")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {deepDives.map((dd) => (
                <Link
                  key={dd.slug}
                  href={`/research/${dd.slug}`}
                  className="card-interactive group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5"
                >
                  <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${dd.accent}`}>
                    {dd.icon}
                  </div>
                  <div className="text-[12px] font-semibold leading-snug text-[var(--color-text)]">
                    {t(dd.titleKey)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Full timeline link */}
          <ArrowLink href="/research" icon={<IconMicroscope className="h-4 w-4" />} label={t("learnResearchFullLink")} />
        </div>
      )}

      {/* ══════════ Updates Tab ══════════ */}
      {activeTab === "updates" && (
        <div className="space-y-5">
          {/* Upcoming events — horizontal scroll (Negative Space: breathing room) */}
          {events.length > 0 && (
            <div>
              <SectionTitle>{t("learnUpcoming")}</SectionTitle>
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                {events.map((ev) => {
                  const school = schools.find((s) => s.id === ev.school_id);
                  return (
                    <div
                      key={ev.id}
                      className="min-w-[200px] flex-shrink-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                        {school?.short}
                      </div>
                      <div className="mt-1 text-[13px] font-semibold leading-snug text-[var(--color-text)]">
                        {lang === "th" ? ev.title_th : ev.title_en}
                      </div>
                      {ev.event_date && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-accent)]">
                          <IconCalendar className="h-3.5 w-3.5" />
                          {ev.event_date}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Update feed */}
          {updatesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
              ))}
            </div>
          ) : updates.length === 0 ? (
            <div className="py-16 text-center text-[14px] text-[var(--color-text-secondary)]">
              {t("noUpdates")}
            </div>
          ) : (
            <div className="space-y-3">
              {updates.slice(0, 10).map((u) => {
                const schoolName = schools.find((s) => s.id === u.school_id)?.short;
                return (
                  <div key={u.id}>
                    {schoolName && (
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                        {schoolName}
                      </div>
                    )}
                    <UpdateCard update={u} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Full news link */}
          <ArrowLink href="/news" icon={<IconNewspaper className="h-4 w-4" />} label={t("learnNewsFullLink")} />
        </div>
      )}
    </div>
  );
}
