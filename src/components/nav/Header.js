import React, { useState } from "react";
import Logo from "./header.components/Logo";
import SearchBar from "./header.components/SearchBar";
import MyAccount from "./header.components/MyAccount";
import Favorites from "./header.components/Favorites";
import Cart from "./header.components/Cart";
import StickyBar from "./header.components/StickyBar";
import { useSelector, useDispatch } from "react-redux";
import { BURGER_OFF } from "../../redux/propDrilling/prop-types";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state);
  const [stickyBar, setStickyBar] = useState(false);
  const dispatch = useDispatch();
  const burgerState = useSelector((state) => ({ ...state.propsD }));
  // const burger = useSelector((state) => state.propsD.burger);

  React.useEffect(() => {
    let burgChange = false;
    const event = window.addEventListener("scroll", () => {
      if (window.scrollY > 480 && burgChange === false) {
        setStickyBar(true);
        burgChange = true;
      } else if (window.scrollY < 480 && burgChange === true) {
        dispatch({
          type: BURGER_OFF,
          payload: { ...burgerState, burger: "off", burgerButton: "off" },
        });
        setStickyBar(false);
        burgChange = false;
      }
    });
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-center w-full  ${
          stickyBar ? "fixed top-0 z-10 bg-white" : "h-20 "
        }`}
      >
        <Logo stickyBar={stickyBar} />
        <SearchBar stickyBar={stickyBar} />
        <MyAccount stickyBar={stickyBar} />
        <Favorites stickyBar={stickyBar} />
        <Cart stickyBar={stickyBar} />
      </div>
      {user.user === null && <StickyBar />}
      {stickyBar && (
        <div
          className="h-0.5 w-full fixed top-16 "
          style={{
            background:
              "linear-gradient(to right,#ff1d25 5%,#a0328c 35%,#7040a4 45%,#4359c7 55%,#0082e6 70%)",
            zIndex: "9",
          }}
        ></div>
      )}
    </>
  );
};

export default Header;
