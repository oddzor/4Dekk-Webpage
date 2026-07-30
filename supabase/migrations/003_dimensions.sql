-- Adds a free-text tire dimensions field (e.g. "205/55R16"), stored
-- alongside the season selection (tire_type) rather than replacing it.
-- Run this in the Supabase SQL Editor for the project backing /dekkhotell.

alter table dekkhotell_entries add column if not exists dimensions text;
