"use client";

interface ConfirmDeleteDialogProps {
  entryName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function ConfirmDeleteDialog({
  entryName,
  onCancel,
  onConfirm,
  isDeleting,
}: ConfirmDeleteDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-dark">
      <div className="w-full max-w-sm p-6 sheet-dark">
        <h2 className="mb-2 text-lg text-[var(--dh-headings)]">
          Slette oppføring?
        </h2>
        <p className="mb-6 text-sm text-[var(--dh-text)]">
          Er du sikker på at du vil slette oppføringen for{" "}
          <strong className="text-[var(--dh-headings)]">{entryName}</strong>?
          Dette kan ikke angres.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-base btn-ghost py-3"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 btn-base btn-danger py-3"
          >
            {isDeleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      </div>
    </div>
  );
}
