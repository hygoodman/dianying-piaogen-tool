import { CalendarDays, Clock, MapPin, Star, Armchair, Building2 } from "lucide-react";
import { clsx } from "clsx";
import type { Movie, Ticket, TicketTemplate } from "@/types";
import { formatGenres } from "@/lib/movie";
import { MoviePoster } from "./MoviePoster";

type TicketPreviewProps = {
  ticket: Ticket;
  movie: Movie;
  template: TicketTemplate;
  exportRef?: React.Ref<HTMLDivElement>;
  compact?: boolean;
};

export function TicketPreview({ ticket, movie, template, exportRef, compact }: TicketPreviewProps) {
  const isDark = template.styleKey === "black-gold";
  const isVintage = template.styleKey === "vintage";

  return (
    <article
      ref={exportRef}
      className={clsx(
        "ticket-edge relative overflow-hidden rounded-xl border p-7 shadow-2xl",
        compact ? "min-h-[230px]" : "min-h-[680px]",
        isDark
          ? "border-gold/45 bg-[#11100e] text-parchment"
          : isVintage
            ? "border-[#8c5531]/30 bg-[#d8a77f] text-[#25190f]"
            : "border-[#b98431]/30 bg-[#ead3aa] text-[#24180f]"
      )}
      style={{
        background: template.backgroundStyle
      }}
    >
      <div className="absolute inset-0 opacity-25 mix-blend-multiply [background-image:radial-gradient(circle_at_20%_10%,#fff_0_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.12)_1px,transparent_1px)] [background-size:9px_9px,37px_37px]" />
      <div className="relative">
        <div className="mb-6 flex items-center justify-center gap-3 border-b border-current/20 pb-4 font-display text-3xl font-bold tracking-widest">
          <Star className="h-5 w-5 fill-current" />
          FILM STUB
          <Star className="h-5 w-5 fill-current" />
        </div>

        <div className="grid grid-cols-[110px_1fr] gap-5">
          <MoviePoster movie={movie} className="h-40 w-28 overflow-hidden rounded-lg" priority />
          <div className="min-w-0 pt-2">
            <h2 className="text-4xl font-semibold leading-tight">{movie.title}</h2>
            <p className="mt-2 break-words font-display text-lg uppercase tracking-[0.18em] opacity-70">
              {movie.originalTitle}
            </p>
            <p className="mt-7 text-lg">
              {movie.releaseYear} · {formatGenres(movie.genre)}
            </p>
            <p className="mt-3 text-lg">导演：{movie.director}</p>
            <p className="mt-3 text-lg">片长：{movie.duration} 分钟</p>
          </div>
        </div>

        <div className="my-6 border-t border-dashed border-current/30" />

        <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-base">
          <Info label="观影日期" value={ticket.watchDate} icon={<CalendarDays />} />
          <Info label="场次时间" value={ticket.watchTime} icon={<Clock />} />
          <Info className="col-span-2" label="影院" value={ticket.cinemaName} icon={<MapPin />} />
          <Info label="城市" value={ticket.city} icon={<Building2 />} />
          <Info label="座位号" value={ticket.seat} icon={<Armchair />} />
        </div>

        <div className="mt-6 border-t border-current/20 pt-5">
          <div className="text-base opacity-72">评分</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-1 text-[#b7832a]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-8 w-8"
                  fill={star <= ticket.userRating ? "currentColor" : "transparent"}
                />
              ))}
            </div>
            <span className="ml-auto text-2xl">{ticket.userRating.toFixed(1)}</span>
          </div>
        </div>

        {ticket.reviewText ? (
          <div className="mt-6 border-t border-current/20 pt-5">
            <div className="text-base opacity-72">观后感</div>
            <p className="mt-3 whitespace-pre-wrap text-lg leading-8">{ticket.reviewText}</p>
          </div>
        ) : null}

        <div className="mt-8 border-t-2 border-dotted border-current/35 pt-6">
          <div className="text-base opacity-72">票根编号</div>
          <div className="mt-2 font-mono text-2xl tracking-wide">{ticket.ticketNo}</div>
          <div className="mt-4 h-12 w-48 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_5px)] opacity-75" />
          <div className="absolute bottom-6 right-6 grid h-24 w-24 place-items-center rounded-full border-4 border-current/30 text-center font-display text-xs font-bold uppercase tracking-widest opacity-60">
            影迹<br />收藏
          </div>
        </div>
      </div>
    </article>
  );
}

function Info({
  label,
  value,
  icon,
  className
}: {
  label: string;
  value: string;
  icon: React.ReactElement;
  className?: string;
}) {
  return (
    <div className={clsx("border-b border-current/18 pb-4", className)}>
      <div className="flex items-center gap-2 text-sm opacity-70">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 break-words text-xl font-medium">{value}</div>
    </div>
  );
}
