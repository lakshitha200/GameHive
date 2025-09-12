import { ShoppingBag } from 'lucide-react'
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-950 via-neutral-900 to-indigo-950">
      <div className="container mx-auto px-6 py-20 lg:flex lg:items-center lg:gap-10">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]">Gaming</span> Experience
          </h1>
          <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-gray-300 text-lg leading-7">
            Explore a curated collection of top games, heroes, and in-game items.
            Play, collect, and level up your gaming experience today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/store"
              className="button-primary"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </a>
            <a
              href="/games"
              className="button-secondary "
            >
              Explore Games
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-12 lg:mt-0 relative w-full h-80 sm:h-96 lg:h-[500px]">
          <Image
            src="/images/heroes/hero-character.jpg"
            alt="Gaming illustration"
            fill
            className="object-cover rounded-2xl shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
