import { newsArticles } from "@/lib/data/news";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-white mb-8">News</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsArticles.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.slug}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <Image src={news.image} alt={news.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{news.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{news.summary}</p>
              <p className="text-sm text-gray-400 mt-1">{news.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
