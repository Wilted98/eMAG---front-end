import React, { useState } from "react";
import DropDownFav from "./dropdown/DropDownFav";
import { Badge } from "antd";
import { useSelector } from "react-redux";

const Favorites = ({ stickyBar }) => {
  const [hover, setHover] = useState(false);
  const favorite = useSelector((state) => state.favorite);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mr-8 h-full relative  flex  items-center justify-center fill-current text-blue-500 cursor-pointer"
    >
      <Badge
        count={favorite.length}
        offset={favorite.length < 10 ? [-8, 8] : [-5, 4]}
        overflowCount={99}
        style={{
          background: "linear-gradient(to right, #4a60c1,#4a60c1,#3985e0)",
        }}
      >
        <span className="text-blue-500">
          <svg
            className="w-6 h-7 mr-2 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </span>
      </Badge>
      <p className="hidden xl:block text-md text-gray-600 mt-5">Favorite</p>
      <svg
        className="w-4 h-4 mt-2 fill-current text-black"
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
      {hover && <DropDownFav stickyBar={stickyBar} setHoverFav={setHover} />}
    </div>
  );
};

export default Favorites;
