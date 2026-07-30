"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { DekkhotellEntry, TireType } from "@/lib/supabase/types";
import { entriesToCsv } from "@/lib/dekkhotell/csv";
import EntryForm from "./EntryForm";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import CustomerDetailModal from "./CustomerDetailModal";
import StatsCards, {
  applyStatsFilter,
  ONE_YEAR_MS,
  type StatsFilter,
} from "./StatsCards";

const TIRE_TYPE_LABELS: Record<string, string> = {
  sommer: "☀️ Sommer",
  vinter: "❄️ Vinter",
  na: "🚫 N/A",
};

const PAGE_SIZE = 30;

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAgeTier(updatedAt: string): "yellow" | "pink" | "red" | null {
  const ageMs = Date.now() - new Date(updatedAt).getTime();
  if (ageMs >= ONE_YEAR_MS * 3) return "red";
  if (ageMs >= ONE_YEAR_MS * 2) return "pink";
  if (ageMs >= ONE_YEAR_MS) return "yellow";
  return null;
}

const AGE_BORDER_CLASS: Record<"yellow" | "pink" | "red", string> = {
  yellow: "border-yellow-500",
  pink: "border-pink-500",
  red: "border-red-500",
};

const AGE_LEFT_BORDER_CLASS: Record<"yellow" | "pink" | "red", string> = {
  yellow: "border-l-4 border-l-yellow-500",
  pink: "border-l-4 border-l-pink-500",
  red: "border-l-4 border-l-red-500",
};

interface DashboardProps {
  userEmail: string;
}

export default function Dashboard({ userEmail }: DashboardProps) {
  const router = useRouter();
  const [entries, setEntries] = useState<DekkhotellEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editingEntry, setEditingEntry] = useState<DekkhotellEntry | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);
  const [deletingEntry, setDeletingEntry] = useState<DekkhotellEntry | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewingEntry, setViewingEntry] = useState<DekkhotellEntry | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [statsFilter, setStatsFilter] = useState<StatsFilter>("all");
  const [isSwitchingTireType, setIsSwitchingTireType] = useState(false);

  const fetchEntries = async () => {
    setIsLoading(true);
    setLoadError(null);

    const supabase = createClient();
    const pageSize = 1000;
    const allEntries: DekkhotellEntry[] = [];
    let from = 0;

    while (true) {
      const { data, error } = await supabase
        .from("dekkhotell_entries")
        .select("*")
        .order("name", { ascending: true })
        .range(from, from + pageSize - 1);

      if (error) {
        setLoadError("Kunne ikke hente oppføringer.");
        setIsLoading(false);
        return;
      }

      allEntries.push(...(data ?? []));
      if (!data || data.length < pageSize) break;
      from += pageSize;
    }

    setEntries(allEntries);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const filteredEntries = useMemo(() => {
    const byStat = applyStatsFilter(entries, statsFilter);
    const query = search.trim().toLowerCase();
    const searched = !query
      ? byStat
      : byStat.filter((entry) =>
          [
            entry.name,
            entry.phone,
            entry.email,
            entry.registration_number,
            entry.tire_type,
            entry.dimensions_sommer,
            entry.dimensions_vinter,
            entry.position,
          ]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(query)),
        );

    if (statsFilter === "glemt") {
      return [...searched].sort(
        (a, b) =>
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      );
    }
    return searched;
  }, [entries, search, statsFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, statsFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSaved = () => {
    setIsAdding(false);
    setEditingEntry(null);
    fetchEntries();
  };

  const handleDelete = async () => {
    if (!deletingEntry) return;
    setIsDeleting(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("dekkhotell_entries")
      .delete()
      .eq("id", deletingEntry.id);

    setIsDeleting(false);

    if (!error) {
      setDeletingEntry(null);
      setViewingEntry((current) =>
        current?.id === deletingEntry.id ? null : current,
      );
      fetchEntries();
    }
  };

  const handleSwitchTireType = async (entry: DekkhotellEntry) => {
    const newType: TireType =
      entry.tire_type === "vinter" ? "sommer" : "vinter";

    setIsSwitchingTireType(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("dekkhotell_entries")
      .update({ tire_type: newType })
      .eq("id", entry.id)
      .select()
      .single();
    setIsSwitchingTireType(false);

    if (!error && data) {
      setEntries((prev) => prev.map((e) => (e.id === data.id ? data : e)));
      setViewingEntry(data);
    }
  };

  const handleDownloadBackup = () => {
    const csv = entriesToCsv(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dekkhotell-backup-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/dekkhotell/login");
    router.refresh();
  };

  return (
    <div className="container-custom section-padding">
      <div className="print:hidden">
        <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl text-headings sm:text-3xl">Dekkhotell</h1>
            <p className="mt-1 text-sm text-gray-400">{userEmail}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-3 btn-accent"
            >
              + Ny Kunde
            </button>
            <button
              onClick={handleDownloadBackup}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg sm:px-6 sm:py-3 sm:text-base hover:bg-gray-800"
            >
              Last ned backup
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg sm:px-6 sm:py-3 sm:text-base hover:bg-gray-800"
            >
              Logg ut
            </button>
          </div>
        </div>
  
        <StatsCards
          entries={entries}
          activeFilter={statsFilter}
          onFilterChange={setStatsFilter}
        />
  
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk etter navn, telefon, e-post, reg.nr eller posisjon..."
            className="w-full max-w-xl px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent hover:border-gray-500"
          />
        </div>
  
        {loadError && (
          <div className="p-4 mb-6 border border-red-500 rounded-lg bg-red-900/20">
            <p className="text-sm text-red-300">{loadError}</p>
          </div>
        )}
  
        {isLoading ? (
          <p className="text-gray-400">Laster inn...</p>
        ) : filteredEntries.length === 0 ? (
          <p className="text-gray-400">
            {entries.length === 0
              ? "Ingen oppføringer ennå."
              : "Ingen treff på søket."}
          </p>
        ) : (
          <>
            <div className="space-y-2 sm:hidden">
              {paginatedEntries.map((entry) => {
                const ageTier =
                  statsFilter === "glemt" ? getAgeTier(entry.updated_at) : null;
                const borderClass =
                  Number(entry.amount_owed) > 0
                    ? "border border-red-500"
                    : ageTier
                      ? `border ${AGE_BORDER_CLASS[ageTier]}`
                      : "";
                return (
                  <div
                    key={entry.id}
                    onClick={() => setViewingEntry(entry)}
                    className={`p-3 rounded-lg card-dark cursor-pointer ${borderClass}`}
                  >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white truncate">
                      {Number(entry.amount_owed) > 0 && "💰 "}
                      {entry.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingEntry(entry);
                      }}
                      className="text-xs text-red-400 shrink-0"
                    >
                      Slett
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    {entry.tire_type
                      ? TIRE_TYPE_LABELS[entry.tire_type]
                      : "—"}{" "}
                    · {entry.position || "—"} · {entry.phone || "—"}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Sist endret: {formatDateTime(entry.updated_at)}
                  </p>
                </div>
                );
              })}
            </div>
  
            <div className="hidden overflow-x-auto rounded-lg card-dark sm:block">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-600">
                    <th className="px-4 py-3 font-medium">Navn</th>
                    <th className="px-4 py-3 font-medium">Telefon</th>
                    <th className="px-4 py-3 font-medium">Sist endret</th>
                    <th className="px-4 py-3 font-medium">Reg.nr</th>
                    <th className="px-4 py-3 font-medium">Type Dekk</th>
                    <th className="px-4 py-3 font-medium">Posisjon</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEntries.map((entry) => {
                    const ageTier =
                      statsFilter === "glemt"
                        ? getAgeTier(entry.updated_at)
                        : null;
                    return (
                      <tr
                        key={entry.id}
                        onClick={() => setViewingEntry(entry)}
                        className={`border-b border-gray-700 cursor-pointer last:border-0 hover:bg-gray-800/50 ${
                          ageTier ? AGE_LEFT_BORDER_CLASS[ageTier] : ""
                        }`}
                      >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={
                            Number(entry.amount_owed) > 0
                              ? "px-2 py-0.5 text-white border border-red-500 rounded"
                              : "text-white"
                          }
                        >
                          {Number(entry.amount_owed) > 0 && "💰 "}
                          {entry.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {entry.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {formatDateTime(entry.updated_at)}
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {entry.registration_number || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {entry.tire_type
                          ? TIRE_TYPE_LABELS[entry.tire_type]
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                        {entry.position || "—"}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setDeletingEntry(entry)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Slett
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
  
        {!isLoading && filteredEntries.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 sm:gap-4">
            <p className="text-sm text-gray-400">
              Side {currentPage} av {totalPages} ({filteredEntries.length}{" "}
              oppføringer)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                Forrige
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 border border-gray-600 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                Neste
              </button>
            </div>
          </div>
        )}
      </div>

      {(isAdding || editingEntry) && (
        <EntryForm
          entry={editingEntry ?? undefined}
          onClose={() => {
            setIsAdding(false);
            setEditingEntry(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {viewingEntry && (
        <CustomerDetailModal
          entry={viewingEntry}
          onClose={() => setViewingEntry(null)}
          onEdit={() => {
            setEditingEntry(viewingEntry);
            setViewingEntry(null);
          }}
          onDelete={() => setDeletingEntry(viewingEntry)}
          onSwitchTireType={() => handleSwitchTireType(viewingEntry)}
          isSwitchingTireType={isSwitchingTireType}
        />
      )}

      {deletingEntry && (
        <ConfirmDeleteDialog
          entryName={deletingEntry.name}
          onCancel={() => setDeletingEntry(null)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
