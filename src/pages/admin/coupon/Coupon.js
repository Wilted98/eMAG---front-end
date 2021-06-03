import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import {
  createCoupon,
  removeCoupon,
  listCoupons,
} from "../../../CRUD/functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";

const Coupon = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState(new Date());
  const [coupons, setCoupons] = useState([]);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCoupon({ name, discount, expiry }, token)
      .then(() => {
        toast.success("Cupon Creat!");
        setName("");
        setDiscount(0);
      })
      .catch((err) => toast.error(err));
    getCupons();
  };
  const getCupons = async () => {
    await listCoupons()
      .then((res) => setCoupons(res.data))
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    getCupons();
  }, []);
  const removeCoupons = async (cuponId) => {
    await removeCoupon(cuponId, token)
      .then(() => toast.success("Cupons Sters"))
      .catch((err) => toast.error(err));
    getCupons();
  };
  return (
    <div className="flex ">
      <AdminNav />
      <div className="w-full flex flex-col items-center">
        <span className="text-2xl text-black tracking-tight">Cupon</span>
        <form
          onSubmit={handleSubmit}
          className="mt-5 w-full flex flex-col items-center justify-center"
        >
          <label>Nume Cupon</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="nume"
            placeholder="Nume Cupon..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Discount%</label>
          <input
            className="w-1/2 py-2 px-1.2 rounded-lg focus:outline-none border-2 border-red-500 focus:border-harlequin"
            type="text"
            name="discount"
            placeholder="Discount %..."
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <label>Data Expirarii</label>
          <span className="rounded border border-blue-500  p-2">
            <span className="text-black mr-2">Alege:</span>
            <DatePicker
              selected={expiry}
              onChange={(date) => setExpiry(date)}
              required
            />
          </span>

          <button
            type="submit"
            className="rounded focus:outline-none bg-harlequin text-white p-2 my-4"
          >
            Salveaza
          </button>
        </form>
        <div className="my-12">
          <div className="flex flex-col">
            <span className="m-3 p-5 flex items-center justify-around">
              <span>Nume</span>
              <span>Discount</span>
              <span>Expira la</span>
              <span>Actiune</span>
            </span>
            {coupons?.map((arg) => {
              return (
                <span
                  key={arg._id}
                  className="m-3 border border-gray p-5 flex items-center justify-around"
                >
                  <span className="mx-2">{arg.name} |</span>
                  <span className="mx-2">{arg.discount} % | </span>
                  <span className="mx-2">{arg.expiry} |</span>
                  <span
                    onClick={() => removeCoupons(arg._id)}
                    className="mx-2 cursor-pointer"
                  >
                    <BsTrash />
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
