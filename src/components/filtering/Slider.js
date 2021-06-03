import React, { useState } from "react";
import { Slider, Menu } from "antd";
import { fetchProductsByFilter } from "../../CRUD/functions";

const { SubMenu } = Menu;

const prices = [
  {
    min: 500,
    max: 1000,
  },
  {
    min: 1000,
    max: 2000,
  },
  {
    min: 2000,
    max: 3000,
  },
  {
    min: 3000,
    max: 4000,
  },
  {
    min: 4000,
    max: 5000,
  },
  {
    min: 5000,
    max: 15000,
  },
];

const SliderRange = ({ setProducts, category }) => {
  const [price, setPrice] = useState([0, 15000]);
  // const [checked, setChecked] = useState(false);
  // const [checked, setChecked] = useState([]);
  // let array = [];
  const [disable, setDisable] = useState(true);
  const [pos, setPos] = useState();
  const [clicked, setClicked] = useState(false);

  // const handleChange = (min, max) => {
  //   if (!checked) {
  //     setPrice([min, max]);
  //     setChecked(!checked);
  //   } else if (checked) {
  //     setPrice([0, 15000]);

  //     // setChecked(false);
  //   }
  // };
  // const handleChange = (min, max, index) => {
  //   setChecked(array);
  //   if (checked && checked[index] === "false") {
  //     setPrice([min, max]);
  //     setChecked((state) => [...state, (state[index] = "true")]);
  //   } else if (checked && checked[index] === "true") {
  //     setPrice([0, 15000]);
  //     setChecked((state) => [...state, (state[index] = "false")]);
  //   }
  // };
  const handleChange = (min, max, index) => {
    if (!clicked) {
      setPrice([min, max]);
      setClicked(true);
      setPos(index);
    } else if (clicked) {
      setPrice([0, 15000]);
      setClicked(false);
      setPos(22991);
    }
  };
  const fetching = async () => {
    await fetchProductsByFilter({ price, category })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    if (category) {
      const delayed = setTimeout(() => {
        fetching();
      }, 400);
      return () => clearTimeout(delayed);
    }
  }, [price]);
  return (
    <div className="w-56 bg-white">
      <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
        <SubMenu
          key="1"
          title={
            <span className="text-gray-800 text-base font-semibold">Pret</span>
          }
        >
          <div>
            <span className="flex flex-col my-2">
              {prices.map((arg, index) => {
                // array.push("false");
                return (
                  <label key={index} className="mx-4 my-2">
                    <input
                      name="unique"
                      type="checkbox"
                      // onChange={() => setPrice([arg.min, arg.max])}
                      // onChange={() => handleChange(arg.min, arg.max)}
                      onChange={() => handleChange(arg.min, arg.max, index)}
                      // checked={
                      //   checked && checked[index] === "true"
                      //     ? true
                      //     : checked && checked[index] === "false" && false
                      // }
                      checked={pos === index ? true : false}
                    />
                    <span className="ml-2">
                      {arg.min} - {arg.max}
                    </span>
                  </label>
                );
              })}
            </span>
            <div className="mt-4 border-t border-gray-200">
              <label>
                <input type="checkbox" onChange={() => setDisable(!disable)} />
                <span className="mx-4">Interval de pret</span>
              </label>
              <Slider
                disabled={disable}
                range={{ draggableTrack: true }}
                min={300}
                max={15000}
                value={disable ? [0, 15000] : price}
                onChange={(value) => setPrice(value)}
              />
              <div className="w-full flex items-center justify-center mb-3">
                <span className="border text-gray-500 border-gray-300 w-16 h-6 flex justify-center items-center mr-4 rounded">
                  {price[0]}
                </span>
                -
                <span className="border text-gray-500 border-gray-300 w-16 h-6 flex justify-center items-center ml-4 rounded">
                  {price[1]}
                </span>
              </div>
            </div>
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SliderRange;
