"use client";

import Link from "next/link";
import { Library, Play } from "lucide-react";
import toast from "react-hot-toast";
import { games } from "@/lib/data/games";
import { useCollection } from "@/lib/providers/collection-provider";
import GameImage from "@/components/ui/GameImage";
import EmptyState from "@/components/ui/EmptyState";

export default function LibraryPage() {
  const { library } = useCollection();
  const owned = games.filter((g) => library.includes(g.id));

  if (owned.length === 0) {
    return <EmptyState icon={Library} title="Your library is empty" text="Games you buy will show up here." href="/store" cta="Browse the store" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {owned.map((game, i) => (
        <div key={game.id} className="game-card animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <Link href={`/games/${game.id}`} className="relative block h-44 overflow-hidden">
            <GameImage src={game.image} alt={game.title} sizes="(max-width:768px) 100vw, 33vw" />
          </Link>
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-semibold">{game.title}</h3>
              <p className="text-xs text-emerald-400">Owned</p>
            </div>
            <button className="btn-primary btn-sm" onClick={() => toast(`Launching ${game.title}… (demo)`, { icon: "🎮" })}>
              <Play size={14} /> Play
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
