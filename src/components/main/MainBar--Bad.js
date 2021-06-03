import React, { useState } from "react";
import { MainBarLinks } from "./MainBarLinks";
import { Link } from "react-router-dom";
import MainBarExtended from "./MainBarExtended";
import { useSelector, useDispatch } from "react-redux";
import { BURGER_OFF, BURGER_ON } from "../../redux/propDrilling/prop-types";
import OutsideClickHandler from "react-outside-click-handler";

const MainBar = ({ type, setType }) => {
  const [hover, setHover] = useState({ state: false, id: "" });
  // const [burgerHover, setBurgerHover] = useState(false);
  const burger = useSelector((state) => state.propsD.burger);
  const dispatch = useDispatch();
  // const [divId, setDivId] = useState(null);

  // const handleHoverEnter = (e) => {
  //   setHover(true);
  // };
  // const handleHoverLeave = (e) => {
  //   setHover(false);
  // };

  // <div className="bg-white w-100 h-2 absolute -right-0.5 top-7 mr-0.5"></div>
  //

  return (
    <div className="relative">
      {/* <div
        className={`bg-white w-100 h-2 z-40 absolute`}
        style={{ left: "65px", top: "-8px" }}
      ></div> */}
      <OutsideClickHandler
        onOutsideClick={() => {
          burger === "on" &&
            dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
          setType && setType({ type: "hidden" });
        }}
      >
        <div
          onMouseEnter={() => {
            burger === "on" &&
              dispatch({ type: BURGER_ON, payload: { burger: "on" } });
          }}
          onMouseLeave={() => {
            burger === "on" &&
              dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
          }}
          className={`left-16 w-60 shadow-2xl z-40 bg-white ml-0.5 ${
            burger === "on" ? "fixed top-16 z-20" : type
          }`}
        >
          {MainBarLinks.map((arg) => {
            return (
              <div
                key={arg.id}
                id={arg.id}
                className="flex mt-2 mb-3 "
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
        {hover.id && hover.state && (
          <div className="absolute">
            <MainBarExtended
              hover={hover}
              setHover={setHover}
              setType={setType}
            />
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default MainBar;
