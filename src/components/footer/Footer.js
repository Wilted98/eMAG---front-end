import React from "react";
import { Link } from "react-router-dom";
import { links } from "./footer_links";
import maestro_logo from "./footer_logo/maestro-seeklogo.com.svg";
import master_logo from "./footer_logo/mc_symbol.svg";
import visa_logo from "./footer_logo/visa-seeklogo.com.svg";
import ve_logo from "./footer_logo/visa-electron.svg";
import { AiFillGithub } from "react-icons/ai";
import logo1 from "./footer_logo/2.png";
import logo2 from "./footer_logo/3.png";

const Footer = () => {
  return (
    <div className="bg-gray-300 mt-6 flex flex-col items-center justify-center">
      <div className="w-full flex justify-center"></div>
      <div className="text-2xl text-gray-800 mb-6 mt-12">Noutati</div>
      <div className="flex flex-col items-center justify-center overflow-hidden object-cover">
        <div
          className="flex items-center justify-between overflow-hidden  object-cover"
          style={{ width: "1210px" }}
        >
          <img
            className="rounded-xl mr-2 h-56"
            src="https://s13emagst.akamaized.net/layout/ro/images/db//61/91543.jpg"
            alt="fck"
          />
          <img
            className="rounded-xl mr-2 h-56"
            src="https://s13emagst.akamaized.net/layout/ro/images/db//63/93752.jpg"
            alt="fck"
          />
          <img
            className="rounded-xl mr-2 h-56"
            src="https://s13emagst.akamaized.net/layout/ro/images/db//61/90779.jfif"
            alt="fck"
          />
          <img
            className="rounded-xl mr-2 h-56"
            src="https://s13emagst.akamaized.net/layout/ro/images/db//61/91553.jpg"
            alt="fck"
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-full overflow-hidden mt-20 ">
        <div className="relative">
          <img src={logo1} alt="fck" />
          <div className="absolute right-44 w-1/2 top-10">
            <span className="text-3xl font-semibold text-white flex flex-wrap overflow-hidden">
              {" "}
              Abonează-te la newsletter eMAG și află de reducerile cu timp
              limitat!
            </span>
            <span className="text-white text-xs">
              Prin abonarea la newsletter-ul eMAG confirm că am peste 16 ani.
            </span>
            <span className="w-full flex mt-6">
              <input
                placeholder="Nume"
                type="text"
                className="px-3 w-56 py-1.2 text rounded-full focus:outline-none mr-5"
              />
              <input
                placeholder="Email"
                type="text"
                className="px-3 w-56 py-1.2 text rounded-full focus:outline-none mr-5"
              />
              <button
                className="px-3 invisible lg:visible w-60 py-1.2 text rounded-full focus:outline-none text-white"
                style={{ background: "#ef2809" }}
              >
                Aboneaza-ma
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full my-6 flex items-center justify-center mt-8">
        <div className="relative">
          <img src={logo2} alt="fck" />
          <button className="absolute flex invisible lg:visible text-white border-2 border-red-600  items-center justify-center hover:bg-white hover:text-red-600 hover:border-white rounded-full py-2 px-20 left-6 bottom-11 focus:outline-none">
            Vreau sa vand pe eMAG
          </button>
        </div>
      </div>

      <div className=" h-28 bg-white shadow-2xl flex border border-gray-200 w-full justify-center">
        <div className="">
          <p className="text-black text-base font-bold mt-6">
            Descarcă aplicația eMAG
          </p>
          <p className="text-xs mt-0">
            Lasă-ne numărul tău de telefon și îți vom trimite link-ul de
            download.
          </p>
        </div>
        <div className="flex items-center justify-center ml-5">
          <form>
            <input
              className="rounded-l outline-none border border-gray-300 px-2 py-1.5 w-72 focus:border-blue-400"
              type="text"
              placeholder="07xxxxxxxx"
            />
          </form>
          <button className="bg-blue-700 px-2 text-white text-base rounded-r h-9 focus:outline-none">
            Trimite SMS
          </button>
        </div>
        <div className="flex justify-center items-center ml-32">
          <img
            src="https://s13emagst.akamaized.net/assets/ro/images/google-play-badge.svg"
            className="mr-4 cursor-pointer w-30 h-9"
            alt="fuck"
          />
          <img
            src="https://s13emagst.akamaized.net/assets/ro/images/apple-store-badge.svg"
            className="mr-12 cursor-pointer w-30 h-9"
            alt="fuck"
          />
        </div>
      </div>

      <div className=" h-88 bg-gray-200 w-full flex flex-col items-center">
        <div className="flex">
          {links.map((arg, index) => {
            return (
              <div key={index} className="ml-28 mr-14">
                <p className="mt-4 text-lg text-blue-700 cursor-pointer">
                  {arg.title}
                </p>
                <div className="flex flex-col">
                  {arg.link.map((arg1, index) => {
                    return (
                      <div className="mb-2" key={index}>
                        <Link
                          to={arg1.target}
                          className="text-xs text-gray-500 hover:text-gray-500 hover:underline"
                        >
                          {arg1.name} <br />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="justify-start flex">
          <img src={master_logo} style={{ width: "2.5em" }} alt="fuck" />
          <img src={maestro_logo} style={{ width: "2em" }} alt="fuck" />
          <img
            src={visa_logo}
            style={{ width: "2em", marginLeft: "2.5px" }}
            alt="fuck"
          />
          <img
            src={ve_logo}
            style={{ width: "2em", marginLeft: "2.5px" }}
            alt="fuck"
          />
        </div>
        <div className="mt-6 tracking-tight flex items-center justify-center text-gray-400">
          Created by Popescu Vasilică
          <Link to="/" className="flex items-center justify-center">
            <AiFillGithub className="h-5 w-5 text-gray-500 ml-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

{
  /*  */
}
