-- Adds tracking for "customer contacted about worn tires" (with an
-- automatic timestamp set client-side when checked) and an outstanding
-- balance field for tires fitted at the tire hotel.
-- Run this in the Supabase SQL Editor for the project backing /dekkhotell.

alter table dekkhotell_entries
  add column if not exists contacted_about_worn_tires boolean not null default false;
alter table dekkhotell_entries
  add column if not exists contacted_about_worn_tires_at timestamptz;
alter table dekkhotell_entries
  add column if not exists amount_owed numeric(10, 2);
