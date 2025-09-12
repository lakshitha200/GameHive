import { games } from "@/lib/data/games";
import GameCard from "@/components/games/game-card";
import GameCarousel from "@/components/games/game-carousel";
import GameFilter from "@/components/games/game-filter";


export default function GamesPage() {
  return (
    <main className="container mx-auto px-6 py-16 space-y-12">
      <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white">All Games</h1>

      {/* Filters */}
      <GameFilter />


      {/* Featured Carousel: top 5 games */}
      <GameCarousel games={games} />

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
