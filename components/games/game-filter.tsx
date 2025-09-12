"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function GameFilter() {
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  // const [sort, setSort] = useState("");

  // const filteredGames = games
  //   .filter((game) =>
  //     game.title.toLowerCase().includes(search.toLowerCase())
  //   )
  //   .filter((game) =>
  //     category ? game.categories.includes(category) : true
  //   )
  //   .sort((a, b) => {
  //     if (sort === "price-asc") return a.price - b.price;
  //     if (sort === "price-desc") return b.price - a.price;
  //     if (sort === "rating-desc") return b.rating - a.rating;
  //     return 0;
  //   });


  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 pl-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="w-full md:w-1/4 border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        <select className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </div>




      <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
        <Filter className="w-4 h-4" /> Filter
      </button>
    </div>
  );
}
