import React, { useState } from "react";
import { addSpecs } from "../../../CRUD/functions";
import { useSelector } from "react-redux";

const Specs = () => {
  const token = useSelector((state) => state.user.token);
  const [specs, setSpecs] = useState([]);
  const [title, setTitle] = useState("");
  // const [props, setProps] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [sTitle, setsTitle] = useState("");
  const [prop, setProp] = useState("");
  const [propArray, setPropArray] = useState([]);
  const [open, setOpen] = useState(true);
  const [productId, setProductId] = useState("");
  const handleProp = (e) => {
    e.preventDefault();
    setPropArray([...propArray, prop]);
    setProp("");
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setSpecification([...specification, { sTitle, spec: propArray }]);
    setsTitle("");
    setPropArray([]);
    setOpen(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setSpecs([...specs, { title, specification }]);
    setSpecification([]);
    // setSpecs([...specs, ...props]);
    // setProps([]);
    setOpen(true);
    setTitle("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSpecs({ productId, specs }, token);
  };

  return (
    <div className="flex w-full justify-around">
      <div className="flex flex-col w-1/2">
        <span className="text-black text-2xl font-semibold ml-8 mb-4">
          Adauga specs
        </span>
        {open && (
          <>
            <label className="text-xl text-black font-semibold">Title</label>
            <input
              type="text"
              value={title}
              className="focus:outline-none border border-red-500 p-1 w-1/2 rounded-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}
        <label className="text-xl text-black font-semibold">sTitle</label>
        <input
          type="text"
          value={sTitle}
          className="focus:outline-none border border-red-500 p-1 w-1/2 rounded-full"
          onChange={(e) => setsTitle(e.target.value)}
        />
        <label className="text-xl text-black font-semibold">prop</label>
        <span className="flex">
          <input
            type="text"
            value={prop}
            className="focus:outline-none border border-red-500 p-1 w-1/2 rounded-full"
            onChange={(e) => setProp(e.target.value)}
          />
          <button
            onClick={(e) => handleProp(e)}
            className="ml-3 bg-red-500 text-white font-semibold hover:bg-black rounded"
          >
            Adauga
          </button>
        </span>
        <span className="flex">
          Props:{" "}
          {propArray.length > 0 &&
            propArray.map((arg, index) => {
              return (
                <span key={index} className="mx-1">
                  {arg}
                </span>
              );
            })}
        </span>
        <span className="flex">
          <button
            onClick={(e) => handleSave(e)}
            className="bg-black text-white text-xs font-bold rounded p-2 hover:bg-purple-800"
          >
            Salveaza
          </button>
          <button
            onClick={(e) => handleAdd(e)}
            className="bg-red-500 text-white font-semibold p-1 ml-7 rounded hover:bg-harlequin"
          >
            Adauga
          </button>
        </span>
        <span className="mt-6">
          <div className="mt-10">
            Introdu id-ul produsului : <br />
            <input
              className="focus:outline-none border border-red-500 p-2"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-harlequin p-1 hover:bg-pink-700 text-white font-semibold"
          >
            Trimite
          </button>
        </span>
      </div>
      <div className="flex flex-col">
        <div className="text-black text-xl my-7 font-semibold">{title}</div>
        {specification.length > 0 &&
          specification.map((arg, index) => {
            return (
              <div key={index}>
                <div className="flex">
                  <div className="font-semibold text-black mr-4">
                    {arg.sTitle}
                  </div>
                  <div className="flex flex-col">
                    {arg.spec.map((argp, index) => {
                      return <span key={index}>{argp}</span>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Specs;

// {arg.arrayofprops.map((argp, index) => {
//   <div key={index} className="flex justify-around w-1/2">
//     <div className="font-semibold text-black mr-4">
//       {argp.sTitle}
//     </div>
//     <div className="flex flex-col">
//       {argp.properties.map((prop, index) => {
//         return <span key={index}>{prop}</span>;
//       })}
//     </div>
//   </div>;
// })}
