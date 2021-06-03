import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../CRUD/functions";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const handleClick = async (e) => {
    e.preventDefault();
    if (name.length > 1 && name !== "" && title.length > 1 && title !== "") {
      await createCategory(user.token, name, title)
        .then(() => {
          window.alert(`Categoria ${name} a fost creata!`);
          setName("");
          setTitle("");
          loadCategories();
        })
        .catch(() => window.alert("Eroare la creeare categoriei!"));
    }
  };

  const loadCategories = async () => {
    await getCategories()
      .then((arg) => setCategories(arg.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleRemove = async (slug, name) => {
    if (window.confirm("Delete?")) {
      await removeCategory(slug, user.token)
        .then(() => {
          window.alert(`Categoria ${name} a fost stearsa!`);
          loadCategories();
        })
        .catch(() => window.alert("Eroare la stergerea categoriei!"));
    }
  };
  return (
    <>
      <div className="flex">
        <AdminNav className="w-1/3" />

        <div className=" flex flex-col items-center justify-center mt-3 w-11/12 mb-4">
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin my-4"
            type="text"
            placeholder="Introdu numele categoriei..."
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
          />
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin mb-4"
            type="text"
            placeholder="Introdu titlul categoriei..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
          <button
            className="focus:outline-none text-base tracking-tight text-white bg-blue-500 rounded-full w-48 h-10 ml-2"
            onClick={(e) => handleClick(e)}
          >
            Creeaza!
          </button>
        </div>
      </div>
      {categories.map((arg) => {
        return (
          <div key={arg._id} className="flex items-center justify-center">
            <div className="bg-gray-300 w-60 mt-2 p-1.2 text-base text-black rounded-lg">
              {arg.name}
            </div>
            <div className="bg-blue-500 hover:bg-blue-700 cursor-pointer mt-2 w-8 h-8 flex items-center justify-center text-base">
              <FiEdit2 className="text-red-500 " />
            </div>
            <div
              onClick={() => handleRemove(arg.slug, arg.name)}
              className="bg-blue-500 hover:bg-blue-700 cursor-pointer mt-2 w-8 h-8 flex items-center justify-center text-base border-l border-gray-400"
            >
              <RiDeleteBin3Line className="text-red-500 " />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CreateCategory;
