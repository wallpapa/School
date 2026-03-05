"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { schools, schoolById } from "@/data/schools";

type Tab = "readiness" | "compare" | "timeline" | "tips";

export default function TransferPage() {
  const { t } = useLang();

  const tabs: { key: Tab; labelKey: string; emoji: string }[] = [
    { key: "readiness", labelKey: "transferTabReadiness", emoji: "🧭" },
    { key: "compare", labelKey: "transferTabCompare", emoji: "⚖️" },
    { key: "timeline", labelKey: "transferTabTimeline", emoji: "📅" },
    { key: "tips", labelKey: "transferTabTips", emoji: "💡" },
  ];

  const readinessChecks = [
    { id: "academic", text: t("transferCheckAcademic"), weight: 3 },
    { id: "social", text: t("transferCheckSocial"), weight: 4 },
    { id: "lang", text: t("transferCheckLang"), weight: 3 },
    { id: "commute", text: t("transferCheckCommute"), weight: 2 },
    { id: "fee", text: t("transferCheckFee"), weight: 2 },
    { id: "style", text: t("transferCheckStyle"), weight: 3 },
    { id: "ef", text: t("transferCheckEf"), weight: 2 },
    { id: "parent", text: t("transferCheckParent"), weight: 1 },
  ];

  const transferTips = [
    { title: t("transferTipTitle1"), items: [t("transferTip1a"), t("transferTip1b"), t("transferTip1c"), t("transferTip1d")] },
    { title: t("transferTipTitle2"), items: [t("transferTip2a"), t("transferTip2b"), t("transferTip2c"), t("transferTip2d")] },
    { title: t("transferTipTitle3"), items: [t("transferTip3a"), t("transferTip3b"), t("transferTip3c"), t("transferTip3d")] },
  ];
  const [activeTab, setActiveTab] = useState<Tab>("readiness");
  const [checks, setChecks] = useState<Set<string>>(new Set());
  const [fromSchool, setFromSchool] = useState<number | null>(null);
  const [toSchool, setToSchool] = useState<number | null>(null);

  const toggleCheck = (id: string) => {
    setChecks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const readinessScore = readinessChecks.reduce(
    (sum, c) => sum + (checks.has(c.id) ? c.weight : 0),
    0
  );
  const maxScore = readinessChecks.reduce((sum, c) => sum + c.weight, 0);
  const readinessPercent = Math.round((readinessScore / maxScore) * 100);

  const fromData = fromSchool ? schoolById.get(fromSchool) : null;
  const toData = toSchool ? schoolById.get(toSchool) : null;

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("transferTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("transferSub")}
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[12px] font-medium transition-all ${
              activeTab === tab.key
                ? "bg-[var(--color-text)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{t(tab.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "readiness" && (
        <div>
          {/* Score display */}
          <div className="mb-4 rounded-2xl bg-[var(--color-surface)] p-4 text-center">
            <div
              className={`text-[36px] font-extrabold ${
                readinessPercent >= 60
                  ? "text-[var(--color-error)]"
                  : readinessPercent >= 30
                  ? "text-[var(--color-warning)]"
                  : "text-[var(--color-success)]"
              }`}
            >
              {readinessPercent}%
            </div>
            <div className="text-[12px] text-[var(--color-text-secondary)]">
              {readinessPercent >= 60
                ? t("transferScoreHigh")
                : readinessPercent >= 30
                ? t("transferScoreMid")
                : t("transferScoreLow")}
            </div>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
            {readinessChecks.map((check) => (
              <button
                key={check.id}
                onClick={() => toggleCheck(check.id)}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  checks.has(check.id)
                    ? "border-[var(--color-error)] bg-[var(--color-error)]/5"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${
                    checks.has(check.id)
                      ? "border-[var(--color-error)] bg-[var(--color-error)] text-white"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  {checks.has(check.id) && "✓"}
                </span>
                <span className="text-[13px]">{check.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="mb-3">
            <div className="mb-1.5 text-[11px] font-bold uppercase text-[var(--color-text-secondary)]">
              {t("transferCurrentSchool")}
            </div>
            <select
              className="form-input"
              value={fromSchool ?? ""}
              onChange={(e) => setFromSchool(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">{t("transferSelectSchool")}</option>
              {schools.filter((s) => !s.upcoming).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.flag} {s.short}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <div className="mb-1.5 text-[11px] font-bold uppercase text-[var(--color-text-secondary)]">
              {t("transferTargetSchool")}
            </div>
            <select
              className="form-input"
              value={toSchool ?? ""}
              onChange={(e) => setToSchool(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">{t("transferSelectSchool")}</option>
              {schools.filter((s) => !s.upcoming).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.flag} {s.short}
                </option>
              ))}
            </select>
          </div>
          </div>{/* close compare selectors grid */}

          {fromData && toData && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-[var(--color-border)] bg-white p-3">
                <div className="text-center text-[12px] font-bold">{fromData.short}</div>
                <div className="text-center text-[10px] text-[var(--color-text-secondary)]">{t("transferVs")}</div>
                <div className="text-center text-[12px] font-bold">{toData.short}</div>
              </div>
              {/* Rows */}
              {[
                { label: t("transferCurriculum"), a: fromData.curL, b: toData.curL },
                { label: t("transferFeeYear"), a: `${(fromData.tMin / 1000).toFixed(0)}K–${(fromData.tMax / 1000).toFixed(0)}K`, b: `${(toData.tMin / 1000).toFixed(0)}K–${(toData.tMax / 1000).toFixed(0)}K` },
                { label: t("transferEfScore"), a: `${fromData.efScore}/10`, b: `${toData.efScore}/10` },
                { label: t("transferLocation"), a: fromData.locL, b: toData.locL },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-3 border-b border-[var(--color-border)]/50 px-3 py-2.5">
                  <div className="text-center text-[11px]">{row.a}</div>
                  <div className="text-center text-[10px] text-[var(--color-text-secondary)]">{row.label}</div>
                  <div className="text-center text-[11px]">{row.b}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="flex flex-col gap-3">
          {[
            { month: t("transferTimeline1"), tasks: [t("transferTimeline1a"), t("transferTimeline1b"), t("transferTimeline1c")] },
            { month: t("transferTimeline2"), tasks: [t("transferTimeline2a"), t("transferTimeline2b"), t("transferTimeline2c")] },
            { month: t("transferTimeline3"), tasks: [t("transferTimeline3a"), t("transferTimeline3b"), t("transferTimeline3c")] },
            { month: t("transferTimeline4"), tasks: [t("transferTimeline4a"), t("transferTimeline4b"), t("transferTimeline4c")] },
            { month: t("transferTimeline5"), tasks: [t("transferTimeline5a"), t("transferTimeline5b"), t("transferTimeline5c")] },
          ].map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-text)] text-[12px] font-bold text-white">
                  {i + 1}
                </div>
                {i < 4 && <div className="h-full w-0.5 bg-[var(--color-border)]" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="text-[13px] font-bold">{step.month}</div>
                <div className="mt-1 flex flex-col gap-1">
                  {step.tasks.map((task, j) => (
                    <div key={j} className="text-[12px] text-[var(--color-text-secondary)]">
                      • {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
          {transferTips.map((section, i) => (
            <div key={i} className="rounded-2xl bg-[var(--color-surface)] p-4">
              <div className="mb-2.5 text-[13px] font-bold">{section.title}</div>
              <div className="flex flex-col gap-1.5">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
