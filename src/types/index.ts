export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  posterUrl: string;
  releaseYear: number;
  releaseDate: string;
  genre: string[];
  country: string;
  director: string;
  description: string;
  rating: number;
  duration: number | null;
  sourceUrl: string;
  isCatalogVisible: boolean;
};

export type TicketTemplateStyle = "classic" | "black-gold" | "vintage";

export type TicketTemplate = {
  id: string;
  name: string;
  styleKey: TicketTemplateStyle;
  previewUrl: string;
  backgroundStyle: string;
  accentColor: string;
};

export type Ticket = {
  id: string;
  movieId: string;
  ticketNo: string;
  watchDate: string;
  watchTime: string;
  cinemaName: string;
  city: string;
  seat: string;
  userRating: number;
  reviewText: string;
  templateId: string;
  isPublic: boolean;
  createdAt: string;
};

export type TicketFormInput = Omit<Ticket, "id" | "ticketNo" | "createdAt">;
