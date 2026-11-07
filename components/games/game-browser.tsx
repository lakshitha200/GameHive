"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import GameCard from "./game-card";
import EmptyState from "../ui/EmptyState";
import { Game, allCategories, maxPrice } from "@/lib/data/games";
import { SortKey, filterGames, sortOptions } from "@/lib/filter";

export default function GameBrowser({ games }: { games: Game[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<SortKey>("popularity");

  const results = useMemo(
    () => filterGames(games, { search, categories: category ? [category] : [], platforms: [], maxPrice, sort }),
    [games, search, category, sort],
  );

  const reset = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <section aria-label="Browse games">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-gray-500" aria-hidden />
          <input
            type="search"
            aria-label="Search games"
            placeholder="Search by title, developer or tag…"
            value={search}
            maxLength={60}
            onChange={(e) => setSearch(e.target.value)}
            className="field pr-10"
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2 top-2.5 rounded-full p-1 text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          )}
        </div>
        <select aria-label="Sort games" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field md:w-56">
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["", ...allCategories].map((c) => (
          <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={`chip ${category === c ? "active" : ""}`}>
            {c || "All"}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-gray-500" aria-live="polite">
        {results.length} {results.length === 1 ? "game" : "games"} found
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No games match your search"
          text="Try a different keyword or clear the filters."
          action={
            <button onClick={reset} className="btn-secondary mt-6">
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((g, i) => (
            <div key={g.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <GameCard game={g} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
