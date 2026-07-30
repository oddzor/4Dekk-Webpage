-- One-off data fix: the tire_type backfill (bulk update run right after the
-- legacy customer import) caused the updated_at trigger to stamp every
-- imported row with "now", overwriting the historical last-modified date.
-- created_at was never touched by that update and still holds the correct
-- historical value from the old dekkhotell system's "Endret" field, so we
-- copy it back into updated_at for exactly the rows affected (identified by
-- updated_at falling on today's date, the moment the backfill ran).
-- Trigger is disabled during the fix since it unconditionally sets
-- updated_at = now() on every UPDATE.

alter table dekkhotell_entries disable trigger dekkhotell_entries_updated_at;

update dekkhotell_entries
set updated_at = created_at
where updated_at::date = current_date
  and created_at::date < current_date;

alter table dekkhotell_entries enable trigger dekkhotell_entries_updated_at;
