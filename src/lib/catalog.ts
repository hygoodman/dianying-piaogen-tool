"use client";

import { movies as fallbackMovies } from "@/data/movies";
import { ticketTemplates as fallbackTemplates } from "@/data/templates";
import type { Movie, TicketTemplate } from "@/types";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import { movieFromRow, templateFromRow } from "@/lib/supabase/mappers";

export const categories = ["热门", "科幻", "剧情", "爱情", "悬疑"];

export async function fetchMovies(): Promise<Movie[]> {
  if (!hasSupabaseConfig()) {
    return fallbackMovies;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("release_year", { ascending: false })
    .order("rating", { ascending: false });

  if (error || !data?.length) {
    return fallbackMovies;
  }

  return data.map(movieFromRow);
}

export async function fetchMovieById(movieId: string): Promise<Movie | undefined> {
  if (!hasSupabaseConfig()) {
    return fallbackMovies.find((movie) => movie.id === movieId);
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("movies").select("*").eq("id", movieId).maybeSingle();

  if (error || !data) {
    return fallbackMovies.find((movie) => movie.id === movieId);
  }

  return movieFromRow(data);
}

export async function fetchTemplates(): Promise<TicketTemplate[]> {
  if (!hasSupabaseConfig()) {
    return fallbackTemplates;
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("ticket_templates").select("*").order("created_at");

  if (error || !data?.length) {
    return fallbackTemplates;
  }

  return data.map(templateFromRow);
}

export async function fetchTemplateById(templateId: string): Promise<TicketTemplate> {
  if (!hasSupabaseConfig()) {
    return fallbackTemplates.find((template) => template.id === templateId) ?? fallbackTemplates[0];
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("ticket_templates").select("*").eq("id", templateId).maybeSingle();

  if (error || !data) {
    return fallbackTemplates.find((template) => template.id === templateId) ?? fallbackTemplates[0];
  }

  return templateFromRow(data);
}

export function getFeaturedMovies(movies: Movie[]) {
  return movies.slice(0, 4);
}
