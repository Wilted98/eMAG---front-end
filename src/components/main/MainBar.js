import React, { useState } from "react";
import { MainBarLinks } from "./MainBarLinks";
import { Link } from "react-router-dom";
import MainBarExtended from "./MainBarExtended";
import { useSelector, useDispatch } from "react-redux";
import { BURGER_OFF } from "../../redux/propDrilling/prop-types";
import OutsideClickHandler from "react-outside-click-handler";

const MainBar = ({ setShow }) => {
  const [hover, setHover] = useState({ state: false, id: "" });

  const burger = useSelector((state) => state.propsD.burger);
  const dispatch = useDispatch();

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setTimeout(() => {
          burger === "on" &&
            dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
        }, 100);
      }}
    >
      <div
        onMouseLeave={() => {
          burger === "on" &&
            dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
        }}
        className="flex mr-40 "
      >
        <div className="bg-white">
          {MainBarLinks.map((arg) => {
            return (
              <div
                key={arg.id}
                id={arg.id}
                className="flex w-64 mt-3"
                onMouseEnter={() => setHover({ state: true, id: arg.id })}
                onMouseLeave={() => setHover({ state: false, id: null })}
              >
                {arg.img}
                <Link to={arg.target} className="text-gray-600">
                  {arg.mTitle}
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          {hover.state && (
            <MainBarExtended
              hover={hover}
              setHover={setHover}
              setShow={setShow}
            />
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default MainBar;
