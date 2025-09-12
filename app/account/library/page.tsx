"use client";
import { userLibrary } from "@/lib/data/account";
import { useAuth } from "@/lib/providers/auth-provider";
import { Star } from "lucide-react";
import { useEffect } from "react";

export default function LibraryPage() {
   const { loading, user,setUser,fetchUser } = useAuth();
   console.log(user)
    // Fetch user on page load
  fetchUser();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {userLibrary.map((game) => (
        <div key={game.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
          <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{game.title}</h3>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Owned</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
