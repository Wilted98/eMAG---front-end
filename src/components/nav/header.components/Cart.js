import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import DropDownCart from "./dropdown/DropDownCart";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Cart = ({ stickyBar }) => {
  const [hover, setHover] = useState(false);
  const cart = useSelector((state) => state.cart);
  let numberOfItems = cart.reduce(
    (acc, value) => acc + JSON.parse(value.qty),
    0
  );
  const history = useHistory();
  return (
    <div
      className="mr-8  h-full flex cursor-pointer relative items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Badge
        onClick={() => history.push("/user/cart")}
        count={numberOfItems}
        offset={numberOfItems < 10 ? [-10, 5] : [-2, 3]}
        overflowCount={99}
        style={{
          background: "linear-gradient(to right, #cf3f50,#cf3f50,#fe2d34)",
        }}
      >
        <ShoppingCartOutlined
          className="text-2xl mr-2 mt-1"
          style={{ color: "rgb(59, 130, 246)" }}
          onClick={() => history.push("/user/cart")}
        />
      </Badge>

      <p
        onClick={() => history.push("/user/cart")}
        className="hidden xl:block text-md text-gray-600 mt-5"
      >
        Cosul Meu
      </p>
      <svg
        className="w-4 h-4 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      {hover && <DropDownCart stickyBar={stickyBar} setHoverCart={setHover} />}
    </div>
  );
};

export default Cart;
