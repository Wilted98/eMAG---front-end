import React from "react";
import logo from "./404.gif";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) history.push("/");
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="border border-gray-300 rounded-lg w-4/5 mx-auto mt-16">
      <div className="flex mt-3 ml-2">
        <p className="bg-red-600 w-20 text-white flex items-center justify-center">
          Eroare 404
        </p>
        <p className="text-xl  text-gray-700 font-semibold">
          Aceasta pagina a fost mutata sau nu mai exista!
        </p>
      </div>
      <p className="flex ml-2 text-gray-500">
        In {count} secunde vei fi redirectionat catre
        <Link to="/" className="font-bold text-blue-400 ml-1 ">
          prima pagina
        </Link>
        .
      </p>
      <div className="w-full flex items-center justify-center">
        <img src={logo} alt="fuck" />
      </div>
    </div>
  );
};

export default ErrorPage;
