import type { DekkhotellEntry } from "@/lib/supabase/types";

export const DEKKHOTELL_CSV_COLUMNS: (keyof DekkhotellEntry)[] = [
  "id",
  "created_at",
  "updated_at",
  "name",
  "phone",
  "email",
  "registration_number",
  "tire_type",
  "dimensions_sommer",
  "dimensions_vinter",
  "position",
  "address",
  "notes",
  "contacted_about_worn_tires",
  "contacted_about_worn_tires_at",
  "amount_owed",
];

export function entriesToCsv(entries: DekkhotellEntry[]) {
  const escape = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };

  const rows = entries.map((entry) =>
    DEKKHOTELL_CSV_COLUMNS.map((col) => escape(entry[col])).join(","),
  );

  return [DEKKHOTELL_CSV_COLUMNS.join(","), ...rows].join("\n");
}
