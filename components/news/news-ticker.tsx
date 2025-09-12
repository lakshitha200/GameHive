"use client";

import { newsArticles } from "@/lib/data/news";

export default function NewsTicker() {
  return (
    <div className="bg-indigo-600 text-white py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap gap-8">
        {newsArticles.map((news) => (
          <span key={news.id} className="font-medium">
            {news.title}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
