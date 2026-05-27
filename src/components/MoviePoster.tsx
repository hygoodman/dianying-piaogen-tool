import Image from "next/image";
import type { Movie } from "@/types";

type MoviePosterProps = {
  movie: Movie;
  className?: string;
  priority?: boolean;
};

export function MoviePoster({ movie, className, priority }: MoviePosterProps) {
  if (!movie.posterUrl) {
    return (
      <div className={`${className ?? ""} grid place-items-center bg-[linear-gradient(145deg,#1b1714,#3a241a)] p-3 text-center`}>
        <div>
          <div className="font-display text-[0.65rem] uppercase tracking-[0.28em] text-gold/80">Poster Pending</div>
          <div className="mt-3 break-words text-sm font-medium leading-5 text-parchment">{movie.title}</div>
          <div className="mt-2 text-xs text-white/45">{movie.releaseDate}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={movie.posterUrl}
        alt={`${movie.title} 海报`}
        width={180}
        height={260}
        priority={priority}
        className="h-full w-full rounded-md object-cover shadow-[0_10px_28px_rgba(0,0,0,.38)]"
      />
    </div>
  );
}
