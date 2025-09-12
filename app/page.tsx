import Hero from "@/components/layouts/Hero";
import NewsTicker from "@/components/news/news-ticker";
import { Gamepad, Gift, Users } from "lucide-react";
import Link from "next/link";
import { newsArticles } from "@/lib/data/news";
import FeaturedGames from "@/components/layouts/featured";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGames />
      <main className="space-y-32">
        {/* Features Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose GameHive?
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Experience the ultimate hub for games, heroes, and news. Everything you need in one place.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
              <Gamepad className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Latest Games</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Browse a wide range of games from action to strategy and everything in between.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
              <Gift className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Offers</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Unlock special discounts and bundles available only on GameHive.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
              <Users className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community & News</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Stay updated with gaming news, guides, and a vibrant community of gamers.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of gamers who love GameHive for its features and community.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
                <Users className="w-10 h-10 text-indigo-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  "GameHive has completely changed how I discover new games. The library and community are amazing!"
                </p>
                <h4 className="mt-4 font-semibold">– Alex G.</h4>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
                <Gift className="w-10 h-10 text-indigo-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  "I love the exclusive deals and bundles. GameHive makes shopping for games so easy!"
                </p>
                <h4 className="mt-4 font-semibold">– Maria L.</h4>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center">
                <Gamepad className="w-10 h-10 text-indigo-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  "The news section keeps me updated daily. It's my go-to site for gaming content."
                </p>
                <h4 className="mt-4 font-semibold">– John K.</h4>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="space-y-16 mb-5">
        <NewsTicker />

        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest News</h2>

          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.slice(0, 3).map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <Image src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{news.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{news.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>

  );
}
