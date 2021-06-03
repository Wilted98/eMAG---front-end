import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ExtendedSearch from "./ExtendedSearch";

const SearchBar = ({ stickyBar }) => {
  // const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    // <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
    <div className="w-600 invisible md:visible relative flex border border-blue-500 rounded-full py-1 ml-2 px-4 text-justify focus:outline-none">
      <input
        placeholder="Ai libertatea sa alegi ce vrei"
        alt="emag"
        className="w-full  mt-1 outline-none text-gray-500 text-base placeholder-gray-500 tracking-tight"
        onClick={() => setOpen(true)}
        value={""}
        onChange={() => {
          console.log("");
        }}
        tabIndex={-1}
      />
      {/* <svg
        className="w-6 h-6 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg> */}
      {/* <div className="flex w-full h-full bg-black opacity-90 z-10 top-0"></div> */}
      {/* {clicked && (
          <AiOutlineClose
            className="w-6 h-6 text-gray-400 mr-4 mt-0.5"
            onClick={() => setClicked(false)}
          />
        )} */}
      <FiSearch className="w-5 h-5 text-blue-500 mt-1 mr-0 pr-0" />
      {open && (
        <ExtendedSearch open={open} setOpen={setOpen} stickyBar={stickyBar} />
      )}
    </div>
    // </OutsideClickHandler>
  );
};

export default SearchBar;
