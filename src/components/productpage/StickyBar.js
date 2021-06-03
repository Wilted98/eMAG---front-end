import React, { useState } from "react";
import { showAverage } from "../../CRUD/rating";
import logo from "./cart.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { ADD_TO_CART } from "../../redux/shopping/shopping-types";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../redux/favorite/favorite-types";
import { toast } from "react-toastify";
import FavoriteToast from "../toast/FavoriteToast";
import CartToast from "../toast/CartToast";
import { useDispatch, useSelector } from "react-redux";

const StickyBar = ({ product }) => {
  const id = product?._id;
  const title = product?.title;
  const images = product?.images;
  const price = product?.price;
  const oldPrice = product?.oldPrice;
  const star = product?.ratingsandcomments;
  const quantity = product?.quantity;
  const nrdereviews = true;
  const [sticky, setSticky] = useState(false);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  let isInFav = favorite.find((item) => (item._id === id ? true : false));
  React.useEffect(() => {
    let change = false;
    const event = window.addEventListener("scroll", () => {
      if (window.scrollY > 400 && change === false) {
        setSticky(true);
        change = true;
      } else if (window.scrollY < 400 && change === true) {
        setSticky(false);
        change = false;
      }
    });
  }, []);
  return (
    <>
      {sticky && (
        <div className="w-full h-16 bg-white fixed top-0 right-0 z-10 flex justify-center">
          <div className="flex justify-between" style={{ width: "1200px" }}>
            <div className="flex items-center w-1/3">
              {
                <img
                  className="w-12 h-12 object-cover"
                  src={images && images[0].url}
                  alt="barImage"
                />
              }
              <span className="flex flex-wrap ml-8 text-gray-700 text-base invisible md:visible">
                {title && title.substring(0, 83)}
              </span>
            </div>
            <div className="flex items-center justify-center invisible md:visible">
              {showAverage(star, nrdereviews) ? (
                <div className="mb-2 flex">
                  {showAverage(star, nrdereviews)}{" "}
                  <span
                    onClick={() => {
                      let elmt = document.getElementById("rating-div");
                      elmt.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="ml-1 text-blue-500 text-base hover:text-blue-700 cursor-pointer"
                  >
                    review-uri
                  </span>
                </div>
              ) : (
                <div className="h-7"></div>
              )}
            </div>
            <div className="flex">
              <div className="ml-4 mt-1 pr-6 invisible md:visible">
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
                <span className="text-xl text-red-500 font-semibold flex ml-6">
                  {price} <span className="text-sm">99</span> Lei
                </span>
              </div>
              <div className="flex items-center">
                {quantity > 0 && (
                  <div
                    onClick={() => {
                      dispatch({
                        type: ADD_TO_CART,
                        payload: product && product,
                      });
                      toast(<CartToast Type={"full"} Image={images[0].url} />);
                    }}
                    className="relative cursor-pointer invisible md:visible"
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
                  className="ml-3 border-blue-700 border h-10 w-10 flex items-center justify-center cursor-pointer "
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
                    <AiFillHeart className="text-3xl text-red-600" />
                  ) : (
                    <IoMdHeartEmpty className="text-3xl text-blue-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyBar;
