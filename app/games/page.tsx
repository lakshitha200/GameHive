import type { Metadata } from "next";
import { games } from "@/lib/data/games";
import GameCarousel from "@/components/games/game-carousel";
import GameBrowser from "@/components/games/game-browser";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "All Games", description: "Browse every game on GameHive: search, filter and sort." };

export default function GamesPage() {
  const top = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  return (
    <div className="container py-12">
      <PageHeader title="All Games" subtitle="Search the whole catalogue, or jump into a trending title." />
      <GameCarousel games={top} />
      <div className="mt-10">
        <GameBrowser games={games} />
      </div>
    </div>
  );
}
