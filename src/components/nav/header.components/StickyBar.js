import React from "react";
import { Link } from "react-router-dom";

const StickyBar = () => {
  return (
    <div className="h-20 w-full left-0 bg-black opacity-90 fixed z-20 flex bottom-0">
      <div className="ml-16 mt-2">
        <span className="text-white font-bold m-0 p-0 tracking-wide">
          Salveaza-ti optiunea
          <br />
        </span>
        <span className="text-white  text-base m-0 p-0 tracking-tight leading-none">
          Cu o simpla autentificare, scapi si de notificare :) Promitem sa nu-ti
          mai afisam acest mesaj. Dureaza doar cateva secunde sa intri in cont.
          La final te vom redirectiona <br />
          <span className="mt-0 leading-none">in aceasta pagina.</span>
        </span>
      </div>
      <div>
        <button
          className="py-1.5  mx-5 px-3 text-white mt-5 text-base animate hover:bg-blue-900"
          style={{ background: "#005eb8" }}
        >
          <Link to="/login" className="hover:text-white text-white">
            Intra in cont
          </Link>
        </button>
      </div>
    </div>
  );
};

export default StickyBar;
