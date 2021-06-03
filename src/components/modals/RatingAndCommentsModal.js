import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
// import { AiFillStar } from "react-icons/ai";
// import { getProductBySlug } from "../../CRUD/functions";
import StarRating from "react-star-ratings";
import { LeaveRatingAndComment } from "../../CRUD/functions";
import { GetRatingAndComment } from "../../CRUD/functions";
import FileUpload from "../../pages/admin/product/FileUpload";

const RatingsAndCommentsModal = ({
  modalVisible,
  setModalVisible,
  product,
  getProduct,
}) => {
  const [values, setValues] = useState({ images: [] });
  const [error, setError] = useState(false);
  const initialState = {
    star: 0,
    comment: "",
    commentTitle: "",
  };
  // const [product, setProduct] = useState();
  //   const [starRating, setStarRating] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState(initialState);
  // useEffect(() => {
  //   getProductBySlug(
  //     "telefon-mobil-huawei-p40-lite-dual-sim-128gb-6gb-ram-4g-midnight-black"
  //   )
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  const [edit, setEdit] = useState(false);
  const image = product && product.images[0].url;
  const title = product && product.title;
  const id = product && product._id;
  const images = values && values.images;
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      data.star === 0 ||
      data.comment.length < 6 ||
      data.commentTitle.length < 2
    ) {
      setError(true);
    } else {
      setError(false);
      await LeaveRatingAndComment(data, user.token, id, images)
        .then((res) => {
          setModalVisible(false);
          getProduct();
        })
        .catch((err) => console.log(err));
    }
  };

  const getRating = async () => {
    id &&
      (await GetRatingAndComment(id, user.token)
        .then((res) => {
          if (res.data) {
            setEdit(true);
            setData({
              star: res.data.star,
              comment: res.data.comment,
              commentTitle: res.data.commenttitle,
            });
            {
              let imgArr = [];
              res.data.img.map((arg) => {
                imgArr.push(arg);
              });

              setValues({ ...values, images: imgArr });
            }
          } else {
            setEdit(false);
            setData(initialState);
            setValues({ images: [] });
          }
        })
        .catch((err) => console.log(err)));
  };

  React.useEffect(() => {
    user.token && getRating();
  }, [id, user.token]);

  return (
    <>
      <Modal
        width={1200}
        centered
        visible={modalVisible}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setModalVisible(false)}
      >
        <div className="w-full h-full">
          <div className="flex border-b border-gray-300">
            <img src={image} alt="fck" className="w-24 h-24 mb-2" />
            <span>
              <span className="font-semibold text-gray-700 text-lg ml-6">
                {edit ? "Editeaza" : "Scrie"} review pentru: <br />
              </span>
              <span className="ml-6 flex flex-wrap">{title}</span>
            </span>
          </div>
          <div className="mt-5">
            <span className="font-semibold text-base text-gray-900">
              Rating*: <br />
            </span>
            <StarRating
              name={id}
              numberOfStars={5}
              rating={data.star || 0}
              changeRating={(e) => {
                setError(false);
                setData({ ...data, star: e });
              }}
              isSelectable={true}
              starRatedColor="yellow"
              starHoverColor="yellow"
              starDimension="40px"
              starSpacing="1px"
            />
          </div>
          {}
          <div className="mt-6">
            <span className="font-semibold text-base text-black">
              Review*: <br />
            </span>
            <textarea
              value={data.comment}
              onChange={(e) => {
                setError(false);
                setData({ ...data, comment: e.target.value });
              }}
              cols="90"
              rows="8"
              placeholder="Descrie experienta ta cu produsul"
              className="focus: outline-none border border-gray-400 focus:border-blue-500 px-2 text-base mt-2"
            ></textarea>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-base text-black">
              Titlu review*: <br />
            </span>
            <input
              value={data.commentTitle}
              onChange={(e) => {
                setError(false);
                setData({ ...data, commentTitle: e.target.value });
              }}
              className="h-9 focus:outline-none border border-gray-400 rounded mt-2 px-2"
              style={{ width: "665px" }}
              placeholder="Alege titlul review-ului"
            />
          </div>
          <div className="mt-4">
            <span className="font-semibold text-base text-black ">
              Adauga poze reale cu produsul, pentru a ajuta si alti clienti!
            </span>
            <span className="text-sm text-gray-500 ml-2">
              (optional) <br />
            </span>
            {/* <input
              id="uploadImage"
              type="file"
              multiple
              accept="images/*"
              style={{ display: "none" }}
            />
            <label
              for="uploadImage"
              className="border-2 border-dashed border-gray-400 p-4 rounded"
            >
              <span className="text-4xl font-bold">+</span>
            </label> */}
            <FileUpload values={values} setValues={setValues} />
          </div>
          <div className="mt-10 text-gray-400 text-xs">
            Prin publicarea review-ului, esti de acord cu{" "}
            <span className="text-blue-500 mr-1">termenii si conditiile</span>
            site-ului
          </div>
          {error && (
            <div className="text-red-600 font-semibold text-base">
              Toate campurile marcate cu * sunt obligatorii!
            </div>
          )}
          <div className="flex mt-2 items-center">
            <button
              className="text-white bg-blue-700 p-1.2 rounded"
              onClick={(e) => handleClick(e)}
            >
              Adauga review
            </button>
            <span
              className="text-blue-700 ml-4 cursor-pointer"
              onClick={() => setModalVisible(false)}
            >
              Anuleaza
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RatingsAndCommentsModal;
