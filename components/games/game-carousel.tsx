"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import GameCard from "./game-card";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import StarRating from "./StarRating";

export default function GameCarousel({ games }: { games: any[] }) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }}

      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {

        games.map((game) => (

          <SwiperSlide className="swiper-slide">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform relative">
              <img src={game.image} alt="CS2" className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <div className="flex items-center mt-2">
                  <StarRating rating={game.rating} reviews={game.reviews}/>
                </div>
              </div>
            </div>

          </SwiperSlide>

        ))
      }
    </Swiper>
  );
}
