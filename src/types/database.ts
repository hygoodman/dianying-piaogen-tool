export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
          id: string;
          title: string;
          original_title: string;
          poster_url: string;
          release_year: number;
          release_date: string;
          genre: string[];
          country: string;
          director: string;
          description: string;
          rating: number;
          duration: number | null;
          source_url: string;
          is_catalog_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          original_title: string;
          poster_url: string;
          release_year: number;
          release_date?: string;
          genre?: string[];
          country: string;
          director: string;
          description: string;
          rating: number;
          duration?: number | null;
          source_url?: string;
          is_catalog_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["movies"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      ticket_templates: {
        Row: {
          id: string;
          name: string;
          style_key: "classic" | "black-gold" | "vintage";
          preview_url: string;
          background_style: string;
          accent_color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          style_key: "classic" | "black-gold" | "vintage";
          preview_url?: string;
          background_style: string;
          accent_color: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["ticket_templates"]["Insert"]>;
        Relationships: [];
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          movie_id: string;
          template_id: string;
          ticket_no: string;
          watch_date: string;
          watch_time: string;
          cinema_name: string;
          city: string;
          seat: string;
          user_rating: number;
          review_text: string;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          movie_id: string;
          template_id: string;
          ticket_no: string;
          watch_date: string;
          watch_time: string;
          cinema_name: string;
          city: string;
          seat: string;
          user_rating: number;
          review_text?: string;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tickets"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
