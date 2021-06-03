import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

const links = [
  { lName: "Cont Client eMAG" },
  { lName: "Date cu caracter personal" },
  { lName: " ANPC" },
  { lName: " eMAG foloseste cookie-uri" },
];

const ForgotPassword = () => {
  const history = useHistory();
  const email = localStorage.getItem("email");
  const actionCodeSettings = {
    url: `${process.env.REACT_APP_HOST}/login`,
  };
  useEffect(() => {
    if (email) {
      try {
        const data = async () =>
          await auth
            .sendPasswordResetEmail(email, actionCodeSettings)
            .then(() => {
              localStorage.removeItem("email");
            })
            .catch((err) => console.log(err));
        data();
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/404");
    }
  }, []);
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
          <div className="w-full flex justify-center">
            <BiUserCircle className="text-9xl text-gray-400" />
          </div>
          <div className="flex justify-center text-gray-400 mb-8">{email}</div>
          <div className=" flex items-center justify-center">
            <AiOutlineCheckCircle className="text-5xl text-harlequin" />
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <p className="text-harlequin text-sm font-sans mb-0">
              Am trimis un email cu link-ul de resetare a parolei la
            </p>
            <p className="text-harlequin text-sm font-sans mt-0">
              adresa indicată
            </p>
          </div>
          <div className="w-full flex justify-center mb-8">
            <Link
              to="/"
              className="bg-blue-500 flex justify-center rounded-full px-4 py-2 text-base font-semibold text-white w-5/6"
            >
              <p className="p-0 m-0 text-white hover:text-white no-underline">
                Du-ma la homepage
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-36">
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

export default ForgotPassword;
