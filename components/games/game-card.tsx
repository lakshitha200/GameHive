"use client";

import { Check, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import StarRating from "./StarRating";
import GameImage from "../ui/GameImage";
import { useCart } from "@/lib/providers/cart-provider";
import { useCollection } from "@/lib/providers/collection-provider";
import { useAuth } from "@/lib/providers/auth-provider";
import { useRequireAuth } from "@/lib/use-require-auth";
import { Game } from "@/lib/data/games";
import { finalPrice, money } from "@/lib/format";

export default function GameCard({ game }: { game: Game }) {
  const { addItem, has } = useCart();
  const { inWishlist, toggleWishlist, library } = useCollection();
  const { user } = useAuth();
  const requireAuth = useRequireAuth();
  const price = finalPrice(game.price, game.discount);
  const owned = !!user && library.includes(game.id);
  const inCart = !!user && has(game.id);
  const wished = !!user && inWishlist(game.id);

  return (
    <article className="game-card group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <GameImage src={game.image} alt={`${game.title} cover`} sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 25vw" />
        {game.discount > 0 && <div className="discount-badge">-{game.discount}%</div>}
        <div className="platform-badge">{game.platforms.join(", ")}</div>
        <button
          onClick={() => requireAuth(() => toggleWishlist(game.id))}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${game.title} from wishlist` : `Add ${game.title} to wishlist`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80 backdrop-blur transition hover:scale-110 active:scale-90"
        >
          <Heart key={String(wished)} className={`h-4 w-4 ${wished ? "animate-pop fill-pink-500 text-pink-500" : "text-white"}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-heading text-lg font-bold">
          {/* stretched link: whole card is clickable without nesting buttons in anchors */}
          <Link href={`/games/${game.id}`} className="after:absolute after:inset-0 after:z-0 hover:text-indigo-300">
            {game.title}
          </Link>
        </h3>
        <p className="mb-2 truncate text-xs text-gray-500">{game.categories.join(" · ")}</p>
        <StarRating rating={game.rating} reviews={game.reviews} className="mb-4" />

        <div className="mt-auto flex items-center justify-between">
          <div className="price-tag">
            {game.price === 0 ? (
              <span className="font-bold text-emerald-400">Free</span>
            ) : (
              <>
                {game.discount > 0 && <span className="text-sm text-gray-500 line-through">{money(game.price)}</span>}
                <span className={`font-bold text-white ${game.discount > 0 ? "ml-2" : ""}`}>{money(price)}</span>
              </>
            )}
          </div>

          {owned ? (
            <Link href="/account/library" className="relative z-10 flex items-center gap-1 text-sm font-medium text-emerald-400">
              <Check size={16} /> Owned
            </Link>
          ) : (
            <button
              className="btn-primary relative z-10 !p-2.5"
              onClick={() => requireAuth(() => addItem(game))}
              aria-label={inCart ? `Add another ${game.title} to cart` : `Add ${game.title} to cart`}
            >
              {inCart ? <Check size={20} /> : <ShoppingCart size={20} />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
