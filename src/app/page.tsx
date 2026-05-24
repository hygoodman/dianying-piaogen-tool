"use client";

import Link from "next/link";
import { ChevronRight, Flame, Ticket } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";
import { MovieCard } from "@/components/MovieCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { featuredMovies } from "@/data/movies";
import { useTickets } from "@/lib/storage";

export default function HomePage() {
  const ticketCount = useTickets().length;

  return (
    <>
      <AppShell>
        <PageHeader brand showMenu />

        <section className="mt-14">
          <h1 className="font-display text-[3.25rem] font-bold leading-[1.22] text-parchment">
            你刚刚看了
            <br />
            哪部电影？
          </h1>
          <p className="mt-7 text-lg leading-8 text-gold/85">
            记录每一次光影感动，收藏属于你的电影记忆。
          </p>
        </section>

        <div className="mt-10 space-y-4">
          <PrimaryButton href="/search">选电影</PrimaryButton>

          <Link href="/square" className="soft-card flex h-20 items-center gap-4 rounded-xl px-6">
            <Flame className="h-9 w-9 shrink-0 fill-parchment/20 text-parchment" />
            <div className="min-w-0 flex-1">
              <div className="text-xl font-medium text-parchment">热门票根</div>
              <div className="mt-1 truncate text-base text-white/50">发现大家都在收藏的电影票根</div>
            </div>
            <ChevronRight className="h-7 w-7 text-parchment/70" />
          </Link>

          <Link href="/me" className="soft-card flex h-20 items-center gap-4 rounded-xl px-6">
            <Ticket className="h-9 w-9 shrink-0 text-parchment" />
            <div className="min-w-0 flex-1">
              <div className="text-xl font-medium text-parchment">我的收藏</div>
              <div className="mt-1 truncate text-base text-white/50">已收藏 {ticketCount} 张票根</div>
            </div>
            <ChevronRight className="h-7 w-7 text-parchment/70" />
          </Link>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-3xl font-medium text-parchment">正在热映</h2>
            <Link href="/search" className="flex items-center text-base text-white/55">
              全部
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="scrollbar-none -mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
            {featuredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} compact priority={index === 0} />
            ))}
          </div>
        </section>
      </AppShell>
      <BottomNav />
    </>
  );
}
