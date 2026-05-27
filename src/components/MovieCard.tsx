import Link from "next/link";
import { Star } from "lucide-react";
import type { Movie } from "@/types";
import { formatGenres } from "@/lib/movie";
import { MoviePoster } from "./MoviePoster";

type MovieCardProps = {
  movie: Movie;
  compact?: boolean;
  priority?: boolean;
};

export function MovieCard({ movie, compact, priority }: MovieCardProps) {
  const ratingLabel = movie.rating > 0 ? movie.rating.toFixed(1) : "待评";

  if (compact) {
    return (
      <Link href={`/create/${movie.id}`} className="block w-[5.5rem] shrink-0">
        <MoviePoster movie={movie} className="h-36 w-[5.5rem] overflow-hidden rounded-lg bg-white/5" priority={priority} />
        <div className="mt-3 truncate text-base text-parchment">{movie.title}</div>
        <div className="mt-1 flex items-center gap-1 text-gold">
          <Star className="h-4 w-4 fill-gold" />
          <span className="text-sm">{ratingLabel}</span>
        </div>
      </Link>
    );
  }

  return (
    <article className="soft-card flex gap-5 rounded-2xl p-3">
      <MoviePoster movie={movie} className="h-28 w-24 shrink-0 overflow-hidden rounded-lg" priority={priority} />
      <div className="min-w-0 flex-1 py-2">
        <h2 className="truncate text-2xl font-medium text-white">{movie.title}</h2>
        <p className="mt-3 text-base text-white/62">
          {movie.releaseYear} · {formatGenres(movie.genre)}
        </p>
        <p className="mt-2 truncate text-base text-gold">导演：{movie.director}</p>
        <div className="mt-2 flex items-center gap-2 text-gold">
          <Star className="h-5 w-5 fill-gold" />
          <span>{ratingLabel}</span>
        </div>
      </div>
      <Link
        href={`/create/${movie.id}`}
        className="my-auto flex h-11 w-20 shrink-0 items-center justify-center rounded-full border border-gold text-lg text-gold"
      >
        选择
      </Link>
    </article>
  );
}
