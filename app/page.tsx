import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Gamepad2, Gift, Quote, Users } from "lucide-react";
import Hero from "@/components/layouts/Hero";
import FeaturedGames from "@/components/home/featured";
import Newsletter from "@/components/home/newsletter";
import NewsTicker from "@/components/news/news-ticker";
import NewsCard from "@/components/news/news-card";
import GameCard from "@/components/games/game-card";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { games } from "@/lib/data/games";
import { newsArticles } from "@/lib/data/news";
import { stats, testimonials } from "@/lib/data/testimonials";

const features = [
  { icon: Gamepad2, title: "Latest Games", text: "Browse a wide range of games from action to strategy and everything in between." },
  { icon: Gift, title: "Exclusive Offers", text: "Unlock special discounts and bundles available only on GameHive." },
  { icon: Users, title: "Community & News", text: "Stay updated with gaming news, guides, and a vibrant community of gamers." },
];

const categoryStyles: Record<string, string> = {
  Shooter: "from-red-600/40", Action: "from-orange-600/40", Adventure: "from-emerald-600/40", RPG: "from-purple-600/40",
  Multiplayer: "from-sky-600/40", Strategy: "from-amber-600/40", Horror: "from-rose-900/60", "Battle Royale": "from-fuchsia-600/40",
};

export default function Home() {
  const deals = [...games].filter((g) => g.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 4);
  const trending = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 4);
  const categories = Object.keys(categoryStyles).map((name) => ({ name, count: games.filter((g) => g.categories.includes(name)).length }));

  return (
    <>
      <Hero />
      <NewsTicker />
      <FeaturedGames />

      <div className="space-y-24 py-20">
        {/* Categories */}
        <section className="container">
          <Reveal className="mb-10 text-center">
            <h2 className="section-title">Browse by Genre</h2>
            <p className="section-sub">Whatever your playstyle, there&apos;s a world waiting.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <Link href="/store" className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${categoryStyles[c.name]} to-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl hover:shadow-indigo-900/30`}>
                  <h3 className="font-heading text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{c.count} games</p>
                  <ArrowRight className="mt-4 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Hot deals */}
        <section className="container">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title flex items-center gap-3"><Flame className="text-orange-400" /> Hot Deals</h2>
              <p className="mt-2 text-gray-400">Biggest discounts right now.</p>
            </div>
            <Link href="/store" className="hidden items-center gap-1 text-indigo-400 hover:text-indigo-300 sm:flex">View all <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {deals.map((g) => <GameCard key={g.id} game={g} />)}
            </div>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="border-y border-white/5 bg-surface/60 py-14">
          <div className="container grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-4xl font-black gradient-text">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <p className="mt-2 text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="container text-center">
          <Reveal>
            <h2 className="section-title">Why Choose GameHive?</h2>
            <p className="section-sub">Experience the ultimate hub for games, heroes, and news. Everything you need in one place.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="surface group h-full p-8 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-indigo-900/30">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition group-hover:scale-110 group-hover:bg-indigo-500/20">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                  <p className="text-gray-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="container">
          <Reveal className="mb-8">
            <h2 className="section-title">Trending Now</h2>
            <p className="mt-2 text-gray-400">What the community is playing this week.</p>
          </Reveal>
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trending.map((g) => <GameCard key={g.id} game={g} />)}
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="container text-center">
          <Reveal>
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-sub">Join thousands of gamers who love GameHive for its features and community.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="surface flex h-full flex-col items-center p-8 transition duration-300 hover:-translate-y-1">
                  <Quote className="mb-4 h-8 w-8 text-indigo-400/60" />
                  <blockquote className="flex-1 text-gray-300">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Image src={`https://i.pravatar.cc/80?img=${t.avatar}`} alt="" width={44} height={44} className="rounded-full ring-2 ring-indigo-500/40" />
                    <span className="text-left"><span className="block font-semibold">{t.name}</span><span className="text-sm text-gray-500">{t.role}</span></span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="container">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="section-title">Latest News</h2>
            <Link href="/news" className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300">All news <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsArticles.slice(0, 3).map((n) => <NewsCard key={n.id} news={n} />)}
            </div>
          </Reveal>
        </section>

        <section className="container">
          <Reveal><Newsletter /></Reveal>
        </section>
      </div>
    </>
  );
}
