import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="flex-col ml-3 mt-4 ">
      <div className="my-3 text-harlequin text-lg  border-2 border-red-600  hover:border-black w-60 p-1.2 flex justify-center items-center">
        <Link to="/admin/create-category">Creeaza Categorie Noua</Link>
      </div>
      <div className="my-3 text-harlequin text-lg  border-2 border-red-600  hover:border-black w-60 p-1.2 flex justify-center items-center">
        <Link to="/admin/create-product" className="">
          Creeaza Produs
        </Link>
      </div>
      <div className="my-3 text-harlequin text-lg  border-2 border-red-600  hover:border-black w-60 p-1.2 flex justify-center items-center">
        <Link to="/admin/edit-description" className="">
          Adauga Descriere a Produsului
        </Link>
      </div>
      <div className="my-3 text-harlequin text-lg  border-2 border-red-600  hover:border-black w-60 p-1.2 flex justify-center items-center">
        <Link to="/admin/add-specs" className="">
          Adauga Specificatiile Produsului
        </Link>
      </div>
      <div className="my-3 text-harlequin text-lg  border-2 border-red-600  hover:border-black w-60 p-1.2 flex justify-center items-center">
        <Link to="/admin/coupon" className="">
          Cupoane
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
