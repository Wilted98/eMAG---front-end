import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { showAverage } from "../../CRUD/rating";
import logo from "../../pages/404/button.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../redux/favorite/favorite-types";
import { ADD_TO_CART } from "../../redux/shopping/shopping-types";
import { toast } from "react-toastify";
import FavoriteToast from "../toast/FavoriteToast";
import CartToast from "../toast/CartToast";

const HomepageCard = ({ product, isSearching }) => {
  const id = product?._id;
  const image = product?.images[0].url;
  const description = product?.description;
  const price = product?.price;
  const oldPrice = product?.oldPrice;
  const star = product?.ratingsandcomments;
  const quantity = product?.quantity;
  const slug = product?.slug;

  const history = useHistory();
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);
  const cart = useSelector((state) => state.cart);
  let isInFav = favorite.find((item) => (item._id === id ? true : false));
  return (
    <div
      // onClick={() => {
      //   !isSearching && history.push(`/${slug}`);
      // }}
      className={`${
        isSearching ? "w-60 my-2" : "w-48 "
      } bg-white flex flex-col items-center ml-1 mr-2 hover:shadow-2xl  relative`}
      style={{ height: `${isSearching ? "454px" : "310px"}` }}
    >
      <img
        onClick={() => {
          history.push(`/${slug}`);
          window.scrollTo(0, 220);
        }}
        src={image}
        alt={price}
        className={`${
          isSearching ? "w-44 h-44 cursor-pointer" : "w-36 h-36 cursor-pointer"
        } object-cover mt-3`}
      />
      <span
        className={`text-gray-700 ${
          isSearching ? "text-sm font-bold" : "text-sm font-semibold"
        } flex flex-wrap text-center mt-2 w-full`}
      >
        {description
          .substring(0, 72)
          .split("\n")
          .map((i, key) => {
            return (
              <div
                onClick={() => {
                  history.push(`/${slug}`);
                  window.scrollTo(0, 220);
                }}
                className={`text-center flex items-center hover:text-gray-600 justify-center cursor-pointer  w-full ${
                  isSearching && "mx-5  "
                }`}
                key={key}
              >{`${i}`}</div>
            );
          })}
      </span>

      {showAverage(star) ? (
        <div className="mb-2">{showAverage(star)}</div>
      ) : (
        <div className="h-7"></div>
      )}
      {isSearching && (
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
            <div className="flex flex-col items-center justify-center">
              <span className="text-green-500">in stoc</span>
              <img
                src="https://s13emagst.akamaized.net/layout/ro/static-upload/logo_genius_app.png"
                className="w-12 h-4 mt-1"
                alt="fck"
              />
            </div>
          )}
        </div>
      )}
      {hover && (
        <span className="text-white text-xs p-1.2 rounded font-semibold absolute bg-blue-400 top-2 right-10 z-10">
          {!isInFav ? "Adauga la Favorite" : "Adaugat la Favorite"}
        </span>
      )}
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute  text-gray-300 cursor-pointer"
        style={{ right: "16px", top: "10px" }}
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
        {!isInFav ? (
          <IoMdHeartEmpty className="w-5 h-5 " />
        ) : (
          <AiFillHeart className="w-5 h-5" style={{ color: "red" }} />
        )}
      </span>
      {/* <span className="text-red-500 font-bold text-base">{price} Lei</span> */}
      {oldPrice > 0 && oldPrice !== price && oldPrice > price ? (
        <>
          <div
            className="absolute h-6 text-white text-center shadow-2xl rounded-r"
            style={{
              backgroundColor: "#FF4200",
              left: "1px",
              top: "10px",
              width: "70px",
            }}
          >
            <span> -{Math.floor(((oldPrice - price) * 100) / oldPrice)}%</span>
          </div>
          <div className="text-center w-full justify-center items-center text-sm text-gray-700 ">
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
        </>
      ) : (
        <div className={`w-full ${isSearching ? "h-5" : "h-4"}`}></div>
      )}
      <div className="relative">
        <span className="text-red-500 font-bold text-base">{price}</span>
        <span
          className="text-red-500 absolute font-bold"
          style={{ fontSize: "10px", lineHeight: "14px" }}
        >
          99
        </span>
        <span className="text-red-500 font-semibold text-lg ml-4">Lei</span>
      </div>
      {isSearching && quantity > 0 && (
        <div
          onClick={() => {
            dispatch({
              type: ADD_TO_CART,
              payload: product,
            });
            toast(<CartToast Type={"full"} Image={image} />);
          }}
          className="mt-2 cursor-pointer relative"
        >
          <img src={logo} alt="fcl" />
          <span
            className="absolute text-white text-sm tracking-tighter hover:text-gray-200"
            style={{ top: "4px", right: "27px" }}
          >
            Adauga in cos
          </span>
        </div>
      )}
    </div>
  );
};

export default HomepageCard;
