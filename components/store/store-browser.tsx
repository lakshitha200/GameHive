"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal, SearchX } from "lucide-react";
import GameCard from "../games/game-card";
import EmptyState from "../ui/EmptyState";
import { Game, allCategories, allPlatforms, maxPrice } from "@/lib/data/games";
import { SortKey, filterGames, sortOptions } from "@/lib/filter";

const PER_PAGE = 6;

export default function StoreBrowser({ games }: { games: Game[] }) {
  const [category, setCategory] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [price, setPrice] = useState(maxPrice);
  const [sort, setSort] = useState<SortKey>("popularity");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(
    () => filterGames(games, { search: "", categories: category ? [category] : [], platforms, maxPrice: price, sort }),
    [games, category, platforms, price, sort],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  // Reset to first page whenever the result set changes.
  useEffect(() => setPage(1), [category, platforms, price, sort]);
  const current = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const togglePlatform = (p: string) => setPlatforms((x) => (x.includes(p) ? x.filter((i) => i !== p) : [...x, p]));
  const reset = () => {
    setCategory("");
    setPlatforms([]);
    setPrice(maxPrice);
  };
  const dirty = !!category || platforms.length > 0 || price !== maxPrice;

  const go = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <button
        className="btn-secondary btn-sm self-start md:hidden"
        onClick={() => setShowFilters((s) => !s)}
        aria-expanded={showFilters}
      >
        <SlidersHorizontal size={16} /> Filters {dirty && <span className="h-2 w-2 rounded-full bg-pink-500" />}
      </button>

      <aside className={`${showFilters ? "block animate-slide-down" : "hidden"} space-y-6 md:block md:w-1/4`} aria-label="Filters">
        <div className="surface p-6">
          <h3 className="mb-4 font-heading text-lg font-bold">Categories</h3>
          <div className="space-y-1">
            {["", ...allCategories].map((c) => (
              <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={`category-btn ${category === c ? "active" : ""}`}>
                {c || "All Games"}
              </button>
            ))}
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="mb-4 font-heading text-lg font-bold">Max Price</h3>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={1}
            value={price}
            aria-label="Maximum price"
            onChange={(e) => setPrice(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-indigo-500"
          />
          <div className="mt-3 flex justify-between text-sm text-gray-400">
            <span>Free</span>
            <span className="font-semibold text-white">{price === 0 ? "Free only" : `Up to $${price}`}</span>
          </div>
        </div>

        <div className="surface p-6">
          <h3 className="mb-4 font-heading text-lg font-bold">Platform</h3>
          <div className="space-y-3">
            {allPlatforms.map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-3 text-gray-300 hover:text-white">
                <input type="checkbox" checked={platforms.includes(p)} onChange={() => togglePlatform(p)} className="h-4 w-4 rounded accent-indigo-500" />
                {p}
              </label>
            ))}
          </div>
        </div>

        {dirty && (
          <button onClick={reset} className="btn-ghost btn-sm w-full">
            Reset filters
          </button>
        )}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-bold">
            {category || "All"} games <span className="text-sm font-normal text-gray-500">({results.length})</span>
          </h2>
          <select aria-label="Sort games" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="field w-auto">
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                Sort by: {o.label}
              </option>
            ))}
          </select>
        </div>

        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nothing here yet"
            text="No games match these filters. Try widening your price range or platforms."
            action={
              <button onClick={reset} className="btn-secondary mt-6">
                Reset filters
              </button>
            }
          />
        ) : (
          <div key={`${category}-${sort}-${page}-${platforms.join()}-${price}`} className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {current.map((g, i) => (
              <div key={g.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <GameCard game={g} />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
            <button className="pagination-btn" disabled={page === 1} onClick={() => go(page - 1)} aria-label="Previous page">
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                aria-current={page === i + 1 ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  page === i + 1 ? "bg-[#6366f1] text-white shadow-lg shadow-indigo-500/30" : "pagination-btn"
                }`}
                onClick={() => go(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="pagination-btn" disabled={page === totalPages} onClick={() => go(page + 1)} aria-label="Next page">
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
