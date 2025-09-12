"use client";
import { games } from "@/lib/data/games";
import GameCard from "@/components/games/game-card";
import StoreFilter from "@/components/store/store-filter";
import { useState } from "react";

const categories = Array.from(new Set(games.flatMap((g) => g.categories)));

export default function StorePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // calculate total pages
  const totalPages = Math.ceil(games.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = games.slice(indexOfFirstItem, indexOfLastItem);


  console.log(totalPages)

  return (
    <main className="container mx-auto px-6 py-16 space-y-12">
      <div className="container mx-auto px-8 pb-4">
        <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white">Game Store</h1>
        <p className="text-gray-400 max-w-2xl">Discover the latest games, exclusive deals, and special offers. Find your next adventure today!</p>
      </div>
      <div className="container mx-auto px-8 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <StoreFilter categories={categories} />


          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <h2 className="text-2xl font-heading font-bold">Featured Games</h2>
              <div className="flex space-x-4 bg-[#020617] border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-[#6366f1]">
                <select className="bg-[#020617]">
                  <option>Sort by: Popularity</option>
                  <option>Sort by: Price Low to High</option>
                  <option>Sort by: Price High to Low</option>
                  <option>Sort by: Release Date</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {currentGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}

            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 space-x-2">
              <button className="pagination-btn w-10 h-10 rounded-full flex items-center justify-center"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === i + 1 ? "bg-[#6366f1] text-white " : "pagination-btn"}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button className="pagination-btn w-10 h-10 rounded-full flex items-center justify-center"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>




    </main>
  );
}
