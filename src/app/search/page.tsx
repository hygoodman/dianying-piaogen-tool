"use client";

import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { MovieCard } from "@/components/MovieCard";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { categories, fetchMovies } from "@/lib/catalog";
import type { Movie } from "@/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    void fetchMovies().then(setMovies);
  }, []);

  const filteredMovies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return movies.filter((movie) => {
      const matchCategory = category === "热门" || movie.genre.includes(category);
      const haystack = `${movie.title} ${movie.originalTitle} ${movie.director} ${movie.releaseYear}`.toLowerCase();
      return matchCategory && (!normalized || haystack.includes(normalized));
    });
  }, [category, movies, query]);

  return (
    <AppShell>
      <PageHeader title="选电影" showBack />
      <SearchBar value={query} onChange={setQuery} />

      <div className="scrollbar-none -mx-1 mt-6 flex gap-3 overflow-x-auto px-1 pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={clsx(
              "h-11 min-w-[5.5rem] whitespace-nowrap rounded-full px-6 text-base font-medium leading-none transition",
              category === item
                ? "border border-red-500 bg-ember text-parchment"
                : "border border-white/5 bg-white/[0.07] text-white/55"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filteredMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} priority={index === 0} />
        ))}
      </div>

      {filteredMovies.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="没有找到电影" description="换个片名、导演或年份试试。" />
        </div>
      ) : null}
    </AppShell>
  );
}
