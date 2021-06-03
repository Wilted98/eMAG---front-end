import React from "react";
import { useSelector } from "react-redux";
import logo from "./resources/cart1.png";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Finish = ({ addres }) => {
  const cart = useSelector((state) => state.cart);
  const coupon = useSelector((state) => state.coupon);

  const history = useHistory();
  let total = cart
    .reduce(
      (acc, value) =>
        acc + JSON.parse(value.qty) * (JSON.parse(value.price) + 0.99),
      0
    )
    .toFixed(2);
  let discount = (coupon.value * parseFloat(total)) / 100;
  let priceAfterDiscount =
    parseFloat(total) - (coupon.value * parseFloat(total)) / 100;
  const handleClick = () => {
    if (!addres) {
      return toast.error("Selecteaza adresa de livrare!");
    } else if (cart.length > 0) {
      history.push("/cart/payment");
    }
  };
  return (
    <div className="flex shadow-2xl w-8/12 mt-4">
      <div className="flex justify-around w-full ml-2">
        <div className="flex flex-col w-1/2 ">
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
          {coupon.state === true && cart.length > 0 && (
            <div className="flex justify-between">
              <span className="text-base tracking-tighter">
                Reducere card cadou:
              </span>
              <span className="text-base tracking-tighter">
                -{discount.toFixed(2)} Lei
              </span>
            </div>
          )}
        </div>
        <div className=" flex flex-col">
          <span className="text-xl text-black font-bold pt-4">Total:</span>
          <span className="text-xl text-black font-bold">
            {coupon.state === true
              ? (priceAfterDiscount + (cart.length > 0 ? 21.0 : 0)).toFixed(2)
              : parseFloat(total) + (cart.length > 0 ? 21.0 : 0)}{" "}
            Lei
          </span>
          <img
            onClick={() => handleClick()}
            src={logo}
            alt="butt"
            className="py-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Finish;
