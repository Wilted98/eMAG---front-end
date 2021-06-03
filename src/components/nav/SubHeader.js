import React, { useState, useEffect } from "react";
import { FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

//
import MainBar from "../../components/main/MainBar";

//

const links = [
  { lname: "eMAG Genius", target: "/" },
  { lname: "Resigilate", target: "/" },
  { lname: "Necesare zi de zi", target: "/" },
  { lname: "Extra-reducerile momentului", target: "/" },
  { lname: "Tazz by eMAG", target: "/" },
];

function SubHeader() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   path === "/" && setShow(true);
  // }, [path]);
  // useEffect(() => {
  //   burger === "on" &&
  //     dispatch({ type: BURGER_OFF, payload: { burger: "off" } });
  // }, []);
  // <div
  //       //Mic artificiu -- un div gol ca sa dai hover.
  //       className=" w-24 h-7 absolute cursor-pointer"
  //       style={{ top: "85px", left: "68px" }}
  //       onMouseEnter={() => {
  //         setType({ type: "absolute" });
  //       }}
  //       // onMouseLeave={() => setType("hidden")}
  //     ></div>
  //     <div>
  //       <MainBar type={type.type} setType={setType} />
  //     </div>
  return (
    <div
      className=" w-full flex justify-center"
      style={{
        background:
          "linear-gradient(to right,#ff1d25 5%,#a0328c 35%,#7040a4 45%,#4359c7 55%,#0082e6 70%)",
      }}
    >
      <div className="" style={{ width: "1350px" }}>
        <div className="flex items-center p-0.5 h-10 justify-between">
          <div
            className="flex items-center justify-center mt-3"
            // style={{ marginRight: "292px" }}
          >
            {/* <div className="">
              <p className="ml-16 flex border border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded text-black bg-white">
                <GiHamburgerMenu className="w-4 h-4 mt-1" />
                <span className="text-base p-0 m-0 ml-2">Produse</span>
              </p>
            </div> */}
            <div
              onMouseEnter={() => {
                // setType({ type: "absolute" });
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
              className="relative ml-16 mb-3 flex border border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded text-black bg-white"
            >
              <span className="flex items-center">
                <GiHamburgerMenu className="w-4 h-4 mt-1" />
              </span>
              <span className="text-base p-0 m-0 ml-2">Produse</span>
              {location.pathname === "/" && (
                <span
                  style={{ left: "-1px", bottom: "-7px" }}
                  className="bg-white w-100 h-2 z-40 absolute"
                ></span>
              )}
              {show && (
                <>
                  <span
                    style={{ left: "-1px", bottom: "-7px" }}
                    className="bg-white w-100 h-2 z-40 absolute"
                  ></span>
                  <div
                    style={{ top: "34px", left: "-1px" }}
                    className="absolute z-10 w-full"
                  >
                    <MainBar setShow={setShow} />
                  </div>
                </>
              )}
            </div>

            {links.map((arg, index) => {
              return (
                <div key={index} className="mb-3">
                  <Link
                    className="ml-4  flex flex-wrap text-xs border border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded-full text-white hover:text-white"
                    to={arg.target}
                  >
                    {arg.lname}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex px-16 mt-3 justify-center items-center ml-12">
            <p className="border flex text-xs border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded-full text-white">
              <FaHeadset className="text-white text-xl mr-2" />
              eMAG Help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubHeader;

// <div className="">
//         <div className="flex justify-between items-center">
//           <div className="flex mr-72">
//             <div className="relative">
//               <p className="ml-16 flex border border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded text-black bg-white">
//                 <GiHamburgerMenu className="w-4 h-4 mt-1" />
//                 <span className="text-base p-0 m-0 ml-2">Produse</span>
//               </p>
//             </div>
//             {links.map((arg, index) => {
//               return (
//                 <div key={index} className="mb-3">
//                   <Link
//                     className="ml-4  flex flex-wrap text-xs border border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded-full text-white hover:text-white"
//                     to={arg.target}
//                   >
//                     {arg.lname}
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex px-16 mt-3 justify-center items-center 2xl:mr-16">
//             <p className="border flex text-xs border-1 border-opacity-0 hover:border-opacity-100 cursor-pointer border-white px-2 py-0.5 rounded-full text-white">
//               <FaHeadset className="text-white text-xl mr-2" />
//               eMAG Help
//             </p>
//           </div>
//         </div>
//       </div>
