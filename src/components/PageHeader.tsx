"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Search } from "lucide-react";
import { clsx } from "clsx";

type PageHeaderProps = {
  title?: string;
  brand?: boolean;
  showBack?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  onSearch?: () => void;
  className?: string;
};

export function PageHeader({
  title,
  brand,
  showBack,
  showMenu,
  showSearch,
  onSearch,
  className
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className={clsx("mb-8 flex items-center justify-between", className)}>
      <div className="min-w-12">
        {showBack ? (
          <button
            type="button"
            aria-label="返回"
            onClick={() => router.back()}
            className="grid h-12 w-12 place-items-center text-white/90"
          >
            <ArrowLeft className="h-8 w-8" strokeWidth={1.5} />
          </button>
        ) : brand ? (
          <div>
            <div className="font-display text-4xl font-bold leading-none tracking-normal text-parchment">
              影迹票根
            </div>
            <div className="mt-3 text-sm tracking-[0.45em] text-gold">电影票根收藏工具</div>
          </div>
        ) : null}
      </div>

      {title ? (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-medium text-parchment">
          {title}
        </h1>
      ) : null}

      <div className="flex min-w-12 items-center justify-end gap-2">
        {showSearch ? (
          <button
            type="button"
            aria-label="搜索"
            onClick={onSearch}
            className="grid h-12 w-12 place-items-center text-white/90"
          >
            <Search className="h-8 w-8" strokeWidth={1.6} />
          </button>
        ) : null}
        {showMenu ? (
          <button
            type="button"
            aria-label="更多"
            className="flex h-12 w-24 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5"
          >
            <MoreHorizontal className="h-7 w-7" />
            <span className="h-7 w-px bg-white/15" />
            <span className="h-6 w-6 rounded-full border-4 border-white/90" />
          </button>
        ) : null}
      </div>
    </header>
  );
}
