"use client";

import Chip from "./Chip";

interface ChipGroupProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function ChipGroup({
  options,
  selected,
  onChange,
}: ChipGroupProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={opt.value}
          label={opt.label}
          active={selected.includes(opt.value)}
          onClick={() => toggle(opt.value)}
        />
      ))}
    </div>
  );
}
