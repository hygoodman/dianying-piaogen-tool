"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "搜索电影名 / 导演 / 年份" }: SearchBarProps) {
  return (
    <label className="flex h-16 items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] px-5 text-white/70">
      <Search className="h-7 w-7 shrink-0" strokeWidth={1.6} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/45"
      />
    </label>
  );
}
