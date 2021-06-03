import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const links = [
  { lName: "Cont Client eMAG" },
  { lName: "Date cu caracter personal" },
  { lName: " ANPC" },
  { lName: " eMAG foloseste cookie-uri" },
];

const SecondLogin = ({ email, setPassword, name, setName }) => {
  const [match, setMatch] = useState("match");
  const [password1, setPassword1] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [checked, setChecked] = useState({ state: false, showError: false });
  const handleClick = (e) => {
    e.preventDefault();
    const regex = /[0-9]/g;
    if (regex.test(name) || name.length < 3) {
      setInvalidName(true);
    } else if (password1 !== confirmPassword) {
      setMatch("notmatch");
    } else if (checked.state === false) {
      setChecked({ state: false, showError: true });
    } else if (password1.length < 7) {
      setMatch("short");
    } else {
      setPassword(password1);
      registerAccount();
    }
  };
  const handleChange = (e) => {
    setMatch("match");
    setconfirmPassword(e.target.value);
  };
  const handleChangeName = (e) => {
    setInvalidName(false);
    setName(e.target.value);
  };
  const registerAccount = async () => {
    localStorage.setItem("displayName", name);
    // auth
    //   .createUserWithEmailAndPassword(email, password1)
    //   .then(async (result) => {
    //     await result.user.updateProfile({
    //       displayName: name,
    //     });
    //   })
    //   .catch((err) => console.log(err));
    await auth
      .createUserWithEmailAndPassword(email, password1)
      .then(async (res) => {
        await res.user
          .updateProfile({
            displayName: name,
          })
          .then(() => localStorage.removeItem("displayName"))
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
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
          <p className="text-gray-400  text-3xl text-center text-md mt-6">
            Bine ai venit!
          </p>
          <p className="text-lg font-normal text-center">
            Se pare că nu ai un cont eMAG. <br />
            Hai să iți creăm un cont nou!
          </p>
          <div className="flex justify-center text-gray-400">{email}</div>
          <div className="flex justify-center my-2 font-semibold text-base">
            Nume și prenume
          </div>
          <form>
            <div className="w-full flex justify-center">
              <input
                type="text"
                onChange={(e) => handleChangeName(e)}
                className={`w-79 px-4 ${
                  invalidName ? "border-red-600" : "border-gray-300"
                }  py-2 border rounded-full focus:outline-none`}
                required
                autoFocus
              />
            </div>
            {invalidName && (
              <div className="flex  justify-center items-center bg-red-300 mt-2 rounded">
                <p className="text-lg font-semibold text-red-600 mt-2 ">
                  Nume si prenume invalid!
                </p>
              </div>
            )}
            <div className="flex justify-center my-2 font-semibold text-base">
              Alege o parolă sigură
            </div>
            <div className="w-full flex justify-center">
              <input
                type="password"
                onChange={(e) => setPassword1(e.target.value)}
                className={`w-79 px-4 ${
                  match === "notmatch" || match === "short"
                    ? "border-red-600"
                    : "border-gray-300"
                }  py-2 border rounded-full focus:outline-none`}
                required
              />
            </div>
            {match === "notmatch" ? (
              <div className="flex  justify-center items-center bg-red-300 mt-2 rounded">
                <p className="text-lg font-semibold text-red-600 mt-2 ">
                  Parolele nu sunt identice!
                </p>
              </div>
            ) : match === "short" ? (
              <div className="flex  justify-center items-center bg-red-300 mt-2 rounded">
                <p className="text-lg font-semibold text-red-600 mt-2 ">
                  Parola trebuie sa contina cel putin 7 caractere!
                </p>
              </div>
            ) : null}
            <div className="flex justify-center my-2 font-semibold text-base">
              Confirmă parola
            </div>
            <div className="w-full flex justify-center ">
              <input
                type="password"
                onChange={(e) => handleChange(e)}
                className={`w-79 px-4 ${
                  match === "notmatch" || match === "short"
                    ? "border-red-600"
                    : "border-gray-300"
                }  py-2 border rounded-full focus:outline-none`}
                required
              />
            </div>
          </form>
          <form type="onSubmit">
            <div className="mt-3">
              <label className="ml-9 ">
                <input
                  type="checkbox"
                  className="bg-red-600"
                  onClick={() =>
                    setChecked({
                      state: !checked.state,
                      showError: false,
                    })
                  }
                  required
                ></input>
                <a href="/" className="text-xs  ml-2">
                  Am citit și sunt de acord cu Termenii și Condițiile, cu <br />
                  <span className="ml-14  ">
                    Politica de Confidențialitate.
                  </span>
                </a>
              </label>
            </div>
            {checked.showError === true && (
              <p className="text-red-600 text-xs ml-9">
                Câmpul este obligatoriu
              </p>
            )}
            <div className="mt-3">
              <label className="ml-9">
                <input type="checkbox" required></input>
                <a href="/" className="text-xs  ml-2">
                  Vreau să primesc cele mai bune oferte. Confirm că am <br />
                  <span className="ml-14  ">peste 16 ani.</span>
                </a>
              </label>
            </div>
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
        </div>
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

export default SecondLogin;
