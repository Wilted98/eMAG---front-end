import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const links = [
  { lName: "Cont Client eMAG" },
  { lName: "Date cu caracter personal" },
  { lName: " ANPC" },
  { lName: " eMAG foloseste cookie-uri" },
];

const LastLogin = ({ email }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(() => setError(true));
    } else {
      setError(true);
    }
  };
  const handleChange = (e) => {
    setError(false);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
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
          <a
            href="/login"
            className="bg-gray-300 px-3 py-1 text-xs font-semibold text-blue-500"
          >
            Inapoi
          </a>
          <p className="text-gray-400 text-3xl text-center text-md mt-6">
            Salut!
          </p>
          <div className="w-full flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex justify-center text-gray-400 mb-8">{email}</div>
          <p className="text-base font-semibold text-center">
            Introdu parola contului tau eMAG
          </p>
          <form>
            <div className="w-full flex justify-center">
              <input
                type="password"
                className="w-79 px-4  py-2 border border-gray-300 rounded-full focus:outline-none"
                required
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </div>
            {error && (
              <p className="text-red-600 ml-10 text-sm">
                Ai introdus greșit parola sau adresa de email.
                <br /> Te rugăm completează din nou.
              </p>
            )}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-white font-semibold bg-blue-500 hover:bg-blue-600 p-1.2 px-32 mt-4 mb-4 py-2 flex border border-gray-300 rounded-full  focus:outline-none"
                onClick={(e) => handleClick(e)}
              >
                Continuă
              </button>
            </div>
          </form>
          <div className="mt-3 mb-4 flex justify-between">
            <label className="ml-7">
              <input type="checkbox" required></input>
              <Link to="/login" className="text-md ml-2">
                Tine-ma minte
              </Link>
            </label>
            <button onClick={(e) => handleEmail(e)}>
              <Link to="/forgot-password" className="text-md ml-2 mr-6">
                Ai uitat parola?
              </Link>
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

export default LastLogin;
