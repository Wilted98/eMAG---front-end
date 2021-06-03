import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DropDown.css";
import { GrClose } from "react-icons/gr";
import { REMOVE_FROM_CART } from "../../../../redux/shopping/shopping-types";
import logo from "./cart3.png";
import { Link } from "react-router-dom";
import CartToast from "../../../toast/CartToast";
import { toast } from "react-toastify";

const DropDownCart = ({ stickyBar, setHoverCart }) => {
  const cart = useSelector((state) => state.cart);
  const [hover, setHover] = useState({ id: null });
  const dispatch = useDispatch();
  let numberOfItems = cart.reduce(
    (acc, value) => acc + JSON.parse(value.qty),
    0
  );
  let total = cart
    .reduce(
      (acc, value) =>
        acc + JSON.parse(value.qty) * (JSON.parse(value.price) + 0.99),
      0
    )
    .toFixed(2);
  return (
    <div
      className={`bg-white cursor-default z-40 ${
        cart.length === 0 ? "w-52 -left-24" : "w-72 -left-44"
      }  absolute    border border-gray-200 flex justify-center items-center shadow-2xl ${
        stickyBar ? "top-14" : "top-16"
      }`}
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-center p-2 border-b border-gray-200">
          <span
            className="tracking-tight text-blue-500"
            style={{ fontSize: "12px" }}
          >
            {cart.length > 0
              ? "ultimele adaugate"
              : "Nu ai niciun produs in cos"}
          </span>
        </div>
        <div
          className={`${
            cart.length > 3
              ? "h-64 overflow-scroll overflow-x-hidden scrollBar"
              : ""
          }`}
        >
          {cart.length > 0 &&
            cart.map((item, index) => {
              return (
                <div
                  onMouseEnter={() => setHover({ id: item._id })}
                  onMouseLeave={() => setHover({ id: null })}
                  className="flex justify-between items-center  text-black m-2 border-b border-gray-200 p-1 relative"
                  key={item._id}
                >
                  {/* {hover.id === item._id && (
                    <span
                      className="absolute text-xs hover:text-blue-400 text-blue-600 bg-white flex items-center px-1 pb-3 cursor-pointer"
                      style={{ top: "38px", left: "68px" }}
                    >
                      <span className="flex items-center justify-center">
                        {" "}
                        <AiOutlineShoppingCart className="mr-1" />
                        Adauga in cos
                      </span>
                      <span className="ml-16 text-gray-700 text-xs hover:text-red-700">
                        X
                      </span>
                    </span>
                  )} */}
                  {hover.id === item._id && (
                    <span
                      onClick={() => {
                        dispatch({
                          type: REMOVE_FROM_CART,
                          payload: item,
                        });
                        setHover({ id: cart[index + 1]?._id });
                        cart.length === 1 && setHoverCart(false);
                      }}
                      className="absolute right-7 top-10 cursor-pointer"
                    >
                      <GrClose />
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
                  <span style={{ fontSize: "11px", marginBottom: "30px" }}>
                    {item.qty}x
                  </span>
                  <span className="flex flex-col flex-wrap ">
                    <span className="relative font-bold text-blue-600 text-xs ">
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
        {cart.length > 0 && (
          <>
            <div className="flex justify-around border-b border-gray-200 py-1 ">
              <div>
                <span className="font-bold text-gray-500 text-xs">TOTAL:</span>
                <span className="ml-1">
                  <span className="mr-1 text-xs font-semibold text-gray-400">
                    {numberOfItems}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    {numberOfItems > 1 ? "produse" : "produs"}
                  </span>
                </span>
              </div>
              <div className="font-bold text-gray-500">
                {total} <span className="ml-1">Lei</span>
              </div>
            </div>
            <div className="mx-0 flex items-center justify-center tracking-tight text-xs cursor-pointer hover:text-blue-700  py-2">
              <Link to="/user/cart">
                <img src={logo} alt="fck" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownCart;
