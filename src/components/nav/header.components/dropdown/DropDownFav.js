import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DropDown.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../../../redux/favorite/favorite-types";
import { ADD_TO_CART } from "../../../../redux/shopping/shopping-types";
import { GrClose } from "react-icons/gr";
// import { toast } from "react-toastify";
// import FavoriteToast from "../../../toast/FavoriteToast";
// import CartToast from "../../../toast/CartToast";

const DropDownFav = ({ stickyBar, setHoverFav }) => {
  const favorite = useSelector((state) => state.favorite);
  const [hover, setHover] = useState({ id: null });
  const dispatch = useDispatch();
  return (
    <div
      className={`bg-white cursor-default z-40 ${
        favorite.length === 0 ? "w-52 -left-24" : "w-72 -left-48"
      }  absolute    border border-gray-200 flex justify-center items-center shadow-2xl ${
        stickyBar ? "top-14" : "top-16"
      }`}
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-center p-2 border-b border-gray-200">
          <span className="tracking-tight" style={{ fontSize: "12px" }}>
            {favorite.length > 0
              ? "ultimele adaugate"
              : "Nu ai produse favorite"}
          </span>
        </div>
        <div
          className={`${
            favorite.length > 3
              ? "h-64 overflow-scroll overflow-x-hidden scrollBar"
              : ""
          }`}
        >
          {favorite.length > 0 &&
            favorite.map((item, index) => {
              return (
                <div
                  onMouseEnter={() => setHover({ id: item._id })}
                  onMouseLeave={() => setHover({ id: null })}
                  className="flex justify-between items-center  text-black m-2 border-b border-gray-200 p-1 relative"
                  key={item._id}
                >
                  {hover.id === item._id && (
                    <span
                      className="absolute text-xs hover:text-blue-400 text-blue-600 bg-white flex items-center px-1 pb-3 cursor-pointer"
                      style={{ top: "38px", left: "68px" }}
                    >
                      {item?.quantity > 0 ? (
                        <span
                          onClick={() => {
                            dispatch({
                              type: ADD_TO_CART,
                              payload: item,
                            });
                          }}
                          className="flex items-center justify-center"
                        >
                          {" "}
                          <AiOutlineShoppingCart className="mr-1" />
                          Adauga in cos
                        </span>
                      ) : (
                        <div className="w-24" />
                      )}
                      <span
                        onClick={() => {
                          dispatch({
                            type: ADD_OR_REMOVE_FROM_FAVORITE,
                            payload: item,
                          });
                          setHover({ id: favorite[index + 1]?._id });
                          favorite.length === 1 && setHoverFav(false);
                        }}
                        className="ml-16 text-gray-700 text-xs hover:text-red-500"
                      >
                        <GrClose />
                      </span>
                    </span>
                  )}
                  <img
                    className="w-7 h-7 ml-2"
                    src={item.images[0].url}
                    alt="www"
                  />
                  <span
                    className="text-xs w-2/5 text-gray-700 h-12 overflow-hidden"
                    style={{ fontSize: "12px" }}
                  >
                    {/* {hover.id === item._id
                      ? item.title.substring(0, 43)
                      : item.title.substring(0, 50)} */}
                    {/* {item.title.substring(0, 50)} */}
                    {item.title}
                  </span>
                  <span className="flex flex-col flex-wrap ">
                    <span className="relative font-bold text-blue-600 text-xs">
                      {item.price}
                      <span
                        className="absolute"
                        style={{ fontSize: "10px", lineHeight: "14px" }}
                      >
                        99
                      </span>
                      <span className="ml-3">Lei</span>
                    </span>
                    <span
                      className="relative text-gray-700 mb-4"
                      style={{ fontSize: "11px" }}
                    >
                      <del>{item.oldPrice}</del>
                      <span
                        className="absolute"
                        style={{ fontSize: "8px", lineHeight: "12px" }}
                      >
                        <del>99</del>
                      </span>
                      <span className="ml-3">
                        <del>Lei</del>
                      </span>
                    </span>
                  </span>
                </div>
              );
            })}
        </div>
        {favorite.length > 0 && (
          <div className="flex items-center justify-center tracking-tight text-xs cursor-pointer hover:text-blue-700  py-2">
            Vezi toate produsele favorite
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownFav;
