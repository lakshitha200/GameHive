"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import StarRating from "./StarRating";
import { useCart } from "@/lib/providers/cart-provider";

export default function GameCard({ game }: any) {
  const { addItem } = useCart();
  const calculatePrice = (price: number, discount: number) => {
    return (price - (price * discount) / 100).toFixed(2);
  }

  const addToCart = (e: any) => {
    e.preventDefault(); // stop Link navigation
    e.stopPropagation(); // stop bubbling
    addItem(game);
    console.log("Added to cart:", game.id);
  }

  return (
    <Link href={`/games/${game.id}`}>
      <div className="game-card rounded-2xl overflow-hidden">
        <div className="h-48 overflow-hidden relative">
          <img src={game.image} alt="Space Battle" className="w-full h-full object-cover" />
          {game.discount != 0 && <div className="discount-badge">-{game.discount}%</div>}
          <div className="platform-badge">{game.platforms.join(", ")}</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold mb-2">{game.title}</h3>
          <StarRating rating={game.rating} reviews={game.reviews} />

          <div className="flex justify-between items-center">
            <div className="price-tag py-1 px-3 rounded-full">
              {game.price == 0 ?
                <>
                  <span className="text-white font-bold">Free</span>
                </>
                :
                <>
                  <span className="line-through text-gray-500 text-sm">${game.price.toFixed(2)}</span>
                  <span className="text-white font-bold ml-2">${calculatePrice(game.price, game.discount)}</span>
                </>
              }

            </div>
            <button className="px-2 py-2 button-primary add-to-cart z-40 "
              onClick={addToCart}>
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
