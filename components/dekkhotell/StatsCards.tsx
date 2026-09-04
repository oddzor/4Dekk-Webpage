import type { DekkhotellEntry } from "@/lib/supabase/types";

export type StatsFilter = "all" | "vinter" | "sommer" | "uten_type" | "glemt";

export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export function applyStatsFilter(
  entries: DekkhotellEntry[],
  filter: StatsFilter,
): DekkhotellEntry[] {
  switch (filter) {
    case "vinter":
      return entries.filter((e) => e.tire_type === "vinter");
    case "sommer":
      return entries.filter((e) => e.tire_type === "sommer");
    case "uten_type":
      return entries.filter((e) => !e.tire_type || e.tire_type === "na");
    case "glemt":
      return entries.filter(
        (e) => Date.now() - new Date(e.updated_at).getTime() >= ONE_YEAR_MS,
      );
    default:
      return entries;
  }
}

interface StatsCardsProps {
  entries: DekkhotellEntry[];
  activeFilter: StatsFilter;
  onFilterChange: (filter: StatsFilter) => void;
}

export default function StatsCards({
  entries,
  activeFilter,
  onFilterChange,
}: StatsCardsProps) {
  const stats: {
    label: string;
    value: number;
    icon: string;
    filter: StatsFilter;
  }[] = [
    { label: "Kunder", value: entries.length, icon: "👥", filter: "all" },
    {
      label: "Vinterdekk",
      value: applyStatsFilter(entries, "vinter").length,
      icon: "❄️",
      filter: "vinter",
    },
    {
      label: "Sommerdekk",
      value: applyStatsFilter(entries, "sommer").length,
      icon: "☀️",
      filter: "sommer",
    },
    {
      label: "Uten type",
      value: applyStatsFilter(entries, "uten_type").length,
      icon: "❓",
      filter: "uten_type",
    },
    {
      label: "Glemt/Gamle",
      value: applyStatsFilter(entries, "glemt").length,
      icon: "🕸️",
      filter: "glemt",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-6 sm:grid-cols-3 sm:gap-4 sm:mb-8 lg:grid-cols-5">
      {stats.map((stat) => {
        const isActive = activeFilter === stat.filter;
        return (
          <button
            key={stat.label}
            type="button"
            onClick={() => onFilterChange(isActive ? "all" : stat.filter)}
            className={`flex items-center gap-2 p-3 text-left card-dark card-hover sm:gap-3 sm:p-4 ${
              isActive ? "ring-2 ring-[var(--dh-accent)]" : ""
            }`}
          >
            <span className="text-xl sm:text-2xl">{stat.icon}</span>
            <div>
              <p className="text-xl font-bold leading-tight text-[var(--dh-headings)] sm:text-2xl">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--dh-muted)] sm:text-sm">
                {stat.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
