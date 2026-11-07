"use client";

import { Check, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Game } from "@/lib/data/games";
import { useCart } from "@/lib/providers/cart-provider";
import { useCollection } from "@/lib/providers/collection-provider";

export default function GameActions({ game }: { game: Game }) {
  const { addItem, has } = useCart();
  const { inWishlist, toggleWishlist, library } = useCollection();
  const wished = inWishlist(game.id);

  if (library.includes(game.id)) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-400">
          <Check size={18} /> In your library
        </span>
        <Link href="/account/library" className="btn-secondary">
          Go to library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button className="btn-primary" onClick={() => addItem(game)}>
        <ShoppingCart size={18} /> {has(game.id) ? "Add another" : game.price === 0 ? "Get for free" : "Add to Cart"}
      </button>
      {has(game.id) && (
        <Link href="/cart" className="btn-secondary animate-fade-in">
          View cart
        </Link>
      )}
      <button
        className="btn-secondary"
        onClick={() => toggleWishlist(game.id)}
        aria-pressed={wished}
      >
        <Heart key={String(wished)} size={18} className={wished ? "animate-pop fill-pink-500 text-pink-500" : ""} />
        {wished ? "Wishlisted" : "Wishlist"}
      </button>
    </div>
  );
}
