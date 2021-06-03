import React, { useState } from "react";
import { Menu } from "antd";
import { fetchProductsByFilter, getProductByCat } from "../../CRUD/functions";
import { useHistory } from "react-router-dom";
import "./Brand.css";

const { SubMenu } = Menu;

const initialState = [
  "Lenovo",
  "Apple",
  "Huawei",
  "Samsung",
  "LG",
  "HP",
  "Dell",
  "ASUS",
  "Acer",
  "Razer",
];

const Brand = ({ setProducts, category }) => {
  let history = useHistory();
  let cat = history.location.pathname.split("/")[2];

  const [items, setItems] = useState(initialState);
  const [pos, setPos] = useState();
  const [clicked, setClicked] = useState(false);

  const handleChange = async (brand, index) => {
    if (!clicked) {
      await fetchProductsByFilter({ brand, category })
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
      setClicked(true);
      setPos(index);
    } else if (clicked) {
      await getProductByCat(cat)
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.log(err));
      setClicked(false);
      setPos(22131);
    }
  };
  return (
    <div className="w-56 bg-white mt-3 mb-3">
      <Menu mode="inline" defaultOpenKeys={["1"]}>
        <SubMenu
          key="1"
          title={
            <span className="text-gray-800 text-base font-semibold">Brand</span>
          }
        >
          <div className="h-40 overflow-scroll BAR">
            {items.map((arg, index) => {
              return (
                <div key={index} className="mb-3">
                  <input
                    type="checkbox"
                    className="mx-3"
                    onChange={() => handleChange(arg, index)}
                    checked={pos === index ? true : false}
                  />
                  <span>{arg}</span>
                </div>
              );
            })}
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Brand;
