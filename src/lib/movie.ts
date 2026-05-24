import { movies } from "@/data/movies";
import { ticketTemplates } from "@/data/templates";

export function getMovieById(movieId: string) {
  return movies.find((movie) => movie.id === movieId);
}

export function getTemplateById(templateId: string) {
  return ticketTemplates.find((template) => template.id === templateId) ?? ticketTemplates[0];
}

export function formatGenres(genres: string[]) {
  return genres.join(" / ");
}
