"use client";

import { useEffect, useMemo, useState } from "react";
import { ListFilter, LogOut, Search } from "lucide-react";
import { clsx } from "clsx";
import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { TicketCard } from "@/components/TicketCard";
import { fetchMovies, fetchTemplates } from "@/lib/catalog";
import { useTickets } from "@/lib/storage";
import { signOut, useAuthUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import type { Movie, TicketTemplate } from "@/types";

const filters = ["全部", "本月", "高分"] as const;

export default function MyCollectionPage() {
  const { user, loading: authLoading } = useAuthUser();
  const { tickets, loading: ticketsLoading, error, refresh } = useTickets();
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [templates, setTemplates] = useState<TicketTemplate[]>([]);

  useEffect(() => {
    void Promise.all([fetchMovies(), fetchTemplates()]).then(([nextMovies, nextTemplates]) => {
      setMovies(nextMovies);
      setTemplates(nextTemplates);
    });
  }, []);

  const moviesById = useMemo(() => new Map(movies.map((movie) => [movie.id, movie])), [movies]);
  const templatesById = useMemo(() => new Map(templates.map((template) => [template.id, template])), [templates]);

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

  async function handleSignOut() {
    await signOut();
    await refresh();
  }

  if (hasSupabaseConfig() && !authLoading && !user) {
    return (
      <>
        <AppShell>
          <PageHeader brand showMenu />
          <EmptyState title="请先登录" description="登录后查看同步到云端的电影票根收藏。" actionHref="/login?next=/me" actionLabel="去登录" />
        </AppShell>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <AppShell>
        <PageHeader brand showMenu />
        <section className="-mt-2 mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-5xl font-bold text-parchment">我的收藏</h1>
            <p className="mt-4 text-lg text-white/55">
              {ticketsLoading ? "正在读取收藏" : `已收藏 ${tickets.length} 张票根`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <button type="button" aria-label="退出登录" onClick={handleSignOut} className="grid h-14 w-14 place-items-center text-white/80">
                <LogOut className="h-8 w-8" strokeWidth={1.5} />
              </button>
            ) : null}
            <button type="button" aria-label="搜索收藏" className="grid h-14 w-14 place-items-center text-white">
              <Search className="h-9 w-9" strokeWidth={1.5} />
            </button>
          </div>
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

        {error ? <p className="mb-5 rounded-xl bg-ember/15 px-4 py-3 text-sm text-red-100">{error}</p> : null}

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
              const movie = moviesById.get(ticket.movieId);
              const template = templatesById.get(ticket.templateId) ?? templates[0];
              if (!movie || !template) {
                return null;
              }
              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  movie={movie}
                  template={template}
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
