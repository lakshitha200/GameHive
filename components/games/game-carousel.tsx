"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Link from "next/link";
import StarRating from "./StarRating";
import GameImage from "../ui/GameImage";
import { Game } from "@/lib/data/games";

export default function GameCarousel({ games }: { games: Game[] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false }}
      loop
      autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <Link href={`/games/${game.id}`} className="group relative block h-full w-full overflow-hidden rounded-xl bg-gray-900">
            <GameImage src={game.image} alt={game.title} sizes="400px" className="transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12">
              <h3 className="text-xl font-bold">{game.title}</h3>
              <StarRating rating={game.rating} reviews={game.reviews} className="mt-1" />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
