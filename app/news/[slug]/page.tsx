import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, UserRound } from "lucide-react";
import { newsArticles } from "@/lib/data/news";
import { formatDate, readTime } from "@/lib/format";
import GameImage from "@/components/ui/GameImage";
import NewsCard from "@/components/news/news-card";
import Reveal from "@/components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsArticles.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = newsArticles.find((n) => n.slug === slug);
  return a ? { title: a.title, description: a.summary } : { title: "Article not found" };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = newsArticles.find((n) => n.slug === slug);
  if (!article) notFound();

  const more = newsArticles.filter((n) => n.id !== article.id).slice(0, 3);

  return (
    <div className="container max-w-4xl py-12">
      <Link href="/news" className="animate-fade-in mb-8 inline-flex items-center text-purple-400 hover:text-purple-300">
        <ChevronLeft className="mr-1 h-5 w-5" /> All news
      </Link>

      <article className="animate-fade-up">
        <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">{article.category}</span>
        <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
          <span className="flex items-center gap-1.5"><UserRound size={14} /> {article.author}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {readTime(article.content)}</span>
        </p>

        <div className="relative my-8 aspect-[460/215] overflow-hidden rounded-2xl ring-1 ring-white/10">
          <GameImage src={article.image} alt={article.title} sizes="(max-width:1024px) 100vw, 896px" priority />
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-gray-300">
          <p className="text-xl text-white">{article.summary}</p>
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <Reveal className="mt-16">
        <h2 className="mb-6 font-heading text-2xl font-bold">More stories</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {more.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
