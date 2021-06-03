import React from "react";
import { Link, Redirect } from "react-router-dom";
import Burger from "./Burger";

const Logo = ({ stickyBar }) => {
  return (
    <div className="h-full ml-5 flex items-center justify-center mb-4">
      {stickyBar && <Burger />}
      <Link to="/">
        <img
          src="https://s13emagst.akamaized.net/layout/ro/images/logo//59/88362.svg"
          alt="emag"
          className="w-40 h-9 mt-3 "
        />
      </Link>
    </div>
  );
};

export default Logo;
