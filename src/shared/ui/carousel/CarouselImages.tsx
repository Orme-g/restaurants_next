"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ICarouselImages {
    images: string[];
}
const CarouselImages: React.FC<ICarouselImages> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const slidesList = images.map((item, index) => {
        return (
            <SwiperSlide className="swiper-slide" key={index}>
                <Image
                    src={item}
                    alt="restaurant slide"
                    fill={true}
                    sizes="(max-width:768px)100vw, 50vw"
                />
            </SwiperSlide>
        );
    });
    return (
        <>
            <Swiper
                style={
                    {
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    } as React.CSSProperties
                }
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
            >
                {slidesList}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {slidesList}
            </Swiper>
        </>
    );
};
export default CarouselImages;
