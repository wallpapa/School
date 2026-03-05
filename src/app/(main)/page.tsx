"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

const stages = [
  { key: "explore", emoji: "🔍", titleKey: "stageExploreTitle", descKey: "stageExploreDesc", href: "/find", gradient: "from-[#E8F5FF] to-[#D1ECFF]" },
  { key: "compare", emoji: "⚖️", titleKey: "stageCompareTitle", descKey: "stageCompareDesc", href: "/find", gradient: "from-[#FFF3E0] to-[#FFE8CC]" },
  { key: "apply", emoji: "🎯", titleKey: "stageApplyTitle", descKey: "stageApplyDesc", href: "/calendar", gradient: "from-[#E8FFF0] to-[#D1FFE0]" },
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
            // Ease-out cubic
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
    <div ref={ref} className="text-[22px] font-extrabold tracking-tight">
      {val}{suffix}
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="animate-page-enter">
      {/* Hero */}
      <div className="relative overflow-hidden pb-5 pt-10 text-center lg:pb-8 lg:pt-14">
        {/* Background glow */}
        <div className="animate-glow pointer-events-none absolute -left-[30%] -top-[60%] h-[160%] w-[160%]" style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(0,113,227,.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(52,199,89,.03) 0%, transparent 60%)",
        }} />

        <div className="relative">
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[3px] text-[var(--color-text-secondary)]">
            {t("brandName")}
          </div>

          <h1
            className="animate-shimmer mb-3 bg-clip-text text-[32px] font-extrabold leading-[1.25] tracking-tight [-webkit-text-fill-color:transparent] md:text-[38px] lg:text-[44px]"
            style={{
              background: "linear-gradient(135deg, #1D1D1F 0%, #0071E3 50%, #1D1D1F 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            dangerouslySetInnerHTML={{ __html: t("homeHeadline") }}
          />

          <p
            className="mb-7 text-[15px] font-normal leading-relaxed text-[var(--color-text-secondary)] md:text-[16px] lg:mx-auto lg:max-w-[600px]"
            dangerouslySetInnerHTML={{ __html: t("homeSub") }}
          />

          {/* Stats — animated counters for dopamine reward */}
          <div className="mb-7 flex justify-center gap-5">
            <div className="text-center">
              <AnimatedNum target={160} />
              <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                {t("statSchools")}
              </div>
            </div>
            <div className="text-center">
              <AnimatedNum target={10} suffix="+" />
              <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                {t("statCur")}
              </div>
            </div>
            <div className="text-center">
              <AnimatedNum target={2026} />
              <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">
                {t("statUpdate")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Cards — staggered entrance (Neuro-UX: progressive disclosure) */}
      <div className="mb-6 flex flex-col gap-3 md:grid md:grid-cols-3">
        {stages.map((stage, i) => (
          <Link
            key={stage.key}
            href={stage.href}
            className="card-interactive flex items-center gap-4 rounded-2xl border border-[rgba(210,210,215,0.6)] bg-[rgba(255,255,255,0.7)] px-5 py-[18px] text-left no-underline backdrop-blur-[20px] md:flex-col md:items-center md:px-4 md:py-5 md:text-center"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br text-2xl md:h-14 md:w-14 ${stage.gradient}`}
            >
              {stage.emoji}
            </div>
            <div className="flex-1 md:flex-initial">
              <div className="text-[15px] font-bold text-[var(--color-text)]">
                {t(stage.titleKey)}
              </div>
              <div className="text-[12px] leading-snug text-[var(--color-text-secondary)]">
                {t(stage.descKey)}
              </div>
            </div>
            <svg
              className="flex-shrink-0 text-[var(--color-border)] transition-transform duration-300 group-hover:translate-x-1 md:hidden"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M8 5l5 5-5 5" />
            </svg>
          </Link>
        ))}
      </div>

      {/* CTAs */}
      <div className="md:flex md:gap-3">
        <Link
          href="/find"
          className="relative block w-full overflow-hidden rounded-[14px] border-none bg-[var(--color-text)] px-4 py-4 text-center text-base font-bold tracking-tight text-white no-underline transition-all duration-200 active:scale-[0.98] active:opacity-90 md:flex-1"
        >
          {t("ctaSearch")}
        </Link>

        <Link
          href="/quiz"
          className="mt-2.5 block w-full rounded-[14px] border border-[var(--color-border)] bg-transparent px-4 py-3.5 text-center text-[13px] font-medium text-[var(--color-text-secondary)] no-underline transition-all duration-200 active:scale-[0.98] md:mt-0 md:flex-1"
        >
          {t("ctaQuiz")}
        </Link>
      </div>

    </div>
  );
}
