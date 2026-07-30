export type TireType = "sommer" | "vinter" | "na";

export interface DekkhotellEntry {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  registration_number: string | null;
  tire_type: TireType | null;
  dimensions_sommer: string | null;
  dimensions_vinter: string | null;
  position: string | null;
  address: string | null;
  notes: string | null;
  contacted_about_worn_tires: boolean;
  contacted_about_worn_tires_at: string | null;
  amount_owed: number | null;
}

export type DekkhotellEntryInput = Omit<
  DekkhotellEntry,
  "id" | "created_at" | "updated_at"
>;
