"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── School Type Data ── */
const schoolTypes = [
  {
    key: "thai",
    emoji: "🇹🇭",
    gradient: "from-[#FFE5E5] to-[#FFD1D1]",
    feeRange: "3K–30K",
    ages: "อ.1 – ม.6",
    prosKey: "guideThaiPros",
    consKey: "guideThaiCons",
  },
  {
    key: "ep",
    emoji: "📘",
    gradient: "from-[#E5F0FF] to-[#D1E5FF]",
    feeRange: "20K–60K",
    ages: "อ.1 – ม.6",
    prosKey: "guideEpPros",
    consKey: "guideEpCons",
  },
  {
    key: "bilingual",
    emoji: "🌐",
    gradient: "from-[#E5FFE5] to-[#D1FFD1]",
    feeRange: "50K–200K",
    ages: "อ.1 – ม.6",
    prosKey: "guideBiPros",
    consKey: "guideBiCons",
  },
  {
    key: "trilingual",
    emoji: "🌏",
    gradient: "from-[#FFF5E5] to-[#FFE8CC]",
    feeRange: "50K–280K",
    ages: "อ.1 – ม.6",
    prosKey: "guideTriPros",
    consKey: "guideTriCons",
  },
  {
    key: "international",
    emoji: "🏫",
    gradient: "from-[#F0E5FF] to-[#E0D1FF]",
    feeRange: "300K–950K",
    ages: "Nursery – Y13",
    prosKey: "guideIntlPros",
    consKey: "guideIntlCons",
  },
  {
    key: "alternative",
    emoji: "🌱",
    gradient: "from-[#FFFDE5] to-[#FFF8CC]",
    feeRange: "50K–200K",
    ages: "2 ขวบ – ม.6",
    prosKey: "guideAltPros",
    consKey: "guideAltCons",
  },
];

/* ── Timeline data ── */
const timelineSteps = [
  { ageKey: "guideTimeline1Age", descKey: "guideTimeline1Desc", emoji: "👶" },
  { ageKey: "guideTimeline2Age", descKey: "guideTimeline2Desc", emoji: "🔍" },
  { ageKey: "guideTimeline3Age", descKey: "guideTimeline3Desc", emoji: "📋" },
  { ageKey: "guideTimeline4Age", descKey: "guideTimeline4Desc", emoji: "🎯" },
  { ageKey: "guideTimeline5Age", descKey: "guideTimeline5Desc", emoji: "📝" },
  { ageKey: "guideTimeline6Age", descKey: "guideTimeline6Desc", emoji: "🎒" },
];

/* ── Budget tiers ── */
const budgetTiers = [
  { rangeKey: "guideBudget1Range", whatKey: "guideBudget1What", color: "#34C759", pct: 15 },
  { rangeKey: "guideBudget2Range", whatKey: "guideBudget2What", color: "#5AC8FA", pct: 35 },
  { rangeKey: "guideBudget3Range", whatKey: "guideBudget3What", color: "#FF9500", pct: 60 },
  { rangeKey: "guideBudget4Range", whatKey: "guideBudget4What", color: "#FF3B30", pct: 100 },
];

/* ── FAQ ── */
const faqs = [
  { qKey: "guideFaq1Q", aKey: "guideFaq1A" },
  { qKey: "guideFaq2Q", aKey: "guideFaq2A" },
  { qKey: "guideFaq3Q", aKey: "guideFaq3A" },
  { qKey: "guideFaq4Q", aKey: "guideFaq4A" },
  { qKey: "guideFaq5Q", aKey: "guideFaq5A" },
];

export default function GuidePage() {
  const { t } = useLang();
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="animate-page-enter">
      {/* Hero */}
      <div className="mb-6 text-center">
        <div className="mb-2 text-4xl">📖</div>
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("guideTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("guideSub")}
        </p>
        <div className="mt-3 inline-block rounded-full bg-[var(--color-success)]/10 px-4 py-1.5 text-[11px] font-bold text-[var(--color-success)]">
          {t("guideFreeLabel")}
        </div>
      </div>

      {/* ── Section 1: School Types ── */}
      <div className="mb-6">
        <h3 className="mb-3 text-[16px] font-extrabold">
          {t("guideTypesTitle")}
        </h3>
        <div className="flex flex-col gap-2.5">
          {schoolTypes.map((type) => (
            <button
              key={type.key}
              onClick={() =>
                setExpandedType(expandedType === type.key ? null : type.key)
              }
              className="w-full text-left"
            >
              <div
                className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all ${
                  expandedType === type.key ? "ring-2 ring-[var(--color-accent)]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xl ${type.gradient}`}
                  >
                    {type.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold">
                      {t(`guideType${type.key.charAt(0).toUpperCase() + type.key.slice(1)}`)}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-secondary)]">
                      {type.feeRange}/ปี • {type.ages}
                    </div>
                  </div>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-[var(--color-text-secondary)] transition-transform ${
                      expandedType === type.key ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </div>

                {expandedType === type.key && (
                  <div className="mt-3 border-t border-[var(--color-border)] pt-3">
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase text-[var(--color-success)]">
                        ✅ {t("guideProLabel")}
                      </span>
                      <p className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">
                        {t(type.prosKey)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--color-error)]">
                        ⚠️ {t("guideConLabel")}
                      </span>
                      <p className="mt-0.5 text-[12px] text-[var(--color-text-secondary)]">
                        {t(type.consKey)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section 2: Timeline ── */}
      <div className="mb-6">
        <h3 className="mb-3 text-[16px] font-extrabold">
          {t("guideTimelineTitle")}
        </h3>
        <div className="relative pl-6">
          <div className="absolute left-[10px] top-2 bottom-2 w-[2px] bg-[var(--color-border)]" />
          {timelineSteps.map((step, i) => (
            <div key={i} className="relative pb-4">
              <div className="absolute left-[-20px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[12px]">
                {step.emoji}
              </div>
              <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
                <div className="text-[13px] font-bold">{t(step.ageKey)}</div>
                <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                  {t(step.descKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Budget Reality Check ── */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#1D1D1F] to-[#2D2D3F] p-5 text-white">
        <h3 className="mb-1 text-[16px] font-extrabold">
          {t("guideBudgetTitle")}
        </h3>
        <p className="mb-4 text-[11px] text-white/50">
          {t("guideBudgetSub")}
        </p>
        <div className="space-y-3">
          {budgetTiers.map((tier, i) => (
            <div key={i}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="font-semibold">{t(tier.rangeKey)}</span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-lg transition-all duration-700"
                  style={{
                    width: `${tier.pct}%`,
                    background: tier.color,
                    opacity: 0.8,
                  }}
                />
                <div className="absolute inset-0 flex items-center px-3 text-[11px] font-medium">
                  {t(tier.whatKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 4: Curriculum Decoder ── */}
      <div className="mb-6">
        <h3 className="mb-3 text-[16px] font-extrabold">
          {t("guideCurrTitle")}
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {t("guideCurrName")}
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {t("guideCurrLang")}
                </th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                  {t("guideCurrUni")}
                </th>
              </tr>
            </thead>
            <tbody>
              {(["ib", "igcse", "us", "thai", "montessori"] as const).map((cur) => (
                <tr key={cur} className="border-b border-[var(--color-border)] last:border-b-0">
                  <td className="px-3 py-2.5 font-medium">{t(`guideCurr${cur.charAt(0).toUpperCase() + cur.slice(1)}`)}</td>
                  <td className="px-3 py-2.5 text-center text-[var(--color-text-secondary)]">{t(`guideCurrLang${cur.charAt(0).toUpperCase() + cur.slice(1)}`)}</td>
                  <td className="px-3 py-2.5 text-center text-[var(--color-text-secondary)]">{t(`guideCurrUni${cur.charAt(0).toUpperCase() + cur.slice(1)}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 5: FAQ ── */}
      <div className="mb-6">
        <h3 className="mb-3 text-[16px] font-extrabold">
          {t("guideFaqTitle")}
        </h3>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              className="w-full text-left"
            >
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold">
                    {t(faq.qKey)}
                  </span>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-[var(--color-text-secondary)] transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </div>
                {expandedFaq === i && (
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                    {t(faq.aKey)}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <Link
          href="/find"
          className="block w-full rounded-xl bg-[var(--color-text)] px-4 py-3.5 text-center text-[14px] font-bold text-white no-underline transition-all active:scale-[0.98]"
        >
          {t("ctaSearch")}
        </Link>
        <Link
          href="/compare"
          className="block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-center text-[13px] font-medium text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.98]"
        >
          {t("guideCtaCompare")}
        </Link>
      </div>

      {/* Back */}
      <Link
        href="/"
        className="mt-4 mb-4 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
