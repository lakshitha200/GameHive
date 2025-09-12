import StarRating from "@/components/games/StarRating";
import { games } from "@/lib/data/games";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const game = games.find((g) => g.id === parseInt(params.id));
  const calculatePrice = (price: number, discount: number) => {
    return (price - (price * discount) / 100).toFixed(2);
  }

  if (!game) return <p className="text-center mt-20">Game not found.</p>;

  return (
    <main style={{"background": `linear-gradient(rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.9)), url('${game.image}') center/cover`}}>
      <div className="container mx-auto px-6 py-16 space-y-8">
        <Link href="/games" className="flex items-center text-purple-400 hover:underline">
          <ChevronLeft className="w-5 h-5 mr-2" /> Back to Games
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Image src={game.image} alt={game.title} className="w-full rounded-xl shadow-lg object-cover" />

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{game.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">{game.description}</p>

            <StarRating rating={game.rating} reviews={game.reviews} />


            {game.price == 0 ?
              <>
                <span className="text-2xl font-semibold text-pink-400">Free</span>
              </>
              :
              <>
                <span className="line-through text-gray-500 text-sm">${game.price.toFixed(2)}</span>
                <span className="text-2xl font-semibold text-pink-400 ml-2">${calculatePrice(game.price, game.discount)}</span>
              </>
            }



            <p className="text-gray-600 dark:text-gray-300">{game.details}</p>

            <button className="button-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
