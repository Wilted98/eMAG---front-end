import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import { createProduct } from "../../../CRUD/functions";
import { useSelector } from "react-redux";
import { getCategories } from "../../../CRUD/functions";
import FileUpload from "./FileUpload";

const initialState = {
  title: "",
  description: "",
  oldPrice: "",
  price: "",
  categories: [],
  category: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Alb", "Negru", "Argintiu", "Albastru", "Rosu", "Verde", "Gri"],
  brands: [
    "Lenovo",
    "Apple",
    "Huawei",
    "Samsung",
    "LG",
    "HP",
    "Dell",
    "ASUS",
    "Acer",
    "Razer",
  ],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const {
    title,
    description,
    oldPrice,
    price,
    categories,
    category,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(user.token, values)
      .then(() => {
        window.alert("Produs creat cu succes!");
        window.location.reload();
      })
      .catch((err) => window.alert(`Produsul nu a putut fi creat! ${err}`));
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadCategories = async () => {
    await getCategories().then((arg) => {
      setValues({ ...values, categories: arg.data });
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="flex ">
      <AdminNav />
      <div className="w-full flex flex-col items-center justify-center ">
        <span className="text-2xl text-black">Creeaza produs</span>
        <FileUpload values={values} setValues={setValues} />
        <form
          onSubmit={handleSubmit}
          className="mt-5 w-full flex flex-col items-center justify-center"
        >
          <label>Titlu</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="title"
            placeholder="Titlu..."
            value={title}
            onChange={handleChange}
          />
          <label>Descriere</label>
          <input
            name="description"
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            placeholder="Descriere..."
            value={description}
            onChange={handleChange}
          />
          <label>Pretul Vechi</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="oldPrice"
            placeholder="Pretul Vechi..."
            value={oldPrice}
            onChange={handleChange}
          />
          <label>Pretul Actual</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="price"
            placeholder="Pretul Actual..."
            value={price}
            onChange={handleChange}
          />
          <label>Transport</label>
          <select
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            name="shipping"
            onChange={handleChange}
          >
            <option value="Nu">Nu</option>
            <option value="Da">Da</option>
          </select>
          <label>Cantitate</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="quantity"
            placeholder="Cantitate..."
            value={quantity}
            onChange={handleChange}
          />
          <label>Culoare</label>
          <select
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            name="color"
            onChange={handleChange}
          >
            {colors.map((arg) => {
              return (
                <option key={arg} value={arg}>
                  {arg}
                </option>
              );
            })}
          </select>
          <label>Brand</label>
          <select
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            name="brand"
            onChange={handleChange}
          >
            {brands.map((arg) => {
              return (
                <option key={arg} value={arg}>
                  {arg}
                </option>
              );
            })}
          </select>
          <label>Categoria</label>
          <select
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            name="category"
            onChange={handleChange}
          >
            <option>Selecteaza</option>
            {categories.map((arg) => {
              return (
                <option key={arg._id} value={arg._id}>
                  {arg.name}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="focus:outline-none text-base tracking-tight text-white bg-blue-500 rounded-full w-48 h-10 mt-2"
          >
            Creeaza!
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;

/*<div className="mt-5 w-full flex flex-col items-center justify-center">
          <span className="text-base text-gray-500 mb-2">Titlu</span>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            placeholder="Titlu..."
            autoFocus
          />
        </div>
        <div className="mt-5 w-full flex flex-col items-center justify-center">
          <span className="text-base text-gray-500 mb-2">Descriere</span>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            placeholder="Descriere..."
          />
        </div>
        <div className="mt-5 w-full flex flex-col items-center justify-center">
          <span className="text-base text-gray-500 mb-2">Pret</span>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            placeholder="Pret..."
          />
        </div> */
