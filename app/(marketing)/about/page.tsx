import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Target, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Faq from "@/components/home/faq";
import { stats } from "@/lib/data/testimonials";

export const metadata: Metadata = { title: "About", description: "Learn what GameHive is about and how we work." };

const values = [
  { icon: Target, title: "Player first", text: "Every feature starts with one question: does it make finding and playing games better?" },
  { icon: ShieldCheck, title: "Fair & transparent", text: "Honest prices, clear refunds and no hidden fees." },
  { icon: Zap, title: "Fast & simple", text: "Instant delivery and a store that stays out of your way." },
  { icon: Heart, title: "Community driven", text: "News, reviews and wishlists shaped by the people who play." },
];

export default function AboutPage() {
  return (
    <div className="container space-y-24 py-12">
      <section className="animate-fade-up text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl"><span className="gradient-text">About GameHive</span></h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-300 md:text-xl">
          GameHive is your ultimate hub for discovering games, connecting with other gamers, and staying updated with the latest news.
        </p>
      </section>

      <Reveal>
        <section className="grid items-center gap-12 md:grid-cols-2">
          <Image src="/images/logo.png" alt="GameHive logo" width={400} height={300} className="mx-auto rounded-2xl shadow-xl shadow-indigo-900/30 ring-1 ring-white/10" />
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold">Our Mission</h2>
              <p className="mt-2 text-lg text-gray-400">To provide a modern platform for gamers worldwide, offering the best games, news, and community experience.</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold">Our Vision</h2>
              <p className="mt-2 text-lg text-gray-400">To be the go-to hub for gaming enthusiasts everywhere and make discovering and playing games seamless.</p>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-heading text-4xl font-black gradient-text"><CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} /></div>
            <p className="mt-2 text-gray-400">{s.label}</p>
          </div>
        ))}
      </section>

      <section>
        <Reveal><h2 className="section-title mb-10 text-center">What we stand for</h2></Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="surface h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40">
                <Icon className="mb-4 h-8 w-8 text-indigo-400" />
                <h3 className="mb-2 font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="scroll-mt-24">
        <Reveal><h2 className="section-title mb-10 text-center">Frequently asked questions</h2></Reveal>
        <Reveal><Faq /></Reveal>
        <p className="mt-8 text-center text-gray-400">
          Still stuck? <Link href="/contact" className="text-indigo-400 hover:text-indigo-300">Contact us</Link>.
        </p>
      </section>
    </div>
  );
}
