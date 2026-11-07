import Link from "next/link";
import { Megaphone } from "lucide-react";
import { newsArticles } from "@/lib/data/news";

export default function NewsTicker() {
  const items = [...newsArticles, ...newsArticles]; // duplicated for a seamless loop
  return (
    <div className="group relative overflow-hidden border-y border-indigo-500/30 bg-indigo-600 py-2.5 text-white" role="region" aria-label="Latest headlines">
      <div className="absolute inset-y-0 left-0 z-10 flex items-center bg-indigo-700 px-3 text-sm font-bold">
        <Megaphone size={16} className="mr-2" /> LIVE
      </div>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pl-24 group-hover:[animation-play-state:paused]">
        {items.map((n, i) => (
          <Link key={i} href={`/news/${n.slug}`} aria-hidden={i >= newsArticles.length} tabIndex={i >= newsArticles.length ? -1 : 0} className="font-medium hover:underline">
            {n.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
