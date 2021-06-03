import React, { useState } from "react";
import { Menu } from "antd";
import { fetchProductsByFilter, getProductByCat } from "../../CRUD/functions";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

const Disponibility = ({ setProducts, category }) => {
  const history = useHistory();
  let cat = history.location.pathname.split("/")[2];
  const [state, setState] = useState([{ checked: false }, { checked: false }]);

  const handleChange = async (arg) => {
    if (arg === "greater") {
      await fetchProductsByFilter({ quantity: arg, category })
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
      if (state[0].checked === true) {
        setState([{ checked: false }, { checked: false }]);
        await getProductByCat(cat)
          .then((res) => setProducts(res.data.products))
          .catch((err) => console.log(err));
      } else {
        setState([{ checked: true }, { checked: false }]);
      }
    } else if (arg === "less") {
      await fetchProductsByFilter({ quantity: arg, category })
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
      if (state[1].checked === true) {
        await getProductByCat(cat)
          .then((res) => setProducts(res.data.products))
          .catch((err) => console.log(err));
        setState([{ checked: false }, { checked: false }]);
      } else {
        setState([{ checked: false }, { checked: true }]);
      }
    }
  };

  return (
    <div className="w-56 mt-28 bg-white mb-3">
      <Menu mode="inline" defaultOpenKeys={["1"]}>
        <SubMenu
          key="1"
          title={
            <span className="text-gray-800 text-base font-semibold">
              Disponibilitate
            </span>
          }
        >
          <div className="flex flex-col">
            <label className="mx-4 my-2">
              <input
                type="checkbox"
                onChange={() => handleChange("greater")}
                checked={state[0].checked}
              />
              <span className="ml-3">In Stoc</span>
            </label>
          </div>
          <div className="flex flex-col">
            <label className="mx-4 my-2">
              <input
                type="checkbox"
                onChange={() => handleChange("less")}
                checked={state[1].checked}
              />
              <span className="ml-3">Lichidari de Stoc</span>
            </label>
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Disponibility;
