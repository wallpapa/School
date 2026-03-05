"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";
import { useFinder } from "@/context/FinderContext";
import ChipGroup from "@/components/ui/ChipGroup";
import ExpandableSection from "@/components/ui/ExpandableSection";

export default function FinderPage() {
  const router = useRouter();
  const { t } = useLang();
  const { state, update } = useFinder();

  const stOpts = [
    { value: "international", label: t("styleInternational") },
    { value: "bilingual", label: t("styleBilingual") },
    { value: "trilingual", label: t("styleTrilingual") },
    { value: "montessori", label: t("styleMontessori") },
    { value: "thai_top", label: t("styleThaiTop") },
    { value: "alternative", label: t("styleAlternative") },
  ];

  const curOpts = [
    { value: "ib", label: t("curIB") },
    { value: "igcse", label: t("curIGCSE") },
    { value: "us", label: t("curUS") },
    { value: "french", label: t("curFrench") },
    { value: "bilingual", label: t("curBilingual") },
    { value: "trilingual", label: t("curTrilingual") },
    { value: "thai", label: t("curThai") },
    { value: "montessori", label: t("curMontessori") },
  ];

  const lsOpts = [
    { value: "visual", label: t("lsVisual") },
    { value: "auditory", label: t("lsAuditory") },
    { value: "readwrite", label: t("lsReadwrite") },
    { value: "kinesthetic", label: t("lsKinesthetic") },
  ];

  const zones = [
    { value: "", label: t("zoneDefault") },
    { value: "sukhumvit", label: t("zoneSukhumvit") },
    { value: "silom", label: t("zoneSilom") },
    { value: "ari", label: t("zoneAri") },
    { value: "rama9", label: t("zoneRama9") },
    { value: "thonburi", label: t("zoneThonburi") },
    { value: "chaengwattana", label: t("zoneChaeng") },
    { value: "bangna", label: t("zoneBangna") },
    { value: "other", label: t("zoneOther") },
  ];

  const useGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {}
    );
  };

  const handleSearch = () => {
    router.push("/results");
  };

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {t("finderTitle")}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {t("finderSub")}
        </p>
      </div>

      {/* Budget + Age row on larger screens */}
      <div className="md:grid md:grid-cols-2 md:gap-5">
      {/* Budget */}
      <div className="mb-5">
        <div className="rounded-2xl bg-[var(--color-surface)] p-[18px]">
          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("budgetLabel")}
          </div>
          <div className="my-3 text-center text-[28px] font-bold tracking-tight">
            {state.budgetMax.toLocaleString()}
          </div>
          <input
            type="range"
            min={100000}
            max={1200000}
            step={50000}
            value={state.budgetMax}
            onChange={(e) => update({ budgetMax: Number(e.target.value) })}
          />
          <div className="mt-1 flex justify-between text-[11px] text-[var(--color-text-secondary)]">
            <span>100K</span>
            <span>1.2M</span>
          </div>
        </div>
      </div>

      {/* Age/Grade */}
      <div className="mb-5">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("ageLabel")}
        </div>
        <select
          className="form-input"
          value={state.childAge}
          onChange={(e) => update({ childAge: e.target.value })}
        >
          <option value="">{t("ageDefault")}</option>
          <optgroup label={`── ${t("ageGroupPreschool")} ──`}>
            <option value="baby">{t("ageBaby")}</option>
            <option value="toddler">{t("ageToddler")}</option>
          </optgroup>
          <optgroup label={`── ${t("ageGroupPreK")} ──`}>
            <option value="pre_nursery">{t("agePreNursery")}</option>
            <option value="nursery">{t("ageNursery")}</option>
          </optgroup>
          <optgroup label={`── ${t("ageGroupKG")} ──`}>
            <option value="kg1">{t("ageKg1")}</option>
            <option value="kg2">{t("ageKg2")}</option>
          </optgroup>
          <optgroup label={`── ${t("ageGroupPrimary")} ──`}>
            <option value="p1">ป.1 (6–7)</option>
            <option value="p2">ป.2 (7–8)</option>
            <option value="p3">ป.3 (8–9)</option>
            <option value="p4">ป.4 (9–10)</option>
            <option value="p5">ป.5 (10–11)</option>
            <option value="p6">ป.6 (11–12)</option>
          </optgroup>
          <optgroup label={`── ${t("ageGroupSecondary")} ──`}>
            <option value="m1">ม.1 (12–13)</option>
            <option value="m2">ม.2 (13–14)</option>
            <option value="m3">ม.3 (14–15)</option>
            <option value="m4">ม.4 (15–16)</option>
            <option value="m5">ม.5 (16–17)</option>
            <option value="m6">ม.6 (17–18)</option>
          </optgroup>
        </select>
      </div>
      </div>{/* close Budget + Age grid */}

      {/* School Style + Location row on larger screens */}
      <div className="md:grid md:grid-cols-2 md:gap-5">
      {/* School Style */}
      <div className="mb-5">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("styleLabel")}
        </div>
        <ChipGroup
          options={stOpts}
          selected={state.schoolStyles}
          onChange={(v) => update({ schoolStyles: v })}
        />
      </div>

      {/* Location */}
      <div className="mb-5">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("locLabel")}
        </div>
        <div className="mb-3 flex gap-2">
          <button
            onClick={useGPS}
            className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 text-center text-xs font-medium text-[var(--color-text-secondary)] transition-all duration-200 active:border-[var(--color-text)] active:text-[var(--color-text)]"
          >
            {t("gpsBtn")}
          </button>
        </div>
        <select
          className="form-input"
          value={state.zone}
          onChange={(e) => update({ zone: e.target.value })}
        >
          {zones.map((z) => (
            <option key={z.value} value={z.value}>
              {z.label}
            </option>
          ))}
        </select>
        <div className="mt-2 text-center text-[11px] text-[var(--color-text-secondary)]">
          {state.lat
            ? `📍 ${state.lat.toFixed(4)}, ${state.lng?.toFixed(4)}`
            : t("locNote")}
        </div>
      </div>
      </div>{/* close Style + Location grid */}

      {/* Curriculum */}
      <div className="mb-5">
        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {t("curLabel")}
        </div>
        <ChipGroup
          options={curOpts}
          selected={state.curricula}
          onChange={(v) => update({ curricula: v })}
        />
      </div>

      {/* Advanced */}
      <ExpandableSection label={t("expandMore")}>
        {/* Current School */}
        <div className="mb-5">
          <div className="rounded-2xl bg-[var(--color-surface)] p-[18px]">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {t("currentSchoolLabel")}
            </div>
            <select
              className="form-input"
              value={state.currentSchool}
              onChange={(e) => update({ currentSchool: e.target.value })}
            >
              <option value="">{t("currentSchoolDefault")}</option>
              <option value="thai">{t("currentThai")}</option>
              <option value="bilingual">{t("currentBi")}</option>
              <option value="daycare">{t("currentDaycare")}</option>
            </select>
          </div>
        </div>

        {/* Learning Style */}
        <div className="mb-5">
          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("varkLabel")}
          </div>
          <ChipGroup
            options={lsOpts}
            selected={state.learningStyles}
            onChange={(v) => update({ learningStyles: v })}
          />
        </div>

        {/* University Goal */}
        <div className="mb-5">
          <div className="rounded-2xl bg-[var(--color-surface)] p-[18px]">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {t("uniLabel")}
            </div>
            <select
              className="form-input mb-2.5"
              value={state.uniGoal}
              onChange={(e) => update({ uniGoal: e.target.value })}
            >
              <option value="">{t("uniDefault")}</option>
              <option value="top20">QS Top 20 (Harvard, MIT, Oxford)</option>
              <option value="top100">QS Top 100</option>
              <option value="uk">UK (Oxbridge, Russell Group)</option>
              <option value="us">US (Ivy League)</option>
              <option value="th">ไทย (จุฬา, มหิดล)</option>
              <option value="any">{t("uniAny")}</option>
            </select>
            <div className="mb-2.5 mt-2.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              {t("facultyLabel")}
            </div>
            <select
              className="form-input"
              value={state.faculty}
              onChange={(e) => update({ faculty: e.target.value })}
            >
              <option value="">{t("uniDefault")}</option>
              <option value="medicine">{t("facMed")}</option>
              <option value="engineering">{t("facEng")}</option>
              <option value="business">{t("facBiz")}</option>
              <option value="arts">{t("facArts")}</option>
              <option value="science">{t("facSci")}</option>
              <option value="creative">{t("facCreative")}</option>
            </select>
          </div>
        </div>
      </ExpandableSection>

      {/* Search CTA */}
      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="w-full rounded-[14px] bg-[var(--color-text)] px-4 py-4 text-center text-base font-bold text-white transition-all duration-200 active:scale-[0.98] active:opacity-90"
        >
          {t("searchBtn")}
        </button>
        <Link
          href="/"
          className="mt-2.5 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all duration-200 active:scale-[0.97]"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
