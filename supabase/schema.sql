-- Dekkhotell (tire hotel) admin app schema.
-- Run this in the Supabase SQL Editor for the project backing /dekkhotell.

create table if not exists dekkhotell_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text,
  registration_number text,
  tire_type text check (tire_type in ('sommer', 'vinter', 'na')),
  dimensions_sommer text,
  dimensions_vinter text,
  position text,
  address text,
  notes text,
  contacted_about_worn_tires boolean not null default false,
  contacted_about_worn_tires_at timestamptz,
  amount_owed numeric(10, 2)
);

alter table dekkhotell_entries enable row level security;

create policy "Authenticated users can read entries"
  on dekkhotell_entries for select
  using (auth.uid() is not null);

create policy "Authenticated users can insert entries"
  on dekkhotell_entries for insert
  with check (auth.uid() is not null);

create policy "Authenticated users can update entries"
  on dekkhotell_entries for update
  using (auth.uid() is not null);

create policy "Authenticated users can delete entries"
  on dekkhotell_entries for delete
  using (auth.uid() is not null);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger dekkhotell_entries_updated_at
  before update on dekkhotell_entries
  for each row execute function set_updated_at();
