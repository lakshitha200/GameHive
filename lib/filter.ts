import { Game } from "@/lib/data/games";
import { finalPrice } from "@/lib/format";

export type SortKey = "popularity" | "price-asc" | "price-desc" | "rating" | "newest" | "discount";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest discount" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export type Filters = {
  search: string;
  categories: string[];
  platforms: string[];
  maxPrice: number;
  sort: SortKey;
};

export function filterGames(list: Game[], f: Filters): Game[] {
  const q = f.search.trim().toLowerCase();
  const out = list.filter(
    (g) =>
      (!q || g.title.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q) || g.tags.some((t) => t.toLowerCase().includes(q))) &&
      (!f.categories.length || f.categories.some((c) => g.categories.includes(c))) &&
      (!f.platforms.length || f.platforms.some((p) => g.platforms.includes(p))) &&
      finalPrice(g.price, g.discount) <= f.maxPrice,
  );

  const price = (g: Game) => finalPrice(g.price, g.discount);
  const cmp: Record<SortKey, (a: Game, b: Game) => number> = {
    popularity: (a, b) => b.popularity - a.popularity,
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => b.releaseDate.localeCompare(a.releaseDate),
    discount: (a, b) => b.discount - a.discount,
    "price-asc": (a, b) => price(a) - price(b),
    "price-desc": (a, b) => price(b) - price(a),
  };
  return out.sort(cmp[f.sort]);
}
