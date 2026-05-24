"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";
import type { Movie, TicketTemplate } from "@/types";
import { MoviePoster } from "./MoviePoster";

type TemplateSelectorProps = {
  selectedId: string;
  movie: Movie;
  templates: TicketTemplate[];
  onChange: (templateId: string) => void;
};

export function TemplateSelector({ selectedId, movie, templates, onChange }: TemplateSelectorProps) {
  return (
    <section className="soft-card rounded-2xl p-4">
      <h2 className="mb-4 text-xl font-medium text-parchment">选择票根模板</h2>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onChange(template.id)}
            className={clsx(
              "relative rounded-xl border p-2 text-left transition",
              selectedId === template.id ? "border-gold" : "border-white/10"
            )}
          >
            {selectedId === template.id ? (
              <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-ember text-white">
                <Check className="h-5 w-5" />
              </span>
            ) : null}
            <TemplateMini template={template} movie={movie} />
            <div className="mt-3 truncate text-center text-sm text-white/72">{template.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function TemplateMini({ template, movie }: { template: TicketTemplate; movie: Movie }) {
  const isDark = template.styleKey === "black-gold";
  return (
    <div
      className={clsx(
        "ticket-edge mx-auto flex aspect-[3/4] w-full flex-col items-center justify-between rounded-sm p-2",
        isDark ? "text-parchment" : "text-[#2f2116]"
      )}
      style={{ background: template.backgroundStyle }}
    >
      <div className="text-center font-display text-[10px] font-bold tracking-widest">FILM STUB</div>
      <MoviePoster movie={movie} className="h-14 w-12 overflow-hidden rounded-sm" />
      <div className="w-full space-y-1 text-[8px]">
        <div className="truncate">{movie.title}</div>
        <div className="border-t border-current/25 pt-1">2024-05-18 19:30</div>
        <div className="h-3 bg-[repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_3px)] opacity-70" />
      </div>
    </div>
  );
}
