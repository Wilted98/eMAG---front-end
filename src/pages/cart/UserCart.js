import React from "react";
import CartProductCard from "./CartProductCard";
import PlaceOrder from "./PlaceOrder";
import { useSelector } from "react-redux";

const UserCart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="flex w-full justify-center mt-5">
      <div className="flex flex-col" style={{ width: "920px" }}>
        {/* Partea din Stanga: Cosul Meu, Produsele */}
        <div className="text-3xl text-gray-900 mb-3">
          Cosul Meu{/* Title */}
        </div>
        <div className="bg-blue-100 rounded py-3">
          {/* Product Card */}
          <span className="text-xl text-gray-800 ml-4">
            Produse vandute si livrate de {cart.length > 0 ? "eMAG" : ""}
          </span>
          <CartProductCard />
        </div>
        <div>{/* Sumar Comanda Card --- Reutilisable */}</div>
      </div>
      <div className="mt-12" style={{ width: "290px" }}>
        {/* Partea din Dreapta: Sumar Comanda Card ---Reutilisable*/}
        <PlaceOrder />
      </div>
    </div>
  );
};

export default UserCart;
