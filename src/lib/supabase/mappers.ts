import type { Movie, Ticket, TicketFormInput, TicketTemplate } from "@/types";
import type { Database } from "@/types/database";

export type MovieRow = Database["public"]["Tables"]["movies"]["Row"];
export type TicketRow = Database["public"]["Tables"]["tickets"]["Row"];
export type TicketInsert = Database["public"]["Tables"]["tickets"]["Insert"];
export type TicketTemplateRow = Database["public"]["Tables"]["ticket_templates"]["Row"];

export function movieFromRow(row: MovieRow): Movie {
  return {
    id: row.id,
    title: row.title,
    originalTitle: row.original_title,
    posterUrl: row.poster_url,
    releaseYear: row.release_year,
    releaseDate: row.release_date,
    genre: row.genre,
    country: row.country,
    director: row.director,
    description: row.description,
    rating: Number(row.rating),
    duration: row.duration,
    sourceUrl: row.source_url,
    isCatalogVisible: row.is_catalog_visible
  };
}

export function templateFromRow(row: TicketTemplateRow): TicketTemplate {
  return {
    id: row.id,
    name: row.name,
    styleKey: row.style_key,
    previewUrl: row.preview_url,
    backgroundStyle: row.background_style,
    accentColor: row.accent_color
  };
}

export function ticketFromRow(row: TicketRow): Ticket {
  return {
    id: row.id,
    movieId: row.movie_id,
    ticketNo: row.ticket_no,
    watchDate: row.watch_date,
    watchTime: row.watch_time.slice(0, 5),
    cinemaName: row.cinema_name,
    city: row.city,
    seat: row.seat,
    userRating: Number(row.user_rating),
    reviewText: row.review_text,
    templateId: row.template_id,
    isPublic: row.is_public,
    createdAt: row.created_at
  };
}

export function ticketInputToRow(input: TicketFormInput, userId: string, ticketNo: string): TicketInsert {
  return {
    user_id: userId,
    movie_id: input.movieId,
    template_id: input.templateId,
    ticket_no: ticketNo,
    watch_date: input.watchDate,
    watch_time: input.watchTime,
    cinema_name: input.cinemaName,
    city: input.city,
    seat: input.seat,
    user_rating: input.userRating,
    review_text: input.reviewText,
    is_public: input.isPublic
  };
}

export function ticketToInsert(ticket: Ticket, userId: string): TicketInsert {
  return {
    id: ticket.id,
    user_id: userId,
    movie_id: ticket.movieId,
    template_id: ticket.templateId,
    ticket_no: ticket.ticketNo,
    watch_date: ticket.watchDate,
    watch_time: ticket.watchTime,
    cinema_name: ticket.cinemaName,
    city: ticket.city,
    seat: ticket.seat,
    user_rating: ticket.userRating,
    review_text: ticket.reviewText,
    is_public: ticket.isPublic,
    created_at: ticket.createdAt
  };
}
