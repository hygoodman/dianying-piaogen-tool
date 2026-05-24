"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Armchair, Building2, CalendarDays, Clock, FileText, MapPin, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { MoviePoster } from "@/components/MoviePoster";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RatingInput } from "@/components/RatingInput";
import { TemplateSelector } from "@/components/TemplateSelector";
import { movies } from "@/data/movies";
import { ticketTemplates } from "@/data/templates";
import { createTicket } from "@/lib/storage";
import { formatGenres } from "@/lib/movie";
import type { TicketFormInput } from "@/types";

const today = new Date().toISOString().slice(0, 10);

export default function CreateTicketPage() {
  const router = useRouter();
  const params = useParams<{ movieId: string }>();
  const movie = useMemo(() => movies.find((item) => item.id === params.movieId), [params.movieId]);
  const [form, setForm] = useState({
    watchDate: today,
    watchTime: "19:30",
    cinemaName: "光影国际影城（万象城店）",
    city: "上海市",
    seat: "7排12座",
    userRating: 4,
    reviewText: "视觉震撼，故事动人，值得二刷！",
    templateId: ticketTemplates[0].id,
    isPublic: false
  });
  const [error, setError] = useState("");

  if (!movie) {
    return (
      <AppShell>
        <PageHeader title="创建票根" showBack />
        <EmptyState title="电影不存在" description="这部电影可能已被移除，请重新选择一部电影。" actionHref="/search" actionLabel="重新选电影" />
      </AppShell>
    );
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!movie) {
      setError("电影信息不存在，请重新选择。");
      return;
    }
    if (!form.watchDate || !form.watchTime || !form.cinemaName || !form.city || !form.seat) {
      setError("请补全观影日期、时间、影院、城市和座位号。");
      return;
    }

    const ticket = createTicket({
      movieId: movie.id,
      ...form
    } satisfies TicketFormInput);
    router.push(`/ticket/${ticket.id}`);
  }

  return (
    <AppShell>
      <PageHeader title="创建票根" showBack />

      <section className="soft-card mb-5 flex gap-5 rounded-2xl p-4">
        <MoviePoster movie={movie} className="h-32 w-24 shrink-0 overflow-hidden rounded-lg" priority />
        <div className="min-w-0 py-2">
          <h1 className="truncate text-3xl font-semibold text-white">{movie.title}</h1>
          <p className="mt-3 text-lg text-white/65">
            {movie.releaseYear} · {formatGenres(movie.genre)}
          </p>
          <p className="mt-3 text-lg text-white/65">导演：{movie.director}</p>
          <p className="mt-3 text-lg text-white/65">片长：{movie.duration} 分钟</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-5">
        <section className="soft-card rounded-2xl px-5">
          <Field icon={<CalendarDays />} label="观影日期">
            <input type="date" value={form.watchDate} onChange={(event) => update("watchDate", event.target.value)} className="field-input" />
          </Field>
          <Field icon={<Clock />} label="场次时间">
            <input type="time" value={form.watchTime} onChange={(event) => update("watchTime", event.target.value)} className="field-input" />
          </Field>
          <Field icon={<Building2 />} label="影院">
            <input value={form.cinemaName} onChange={(event) => update("cinemaName", event.target.value)} className="field-input" />
          </Field>
          <Field icon={<MapPin />} label="城市">
            <input value={form.city} onChange={(event) => update("city", event.target.value)} className="field-input" />
          </Field>
          <Field icon={<Armchair />} label="座位号">
            <input value={form.seat} onChange={(event) => update("seat", event.target.value)} className="field-input" />
          </Field>
          <Field icon={<Star />} label="评分">
            <RatingInput value={form.userRating} onChange={(value) => update("userRating", value)} />
          </Field>
          <div className="border-b-0 py-5">
            <div className="mb-4 flex items-center gap-4 text-xl text-white/72">
              <FileText className="h-7 w-7" strokeWidth={1.4} />
              <span>观后感</span>
            </div>
            <textarea
              value={form.reviewText}
              maxLength={100}
              onChange={(event) => update("reviewText", event.target.value)}
              className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-lg leading-8 text-white outline-none placeholder:text-white/35"
              placeholder="写下这一场电影留给你的瞬间"
            />
            <div className="mt-2 text-right text-sm text-white/45">{form.reviewText.length}/100</div>
          </div>
        </section>

        <TemplateSelector selectedId={form.templateId} movie={movie} onChange={(templateId) => update("templateId", templateId)} />

        {error ? <p className="rounded-xl bg-ember/15 px-4 py-3 text-sm text-red-100">{error}</p> : null}

        <PrimaryButton type="submit" className="mt-3">生成票根</PrimaryButton>
      </form>
    </AppShell>
  );
}

function Field({
  icon,
  label,
  children
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-h-16 items-center gap-4 border-b border-white/10 py-3 text-xl text-white/72">
      <span className="text-white/65">{icon}</span>
      <span className="w-20 shrink-0">{label}</span>
      <div className="min-w-0 flex-1 overflow-hidden text-right">{children}</div>
    </label>
  );
}
