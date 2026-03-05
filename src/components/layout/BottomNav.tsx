"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

const navItems = [
  {
    key: "navHome",
    href: "/",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l7-7 7 7v7h-3v-4h-8v4H3z" />
      </svg>
    ),
  },
  {
    key: "navSearch",
    href: "/find",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <circle cx="8" cy="8" r="4.5" />
        <path d="M13.5 12.5L17 16" />
      </svg>
    ),
  },
  {
    key: "navCalendar",
    href: "/calendar",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="13" rx="1.5" />
        <path d="M6 4V2M14 4V2M3 7h14" />
      </svg>
    ),
  },
  {
    key: "navPath",
    href: "/path",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <circle cx="6" cy="6" r="2" />
        <circle cx="14" cy="14" r="2" />
        <path d="M8 8l6 6M8 14l6-6" />
      </svg>
    ),
  },
  {
    key: "navCompare",
    href: "/compare",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="6" height="12" rx="1" />
        <rect x="12" y="4" width="6" height="12" rx="1" />
        <path d="M10 7v6" />
      </svg>
    ),
  },
  {
    key: "navHop",
    href: "/transfer",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M3 10h14M9 6l4 4-4 4" />
      </svg>
    ),
  },
  {
    key: "navNews",
    href: "/news",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
  {
    key: "navResearch",
    href: "/research",
    icon: (
      <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3v14M6 7l4-4 4 4M4 17h12" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLang();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="fixed left-0 top-0 z-50 hidden h-full w-[220px] flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] pt-6 lg:flex">
        <div className="mb-8 px-6">
          <div className="text-[15px] font-extrabold tracking-tight text-[var(--color-text)]">
            SchoolFinder
          </div>
        </div>
        <div className="flex flex-col gap-0.5 px-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition-all ${
                isActive(item.href)
                  ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>
              <span>{t(item.key)}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Mobile / Tablet Bottom Bar ── */}
      <div className="glass fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5 lg:hidden">
        <div className="mx-auto flex max-w-[480px] justify-around md:max-w-[700px]">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] transition-colors ${
                isActive(item.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon}
              </span>
              <span>{t(item.key)}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
