"use client";

import { useMemo, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import { clsx } from "clsx";
import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { TicketCard } from "@/components/TicketCard";
import { getMovieById, getTemplateById } from "@/lib/movie";
import { useTickets } from "@/lib/storage";

const filters = ["全部", "本月", "高分"] as const;

export default function MyCollectionPage() {
  const tickets = useTickets();
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");

  const filteredTickets = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return tickets.filter((ticket) => {
      if (filter === "本月") {
        return ticket.watchDate.startsWith(currentMonth);
      }
      if (filter === "高分") {
        return ticket.userRating >= 4;
      }
      return true;
    });
  }, [filter, tickets]);

  return (
    <>
      <AppShell>
        <PageHeader brand showMenu />
        <section className="-mt-2 mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-5xl font-bold text-parchment">我的收藏</h1>
            <p className="mt-4 text-lg text-white/55">已收藏 {tickets.length} 张票根</p>
          </div>
          <button type="button" aria-label="搜索收藏" className="grid h-14 w-14 place-items-center text-white">
            <Search className="h-9 w-9" strokeWidth={1.5} />
          </button>
        </section>

        <div className="mb-7 flex items-center justify-between">
          <div className="flex gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={clsx(
                  "h-12 min-w-20 rounded-full px-6 text-lg",
                  filter === item ? "bg-ember text-parchment" : "bg-white/[0.07] text-white/55"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" aria-label="筛选" className="grid h-12 w-12 place-items-center text-white/75">
            <ListFilter className="h-8 w-8" strokeWidth={1.5} />
          </button>
        </div>

        {filteredTickets.length === 0 ? (
          <EmptyState
            title={tickets.length === 0 ? "还没有票根" : "没有符合条件的票根"}
            description={tickets.length === 0 ? "选择一部电影，生成你的第一张电子票根。" : "换个筛选条件看看。"}
            actionHref="/search"
            actionLabel="去选电影"
          />
        ) : (
          <div className="space-y-5">
            {filteredTickets.map((ticket) => {
              const movie = getMovieById(ticket.movieId);
              if (!movie) {
                return null;
              }
              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  movie={movie}
                  template={getTemplateById(ticket.templateId)}
                />
              );
            })}
          </div>
        )}
      </AppShell>
      <BottomNav />
    </>
  );
}
