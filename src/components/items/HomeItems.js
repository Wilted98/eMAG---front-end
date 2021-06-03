import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import HomepageCard from "../cards/HomepageCard";
import { getProductByCat } from "../../CRUD/functions";

SwiperCore.use([Navigation, Pagination]);

const HomeItems = ({ category, title }) => {
  const [product, setProduct] = useState();

  const getProd = async () => {
    await getProductByCat(category)
      .then((arg) => setProduct(arg.data.products))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProd();
  }, []);
  return (
    <>
      <div className="text-2xl text-gray-800 mb-6 mt-12 ">{title}</div>
      <Swiper
        spaceBetween={0}
        // loop={true}
        // speed={600}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        style={{ width: "1220px" }}
        className="pb-6"
      >
        {product &&
          product.map((arg) => {
            return (
              <SwiperSlide key={arg._id}>
                <HomepageCard
                  // image={arg.images[0].url}
                  // description={arg.description}
                  // price={arg.price}
                  // oldPrice={arg.oldPrice}
                  // star={arg.ratingsandcomments}
                  // slug={arg.slug}
                  product={arg && arg}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default HomeItems;
