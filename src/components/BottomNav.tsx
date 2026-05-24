"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, UserRound } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/square", label: "广场", icon: Sparkles },
  { href: "/me", label: "我的", icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[var(--app-max)] -translate-x-1/2 border-t border-white/10 bg-black/80 px-8 pb-6 pt-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex min-w-16 flex-col items-center gap-1 text-[13px] transition",
                active ? "text-ember" : "text-white/55"
              )}
            >
              <Icon className={clsx("h-7 w-7", active && "fill-ember/20")} strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-white/85" />
    </nav>
  );
}
