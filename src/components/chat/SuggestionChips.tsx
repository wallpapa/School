"use client";

/* ── Suggestion chip types ── */

export interface ActionChip {
  label: string;
  type: "link" | "tel" | "map";
  value: string; // URL, phone number, or maps URL
}

export type SuggestionItem = string | ActionChip;

/** Type guard */
export function isActionChip(item: SuggestionItem): item is ActionChip {
  return typeof item !== "string" && "type" in item;
}

/* ── Component ── */

interface SuggestionChipsProps {
  suggestions: SuggestionItem[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestionChips({
  suggestions,
  onSelect,
}: SuggestionChipsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 px-1">
      {suggestions.map((item, i) => {
        if (isActionChip(item)) {
          return <ActionChipButton key={i} chip={item} index={i} />;
        }
        return (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-all hover:bg-indigo-100 hover:border-indigo-300 active:scale-95 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

/* ── Action chip (link/tel/map) ── */

function ActionChipButton({ chip, index }: { chip: ActionChip; index: number }) {
  const config = ACTION_STYLES[chip.type];

  const href =
    chip.type === "tel"
      ? `tel:${chip.value}`
      : chip.value;

  return (
    <a
      href={href}
      target={chip.type !== "tel" ? "_blank" : undefined}
      rel={chip.type !== "tel" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm active:scale-95 animate-fade-up ${config.className}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={config.iconPath} />
      </svg>
      {chip.label}
    </a>
  );
}

/* ── Action chip styles per type ── */

const ACTION_STYLES: Record<ActionChip["type"], { className: string; iconPath: string }> = {
  link: {
    className: "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300",
    iconPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101",
  },
  tel: {
    className: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300",
    iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  map: {
    className: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300",
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
};
