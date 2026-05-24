"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, LockKeyhole, Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { TicketCard } from "@/components/TicketCard";
import { fetchMovies, fetchTemplates } from "@/lib/catalog";
import { useTickets } from "@/lib/storage";
import type { Movie, TicketTemplate } from "@/types";

export default function SquarePage() {
  const { tickets, loading } = useTickets({ publicOnly: true });
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

  return (
    <>
      <AppShell>
        <PageHeader title="广场" showBack={false} />
        <section className="mt-12">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold">
            <Flame className="h-12 w-12 fill-gold/20" />
          </div>
          <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-parchment">
            热门票根
            <br />
            即将开放
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/58">
            这里会展示公开分享的精选票根。第一版先把私人收藏和生成体验做好，后续接入公开链接、点赞和二维码分享。
          </p>
        </section>

        {tickets.length > 0 ? (
          <div className="mt-10 space-y-5">
            {tickets.map((ticket) => {
              const movie = moviesById.get(ticket.movieId);
              const template = templatesById.get(ticket.templateId) ?? templates[0];
              if (!movie || !template) {
                return null;
              }
              return <TicketCard key={ticket.id} ticket={ticket} movie={movie} template={template} />;
            })}
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            <div className="soft-card rounded-2xl p-5">
              <div className="flex items-center gap-4 text-xl text-parchment">
                <Share2 className="h-7 w-7 text-gold" />
                {loading ? "正在读取公开票根" : "暂无公开票根"}
              </div>
              <p className="mt-3 text-base leading-7 text-white/52">
                生成票根时开启公开开关后，会出现在这里。
              </p>
            </div>
            <div className="soft-card rounded-2xl p-5">
              <div className="flex items-center gap-4 text-xl text-parchment">
                <LockKeyhole className="h-7 w-7 text-gold" />
                公开开关已接入
              </div>
              <p className="mt-3 text-base leading-7 text-white/52">
                私密票根只对本人可见，公开票根会按 Supabase RLS 策略开放读取。
              </p>
            </div>
          </div>
        )}

        <PrimaryButton href="/search" className="mt-10">先生成一张票根</PrimaryButton>
      </AppShell>
      <BottomNav />
    </>
  );
}
