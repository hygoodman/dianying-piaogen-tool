import Link from "next/link";
import { Star } from "lucide-react";
import { clsx } from "clsx";
import type { Movie, Ticket, TicketTemplate } from "@/types";
import { MoviePoster } from "./MoviePoster";

type TicketCardProps = {
  ticket: Ticket;
  movie: Movie;
  template: TicketTemplate;
};

export function TicketCard({ ticket, movie, template }: TicketCardProps) {
  const isDark = template.styleKey === "black-gold";

  return (
    <Link
      href={`/ticket/${ticket.id}`}
      className={clsx(
        "ticket-edge relative grid min-h-36 grid-cols-[86px_1fr_36px] gap-4 overflow-hidden rounded-xl border p-4",
        isDark
          ? "border-gold/35 bg-[#12110f] text-parchment"
          : "border-[#b98431]/25 text-[#24180f]"
      )}
      style={{ background: template.backgroundStyle }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_12%_20%,#fff_0_1px,transparent_1px)] [background-size:7px_7px]" />
      <MoviePoster movie={movie} className="relative h-28 w-[5.5rem] overflow-hidden rounded-lg" />
      <div className="relative min-w-0">
        <h2 className="truncate text-2xl font-semibold">{movie.title}</h2>
        <p className="mt-3 text-base opacity-85">
          {ticket.watchDate} {ticket.watchTime}
        </p>
        <p className="mt-2 truncate text-base opacity-85">{ticket.cinemaName}</p>
        <p className="mt-2 text-base font-medium">{ticket.seat}</p>
      </div>
      <div className="relative flex flex-col items-center justify-between">
        <div className="rotate-90 whitespace-nowrap font-display text-sm font-bold tracking-widest opacity-50">
          FILM STUB
        </div>
        <div className="flex items-center gap-1 text-gold">
          <Star className="h-5 w-5 fill-gold" />
          <span className="text-base">{ticket.userRating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
