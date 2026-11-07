import Link from "next/link";
import GameCarousel from "../games/game-carousel";
import { games } from "@/lib/data/games";

export default function FeaturedGames() {
  const featured = [...games].sort((a, b) => b.rating - a.rating).slice(0, 10);
  return (
    <section className="bg-ink py-16">
      <div className="container text-center">
        <h2 className="section-title">Featured Games</h2>
        <p className="section-sub mb-10">Check out the hottest games everyone&apos;s talking about right now</p>
        <GameCarousel games={featured} />
        <div className="mt-10">
          <Link href="/games" className="btn-primary">View All Games</Link>
        </div>
      </div>
    </section>
  );
}
