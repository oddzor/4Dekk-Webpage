"use client";

import { useRef } from "react";
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
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="text-sm text-white">{value || "—"}</p>
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// The main document's print pipeline can't be made reliable across mobile
// browsers (iOS "Chrome" is WebKit under the hood, and WebKit's printing
// support for position:fixed and page-break math is buggy/inconsistent).
// So printing renders a tiny, self-contained document into a hidden iframe
// and prints that instead — nothing about the app's own layout, hidden
// elements, or CSS can interfere with it.
function buildLabelDocument(
  entry: DekkhotellEntry,
  tireLabel: string,
  today: string,
): string {
  const position = escapeHtml(entry.position || "—");
  const name = escapeHtml(entry.name);
  const reg = escapeHtml(entry.registration_number || "—");
  const tire = escapeHtml(tireLabel);
  const imageUrl = `${window.location.origin}/android-chrome-192x192.png`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Etikett</title>
<style>
  @page { size: 60mm 100mm; margin: 0; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    width: 60mm;
    height: 100mm;
    overflow: hidden;
  }
  body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2mm;
    padding: 3mm;
    text-align: center;
    background: #ffffff;
    color: #000000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  }
  .position {
    position: absolute;
    top: 2mm;
    left: 0;
    right: 0;
    padding: 0 3mm;
    font-size: 6mm;
    font-weight: 700;
  }
  .brand { display: flex; align-items: center; gap: 1mm; }
  .brand img { width: 5mm; height: 5mm; }
  .brand span { font-size: 4mm; font-weight: 700; }
  .name { font-size: 9mm; font-weight: 700; line-height: 1.1; margin: 0; }
  hr { width: 20mm; border: none; border-top: 1px solid #9ca3af; margin: 0; }
  .reg { font-size: 9mm; font-weight: 700; line-height: 1; margin: 0; }
  .tire { font-size: 4.5mm; margin: 0; }
  .date { font-size: 3.25mm; color: #6b7280; margin: 1mm 0 0; }
</style>
</head>
<body>
  <p class="position">${position}</p>
  <div class="brand">
    <img src="${imageUrl}" alt="" />
    <span>4Dekk AS</span>
  </div>
  <p class="name">${name}</p>
  <hr />
  <p class="reg">${reg}</p>
  <p class="tire">${tire}</p>
  <p class="date">${today}</p>
</body>
</html>`;
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
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    const iframe = printFrameRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc) return;

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };

    doc.open();
    doc.write(buildLabelDocument(entry, tireLabel, today));
    doc.close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 sm:p-4"
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
          className="absolute z-20 items-center justify-center hidden w-8 h-8 text-white bg-gray-800 border border-gray-600 rounded-full -top-3 -right-3 hover:bg-gray-700 sm:flex"
        >
          ✕
        </button>

        <div className="relative flex flex-col gap-4 p-3 overflow-y-auto rounded-lg card-dark max-h-[85dvh] sm:gap-5 sm:p-5 sm:max-h-[95vh] sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk"
            className="sticky z-20 flex items-center self-end justify-center flex-shrink-0 w-10 h-10 -mt-1 -mb-2 text-white bg-gray-800 border border-gray-600 rounded-full shadow-lg top-0 hover:bg-gray-700 sm:hidden"
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

            <div className="grid grid-cols-2 gap-2 mt-4 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
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
                onClick={handlePrint}
                className="px-4 py-2.5 text-sm btn-accent sm:hidden"
              >
                Print
              </button>
            </div>
          </div>

          {/* Label preview is a shop-counter (desktop) convenience; hidden on phones to keep the sheet compact. Printing itself never prints this page — see buildLabelDocument. */}
          <div className="flex-col items-center hidden gap-3 sm:flex sm:border-l sm:border-gray-700 sm:pl-5">
            <div
              aria-hidden="true"
              className="relative box-border w-[60mm] h-[100mm] flex flex-col items-center justify-center gap-[2mm] p-[3mm] text-center bg-white rounded-lg shrink-0"
            >
              <LabelContent entry={entry} tireLabel={tireLabel} today={today} />
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full py-2 text-sm btn-accent"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      <iframe
        ref={printFrameRef}
        title="Etikett"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 0,
          height: 0,
          border: "none",
        }}
      />
    </div>
  );
}
