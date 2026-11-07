import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ChevronLeft, Code2, Cpu, HardDrive, MemoryStick, Monitor, Tv2, Check } from "lucide-react";
import StarRating from "@/components/games/StarRating";
import GameActions from "@/components/games/game-actions";
import GameCard from "@/components/games/game-card";
import GameImage from "@/components/ui/GameImage";
import Reveal from "@/components/ui/Reveal";
import { games, getGame, relatedGames } from "@/lib/data/games";
import { finalPrice, formatDate, money } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return games.map((g) => ({ id: String(g.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGame(Number((await params).id));
  return game ? { title: game.title, description: game.description } : { title: "Game not found" };
}

export default async function GameDetailPage({ params }: Props) {
  const game = getGame(Number((await params).id));
  if (!game) notFound();

  const price = finalPrice(game.price, game.discount);
  const reqs = [
    { icon: Monitor, label: "OS", value: game.requirements.os },
    { icon: Cpu, label: "Processor", value: game.requirements.cpu },
    { icon: MemoryStick, label: "Memory", value: game.requirements.ram },
    { icon: Tv2, label: "Graphics", value: game.requirements.gpu },
    { icon: HardDrive, label: "Storage", value: game.requirements.storage },
  ];

  return (
    <div className="relative">
      {/* blurred cover backdrop */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden" aria-hidden>
        <GameImage src={game.image} alt="" sizes="100vw" className="scale-110 opacity-30 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/70 to-neutral-950" />
      </div>

      <div className="container space-y-12 py-10">
        <Link href="/games" className="animate-fade-in inline-flex items-center text-purple-400 transition hover:text-purple-300">
          <ChevronLeft className="mr-1 h-5 w-5" /> Back to Games
        </Link>

        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="animate-fade-up relative aspect-[460/215] overflow-hidden rounded-2xl shadow-2xl shadow-indigo-900/40 ring-1 ring-white/10">
            <GameImage src={game.image} alt={`${game.title} cover`} sizes="(max-width:768px) 100vw, 50vw" priority />
          </div>

          <div className="animate-fade-up space-y-5" style={{ animationDelay: "100ms" }}>
            <div className="flex flex-wrap gap-2">
              {game.categories.map((c) => (
                <span key={c} className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
                  {c}
                </span>
              ))}
            </div>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">{game.title}</h1>
            <StarRating rating={game.rating} reviews={game.reviews} className="" />
            <p className="text-lg text-gray-300">{game.description}</p>
            <p className="text-gray-400">{game.details}</p>

            <div className="flex items-baseline gap-3">
              {game.price === 0 ? (
                <span className="text-3xl font-bold text-emerald-400">Free</span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-pink-400">{money(price)}</span>
                  {game.discount > 0 && (
                    <>
                      <span className="text-gray-500 line-through">{money(game.price)}</span>
                      <span className="rounded-full bg-pink-500/15 px-2.5 py-0.5 text-sm font-bold text-pink-400">-{game.discount}%</span>
                    </>
                  )}
                </>
              )}
            </div>

            <GameActions game={game} />

            <dl className="surface grid grid-cols-2 gap-4 p-5 text-sm">
              <div>
                <dt className="flex items-center gap-1.5 text-gray-500"><Code2 size={14} /> Developer</dt>
                <dd className="mt-1 font-medium text-white">{game.developer}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-gray-500"><CalendarDays size={14} /> Released</dt>
                <dd className="mt-1 font-medium text-white">{formatDate(game.releaseDate)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-500">Platforms</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {game.platforms.map((p) => (
                    <span key={p} className="rounded bg-white/5 px-2 py-0.5 text-white">{p}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <section className="surface p-6">
              <h2 className="mb-4 font-heading text-xl font-bold">Features</h2>
              <ul className="space-y-3">
                {game.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300">
                    <Check className="h-4 w-4 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {game.tags.map((t) => (
                  <span key={t} className="chip !cursor-default">{t}</span>
                ))}
              </div>
            </section>

            <section className="surface p-6">
              <h2 className="mb-4 font-heading text-xl font-bold">System Requirements</h2>
              <ul className="space-y-3">
                {reqs.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3 text-sm">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span className="w-20 shrink-0 text-gray-500">{label}</span>
                    <span className="text-gray-200">{value}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-6 font-heading text-2xl font-bold">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedGames(game).map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
