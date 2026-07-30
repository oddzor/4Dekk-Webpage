-- Replaces the single "dimensions" field with one per tire set, since a
-- customer's summer and winter tires can be different sizes.
-- Run this in the Supabase SQL Editor for the project backing /dekkhotell.

alter table dekkhotell_entries drop column if exists dimensions;
alter table dekkhotell_entries add column if not exists dimensions_sommer text;
alter table dekkhotell_entries add column if not exists dimensions_vinter text;
