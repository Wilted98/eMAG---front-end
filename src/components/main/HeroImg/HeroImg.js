import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import logo from "./93784.webp";
import logo2 from "./94211.webp";
import logo3 from "./95512.webp";
import "./HeroImg.css";

SwiperCore.use([Navigation, Pagination]);

const HeroImg = () => {
  return (
    <Swiper
      spaceBetween={50}
      loop={true}
      speed={600}
      slidesPerView={1}
      navigation
      // pagination={{ clickable: true }}
      className=""
      style={{
        // right: "319px",
        // position: "absolute",
        width: "950px",
        height: "440px",
        marginLeft: "320px",
        marginRight: "71px",
      }}
    >
      <SwiperSlide>
        <img className="w-full" src={logo} alt="fck" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full" src={logo2} alt="fck" />
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full" src={logo3} alt="fck" />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroImg;
