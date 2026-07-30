-- Example data for local testing of the Dekkhotell dashboard.
-- Not real customer records - safe to run anytime, delete afterwards if desired.
-- Run supabase/migrations/002_tire_type_address.sql BEFORE this file.

insert into dekkhotell_entries
  (name, phone, email, registration_number, tire_type, position, address, notes)
values
  ('Ola Nordmann', '91234567', 'ola.nordmann@eksempel.no', 'EK12345', 'vinter', 'A-1', 'Storgata 1, 3256 Larvik', 'Skift til sommerdekk i april'),
  ('Kari Hansen', '92345678', 'kari.hansen@eksempel.no', 'BT54321', 'sommer', 'B-2', 'Kirkeveien 4, 3260 Larvik', null),
  ('Per Olsen', '93456789', null, 'DL99887', 'na', 'C-3', null, 'Henter selv, ingen dekk i hotell');
