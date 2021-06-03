import React from "react";
import { HoverLinks } from "./MainBarLinks";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BURGER_ON, BURGER_OFF } from "../../redux/propDrilling/prop-types";

const MainBarExtended = ({ hover, setHover, setType }) => {
  const burger = useSelector((state) => state.propsD.burger);
  const dispatch = useDispatch();
  const handleHover = () => {
    if (window.scrollY > 480) {
      dispatch({ type: BURGER_ON, payload: { burger: "on" } });
    }
    setHover({ state: true, id: hover.id });
  };
  return (
    <div
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => {
        setType && setType({ type: "hidden" });
        dispatch({ type: BURGER_OFF, payload: { burger: "off" } }) &&
          setHover({ state: false, id: null });
      }}
      className={`bg-white  w-75 left-80 -ml-3.5 shadow-xl ${
        burger === "on" ? "fixed top-16" : "absolute"
      }`}
      style={{
        zIndex: "3",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      {HoverLinks.map((arg) => {
        if (arg.id === hover.id) {
          return arg.Links.map((arg1) => {
            return (
              <div
                className="flex flex-col flex-wrap w-52 mb-2"
                key={arg1.id || arg1.Title}
                onClick={() => {
                  setHover({ state: false, id: null });
                  setType && setType({ type: "hidden" });
                  window.scrollTo(0, 0);
                }}
              >
                <Link
                  to={arg1.target}
                  className={`text-sm font-bold ${
                    arg1.color ? arg1.color : "text-gray-700"
                  } ml-6 mt-4 mb-0.5 hover:underline hover:text-blue-700`}
                >
                  {arg1.Title}
                </Link>
                {arg1.link.map((arg2) => {
                  return (
                    <Link
                      to={arg2.target}
                      className="text-black text-sm ml-6 my-0.5 hover:underline hover:text-blue-900"
                      key={arg2.lname}
                    >
                      {arg2.lname}
                    </Link>
                  );
                })}
              </div>
            );
          });
        }
      })}
    </div>
  );
};

export default MainBarExtended;

// return arg.Links.map((arg1, index) => {
//     return (
//       <>
//         <h1 className="ml-2 mt-3">{arg1.Title}</h1>
//         {arg1.link.map((arg2, index) => {
//           return (
//             <Link to={arg2.target} className="text-gray-500 text-sm">
//               {arg2.lname}
//             </Link>
//           );
//         })}
//       </>
//     );
//   });
