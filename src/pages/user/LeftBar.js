import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Links = [
  {
    id: 1,
    name: "Contul meu",
    link: "/user/history",
  },
  {
    id: 2,
    name: "Genius",
    link: "/user/history",
  },
  {
    id: 3,
    name: "Comenzile mele",
    link: "/user/history",
  },
  {
    id: 4,
    name: "Cardurile mele",
    link: "/user/history",
  },
  {
    id: 5,
    name: "Favorite",
    link: "/user/history",
  },
  {
    id: 6,
    name: "Card eMAG Raiffesein",
    link: "/user/history",
  },
  {
    id: 7,
    name: "Lista Supermarket",
    link: "/user/history",
  },
  {
    id: 8,
    name: "Vouchere & carduri",
    link: "/user/history",
  },
  {
    id: 9,
    name: "Review-urile mele",
    link: "/user/history",
  },
  {
    id: 10,
    name: "Garantiile mele",
    link: "/user/history",
  },
  {
    id: 11,
    name: "Retururile mele",
    link: "/user/history",
  },
  {
    id: 12,
    name: "Service",
    link: "/user/history",
  },
  {
    id: 13,
    name: "Date personale",
    link: "/user/history",
  },
  {
    id: 14,
    name: "Setari siguranta",
    link: "/user/history",
  },
  {
    id: 15,
    name: "Abonarile mele",
    link: "/user/history",
  },
];

const LeftBar = () => {
  const [active, setActive] = useState("");
  return (
    <div className="w-1/5 bg-white flex flex-col ">
      {Links.map((arg) => {
        return (
          <span
            className="flex justify-center"
            onClick={() => setActive(arg.id)}
            key={arg.id}
          >
            <div
              style={{ fontSize: "15px", lineHeight: "20px" }}
              className={`${
                arg.id === active
                  ? "text-gray-500"
                  : "text-blue-600 hover:text-blue-800"
              } w-4/5 flex justify-between my-1.5 font-medium items-center border-b border-gray-100 pb-1 cursor-pointer`}
            >
              {arg.name}
              {arg.id === active && <IoIosArrowForward className="text-xl" />}
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default LeftBar;
