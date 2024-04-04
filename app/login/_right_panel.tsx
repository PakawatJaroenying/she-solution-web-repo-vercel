"use client";
import React from "react";
import Image from "next/image";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "../ui/dashboard/carousel/slide-next-button";
import SlidePrevButton from "../ui/dashboard/carousel/slide-prev-button";

function RightPanel() {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xl font-bold text-forest  lg:text-3xl">
        ทางออกที่จะทำให้คุณบริหารจัดการ
      </span>
      <span className="text-base font-[400] text-forest xl:text-xl">
        ความปลอดภัยได้อย่างมืออาชีพ เสมือนมีผู้เชี่ยวชาญเคียงข้างคุณ
      </span>
      <Swiper
        className="h-[488px] w-[807px]"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="overflow-visible">
          <SlidePrevButton />
          <Image src="/login/carousel-1.svg" fill alt="logo" />
          <SlideNextButton />
        </SwiperSlide>
        <SwiperSlide>
          <SlidePrevButton />
          <Image src="/login/background-login-right.svg" fill alt="logo" />
          <SlideNextButton />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      <span className="text-[26px] font-[500] text-darkgreen">
        ติดต่อรัฐง่าย แค่ปลายนิ้วทางลัดถึง “รัฐ”
      </span>
    </div>
  );
}

export default RightPanel;
