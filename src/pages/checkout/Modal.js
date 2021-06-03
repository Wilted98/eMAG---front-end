import React, { useState } from "react";
import { Modal } from "antd";

const ModalCheck = ({ modalVisible, setModalVisible, setAddres, addres }) => {
  let initialState = {
    name: "",
    number: "",
    addres: "",
    local: "",
    city: "",
  };
  const [state, setState] = useState(addres !== null ? addres : initialState);
  const [showError, setShowError] = useState(false);
  const handleChange = (e) => {
    if (showError) setShowError(false);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.name.length < 3 ||
      state.number.length < 3 ||
      state.addres.length < 3 ||
      state.local.length < 3 ||
      state.city.length < 3
    ) {
      setShowError(true);
    } else {
      setAddres(state);
      setModalVisible(false);
    }
  };
  return (
    <Modal
      width={800}
      centered
      visible={modalVisible}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => setModalVisible(false)}
    >
      <div className="text-xl text-gray-800 font-semibold border-b border-gray-300 pb-4">
        Adauga adresa de livrare
      </div>
      <div className="text-sm font-semibold text-gray-600 my-3">
        Persoana de contact
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold text-gray-600">
            Nume si Prenume
          </span>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            className="focus:outline-none py-1.5 w-11/12 px-6 border border-gray-300 rounded"
            placeholder="ex: Popescu Alexandru"
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold text-gray-600">Telefon</span>
          <input
            name="number"
            value={state.number}
            onChange={handleChange}
            type="text"
            className="focus:outline-none py-1.5 w-11/12 px-6 border border-gray-300 rounded"
            placeholder="ex: 07xxxxxxxx"
          />
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-600 mt-8 mb-3">
        Adresa de livrare
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold text-gray-600">Judet</span>
          <input
            name="city"
            value={state.city}
            onChange={handleChange}
            type="text"
            className="focus:outline-none py-1.5 w-11/12 px-6 border border-gray-300 rounded"
            placeholder="ex: Constanta"
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold text-gray-600">
            Localitate
          </span>
          <input
            name="local"
            value={state.local}
            onChange={handleChange}
            type="text"
            className="focus:outline-none py-1.5 w-11/12 px-6 border border-gray-300 rounded"
            placeholder="ex: Mihail Kogalniceanu"
          />
        </div>
      </div>

      <div className="flex justify-around mt-8">
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold text-gray-600">Adresa</span>
          <input
            name="addres"
            value={state.addres}
            onChange={handleChange}
            type="text"
            className="focus:outline-none py-1.5 w-11/12 px-6 border border-gray-300 rounded"
            placeholder="ex: Strada,numar,bloc,scara,etaj,apartament"
          />
        </div>
      </div>
      {showError && (
        <div className="mt-6 text-red-600 text-xs text-bold">
          *Toate campurile sunt obligatorii
        </div>
      )}
      <div className="flex mt-3 items-center">
        <button
          onClick={(e) => handleSubmit(e)}
          className="rounded bg-blue-800 text-white text-xs text-semibold focus:outline-none py-2 px-3"
        >
          Salveaza
        </button>
        <span
          className="ml-4 text-blue-500 cursor-pointer"
          onClick={() => setModalVisible(false)}
        >
          Anuleaza
        </span>
      </div>
    </Modal>
  );
};

export default ModalCheck;
