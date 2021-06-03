import React, { useState } from "react";
import { Modal } from "antd";
// import { Modal } from "react-responsive-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/components/zoom/zoom.less";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AiOutlineReload } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import logo from "./cart.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../redux/shopping/shopping-types";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../redux/favorite/favorite-types";
// import { GrFavorite } from "react-icons/gr";
import { toast } from "react-toastify";
import FavoriteToast from "../toast/FavoriteToast";
import CartToast from "../toast/CartToast";

SwiperCore.use([Navigation, Pagination]);

const ModalImg = ({
  isModalVisible,
  setIsModalVisible,
  images,
  product,
  isInRating,
}) => {
  // const [open, setOpen] = useState(true);
  const id = product?._id;
  const quantity = product?.quantity;
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const [mySwiper, setMySwiper] = useState();
  let isInFav = favorite.find((item) => (item._id === id ? true : false));
  return (
    <Modal
      width={1200}
      centered
      visible={isModalVisible}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => setIsModalVisible(false)}
      style={{ position: "" }}
    >
      {/* <Modal
      open={open}
      showCloseIcon={true}
      onClose={() => setOpen(false)}
      center={true}
      classNames={{
        modal: "customModal",
      }}
    > */}
      <div className="">
        <div className="flex w-full mt-7 border-t border-gray-200">
          <div className="w-1/5 h-full border-r border-gray-300 flex flex-wrap pt-5">
            {images &&
              images.map((arg, index) => {
                return (
                  <span
                    key={arg.public_id}
                    onClick={() => {
                      mySwiper.slideTo(index, 200, true);
                    }}
                    className="border border-gray-50 hover:border-blue-500 mr-3  mb-4 "
                  >
                    <img
                      src={arg.url}
                      alt="fkc"
                      className="w-20 h-20  object-cover cursor-pointer p-1"
                    />
                  </span>
                );
              })}
          </div>
          <div className="w-full flex items-center justify-center pt-5">
            <Swiper
              spaceBetween={0}
              // loop={true}
              // speed={600}
              zoom={true}
              slidesPerView={1}
              navigation
              // rebuildOnUpdate={true}
              // pagination={{ clickable: true }}
              style={{ width: "400px" }}
              onSwiper={(arg) => {
                setMySwiper(arg);
              }}
            >
              {images &&
                images.map((arg, index) => {
                  return (
                    <div key={index}>
                      <SwiperSlide>
                        <TransformWrapper defaultScale={1}>
                          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <>
                              <TransformComponent>
                                <img src={arg.url} alt="fck" />
                              </TransformComponent>
                              <span className="flex mt-6 items-center justify-center w-full">
                                <span
                                  onClick={zoomIn}
                                  className="border hover:border-blue-500 rounded-full p-2 mx-4  text-gray-500  cursor-pointer"
                                >
                                  <AiOutlinePlus className="text-xl " />
                                </span>
                                <span
                                  onClick={zoomOut}
                                  className="border hover:border-blue-500 rounded-full p-2 mx-4  text-gray-500  cursor-pointer"
                                >
                                  <AiOutlineMinus className="text-xl" />
                                </span>
                                <span
                                  onClick={resetTransform}
                                  className="border hover:border-blue-500 rounded-full p-2 mx-4  text-gray-500  cursor-pointer"
                                >
                                  <AiOutlineReload className="text-xl" />
                                </span>
                              </span>
                            </>
                          )}
                        </TransformWrapper>
                      </SwiperSlide>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>

        {/* <div className="flex">
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className="flex justify-center items-center  w-full ml-44">
                  <span className="border hover:border-blue-500 rounded-full p-2 mx-4  text-gray-500  cursor-pointer">
                    <TransformComponent>
                      <AiOutlinePlus className="text-xl" onClick={zoomIn} />
                    </TransformComponent>
                  </span>
                  <span className="border hover:border-blue-500 rounded-full p-2 mx-4 text-gray-500 cursor-pointer">
                    <TransformComponent>
                      <AiOutlineMinus className="text-xl" onClick={zoomOut} />
                    </TransformComponent>
                  </span>
                  <span className="border hover:border-blue-500 rounded-full p-2 mx-4 text-gray-500 cursor-pointer">
                    <TransformComponent>
                      <AiOutlineReload
                        className="text-xl"
                        onClick={resetTransform}
                      />
                    </TransformComponent>
                  </span>{" "}
                </div>
              </>
            )}
          </TransformWrapper>
        </div> */}
        {!isInRating && (
          <div className="flex justify-end">
            {quantity > 0 && (
              <div
                onClick={() => {
                  dispatch({
                    type: ADD_TO_CART,
                    payload: product,
                  });
                  toast(<CartToast Type={"full"} Image={images[0].url} />);
                }}
                className="relative cursor-pointer"
              >
                <img src={logo} alt="logo" />
                <span
                  className="absolute text-white text-base tracking-tighter hover:text-gray-200"
                  style={{ top: "6px", right: "29px" }}
                >
                  Adauga in cos
                </span>
              </div>
            )}
            <div
              className="flex items-center justify-center border-blue-700 border p-2 ml-3 cursor-pointer"
              onClick={() => {
                dispatch({
                  type: ADD_OR_REMOVE_FROM_FAVORITE,
                  payload: product,
                });
                isInFav
                  ? toast(<FavoriteToast Type={"empty"} />)
                  : toast(<FavoriteToast Type={"full"} />);
              }}
            >
              {favorite.find((item) =>
                item._id === product?._id ? true : false
              ) ? (
                <AiFillHeart className="text-xl text-red-600" />
              ) : (
                <IoMdHeartEmpty className="text-xl text-blue-600" />
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalImg;
