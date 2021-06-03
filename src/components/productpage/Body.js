import React, { useState } from "react";
import { getMainDescription } from "../../CRUD/functions";
import renderHTML from "react-render-html";
import { RiArrowDownSFill } from "react-icons/ri";

const Body = ({ id, title, html, setHtml }) => {
  const handleClick = async () => {
    await getMainDescription({ productId: id })
      .then((res) => setHtml(res.data.description))
      .catch((err) => {
        console.log(err);
        setHtml(
          `<div className="text-black text-center text-3xl">Nu exista descriere!</div>`
        );
      });
  };
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col mr-96">
        <div
          className=" my-10"
          style={{
            width: "800px",
            overflow: "scroll",
            overflowY: "hidden",
          }}
        >
          <span className="text-2xl text-gray-700">
            Descriere <br />
          </span>
          <span className="flex justify-center mt-4   text-lg text-black font-semibold flex-wrap mx-4">
            {!html && title}
          </span>
          <span className="flex justify-center items-center text-6xl mb-12 mt-2 text-blue-500 cursor-pointer">
            {!html && <RiArrowDownSFill onClick={() => handleClick()} />}
          </span>
          {html && renderHTML(html)}
        </div>

        {!html && (
          <span
            onClick={() => handleClick()}
            className="text-xs font-bold text-blue-500 flex items-center ml-24 mt-2 cursor-pointer"
          >
            Vezi mai mult
            <RiArrowDownSFill />
          </span>
        )}
      </div>
    </div>
  );
};

export default Body;
