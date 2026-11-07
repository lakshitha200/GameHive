"use client";

import { useState } from "react";
import NewsCard from "./news-card";
import { NewsArticle, newsCategories } from "@/lib/data/news";

export default function NewsBrowser({ articles }: { articles: NewsArticle[] }) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter news">
        {newsCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`chip ${cat === c ? "active" : ""}`}>
            {c}
          </button>
        ))}
      </div>
      <div key={cat} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((n, i) => (
          <div key={n.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <NewsCard news={n} />
          </div>
        ))}
      </div>
    </>
  );
}
