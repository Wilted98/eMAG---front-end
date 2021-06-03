import React from "react";
import { Link } from "react-router-dom";
import { ImUser } from "react-icons/im";
import { AiOutlineDoubleRight } from "react-icons/ai";

function DropDownMyAcc({ drop, stickyBar }) {
  return (
    <div
      onMouseEnter={() => drop()}
      className="absolute w-80 right-80 border-2 border-gray-200 bg-white rounded-lg z-40"
      style={{ top: stickyBar ? 60 : 70 }}
    >
      <div className="flex">
        {/* <svg
          className="w-16 h-16 px-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg> */}
        <ImUser className="w-16 h-16 px-2 text-blue-700" />
        <p className="text-xs mt-4">
          Intra in contul tau eMAG si ai control complet asupra ofertelor!
        </p>
      </div>
      <div className="bg-gray-100 flex border-t-2 border-gray-200 py-2">
        <Link to="/login">
          <div className="flex bg-blue-500 hover:bg-blue-400 mb-2 p-1 ml-2 rounded-lg">
            {/* <svg
              className="w-4 h-4 mt-1 bg-red-500 hover:bg-red-700 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg> */}
            <AiOutlineDoubleRight className="w-6 h-6 bg-red-600 rounded text-white shadow-2xl" />
            <button className="text-white pl-2 font-semibold pointer-events-none">
              Intra in Cont
            </button>
          </div>
        </Link>
        <button className="ml-4 text-blue-500 mb-2 focus:outline-none">
          <Link to="/login" className="hover:underline hover:text-blue-800">
            Cont nou
          </Link>
        </button>
      </div>
    </div>
  );
}

export default DropDownMyAcc;
