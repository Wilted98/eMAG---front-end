import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import DropDownMyAcc from "./dropdown/DropDownMyAcc";
import { useSelector } from "react-redux";
import DropDownWhenLogged from "./dropdown/DropDownWhenLogged";
import randomColor from "randomcolor";

const MyAccount = ({ stickyBar }) => {
  const [hover, setHover] = useState(false);
  const state = useSelector((state) => state);
  const history = useHistory();
  let name = "";
  if (state.user.name) {
    localStorage.removeItem("displayName");
    name = state.user.name
      .match(/\b(\w)/g)
      .join("")
      .toUpperCase();
  }
  const drop = () => {
    setHover(true);
  };
  const dropDown = () => {
    return <DropDownMyAcc drop={drop} stickyBar={stickyBar} />;
  };
  const dropWhenLogged = () => {
    return <DropDownWhenLogged drop={drop} stickyBar={stickyBar} />;
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mr-8 ml-4 h-full flex cursor-pointer justify-center items-center"
    >
      {!name ? (
        <UserOutlined
          className="text-2xl mr-2"
          style={{ color: "rgb(59, 130, 246)" }}
        />
      ) : state.user.profileImage ? (
        <img
          onClick={() => history.push("/user/history")}
          src={state.user.profileImage}
          className="w-8 h-8 rounded-full mr-1 flex justify-center items-center overflow-hidden object-cover"
        />
      ) : name ? (
        <div
          onClick={() => history.push("/user/history")}
          style={{ background: randomColor({ luminosity: "dark" }) }}
          className="w-8 h-8 rounded-full mr-1 text-white text-base flex justify-center items-center overflow-hidden"
        >
          {name[0]}
          {name[1] ? name[1] : ""}
        </div>
      ) : null}
      <p className="hidden xl:block text-md text-gray-600 mt-5">
        <Link
          to={`${state.user.token ? "/user/history" : "/login"}`}
          className="text-gray-600"
        >
          Contul Meu
        </Link>
      </p>
      <svg
        className="w-4 h-4 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill=""
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      {/* !name && hover && dropDown() */}
      {hover && (!name ? dropDown() : dropWhenLogged())}
    </div>
  );
};

export default MyAccount;
