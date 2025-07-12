"use client";

import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: number;
}

interface ChainSelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export default function ChainSelect({
  label,
  value,
  onChange,
  options,
}: ChainSelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mt-2 mb-1 block text-sm font-medium text-textMuted">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded border border-border px-2 py-1 pr-8 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <div className="pointer-events-none absolute right-2 top-1 text-textMuted">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}
