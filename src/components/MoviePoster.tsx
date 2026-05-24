import Image from "next/image";
import type { Movie } from "@/types";

type MoviePosterProps = {
  movie: Movie;
  className?: string;
  priority?: boolean;
};

export function MoviePoster({ movie, className, priority }: MoviePosterProps) {
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
