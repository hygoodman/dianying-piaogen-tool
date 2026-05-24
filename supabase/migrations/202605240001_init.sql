create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.movies (
  id text primary key,
  title text not null,
  original_title text not null,
  poster_url text not null,
  release_year integer not null,
  genre text[] not null default '{}',
  country text not null,
  director text not null,
  description text not null,
  rating numeric(3,1) not null check (rating >= 0 and rating <= 10),
  duration integer not null check (duration > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_templates (
  id text primary key,
  name text not null,
  style_key text not null check (style_key in ('classic', 'black-gold', 'vintage')),
  preview_url text not null default '',
  background_style text not null,
  accent_color text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id text not null references public.movies(id),
  template_id text not null references public.ticket_templates(id),
  ticket_no text not null unique,
  watch_date date not null,
  watch_time time not null,
  cinema_name text not null,
  city text not null,
  seat text not null,
  user_rating numeric(2,1) not null check (user_rating >= 0 and user_rating <= 5),
  review_text text not null default '',
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tickets_user_id_created_at_idx on public.tickets (user_id, created_at desc);
create index if not exists tickets_is_public_created_at_idx on public.tickets (is_public, created_at desc);
create index if not exists tickets_movie_id_idx on public.tickets (movie_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_movies_updated_at on public.movies;
create trigger set_movies_updated_at
before update on public.movies
for each row execute function public.set_updated_at();

drop trigger if exists set_ticket_templates_updated_at on public.ticket_templates;
create trigger set_ticket_templates_updated_at
before update on public.ticket_templates
for each row execute function public.set_updated_at();

drop trigger if exists set_tickets_updated_at on public.tickets;
create trigger set_tickets_updated_at
before update on public.tickets
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do update
  set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.movies enable row level security;
alter table public.ticket_templates enable row level security;
alter table public.tickets enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Movies are publicly readable" on public.movies;
create policy "Movies are publicly readable"
on public.movies for select
to anon, authenticated
using (true);

drop policy if exists "Ticket templates are publicly readable" on public.ticket_templates;
create policy "Ticket templates are publicly readable"
on public.ticket_templates for select
to anon, authenticated
using (true);

drop policy if exists "Tickets are readable by owner or public" on public.tickets;
create policy "Tickets are readable by owner or public"
on public.tickets for select
to anon, authenticated
using (is_public = true or (select auth.uid()) = user_id);

drop policy if exists "Tickets are insertable by owner" on public.tickets;
create policy "Tickets are insertable by owner"
on public.tickets for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Tickets are updatable by owner" on public.tickets;
create policy "Tickets are updatable by owner"
on public.tickets for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Tickets are deletable by owner" on public.tickets;
create policy "Tickets are deletable by owner"
on public.tickets for delete
to authenticated
using ((select auth.uid()) = user_id);
