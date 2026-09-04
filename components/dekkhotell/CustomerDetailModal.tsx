"use client";

import type { DekkhotellEntry } from "@/lib/supabase/types";

interface CustomerDetailModalProps {
  entry: DekkhotellEntry;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSwitchTireType: () => void;
  isSwitchingTireType?: boolean;
}

const TIRE_TYPE_LABELS: Record<string, string> = {
  sommer: "☀️ Sommer",
  vinter: "❄️ Vinter",
  na: "🚫 N/A",
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="text-sm text-white">{value || "—"}</p>
    </div>
  );
}

export default function CustomerDetailModal({
  entry,
  onClose,
  onEdit,
  onDelete,
  onSwitchTireType,
  isSwitchingTireType,
}: CustomerDetailModalProps) {
  const tireLabel = entry.tire_type ? TIRE_TYPE_LABELS[entry.tire_type] : "—";
  const today = new Date().toLocaleDateString("no-NO");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 sm:p-4 print:bg-white print:p-0"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[67.2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Lukk"
          className="absolute z-20 items-center justify-center hidden w-8 h-8 text-white bg-gray-800 border border-gray-600 rounded-full -top-3 -right-3 hover:bg-gray-700 sm:flex print:hidden"
        >
          ✕
        </button>

        <div className="relative flex flex-col gap-4 p-3 overflow-y-auto rounded-lg card-dark max-h-[85dvh] sm:gap-5 sm:p-5 sm:max-h-[95vh] sm:flex-row print:bg-white print:p-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk"
            className="sticky z-20 flex items-center self-end justify-center flex-shrink-0 w-10 h-10 -mt-1 -mb-2 text-white bg-gray-800 border border-gray-600 rounded-full shadow-lg top-0 hover:bg-gray-700 sm:hidden print:hidden"
          >
            ✕
          </button>

          <div className="flex-1">
            <h2 className="mb-1 text-lg text-headings">{entry.name}</h2>
            {entry.updated_at && (
              <p className="mb-3 text-xs text-gray-500">
                Sist endret:{" "}
                {new Date(entry.updated_at).toLocaleString("no-NO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}

            {Number(entry.amount_owed) > 0 && (
              <div className="p-3 mb-3 border border-red-500 rounded-lg bg-red-900/30">
                <p className="text-sm font-medium text-red-300">
                  ⚠️ Kunden skylder{" "}
                  {Number(entry.amount_owed).toLocaleString("no-NO")} kr
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Telefonnummer" value={entry.phone} />
                <Field label="E-post" value={entry.email} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Registreringsnummer"
                  value={entry.registration_number}
                />
                <Field label="Posisjon" value={entry.position} />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Field label="Type dekk" value={tireLabel} />
                <Field
                  label="☀️ Sommer dim."
                  value={entry.dimensions_sommer}
                />
                <Field
                  label="❄️ Vinter dim."
                  value={entry.dimensions_vinter}
                />
              </div>

              <Field label="Adresse" value={entry.address} />
              <Field label="Notater" value={entry.notes} />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Kunde kontaktet"
                  value={
                    entry.contacted_about_worn_tires
                      ? `Ja, ${new Date(
                          entry.contacted_about_worn_tires_at!,
                        ).toLocaleString("no-NO")}`
                      : "Nei"
                  }
                />
                <Field
                  label="Beløp kunden skylder"
                  value={
                    entry.amount_owed
                      ? `${Number(entry.amount_owed).toLocaleString(
                          "no-NO",
                        )} kr`
                      : null
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 sm:flex sm:flex-row sm:flex-wrap sm:gap-3 print:hidden">
              {(entry.tire_type === "sommer" ||
                entry.tire_type === "vinter") && (
                <button
                  type="button"
                  onClick={onSwitchTireType}
                  disabled={isSwitchingTireType}
                  className="px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg sm:flex-1 sm:px-6 sm:py-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSwitchingTireType
                    ? "Bytter..."
                    : entry.tire_type === "vinter"
                      ? "Bytt til Sommer"
                      : "Bytt til Vinter"}
                </button>
              )}
              <button
                type="button"
                onClick={onEdit}
                className="px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg sm:flex-1 sm:px-6 sm:py-2 hover:bg-gray-800"
              >
                Rediger
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2.5 text-sm font-medium text-red-400 transition-colors duration-200 border rounded-lg border-red-700/50 sm:flex-1 sm:px-6 sm:py-2 hover:bg-red-900/30"
              >
                Slett
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 text-sm btn-accent sm:hidden"
              >
                Print
              </button>
            </div>
          </div>

          {/* Label preview + print is a shop-counter (desktop) action; hidden on phones to keep the sheet compact, but always rendered for print. */}
          <div className="flex-col items-center hidden gap-3 sm:flex sm:border-l sm:border-gray-700 sm:pl-5 print:flex">
            <div
              id="dekkhotell-printable"
              className="relative box-border w-[60mm] h-[100mm] flex flex-col items-center justify-center gap-[2mm] p-[3mm] text-center bg-white rounded-lg shrink-0 print:rounded-none"
            >
              <p
                className="absolute top-[2mm] left-0 right-0 px-[3mm] text-[6mm] font-bold text-center"
                style={{ color: "#000000" }}
              >
                {entry.position || "—"}
              </p>
              <div className="flex items-center gap-[1mm]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/android-chrome-192x192.png"
                  alt=""
                  className="w-[5mm] h-[5mm]"
                />
                <p
                  className="text-[4mm] font-bold"
                  style={{ color: "#000000" }}
                >
                  4Dekk AS
                </p>
              </div>
              <p
                className="text-[9mm] font-bold leading-tight"
                style={{ color: "#000000" }}
              >
                {entry.name}
              </p>
              <hr className="w-[20mm] border-t border-gray-400" />
              <p
                className="text-[9mm] font-bold leading-none"
                style={{ color: "#000000" }}
              >
                {entry.registration_number || "—"}
              </p>
              <p className="text-[4.5mm]" style={{ color: "#000000" }}>
                {tireLabel}
              </p>
              <p className="text-[3.25mm] text-gray-500 mt-[1mm]">{today}</p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2 text-sm btn-accent print:hidden"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
