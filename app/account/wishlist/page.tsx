import { userWishlist } from "@/lib/data/account";
import Image from "next/image";

export default function WishlistPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {userWishlist.map((game) => (
        <div key={game.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition relative">
          <Image
            src={game.image}
            alt={game.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</h3>
            <button className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
