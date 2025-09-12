"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { games } from "@/lib/data/games";
import Link from "next/link";
import StarRating from "../games/StarRating";
import Image from "next/image";

const FeaturedGames = () => {
    return (
        <section className="py-16 bg-[#020617]">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-heading font-bold text-center mb-4">Featured Games</h2>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">Check out the hottest games everyone's talking about right now</p>

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
                                    <Image src={game.image} alt="CS2" className="w-full h-40 object-cover" />
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

                <div className="text-center mt-12">
                    <Link href={"/games"} className="button-primary">View All Games</Link>
                </div>
            </div>
        </section>


    );
};

export default FeaturedGames;
