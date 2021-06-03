import React, { useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { Tooltip } from "antd";
import { BiPlus } from "react-icons/bi";
import ModalCheck from "./Modal";
import Finish from "./Finish";

const Checkout = () => {
  const [addres, setAddres] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setModalVisible(true);
  };
  return (
    <div className="flex flex-col items-center">
      {/* Modal */}
      <ModalCheck
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addres={addres}
        setAddres={setAddres}
      />
      <div className="text-2xl my-6 text-gray-800 font-semibold">
        Detalii Comanda
      </div>
      <div className="w-2/3 bg-blue-200 flex flex-col ">
        <div className="flex my-4">
          <span className="bg-gray-800 text-white rounded-full font-bold p-4 w-8 h-8 flex items-center justify-center mx-12 ">
            1
          </span>
          <span className="text-xl text-gray-800 font-semibold">
            Modalitate Livrare
          </span>
        </div>
        <div className="flex justify-around w-full ">
          <div className="bg-white border border-blue-600 flex items-center py-3 rounded w-5/12">
            <RiRadioButtonLine className="text-blue-500 ml-7 text-lg" />
            <span className=" text-lg text-blue-600 text-center w-3/4">
              Livrare prin curier
            </span>
          </div>
          <div className="bg-gray-100 text-gray-500 py-3 flex items-center justify-center  rounded w-5/12">
            <Tooltip
              color="green"
              placement="bottom"
              title="Cosul tau de cumparaturi contine produse care nu pot fi ridicate personal dintr-un showroom sau dintr-un punct de livrare. Te rugam sa alegi optiunea livrare prin curier."
            >
              <span className="text-lg">Ridicare personala indisponibila</span>
            </Tooltip>
          </div>
        </div>
        <div className="w-full flex   items-center justify-center my-6">
          <div className="w-11/12  bg-white flex flex-col items-center  rounded">
            <div className="w-8/12 border-b border-gray-300 py-4">
              <span className="text-xl font-semibold text-gray-800 ">
                Selecteaza adresa de livrare
              </span>
            </div>
            {addres !== null && (
              <div className="flex w-11/12">
                <span className="mt-4 mr-20 ml-2 text-lg text-blue-500 cursor-pointer">
                  <RiRadioButtonLine />
                </span>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="font-bold">Persoana de contact</span>
                    <span className="flex">
                      {addres.name} - {addres.number}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Adresa de livrare</span>
                    <span className="flex">
                      {addres.addres} - {addres.local}, {addres.city}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="my-6 w-8/12">
              <button
                onClick={(e) => handleClick(e)}
                className="border border-blue-600 flex justify-around items-center px-3 py-1.5 rounded focus:outline-none"
              >
                <BiPlus className="text-blue-500" />
                <span className="text-xs font-bold text-blue-600 ml-1">
                  {addres !== null ? "modifica" : "adauga"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Finish addres={addres} />
    </div>
  );
};

export default Checkout;
