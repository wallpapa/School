"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { IconSearch, IconCompare, IconTarget } from "@/components/ui/Icons";

/* ── Stage definitions with SVG icons ── */
const stages: {
  key: string;
  icon: ReactNode;
  titleKey: string;
  descKey: string;
  href: string;
  accent: string;
}[] = [
  {
    key: "explore",
    icon: <IconSearch className="h-6 w-6" />,
    titleKey: "stageExploreTitle",
    descKey: "stageExploreDesc",
    href: "/find",
    accent: "text-[#0071E3] bg-[#0071E3]/8",
  },
  {
    key: "compare",
    icon: <IconCompare className="h-6 w-6" />,
    titleKey: "stageCompareTitle",
    descKey: "stageCompareDesc",
    href: "/compare",
    accent: "text-[#FF9F0A] bg-[#FF9F0A]/8",
  },
  {
    key: "apply",
    icon: <IconTarget className="h-6 w-6" />,
    titleKey: "stageApplyTitle",
    descKey: "stageApplyDesc",
    href: "/calendar",
    accent: "text-[#34C759] bg-[#34C759]/8",
  },
];

/* ── Animated counter (Neuro-UX: dopamine from watching numbers climb) ── */
function AnimatedNum({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-[24px] font-extrabold tracking-tight text-[var(--color-text)]">
      {val}{suffix}
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="animate-page-enter">
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden pb-8 pt-12 text-center lg:pb-10 lg:pt-16">
        {/* Ambient background glow */}
        <div className="animate-glow pointer-events-none absolute -left-[30%] -top-[60%] h-[160%] w-[160%]" style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(0,113,227,.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(52,199,89,.03) 0%, transparent 60%)",
        }} />

        <div className="relative">
          {/* Brand label — small, tracking-wide, secondary */}
          <div className="mb-5 text-[10px] font-bold uppercase tracking-[3px] text-[var(--color-text-secondary)]">
            {t("brandName")}
          </div>

          {/* H1 — largest element on page (Visual Hierarchy: Size & Scale) */}
          <h1
            className="animate-shimmer mb-4 bg-clip-text text-[32px] font-extrabold leading-[1.2] tracking-tight [-webkit-text-fill-color:transparent] md:text-[40px] lg:text-[48px]"
            style={{
              background: "linear-gradient(135deg, #1D1D1F 0%, #0071E3 50%, #1D1D1F 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            dangerouslySetInnerHTML={{ __html: t("homeHeadline") }}
          />

          {/* Subtitle — secondary weight, readable line height */}
          <p
            className="mx-auto mb-8 max-w-[420px] text-[15px] leading-relaxed text-[var(--color-text-secondary)] md:text-[16px] lg:max-w-[520px]"
            dangerouslySetInnerHTML={{ __html: t("homeSub") }}
          />

          {/* Stats — tight 3-column with clear visual rhythm (Gestalt: Proximity) */}
          <div className="mx-auto mb-0 flex max-w-[320px] justify-between">
            {[
              { target: 160, suffix: "", labelKey: "statSchools" },
              { target: 10, suffix: "+", labelKey: "statCur" },
              { target: 2026, suffix: "", labelKey: "statUpdate" },
            ].map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <AnimatedNum target={stat.target} suffix={stat.suffix} />
                <div className="mt-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stage Cards — visual hierarchy through icon accent colors ── */}
      <div className="mb-8 flex flex-col gap-3 md:grid md:grid-cols-3">
        {stages.map((stage, i) => (
          <Link
            key={stage.key}
            href={stage.href}
            className="card-interactive group flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 text-left no-underline md:flex-col md:items-center md:px-5 md:py-6 md:text-center"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Icon container — color-coded accent (Visual Hierarchy: Colour & Contrast) */}
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${stage.accent} md:h-14 md:w-14`}>
              {stage.icon}
            </div>
            <div className="flex-1 md:flex-initial">
              <div className="text-[15px] font-bold text-[var(--color-text)]">
                {t(stage.titleKey)}
              </div>
              <div className="mt-0.5 text-[12px] leading-snug text-[var(--color-text-secondary)]">
                {t(stage.descKey)}
              </div>
            </div>
            {/* Arrow indicator — mobile only (Fitts's Law: clear affordance) */}
            <svg
              className="flex-shrink-0 text-[var(--color-text-secondary)] opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-70 md:hidden"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>

      {/* ── Primary CTA — full-width, high contrast (Fitts's Law: large target) ── */}
      <div className="md:flex md:gap-3">
        <Link
          href="/find"
          className="relative block w-full overflow-hidden rounded-2xl bg-[var(--color-text)] px-5 py-4 text-center text-[16px] font-bold tracking-tight text-white no-underline transition-all duration-200 active:scale-[0.98] active:opacity-90 md:flex-1"
        >
          {t("ctaSearch")}
        </Link>

        <Link
          href="/quiz"
          className="mt-3 block w-full rounded-2xl border border-[var(--color-border)] bg-transparent px-5 py-3.5 text-center text-[14px] font-medium text-[var(--color-text-secondary)] no-underline transition-all duration-200 hover:border-[var(--color-text-secondary)] active:scale-[0.98] md:mt-0 md:flex-1"
        >
          {t("ctaQuiz")}
        </Link>
      </div>
    </div>
  );
}
