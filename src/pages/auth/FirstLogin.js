import React from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";

const FirstLogin = ({ setEmail, handleSubmit }) => {
  // const fbLogin = async (e) => {
  //   await auth
  //     .signInWithPopup(fbprovider)
  //     .then(async (result) => {
  //       const { user } = result;
  //       const idTokenResult = await user.getIdTokenResult();
  //       dispatch({
  //         type: LOGGED_IN_USER,
  //         payload: {
  //           email: user.email,
  //           token: idTokenResult.token,
  //           name: user.displayName,
  //         },
  //       });
  //       history.push("/");
  //     })
  //     .catch((err) => console.log(err));
  // };

  const links = [
    { lName: "Cont Client eMAG" },
    { lName: "Date cu caracter personal" },
    { lName: " ANPC" },
    { lName: " eMAG foloseste cookie-uri" },
  ];

  const googleLogin = async (e) => {
    e.preventDefault();
    await auth.signInWithPopup(provider).then().catch();
  };
  return (
    <div className="bg-gray-50 w-full h-screen">
      <div className="w-full flex justify-center pt-8 pb-6">
        <Link to="/">
          <img
            src="https://s13emagst.akamaized.net/layout/ro/images/logo//59/88362.svg"
            alt="emag"
            className="w-40 h-9 mt-3 "
          />
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="bg-white w-96 border-1 border-gray-500 shadow-2xl">
          <p className="text-gray-400 text-3xl text-center text-md mt-6">
            Salut!
          </p>
          <p className="text sm font-semibold text-center">
            Introdu adresa de email
          </p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full flex justify-center">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-79 px-4  py-2 border border-gray-300 rounded-full focus:outline-none"
                required
                autoFocus
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-white font-semibold bg-blue-500 hover:bg-blue-600 p-1.2 px-32 mt-4 mb-4 py-2 flex border border-gray-300 rounded-full  focus:outline-none"
              >
                <span className="text-base">Continuă</span>
              </button>
            </div>
          </form>
          <div className="text-center">
            Nu ai cont? Nu-ți face griji!
            <br /> Poți crea unul in pasul următor.
          </div>
          <div className="text-center text-base text-gray-400 mt-4">
            <div className="flex items-center justify-center">
              <div className="w-36 h-0.1 bg-gray-200 mr-1.5"></div>
              sau
              <div className="w-36 h-0.1 bg-gray-200 ml-1.5"></div>
            </div>
            intră în cont cu
          </div>
          <div className="w-full flex justify-center">
            <button
              className="text-white  relative font-semibold bg-blue-800 hover:bg-blue-900 p-1.2 px-32 mt-4 mb-1 py-2.5 flex border border-gray-300 rounded-full  focus:outline-none"
              onClick={(e) => googleLogin(e)}
            >
              <FaFacebookF className="absolute right-72 text-lg mr-2" />
              <div className="bg-gray-500 w-0.1 h-6 absolute right-72 mb-1 -mr-1"></div>
              <span className="px-1.5">Facebook</span>
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button
              style={{ background: "#cf553d" }}
              className="text-white relative font-semibold px-32 mt-4 mb-1 py-2.5 flex border border-gray-300 rounded-full  focus:outline-none"
              onClick={(e) => googleLogin(e)}
            >
              <AiOutlineGoogle className="absolute right-72 text-lg mr-1.5" />
              <div className="bg-gray-500 w-0.1 h-6 absolute right-72 mb-1 -mr-1"></div>
              <span className="px-3">Google</span>
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="text-white relative font-semibold bg-black p-1.2 px-36 mt-4 mb-4 py-2 flex border border-gray-300 rounded-full  focus:outline-none"
              onClick={(e) => googleLogin(e)}
            >
              <FaApple className="absolute right-72 text-lg mr-1.5" />
              <div className="bg-gray-600 w-0.1 h-6 absolute right-72 mb-1 -mr-1"></div>
              Apple
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <button className="text-base font-medium text-blue-500 focus:outline-none">
          Ai nevoie de ajutor?
        </button>
      </div>
      <div className="w-full flex justify-center my-4">
        {links.map((arg, index) => {
          return (
            <div key={index}>
              <button className="text-sm font-semibold text-gray-600 focus:outline-none">
                {arg.lName}
              </button>
              <span className="font-semibold text-lg text-gray-500 mx-2">
                l
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FirstLogin;

/* <button className="text-sm font-semibold text-gray-600 focus:outline-none">
          Cont Client eMAG
        </button>
        <span className="font-semibold text-lg text-gray-500 mx-2">l</span>
        <button className="text-sm font-semibold text-gray-600 focus:outline-none">
          Date cu caracter personal
        </button>
        <span className="font-semibold text-lg text-gray-500 mx-2">l</span>
        <button className="text-sm font-semibold text-gray-600 focus:outline-none">
          ANPC
        </button>
        <span className="font-semibold text-lg text-gray-500 mx-2">l</span>
        <button className="text-sm font-semibold text-gray-600 focus:outline-none">
          eMAG foloseste cookie-uri
        </button> */
