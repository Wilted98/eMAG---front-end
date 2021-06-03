import React, { useState } from "react";
import { Menu } from "antd";
import { fetchProductsByFilter, getProductByCat } from "../../CRUD/functions";

import StarRating from "react-star-ratings";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

let initialState = [
  { value: 5, checked: false },
  { value: 4, checked: false },
  { value: 3, checked: false },
  { value: 2, checked: false },
  { value: 1, checked: false },
];

const Stars = ({ setProducts, category }) => {
  let history = useHistory();

  let cat = history.location.pathname.split("/")[2];

  const [stars, setStars] = useState();
  const [starIndex, setStarIndex] = useState();
  const [clicked, setClicked] = useState(false);

  const fetching = async () => {
    await fetchProductsByFilter({ stars, category })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    const delayed = setTimeout(() => {
      fetching();
    }, 200);
    return () => clearTimeout(delayed);
  }, [stars]);

  const handleChange = async (arg, index) => {
    if (!clicked) {
      setStars(arg.value);
      setClicked(true);
      setStarIndex(index);
    } else if (clicked) {
      setClicked(false);
      await getProductByCat(cat)
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.log(err));
      setStarIndex(292992);
    }
  };

  return (
    <div className="w-56 bg-white mt-3 mb-3">
      <Menu mode="inline" defaultOpenKeys={["1"]}>
        <SubMenu
          key="1"
          title={
            <span className="text-gray-800 text-base font-semibold">
              Rating
            </span>
          }
        >
          {initialState.map((arg, index) => {
            return (
              <div
                className="flex items-center my-1 ml-1"
                key={index}
                onClick={() => {
                  handleChange(arg, index);
                }}
              >
                <input
                  type="checkbox"
                  className="mx-3"
                  onChange={() => handleChange(arg, index)}
                  checked={starIndex === index ? true : false}
                />
                <StarRating
                  isSelectable={false}
                  rating={arg.value}
                  starRatedColor="#f9bf3b"
                  starHoverColor="#f9bf3b"
                  starDimension="17px"
                  starSpacing="1px"
                />
              </div>
            );
          })}
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Stars;
