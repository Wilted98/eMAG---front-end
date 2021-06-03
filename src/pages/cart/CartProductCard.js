import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  REMOVE_FROM_CART,
  ADJUST_ITEM_QTY,
} from "../../redux/shopping/shopping-types";
import { ADD_OR_REMOVE_FROM_FAVORITE } from "../../redux/favorite/favorite-types";
import { Select } from "antd";
const { Option } = Select;

const CartProductCard = () => {
  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      {cart.map((item) => {
        return (
          <div
            key={item._id}
            className="m-2 flex bg-white items-center shadow-lg rounded py-7 justify-around"
          >
            <div className="w-28 h-28">
              <img src={item.images[0].url} alt="fcl" />
            </div>
            <div className="w-1/2 flex justify-between">
              <div className="flex flex-col flex-wrap">
                <div className="font-bold text-sm">
                  {item.title.substring(0, 70)}
                </div>
                <div className="mt-1">
                  Disponibilitate: &nbsp;
                  {item.quantity > 4
                    ? "In stoc"
                    : item.quantity < 2
                    ? "ultimul produs din stoc"
                    : `ultimele ${item.quantity} produse din stoc`}
                </div>
              </div>
              <div>
                <Select
                  defaultValue={item.qty}
                  style={{ width: 50 }}
                  onChange={(value) =>
                    dispatch({
                      type: ADJUST_ITEM_QTY,
                      payload: { product: item, value },
                    })
                  }
                >
                  {/* <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={5}>5</Option>
                  <Option value={6}>6</Option>
                  <Option value={7}>7</Option>
                  <Option value={8}>8</Option>
                  <Option value={9}>9</Option>
                  <Option value={10}>10</Option> */}
                  {[...Array(item.quantity > 10 ? 10 : item.quantity)].map(
                    (i, pos) => (
                      <Option value={pos + 1}>{pos + 1}</Option>
                    )
                  )}
                </Select>
              </div>
            </div>
            <div className="1/4 flex flex-col">
              <span className="relative font-bold text-black text-xl">
                {Math.trunc((item.price + 0.99) * item.qty)}
                <span
                  className="absolute"
                  style={{ fontSize: "10px", lineHeight: "14px" }}
                >
                  {
                    (
                      (item.price + 0.99) * item.qty -
                      Math.trunc((item.price + 0.99) * item.qty)
                    )
                      .toFixed(2)
                      .toString()
                      .split(".")[1]
                  }
                </span>
                <span className="ml-3">Lei</span>
              </span>
              <div className="flex justify-around">
                <span
                  onClick={() =>
                    favorite.find((arg) =>
                      arg._id === item._id ? true : false
                    )
                      ? null
                      : dispatch({
                          type: ADD_OR_REMOVE_FROM_FAVORITE,
                          payload: item,
                        }) &&
                        dispatch({
                          type: REMOVE_FROM_CART,
                          payload: item,
                        })
                  }
                  className="text-xs text-blue-500 cursor-pointer"
                >
                  Muta in favorite
                </span>
                <span
                  onClick={() =>
                    dispatch({
                      type: REMOVE_FROM_CART,
                      payload: item,
                    })
                  }
                  className="text-xs text-blue-500 ml-2 cursor-pointer"
                >
                  Sterge
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartProductCard;
