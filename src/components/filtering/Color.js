import React, { useState } from "react";
import { Menu, Radio } from "antd";
import { fetchProductsByFilter, getProductByCat } from "../../CRUD/functions";
import { useHistory } from "react-router-dom";
import "./Color.css";

const { SubMenu } = Menu;

const colors = [
  "Toate",
  "Alb",
  "Negru",
  "Argintiu",
  "Albastru",
  "Rosu",
  "Verde",
  "Gri",
];

const Color = ({ setProducts, category }) => {
  let history = useHistory();
  let cat = history.location.pathname.split("/")[2];
  const [color, setColor] = useState();

  const handleColor = async (e) => {
    if (e.target.value === "Toate") {
      await getProductByCat(cat)
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.log(err));
      setColor(e.target.value);
    } else {
      await fetchProductsByFilter({ color: e.target.value, category })
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
      setColor(e.target.value);
    }
  };
  return (
    <div className="w-56 bg-white mt-3 mb-3">
      <Menu mode="inline" defaultOpenKeys={["1"]}>
        <SubMenu
          key="1"
          title={
            <span className="text-gray-800 text-base font-semibold">
              Culoare
            </span>
          }
        >
          <div className="h-44 BAR overflow-scroll">
            {colors.map((arg, index) => {
              return (
                <div key={index} className=" flex flex-col mx-3 my-2">
                  <Radio
                    value={arg}
                    name={arg}
                    checked={arg === color}
                    onChange={handleColor}
                  >
                    {arg}
                  </Radio>
                </div>
              );
            })}
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Color;
