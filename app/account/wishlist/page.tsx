"use client";

import { Heart } from "lucide-react";
import { games } from "@/lib/data/games";
import { useCollection } from "@/lib/providers/collection-provider";
import GameCard from "@/components/games/game-card";
import EmptyState from "@/components/ui/EmptyState";

export default function WishlistPage() {
  const { wishlist } = useCollection();
  const items = games.filter((g) => wishlist.includes(g.id));

  if (items.length === 0) {
    return <EmptyState icon={Heart} title="Your wishlist is empty" text="Tap the heart on any game to save it for later." href="/games" cta="Discover games" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((g, i) => (
        <div key={g.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <GameCard game={g} />
        </div>
      ))}
    </div>
  );
}
