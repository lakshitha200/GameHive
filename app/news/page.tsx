import type { Metadata } from "next";
import { newsArticles } from "@/lib/data/news";
import NewsBrowser from "@/components/news/news-browser";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "News", description: "Updates, esports, industry stories and guides." };

export default function NewsPage() {
  return (
    <div className="container py-12">
      <PageHeader title="Gaming News" subtitle="Updates, esports, industry stories and guides from around the hive." />
      <NewsBrowser articles={newsArticles} />
    </div>
  );
}
