import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./resources/cart1.png";
import { Menu } from "antd";
import { verifyCoupon } from "../../CRUD/functions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { COUPON_APPLIED } from "../../redux/coupon/coupon-types";
const { SubMenu } = Menu;

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isValidCupon, setIsValidCupon] = useState({ state: false, value: 0 });
  const [couponName, setCouponName] = useState("");
  // const dispatch = useDispatch();
  // let numberOfItems = cart.reduce(
  //   (acc, value) => acc + JSON.parse(value.qty),
  //   0
  // );
  let total = cart
    .reduce(
      (acc, value) =>
        acc + JSON.parse(value.qty) * (JSON.parse(value.price) + 0.99),
      0
    )
    .toFixed(2);
  const handleCupon = async (e) => {
    e.preventDefault();
    await verifyCoupon({ couponName: couponName })
      .then((res) => {
        if (res.data.res === "OK") {
          setIsValidCupon({ state: true, value: res.data.value });
          toast.success("Cuponul a fost aplicat cu succes!");
        } else if (res.data.res === "Invalid") {
          setIsValidCupon({ state: false, value: 0 });
          toast.error("Cuponul este invalid!");
        }
      })
      .catch((err) => console.log(err));
  };
  let discount = (isValidCupon.value * parseFloat(total)) / 100;
  let priceAfterDiscount =
    parseFloat(total) - (isValidCupon.value * parseFloat(total)) / 100;
  return (
    <div className="flex flex-col w-full">
      <div className="flex shadow-2xl  justify-center">
        <div className="flex ml-2 flex-col">
          <span className="text-xl text-gray-800 font-bold py-3">
            Sumar comanda
          </span>
          <div className="flex justify-between">
            <span className="text-base tracking-tight">Cost produse:</span>
            <span className="text-base tracking-tight">{total} Lei</span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-base tracking-tight">Cost livrare:</span>
            <span className="text-base tracking-tight">
              {cart.length > 0 ? "21" : "0"} Lei
            </span>
          </div>
          {isValidCupon.state === true && cart.length > 0 && (
            <div className="flex justify-between">
              <span className="text-base tracking-tighter">
                Reducere card cadou:
              </span>
              <span className="text-base tracking-tighter">
                -{discount.toFixed(2)} Lei
              </span>
            </div>
          )}
          <div className=" flex flex-col border-t border-gray-300 ">
            <span className="text-xl text-black font-bold pt-4">Total:</span>
            <span className="text-xl text-black font-bold">
              {isValidCupon.state === true
                ? (priceAfterDiscount + (cart.length > 0 ? 21.0 : 0)).toFixed(2)
                : parseFloat(total) + (cart.length > 0 ? 21.0 : 0)}{" "}
              Lei
            </span>
            <img
              onClick={() => {
                user.token
                  ? history.push("/cart/checkout")
                  : history.push({
                      pathname: "/login",
                      state: { from: "user/cart" },
                    });
                window.scrollTo(0, 0);
                dispatch({
                  type: COUPON_APPLIED,
                  payload: { ...isValidCupon },
                });
              }}
              src={logo}
              alt="butt"
              className="py-4 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 shadow-2xl">
        <Menu mode="inline" defaultOpenKeys={["1"]}>
          <SubMenu
            key="1"
            title={
              <span className="text-gray-800 text-base font-semibold mt-3 ml-2">
                Aplica un card cadou
              </span>
            }
          >
            <div onSubmit={handleCupon} className="flex justify-center mt-2 ">
              <form className="w-1/2 flex justify-center flex-col ">
                <input
                  type="text"
                  placeholder="USE : DISCOUNT30"
                  value={couponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  className="focus:outline-none border-gray-500 px-3 py-1 border rounded"
                />
                <button
                  type="submit"
                  disabled={!cart.length > 0}
                  className="flex items-center justify-center border border-blue-500  px-3 py-0.5  my-2 rounded focus:outline-none"
                >
                  <span className="text-blue-600 text-base font-bold ">
                    Aplica
                  </span>
                </button>
              </form>
            </div>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default PlaceOrder;
