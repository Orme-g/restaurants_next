"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

interface ICarouselCardsProps {
    cards: React.ReactNode[];
}
const CarouselCards: React.FC<ICarouselCardsProps> = ({ cards }) => {
    const slides = cards.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>;
    });

    return (
        <Swiper
            spaceBetween={50}
            style={
                {
                    "--swiper-navigation-color": "#c9c9c9",
                    padding: "20px 10px",
                    height: "100%",
                } as React.CSSProperties
            }
            breakpoints={{
                0: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 2,
                },
                760: {
                    slidesPerView: 3,
                },
                980: {
                    slidesPerView: 4,
                },
                1480: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                },
            }}
            loop={true}
            navigation={true}
            freeMode={true}
            modules={[Navigation, Pagination, FreeMode]}
        >
            {slides}
        </Swiper>
    );
};

export default CarouselCards;
