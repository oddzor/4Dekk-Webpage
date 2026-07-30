"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import type {
  DekkhotellEntry,
  DekkhotellEntryInput,
  TireType,
} from "@/lib/supabase/types";

interface EntryFormProps {
  entry?: DekkhotellEntry;
  onClose: () => void;
  onSaved: () => void;
}

const inputClass =
  "w-full px-3 py-1.5 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-white placeholder-gray-400 hover:border-gray-500";

const labelClass = "block mb-1 text-xs font-medium text-headings";

export default function EntryForm({ entry, onClose, onSaved }: EntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditing = Boolean(entry);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DekkhotellEntryInput>({
    defaultValues: {
      name: entry?.name ?? "",
      phone: entry?.phone ?? "",
      email: entry?.email ?? "",
      registration_number: entry?.registration_number ?? "",
      tire_type: entry?.tire_type ?? null,
      dimensions_sommer: entry?.dimensions_sommer ?? "",
      dimensions_vinter: entry?.dimensions_vinter ?? "",
      position: entry?.position ?? "",
      address: entry?.address ?? "",
      notes: entry?.notes ?? "",
      contacted_about_worn_tires: entry?.contacted_about_worn_tires ?? false,
      contacted_about_worn_tires_at:
        entry?.contacted_about_worn_tires_at ?? null,
      amount_owed: entry?.amount_owed ?? null,
    },
  });

  const contactedAt = watch("contacted_about_worn_tires_at");
  const amountOwed = watch("amount_owed");

  const onSubmit = async (data: DekkhotellEntryInput) => {
    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      registration_number: data.registration_number?.trim() || null,
      tire_type: (data.tire_type as TireType) || null,
      dimensions_sommer: data.dimensions_sommer?.trim() || null,
      dimensions_vinter: data.dimensions_vinter?.trim() || null,
      position: data.position?.trim() || null,
      address: data.address?.trim() || null,
      notes: data.notes?.trim() || null,
      contacted_about_worn_tires: Boolean(data.contacted_about_worn_tires),
      contacted_about_worn_tires_at: data.contacted_about_worn_tires
        ? data.contacted_about_worn_tires_at ?? new Date().toISOString()
        : null,
      amount_owed:
        data.amount_owed !== null &&
        data.amount_owed !== undefined &&
        !Number.isNaN(Number(data.amount_owed))
          ? Number(data.amount_owed)
          : null,
    };

    const { error: saveError } = isEditing
      ? await supabase
          .from("dekkhotell_entries")
          .update(payload)
          .eq("id", entry!.id)
      : await supabase.from("dekkhotell_entries").insert(payload);

    if (saveError) {
      setError("Kunne ikke lagre. Prøv igjen.");
      setIsSubmitting(false);
      return;
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 sm:p-4">
      <div className="w-full max-w-2xl p-4 overflow-y-auto rounded-lg card-dark max-h-[98vh] sm:p-5">
        <h2 className="mb-3 text-lg text-headings">
          {isEditing ? "Rediger Kunde" : "Ny Kunde"}
        </h2>

        {Number(amountOwed) > 0 && (
          <div className="p-3 mb-3 border border-red-500 rounded-lg bg-red-900/30">
            <p className="text-sm font-medium text-red-300">
              ⚠️ Kunden skylder {Number(amountOwed).toLocaleString("no-NO")} kr
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className={labelClass}>Navn *</label>
            <input
              type="text"
              {...register("name", { required: "Dette feltet er påkrevd" })}
              className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
              placeholder="Kunde Kundesen"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Telefonnummer</label>
              <input
                type="tel"
                {...register("phone")}
                className={inputClass}
                placeholder="123 45 678"
              />
            </div>

            <div>
              <label className={labelClass}>E-post</label>
              <input
                type="email"
                {...register("email")}
                className={inputClass}
                placeholder="kunde@eksempel.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Registreringsnummer</label>
              <input
                type="text"
                {...register("registration_number")}
                className={inputClass}
                placeholder="AB12345"
              />
            </div>

            <div>
              <label className={labelClass}>Posisjon</label>
              <input
                type="text"
                {...register("position")}
                className={inputClass}
                placeholder="F.eks. Rack 3, Hylle 2"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Dekk type og dimensjoner</label>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label className="flex items-center flex-shrink-0 w-28 gap-1.5 text-sm text-white whitespace-nowrap">
                  <input
                    type="radio"
                    value="sommer"
                    {...register("tire_type")}
                    className="w-4 h-4 accent-accent"
                  />
                  ☀️ Sommer
                </label>
                <input
                  type="text"
                  {...register("dimensions_sommer")}
                  className={inputClass}
                  placeholder="F.eks. 205/55R16"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center flex-shrink-0 w-28 gap-1.5 text-sm text-white whitespace-nowrap">
                  <input
                    type="radio"
                    value="vinter"
                    {...register("tire_type")}
                    className="w-4 h-4 accent-accent"
                  />
                  ❄️ Vinter
                </label>
                <input
                  type="text"
                  {...register("dimensions_vinter")}
                  className={inputClass}
                  placeholder="F.eks. 195/65R15"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center flex-shrink-0 w-28 gap-1.5 text-sm text-white whitespace-nowrap">
                  <input
                    type="radio"
                    value="na"
                    {...register("tire_type")}
                    className="w-4 h-4 accent-accent"
                  />
                  🚫 N/A
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Adresse</label>
            <textarea
              rows={1}
              {...register("address")}
              className={`${inputClass} resize-none`}
              placeholder="Kundens adresse"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Kunde kontaktet</label>
              <label className="flex items-center h-[30px] gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  {...register("contacted_about_worn_tires", {
                    onChange: (e) =>
                      setValue(
                        "contacted_about_worn_tires_at",
                        e.target.checked ? new Date().toISOString() : null,
                      ),
                  })}
                  className="w-4 h-4 accent-accent"
                />
                Kontaktet om slitte dekk
              </label>
              {contactedAt && (
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(contactedAt).toLocaleString("no-NO")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Beløp kunden skylder (kr)</label>
              <input
                type="number"
                step="0.01"
                {...register("amount_owed", { valueAsNumber: true })}
                className={inputClass}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Notater</label>
            <textarea
              rows={2}
              {...register("notes")}
              className={`${inputClass} resize-none`}
              placeholder="Eventuelle notater"
            />
          </div>

          {error && (
            <div className="p-3 border border-red-500 rounded-lg bg-red-900/20">
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg hover:bg-gray-800"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 text-sm btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Lagrer..." : "Lagre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
