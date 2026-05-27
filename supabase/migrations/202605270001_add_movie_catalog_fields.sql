alter table public.movies
  add column if not exists release_date date,
  add column if not exists source_url text not null default '',
  add column if not exists is_catalog_visible boolean not null default true;

alter table public.movies
  alter column duration drop not null;

update public.movies
set
  release_date = make_date(release_year, 1, 1),
  is_catalog_visible = false
where release_date is null;

alter table public.movies
  alter column release_date set not null;

create index if not exists movies_catalog_release_date_idx
on public.movies (is_catalog_visible, release_date desc, rating desc);
