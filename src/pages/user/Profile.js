import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import randomColor from "randomcolor";
import { Badge } from "antd";
import { FaPencilAlt } from "react-icons/fa";
// import { Tooltip } from "antd";
import { Modal } from "antd";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "antd";
import { updateImgProfile } from "../../CRUD/functions";
import { toast } from "react-toastify";
import { PROFILE_UPDATE } from "../../redux/auth/auth-types";
import MyData from "./MyData";
import OutSideClickHandler from "react-outside-click-handler";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const image = useSelector((state) => state.user.profileImage);
  const [phone, setPhone] = useState(useSelector((state) => state.user.phone));
  const [scale, setScale] = useState(10);
  const [rotate, setRotate] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [img, setImg] = useState(null);
  const editor = useRef();
  const handleSave = async () => {
    // setUrl(editor.current.getImage().toDataURL());
    const canvas = editor.current.getImage().toDataURL();
    axios
      .post(
        `${process.env.REACT_APP_API}/uploadimages`,
        {
          image: canvas,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then(async (res) => {
        dispatch({
          type: PROFILE_UPDATE,
          payload: res.data.url,
        });
        await updateImgProfile({ profileImage: res.data }, token);
      })
      .catch((err) => window.alert("Imaginea nu a putut fi incarcata!", err));

    setModalVisible(false);
    setImg(null);
    toast.success("Profil actualizat!", {
      autoClose: 3500,
    });
  };
  const handleRemove = async () => {
    dispatch({
      type: PROFILE_UPDATE,
      payload: null,
    });
    toast.success("Imagine a fost stearsa cu succes!");
    await updateImgProfile({ profileImage: null }, token);
  };
  return (
    <>
      <MyData
        modalVisible1={modalVisible1}
        setModalVisible1={setModalVisible1}
        setPhone={setPhone}
      />
      <Modal
        centered
        visible={modalVisible}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalVisible(false)}
      >
        <div className="text-black text-xl tracking-tight border-b border-gray-200 pb-3 m-0">
          Pozitionati si redimensionati imaginea
        </div>
        <AvatarEditor
          ref={editor}
          image={img}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale / 10}
          rotate={rotate}
          borderRadius={125}
        />
        <Slider
          defaultValue={10}
          min={10}
          value={scale}
          onChange={(value) => setScale(value)}
        />
        <Slider
          defaultValue={0}
          max={270}
          value={rotate}
          onChange={(value) => setRotate(value)}
        />
        <div className="w-full flex justify-between">
          <label
            htmlFor="uploadImage1"
            className="text-blue-500 border border-blue-500 px-10 py-1 cursor-pointer "
          >
            Incarca
          </label>
          <span
            onClick={() =>
              img ? handleSave() : toast.error("Nu ai selectat nicio imagine!")
            }
            className="text-white bg-blue-600 px-10 py-1 cursor-pointer"
          >
            Salveaza
          </span>
        </div>
        <div className="mt-3">
          <input
            id="uploadImage1"
            type="file"
            accept="images/*"
            onChange={(e) => setImg(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
      </Modal>

      <div className="w-4/5 flex ml-4 h-1/2">
        <div className="w-8/12 bg-white flex flex-col">
          <span className="text-xl text-gray-700 m-4">Datele contului</span>
          <div className="flex  justify-around  ">
            <Badge
              offset={[-28, 90]}
              count={
                <span
                  onClick={() => setClicked(true)}
                  className="bg-white rounded-full p-1 cursor-pointer relative"
                >
                  <FaPencilAlt className="text-blue-500 " />
                  {clicked && (
                    <OutSideClickHandler
                      onOutsideClick={() => setClicked(false)}
                    >
                      <div className="absolute cursor-default w-40 -left-20 top-9 flex flex-col border border-gray-300 shadow-2xl">
                        <span
                          onClick={() => setModalVisible(true)}
                          className="my-2 ml-3 hover:underline cursor-pointer w-8/12"
                        >
                          Incarca imagine
                        </span>
                        <span
                          onClick={() => {
                            image
                              ? handleRemove()
                              : toast.error("Profilul tau nu are imagine!");
                          }}
                          className="my-2 ml-3 hover:underline cursor-pointer w-8/12"
                        >
                          Sterge imaginea
                        </span>
                      </div>
                    </OutSideClickHandler>
                  )}
                </span>
              }
            >
              {image ? (
                <img
                  src={image}
                  alt="altprofile"
                  className="w-28 h-28 rounded-full mr-1 flex justify-center items-center overflow-hidden object-cover"
                />
              ) : (
                <div
                  style={{ background: randomColor({ luminosity: "dark" }) }}
                  className="w-28 h-28 rounded-full mr-1 text-white text-4xl flex justify-center items-center overflow-hidden"
                >
                  {name &&
                    name
                      .match(/\b(\w)/g)
                      .join("")
                      .toUpperCase()}
                  {/* <img
                className="rounded-full object-cover w-12 h-12"
                src="https://res.cloudinary.com/nope1fff/image/upload/v1620155496/vorxadornvbvi0inmqxp.jpg"
                alt="fck"
              /> */}
                </div>
              )}
            </Badge>
            <div className="flex flex-col w-2/5">
              <span className="my-1 flex justify-between w-full">
                <span className="w-1/3">Nume:</span>
                <span className="w-2/3">{name}</span>
              </span>
              <span className="my-1 flex justify-between w-full">
                <span className="w-1/3">Email:</span>
                <span className="w-2/3">{email}</span>
              </span>
              <span className="my-1 flex justify-between w-full">
                <span className="w-1/3">Telefon:</span>
                <span className="w-2/3">{phone}</span>
              </span>
            </div>
            <div className="flex items-center flex-col justify-center w-1/5 border border-gray-300">
              <span className="text-center">
                Multumim ca esti clientul nostru de
              </span>
              <span className="text-center text-black font-bold tracking-tight">
                0 luni
              </span>
            </div>
          </div>
          <span
            onClick={() => setModalVisible1(true)}
            className="border-t mt-16 border-gray-200 hover:bg-gray-100 w-full p-1.5 text-center cursor-pointer"
          >
            <span className="text-blue-500 font-medium tracking-tight text-base">
              administreaza datele tale
            </span>
          </span>
        </div>
        <div className="bg-white w-2/6 ml-5 flex flex-col items-center">
          <span className="mt-6 text-gray-800 text-xl">Cardurile mele</span>
          <span>
            <img
              src="//s13emagst.akamaized.net/layout/ro/static-upload/myaccount-empty-cards.png"
              alt="card-mg"
            />
          </span>
          <span className="flex w-full ijustify-center justify-center p-2">
            <span className="w-8/12 flex flex-wrap justify-center items-center">
              Adauga un card pentru a plati comenzile viitoare fara sa
              reintroduci toate datele de plata.
            </span>
          </span>
          <span className="border-t border-gray-200 hover:bg-gray-100 w-full p-1.5 text-center cursor-pointer">
            <span className="text-blue-500 font-medium tracking-tight text-base">
              administreaza carduri
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
