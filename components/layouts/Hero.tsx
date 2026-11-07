import { ShoppingBag, Sparkles, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 animate-float rounded-full bg-indigo-600/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-float rounded-full bg-pink-600/20 blur-3xl [animation-delay:-3s]" aria-hidden />

      <div className="container relative py-16 lg:flex lg:items-center lg:gap-12 lg:py-24">
        <div className="flex-1 text-center lg:text-left">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Sparkles size={14} /> New: up to 50% off this week
          </span>
          <h1 className="animate-fade-up mt-6 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ animationDelay: "80ms" }}>
            The Ultimate <span className="gradient-text">Gaming</span> Experience
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-7 text-gray-300 lg:mx-0" style={{ animationDelay: "160ms" }}>
            Explore a curated collection of top games, heroes, and in-game items. Play, collect, and level up your gaming experience today.
          </p>

          <div className="animate-fade-up mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start" style={{ animationDelay: "240ms" }}>
            <Link href="/store" className="btn-primary text-lg">
              <ShoppingBag className="h-5 w-5" /> Shop Now
            </Link>
            <Link href="/games" className="btn-secondary text-lg">
              Explore Games
            </Link>
          </div>

          <dl className="animate-fade-up mt-10 flex justify-center gap-8 text-left lg:justify-start" style={{ animationDelay: "320ms" }}>
            {[["20+", "Top games"], ["120K", "Players"], ["4.8", "Avg. rating"]].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-heading text-2xl font-bold text-white">{v}</dd>
                <dd className="text-sm text-gray-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up relative mt-14 h-80 w-full flex-1 sm:h-96 lg:mt-0 lg:h-[500px]" style={{ animationDelay: "200ms" }}>
          <Image
            src="/images/heroes/hero-character.jpg"
            alt="Gaming illustration"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="rounded-3xl object-cover shadow-2xl shadow-indigo-900/50 ring-1 ring-white/10"
            priority
          />
          <div className="glass animate-float absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-6">
            <Zap className="text-yellow-400" size={20} />
            <div className="text-sm"><div className="font-semibold">Instant delivery</div><div className="text-gray-400">Play in seconds</div></div>
          </div>
          <div className="glass animate-float absolute -top-4 right-4 flex items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-2s] sm:-right-4">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <div className="text-sm"><div className="font-semibold">4.8 / 5</div><div className="text-gray-400">Player rated</div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
