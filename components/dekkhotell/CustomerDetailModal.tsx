"use client";

import { createPortal } from "react-dom";
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
    <div className={value ? undefined : "hidden sm:block"}>
      <p className="text-xs font-medium text-[var(--dh-muted)]">{label}</p>
      <p className="text-sm text-[var(--dh-headings)]">{value || "—"}</p>
    </div>
  );
}

function LabelContent({
  entry,
  tireLabel,
  today,
}: {
  entry: DekkhotellEntry;
  tireLabel: string;
  today: string;
}) {
  return (
    <>
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
        <p className="text-[4mm] font-bold" style={{ color: "#000000" }}>
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
    </>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 overlay-dark sm:p-4 print:bg-white print:p-0"
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
          className="absolute z-20 items-center justify-center hidden w-8 h-8 btn-base btn-ghost !p-0 rounded-full -top-3 -right-3 sm:flex print:hidden"
        >
          ✕
        </button>

        <div className="relative flex flex-col gap-4 p-3 overflow-y-auto sheet-dark max-h-[85dvh] sm:gap-5 sm:p-5 sm:max-h-[95vh] sm:flex-row print:bg-white print:p-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk"
            className="sticky z-20 flex items-center self-end justify-center flex-shrink-0 w-10 h-10 -mt-1 -mb-2 btn-base btn-ghost !p-0 rounded-full shadow-lg top-0 sm:hidden print:hidden"
          >
            ✕
          </button>

          <div className="flex-1">
            <h2 className="mb-1 text-lg text-[var(--dh-headings)]">
              {entry.name}
            </h2>
            {entry.updated_at && (
              <p className="mb-3 text-xs text-[var(--dh-muted)]">
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
              <div className="p-3 mb-3 alert-danger">
                <p className="text-sm font-medium">
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
                <div>
                  <p className="text-xs font-medium text-[var(--dh-muted)]">
                    Type dekk
                  </p>
                  <p className="mt-0.5">
                    <span
                      className={`chip ${
                        entry.tire_type === "vinter"
                          ? "chip-vinter"
                          : entry.tire_type === "sommer"
                            ? "chip-sommer"
                            : ""
                      }`}
                    >
                      {tireLabel}
                    </span>
                  </p>
                </div>
                <Field
                  label="☀️ Sommer dim."
                  value={entry.dimensions_sommer}
                />
                <Field
                  label="❄️ Vinter dim."
                  value={entry.dimensions_vinter}
                />
              </div>

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
                  className="btn-base btn-ghost sm:flex-1"
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
                className="btn-base btn-ghost sm:flex-1"
              >
                Rediger
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="btn-base btn-danger-ghost sm:flex-1"
              >
                Slett
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-base btn-accent sm:hidden"
              >
                Print
              </button>
            </div>
          </div>

          {/* Label preview is a shop-counter (desktop) convenience; hidden on phones to keep the sheet compact. It's decorative only — the actual print source below is portaled to <body> so it isn't affected by this panel's display state. */}
          <div className="flex-col items-center hidden gap-3 sm:flex sm:border-l sm:border-[var(--dh-line-strong)] sm:pl-5">
            <div
              aria-hidden="true"
              className="relative box-border w-[60mm] h-[100mm] flex flex-col items-center justify-center gap-[2mm] p-[3mm] text-center bg-white rounded-lg shrink-0"
            >
              <LabelContent entry={entry} tireLabel={tireLabel} today={today} />
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full btn-base btn-accent print:hidden"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Actual print source: portaled to <body> so it's a direct sibling of the document, not nested inside this modal's overflow/hidden ancestors — those are what caused mobile printing to render blank. */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            id="dekkhotell-printable"
            className="fixed box-border w-[60mm] h-[100mm] flex flex-col items-center justify-center gap-[2mm] p-[3mm] text-center bg-white print:rounded-none"
            style={{ left: "-9999px", top: 0 }}
          >
            <LabelContent entry={entry} tireLabel={tireLabel} today={today} />
          </div>,
          document.body,
        )}
    </div>
  );
}
