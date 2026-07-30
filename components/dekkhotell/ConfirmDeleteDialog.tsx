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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-sm p-6 rounded-lg card-dark">
        <h2 className="mb-2 text-lg text-headings">Slette oppføring?</h2>
        <p className="mb-6 text-sm text-text">
          Er du sikker på at du vil slette oppføringen for{" "}
          <strong className="text-white">{entryName}</strong>? Dette kan ikke
          angres.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 font-medium text-white transition-colors duration-200 bg-red-700 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      </div>
    </div>
  );
}
