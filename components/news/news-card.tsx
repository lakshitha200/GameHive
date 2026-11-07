import Link from "next/link";
import { Clock } from "lucide-react";
import GameImage from "../ui/GameImage";
import { NewsArticle } from "@/lib/data/news";
import { formatDate, readTime } from "@/lib/format";

export default function NewsCard({ news }: { news: NewsArticle }) {
  return (
    <article className="game-card group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <GameImage src={news.image} alt="" sizes="(max-width:768px) 100vw, 33vw" />
        <span className="platform-badge">{news.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/news/${news.slug}`} className="after:absolute after:inset-0 hover:text-indigo-300">
            {news.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-gray-400">{news.summary}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <time dateTime={news.date}>{formatDate(news.date)}</time> · <Clock size={12} /> {readTime(news.content)}
        </p>
      </div>
    </article>
  );
}
