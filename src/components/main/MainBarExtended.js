import React from "react";
import { HoverLinks } from "./MainBarLinks";
import { Link } from "react-router-dom";

const MainBarExtended = ({ hover, setHover, setShow }) => {
  const handleHover = () => {
    setHover({ state: true, id: hover.id });
  };
  return (
    <div
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => setHover({ state: false, id: null })}
      //   className={`bg-white  w-75 left-80 -ml-3.5 shadow-xl ${
      //     burger === "on" ? "fixed top-16" : "absolute"
      //   }`}
      //   style={{
      //     zIndex: "3",
      //     height: "450px",
      //     display: "flex",
      //     flexDirection: "column",
      //     flexWrap: "wrap",
      //   }}
      style={{
        width: "960px",
        zIndex: "3",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: "white",
      }}
    >
      {HoverLinks.map((arg) => {
        if (arg.id === hover.id) {
          return arg.Links.map((arg1) => {
            return (
              <div
                className="flex flex-col flex-wrap mb-2 cursor-default "
                key={arg1.id || arg1.Title}
                // onClick={() => {
                //   setHover({ state: false, id: null });
                //   setType && setType({ type: "hidden" });
                //   window.scrollTo(0, 0);
                // }}
                onClick={() => {
                  setHover({ state: false, id: null });
                  setShow(false);
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
