import React, { useState } from "react";
import { Modal, Radio } from "antd";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../../CRUD/functions";
import { toast } from "react-toastify";

const MyData = ({ modalVisible1, setModalVisible1, setPhone }) => {
  const state = useSelector((state) => state.user);

  const initialState = {
    gender: state.gender || "",
    nickname: state.nickname || "",
    phone: state.phone || "",
    fix: state.fix || "",
  };
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.phone.length !== 10) {
      return toast.error("Campul Telefon trebuie sa contina 10 cifre!");
    } else {
      await updateUserProfile(values, state.token)
        .then(() => {
          setPhone(values.phone);
          toast.success("Profil Actualizat");
          setModalVisible1(false);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Modal
        width="800px"
        centered
        visible={modalVisible1}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalVisible1(false)}
      >
        <div className="flex flex-col">
          <span className="text-black text-xl tracking-tight font-bold">
            Datele mele
          </span>
          <span className="flex my-4">
            <span className="mr-5">Forma de adresare </span>
            <Radio.Group
              value={values.gender}
              onChange={(e) =>
                setValues((oldState) => ({
                  ...oldState,
                  gender: e.target.value,
                }))
              }
            >
              <Radio value="Masculin">Dl.</Radio>
              <Radio value="Feminin">Dna.</Radio>
            </Radio.Group>
          </span>
          {/* <div className="w-full flex justify-between">
            <span className="text-sm font-semibold text-gray-600 w-1/6 flex items-center mr-2">
              Nume si Prenume
            </span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="focus:outline-none py-1 w-11/12 px-6 border border-gray-300 rounded"
              placeholder="ex: Popescu Alexandru"
            />
          </div> */}
          <div className="w-full flex justify-between my-2">
            <span className="text-sm font-semibold text-gray-600 w-1/6 flex items-center mr-2">
              Nickname
            </span>
            <input
              type="text"
              name="nickname"
              value={values.nickname}
              onChange={handleChange}
              className="focus:outline-none py-1 w-11/12 px-6 border border-gray-300 rounded"
              placeholder="ex: popalex3"
            />
          </div>
          <div className="w-full flex justify-between my-2">
            <span className="text-sm font-semibold text-gray-600 w-1/6 flex items-center mr-2">
              Telefon Mobil
            </span>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="focus:outline-none py-1 w-11/12 px-6 border border-gray-300 rounded"
              placeholder="07xxxxxxxx"
            />
          </div>
          <div className="w-full flex justify-between my-2">
            <span className="text-sm font-semibold text-gray-600 w-1/6 flex items-center mr-2">
              Telefon Fix
            </span>
            <input
              type="text"
              name="fix"
              value={values.fix}
              onChange={handleChange}
              className="focus:outline-none py-1 w-11/12 px-6 border border-gray-300 rounded"
              placeholder="07xxxxxxxx"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="rounded bg-blue-800 text-white text-xs text-semibold focus:outline-none py-2 px-3 mt-2"
          >
            Salveaza
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyData;
