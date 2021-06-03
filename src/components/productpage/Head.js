import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import ModalImg from "./Modal";
import { showAverage } from "../../CRUD/rating";
import { BsFillLockFill } from "react-icons/bs";
import { GoGift } from "react-icons/go";
import { MdReplay30 } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import logo from "./resources/cart.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/shopping/shopping-types";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../redux/favorite/favorite-types";
import { toast } from "react-toastify";
import FavoriteToast from "../toast/FavoriteToast";
import CartToast from "../toast/CartToast";

SwiperCore.use([Navigation, Pagination]);

const Head = ({ product, img, setImg }) => {
  const id = product?._id;
  const title = product?.title;
  const images = product?.images;
  const star = product?.ratingsandcomments;
  const oldPrice = product?.oldPrice;
  const price = product?.price;
  const quantity = product?.quantity;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const nrdereviews = true;
  let isInFav = favorite.find((item) => (item._id === id ? true : false));
  return (
    <div className="w-full flex justify-center mb-4 mt-12">
      <div>
        <ModalImg
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          images={images && images}
          product={product}
        />
        <span
          className="text-gray-900  tracking-tight flex-wrap flex mb-3 ml-24"
          style={{ fontSize: "28px", lineHeight: "32px" }}
        >
          {title}
        </span>
        <span className="text-gray-400  tracking-tight mt-2 ml-24">
          Cod produs: {images && images[0].public_id.substring(0, 7)}
        </span>
        <div className="flex mt-8 border-t  justify-center">
          <div className="flex ">
            {/* Partea din stanga cu fotografii,rating,beneficii */}
            <div className=" border-gray-200 mr-8">
              {/* Fotografiile */}
              <div className="mb-4 pt-4">
                {/* Fotorgrafia Mare */}
                <img
                  onClick={() => setIsModalVisible(true)}
                  src={img || (images && images[0].url)}
                  alt="fkc"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Swiper
                  spaceBetween={10}
                  // loop={true}
                  // speed={600}
                  slidesPerView={4}
                  navigation
                  // pagination={{ clickable: true }}
                  style={{ width: "270px" }}
                  className=""
                >
                  {images &&
                    images.map((arg, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          className="border hover:border-blue-500"
                        >
                          <img
                            onClick={() => setIsModalVisible(true)}
                            src={arg.url}
                            alt="fck"
                            className="cursor-pointer"
                            onMouseEnter={() => setImg(arg.url)}
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div>
              {/* rating,beneficii */}
              <div className="ml-3 my-4">
                {showAverage(star, nrdereviews) ? (
                  <div className="mb-2 flex">
                    {showAverage(star, nrdereviews)}{" "}
                    <span
                      onClick={() => {
                        let elmt = document.getElementById("rating-div2");
                        elmt.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="ml-1 text-blue-700 cursor-pointer hover:text-blue-500"
                    >
                      review-uri
                    </span>
                  </div>
                ) : (
                  <div className="h-7"></div>
                )}
                Vândut și livrat de: eMAG
              </div>
              <div className="border border-gray-200 m-2 px-7">
                <span className="flex mt-2">
                  <img
                    className="w-6 h-6"
                    src="https://s13emagst.akamaized.net/layout/all/images/logo/genius/logo-bullet.svg"
                    alt="genius"
                  />
                  <span className="text-black text-base font-semibold ml-2">
                    Beneficii Genius pentru acest produs
                  </span>
                </span>
                <span className="my-2">
                  Pe lângă beneficiile standard, membrii Genius <br />{" "}
                  beneficiază și de:
                </span>
                <span className="flex items-center mt-2">
                  <BsFillLockFill className="mr-2" /> Transport gratuit la
                  easybox
                </span>
                <span className="flex items-center mt-2">
                  <BsFillLockFill className="mr-2" /> Livrare rapidă
                </span>
                <span className="flex items-center mt-2">
                  <BsFillLockFill className="mr-2" /> Retur extins în 60 de zile
                </span>
                <span className="flex items-center mt-2">
                  <BsFillLockFill className="mr-2" /> La retur, banii înapoi
                  instant
                </span>
              </div>
              <div className="mt-4 p-3">
                <span className="text-gray-400 ">Beneficii</span>
                <span className="flex items-center ">
                  <GoGift className="text-xl" />{" "}
                  <span className="text-black font-semibold ml-3 mr-1">
                    30 puncte
                  </span>{" "}
                  prin cardul eMAG-Raiffeisen
                  <span className="text-blue-500 ml-1">detalii</span>
                </span>
                <span className="flex items-center ">
                  <MdReplay30 className="text-xl mr-3" /> Retur gratuit in 30 de
                  zile
                  <span className="text-blue-500 ml-1">detalii</span>
                </span>
                <span className="flex items-center ">
                  <RiNewspaperLine className="text-xl mr-3" /> Garantie inclusa:
                  <span className="text-blue-500 ml-1">detalii</span>
                </span>
                <span>
                  <li className="ml-6">
                    Persoane fizice: 24 luni{" "}
                    <span className="text-blue-500">extinde</span>
                  </li>
                  <li className="ml-6">Persoane juridice: 12 luni</li>
                </span>
              </div>
            </div>
          </div>
          <div>
            {/* Partea din dreapta: butoane,etc. */}
            <div className="flex">
              <div className="ml-4 mt-4 border-r border-gray-300 pr-6">
                <span>
                  {" "}
                  <div className="text-center w-full justify-center items-center text-sm text-black font-semibold ">
                    <span className="relative">
                      <del>{oldPrice}</del>
                      <span
                        className="absolute"
                        style={{ fontSize: "10px", lineHeight: "14px" }}
                      >
                        <del>99</del>
                      </span>
                      <span className="ml-3">
                        <del>Lei</del>
                      </span>
                    </span>
                    <span className="text-gray-400 ml-2">
                      (-{Math.floor(((oldPrice - price) * 100) / oldPrice)}%)
                    </span>
                  </div>
                </span>
                <span className="text-2xl text-red-500 font-semibold flex">
                  {price} <span className="text-sm">99</span> Lei
                </span>
              </div>
              <div className="ml-8 mt-4 ">
                {/*Rate Lunare*/}
                <span className="text-black text-base font-semibold">
                  Rate lunare <br />
                </span>
                <span className="text-sm text-black font-semibold">de la</span>
                <span className="text-black text-xl font-bold mx-2">
                  {(price / 19).toFixed(0)}
                </span>
                <span className="text-sm text-black font-semibold">
                  Lei <br />
                </span>
                <span className="text-xs text-blue-500 ml-10">
                  Vezi detalii
                </span>
              </div>
            </div>
            <div className="flex ml-5">
              <div className={`${quantity < 5 ? "my-5.5" : "my-3"} `}>
                {quantity < 5 ? (
                  <span
                    style={{ backgroundColor: "#f50" }}
                    className="tracking-tighter text-white text-xs font-semibold px-1.5 py-1 rounded "
                  >
                    {quantity < 1
                      ? "out of stock"
                      : quantity < 2
                      ? "ultimul produs din stoc"
                      : `ultimele ${quantity} produse`}
                  </span>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="tracking-tighter text-white text-xs font-semibold px-2 py-0.5 rounded bg-harlequin mr-2">
                      in stoc
                    </span>
                    <img
                      src="https://s13emagst.akamaized.net/layout/ro/static-upload/logo_genius_app.png"
                      className="w-12 h-4 mt-1"
                      alt="fck"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-5 mt-5">
              {quantity > 0 && (
                <span
                  onClick={() => {
                    dispatch({
                      type: ADD_TO_CART,
                      payload: product && product,
                    });
                    toast(<CartToast Type={"full"} Image={images[0].url} />);
                  }}
                  className="relative cursor-pointer"
                >
                  <img src={logo} alt="cart" />
                  <span
                    className="absolute text-white text-xl tracking-tighter hover:text-gray-200"
                    style={{ top: "10px", right: "65px" }}
                  >
                    Adauga in cos
                  </span>
                  {/* <span className="border border-blue-600">
                {clicked ? (
                  <AiFillHeart className="text-3xl text-red-600" />
                ) : (
                  <IoMdHeartEmpty className="text-3xl text-blue-600" />
                )}
              </span> */}
                </span>
              )}
              <div
                className="flex border-blue-700 border px-3 py-2 cursor-pointer mt-3 hover:bg-gray-50"
                onClick={() => {
                  dispatch({
                    type: ADD_OR_REMOVE_FROM_FAVORITE,
                    payload: product && product,
                  });
                  isInFav
                    ? toast(<FavoriteToast Type={"empty"} />)
                    : toast(<FavoriteToast Type={"full"} />);
                }}
              >
                {favorite.find((arg) =>
                  arg._id === product?._id ? true : false
                ) ? (
                  <span className="flex px-2">
                    <AiFillHeart className="text-4xl text-red-600" />
                    <span className="text-xl ml-7  text-blue-500">
                      {" "}
                      Adaugat la favorite
                    </span>
                  </span>
                ) : (
                  <span className="flex px-2">
                    <IoMdHeartEmpty className="text-4xl text-blue-600" />
                    <span className="text-xl ml-8  text-blue-500 ">
                      {" "}
                      Adauga la favorite
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
