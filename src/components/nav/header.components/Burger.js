import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BURGER_ON } from "../../../redux/propDrilling/prop-types";
import MainBar from "../../main/MainBar";

const Buger = () => {
  // const [hover, setHover] = useState(false);
  const [fixed, setFixed] = useState(true);

  const burger = useSelector((state) => state.propsD.burger);
  const dispatch = useDispatch();
  const handleHover = () => {
    if (burger === "off" || burger === undefined) {
      dispatch({ type: BURGER_ON, payload: { burger: "on" } });
    }
  };
  // useEffect(() => {
  //   if (hover === false) {
  //     dispatch({
  //       type: BURGER_OFF,
  //       payload: {
  //         burger: "off",
  //       },
  //     });
  //   } else if (hover === true) {
  //     dispatch({
  //       type: BURGER_ON,
  //       payload: {
  //         burger: "on",
  //       },
  //     });
  //   }
  // }, [hover]);
  return (
    <div onMouseEnter={() => handleHover()}>
      {burger === "off" || burger === undefined ? (
        <GiHamburgerMenu className="text-blue-600 w-6 h-full mt-4" />
      ) : (
        <div className="relative">
          <AiOutlineClose className="text-blue-600 text-base w-6 h-full mt-4" />
          {fixed && (
            <div className="absolute">
              {/* <span
                style={{ left: "-1px", bottom: "-7px" }}
                className="bg-white w-100 h-2 z-40 absolute"
              ></span> */}
              <div
                style={{ top: "22px", left: "-1px" }}
                className="absolute z-10 w-full"
              >
                <MainBar setShow={setFixed} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Buger;
