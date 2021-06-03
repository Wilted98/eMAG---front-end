import React from "react";
import { connect } from "react-redux";
import { auth } from "../../../../firebase";
import { useHistory, Link } from "react-router-dom";

const links = [
  { lName: "Contul meu", target: "/user/history" },
  { lName: "Genius", target: "/admin/dashboard" },
  { lName: "Comenzile mele", target: "/" },
  { lName: "Cardurile mele", target: "/" },
  { lName: "Favorite", target: "/" },
  { lName: "Card eMAG Raiffesein", target: "/" },
  { lName: "Lista Supermarket", target: "/" },
  { lName: "Vocuhere & carduri cadou", target: "/" },
  { lName: "Review-urile mele", target: "/" },
  { lName: "Garantiile mele", target: "/" },
  { lName: "Retururile mele", target: "/" },
  { lName: "Service", target: "/" },
  { lName: "Date personale", target: "/" },
  { lName: "Setari siguranta", target: "/" },
  { lName: "Abonarile mele", target: "/" },
];

const DropDownWhenLogged = ({ drop, state, stickyBar }) => {
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    await auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((err) => console.log(err));
  };
  return (
    <div
      onMouseOver={drop}
      className="absolute h-auto w-48 right-80 bg-white shadow-2xl z-40"
      style={{ top: stickyBar ? 60 : 70 }}
    >
      <div className="border-b border-gray-200 flex items-center justify-center flex-wrap">
        <p className="text-sm font-bold mr-4 my-2 flex flex-wrap items-center justify-center">
          Salut, {state.user.name.toUpperCase()}
        </p>
      </div>
      <div className="flex-col h-full">
        {links.map((arg, index) => {
          return (
            <div key={index} className="my-2 mx-1.5 w-full">
              <Link
                to={arg.target}
                key={indexedDB}
                className=" text-gray-600 text-xs tracking-normal hover:text-gray-600 hover:underline"
              >
                {arg.lName}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-200 mb-1">
        <button
          className="text-xs ml-2 mt-4  focus:outline-none hover:bg-gray-200"
          onClick={(e) => handleClick(e)}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { state: state };
};

export default connect(mapStateToProps)(DropDownWhenLogged);
