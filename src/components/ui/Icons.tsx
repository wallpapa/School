/**
 * Clean SVG icon system — replaces emojis for professional UI.
 * All icons use currentColor for theme-aware rendering.
 * Consistent 24×24 viewBox, stroke-based design.
 */

type IconProps = { className?: string; size?: number };

const defaults = (p: IconProps) => ({
  width: p.size ?? 24,
  height: p.size ?? 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: p.className ?? "",
});

/* ── Navigation & Actions ── */
export function IconSearch(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15.5 15.5L20 20" />
    </svg>
  );
}

export function IconCompare(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="3" y="5" width="7" height="14" rx="1.5" />
      <rect x="14" y="5" width="7" height="14" rx="1.5" />
      <path d="M12 8v8" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconTarget(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBook(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M4 4h6a2 2 0 012 2v14a1.5 1.5 0 00-1.5-1.5H4V4z" />
      <path d="M20 4h-6a2 2 0 00-2 2v14a1.5 1.5 0 011.5-1.5H20V4z" />
    </svg>
  );
}

export function IconMicroscope(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M14.5 4.5l-5 9" />
      <circle cx="11" cy="16" r="4" />
      <path d="M6 20h12" />
      <path d="M12.5 4l2.5 1" />
      <circle cx="13.5" cy="4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconNewspaper(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h4v4H7z" fill="currentColor" stroke="none" opacity="0.15" />
      <path d="M7 8h4v4H7z" />
      <path d="M14 8h3M14 11h3M7 15h10" />
    </svg>
  );
}

/* ── School Types ── */
export function IconSchoolThai(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-4h6v4M12 10v2" />
    </svg>
  );
}

export function IconSchoolEP(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h5M8 15h8" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSchoolBilingual(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c-2.5 3-2.5 15 0 18M12 3c2.5 3 2.5 15 0 18" />
    </svg>
  );
}

export function IconSchoolTrilingual(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c-2.5 3-2.5 15 0 18M12 3c2.5 3 2.5 15 0 18" />
      <path d="M3 8h18M3 16h18" opacity="0.4" />
    </svg>
  );
}

export function IconSchoolInter(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M3 21h18M4 21V10l8-7 8 7v11" />
      <rect x="9" y="14" width="6" height="7" />
      <path d="M12 3v2" />
      <path d="M8 10l4-3 4 3" strokeWidth="1.5" />
    </svg>
  );
}

export function IconSchoolAlt(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 3c-1 4-4 6-7 7 3 1 6 3 7 7 1-4 4-6 7-7-3-1-6-3-7-7z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/* ── Research Topics ── */
export function IconHeart(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 21C12 21 4 15 4 9.5 4 6.5 6.5 4 9 4c1.5 0 2.5.8 3 1.5C12.5 4.8 13.5 4 15 4c2.5 0 5 2.5 5 5.5C20 15 12 21 12 21z" />
    </svg>
  );
}

export function IconFamily(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="8" cy="6" r="2.5" />
      <circle cx="16" cy="6" r="2.5" />
      <circle cx="12" cy="14" r="2" />
      <path d="M5 20v-3a3 3 0 016 0v3M13 20v-3a3 3 0 016 0v3" />
    </svg>
  );
}

export function IconBrain(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 3C9 3 7 5 7 7c-2 0-3 1.5-3 3s1 3 3 3c0 2 1.5 4 5 4s5-2 5-4c2 0 3-1 3-3s-1-3-3-3c0-2-2-4-5-4z" />
      <path d="M12 3v18" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconLightning(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" fillOpacity="0.08" />
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

export function IconBaby(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="12" cy="10" r="6" />
      <circle cx="10" cy="9.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="9.5" r="0.8" fill="currentColor" stroke="none" />
      <path d="M10 12.5c.5.5 1 .8 2 .8s1.5-.3 2-.8" />
      <path d="M12 4V2M8 18l-2 3M16 18l2 3" />
    </svg>
  );
}

export function IconCalendar(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 5V3M17 5V3M3 9h18" />
      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFlask(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M9 3h6M10 3v7l-5 8a1.5 1.5 0 001.3 2.2h11.4A1.5 1.5 0 0019 18l-5-8V3" />
      <path d="M7 17h10" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 3a7 7 0 100 18c-5 0-7-4-7-9s2-9 7-9z" />
      <circle cx="16" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Misc ── */
export function IconBookOpen(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M2 4h7a2 2 0 012 2v14a1.5 1.5 0 00-1.5-1.5H2V4z" />
      <path d="M22 4h-7a2 2 0 00-2 2v14a1.5 1.5 0 011.5-1.5H22V4z" />
      <path d="M5 8h3M5 11h3M16 8h3M16 11h3" opacity="0.4" />
    </svg>
  );
}

export function IconCake(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M3 15h18v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" />
      <path d="M3 15c0-2 3-3 4.5-3S10 13 12 13s4.5-1 4.5-1 3 1 4.5 3" />
      <path d="M8 10v2M12 10v2M16 10v2" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconChevronRight(p: IconProps) {
  return (
    <svg {...defaults(p)} strokeWidth={2}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <svg {...defaults(p)} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconSparkle(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
    </svg>
  );
}
