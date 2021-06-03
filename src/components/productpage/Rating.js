import React, { useState } from "react";
import StarRating from "react-star-ratings";
import RatingAndCommentsModal from "../modals/RatingAndCommentsModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import randomColor from "randomcolor";
import { likeAndUnlike } from "../../CRUD/functions";
import ModalImg from "./Modal";

const Rating = ({ product, getProduct }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgs, setImgs] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector((state) => state.user.token);
  const reduxName = useSelector((state) => state.user.name);
  const history = useHistory();
  const handleLike = async (id) => {
    await likeAndUnlike({ prodId: product?._id, commentId: id }, token)
      .then(() => {
        getProduct();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ModalImg
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        images={imgs && imgs}
        isInRating={true}
      />
      <RatingAndCommentsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        product={product}
        getProduct={getProduct}
      />

      <div className="w-full h-10 bg-gray-200"></div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col " style={{ marginRight: "980px" }}>
          <div className="mt-2 border-b border-gray-150  pb-3 mb-2">
            <span className="ml-20 text-2xl text-black tracking-tight">
              Review-uri
            </span>
            <span className="ml-2 text-lg text-gray-500">
              ({product?.ratingsandcomments.length} review-uri)
            </span>
          </div>
          <div className="text-xl text-gray-900 ml-20 mb-2">
            Detii sau ai utilizat produsul?
          </div>
          <div id="rating-div2" className="text-base tracking-tight ml-20">
            Spune-ti parerea acordand o nota produsului
          </div>
          <div className="mt-4 ml-20 flex items-center">
            <StarRating
              name="fck" //   name={id}
              numberOfStars={5}
              rating={0}
              changeRating={(e) => {
                token
                  ? setModalVisible(true)
                  : history.push({
                      pathname: "/login",
                      state: {
                        from: product?.slug,
                        elementToScroll: "rating-div",
                      },
                    });
              }}
              isSelectable={true}
              starRatedColor="yellow"
              starHoverColor="yellow"
              starDimension="33px"
              starSpacing="1px"
            />
            <span className="text-base tracking-tight font-bold text-gray-900 ml-2">
              Acorda o nota
            </span>
          </div>
          <div
            id="rating-div"
            onClick={() => {
              token
                ? setModalVisible(true)
                : history.push({
                    pathname: "/login",
                    state: {
                      from: product?.slug,
                      elementToScroll: "rating-div",
                    },
                  });
            }}
            className="hover:bg-blue-700 cursor-pointer mt-2 bg-blue-500 text-white text-xs rounded w-32 h-9 flex items-center justify-center ml-20"
          >
            Adauga un review
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-full flex justify-center">
        <div className="flex flex-col mt-10 border-t border-b border-gray-200 pt-3 ">
          {product?.ratingsandcomments.map((arg) => (
            <div
              key={arg._id}
              className="flex justify-center w-full border-b border-gray-200 py-3"
            >
              <div className=" flex flex-col mr-20">
                {arg.postedBy.profileImage ? (
                  <img
                    alt="fcky"
                    src={arg.postedBy.profileImage.url}
                    className="w-8 h-8 rounded-full mr-1 flex items-center justify-center overflow-hidden object-cover"
                  />
                ) : (
                  <div
                    style={{ background: randomColor({ luminosity: "dark" }) }}
                    className="w-8 h-8 rounded-full mr-1 text-white text-base flex justify-center items-center overflow-hidden"
                  >
                    {(arg.postedBy.name || reduxName || "New")
                      .match(/\b(\w)/g)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <span className="text-gray-700 font-semibold text-base flex flex-wrap">
                  {arg.postedBy.name || reduxName}
                </span>
                {arg.postedAt.split("T")[0]}
              </div>
              <div className="flex flex-col" style={{ width: "1050px" }}>
                <span className="font-bold text-gray-600 text-base">
                  {arg.commenttitle}
                </span>
                <StarRating
                  name={arg._id}
                  numberOfStars={5}
                  rating={arg.star}
                  isSelectable={false}
                  starRatedColor="yellow"
                  starHoverColor="yellow"
                  starDimension="16px"
                  starSpacing="1px"
                />
                <div className="w-11/12 mt-2">
                  <span
                    className="text-gray-600 text-base tracking-tight"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {arg.comment}
                  </span>
                </div>
                <div className="flex mt-5">
                  {arg.img.map((image) => {
                    return (
                      <div
                        onClick={() => {
                          setImgs(arg.img);
                          setIsModalVisible(true);
                        }}
                        key={image.public_id}
                        className="mx-3 cursor-pointer"
                      >
                        <img
                          src={image.url}
                          alt={image.public_id}
                          className="w-16 h-16"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center">
                  <AiOutlineLike
                    onClick={() => {
                      token
                        ? handleLike(arg._id)
                        : history.push({
                            pathname: "/login",
                            state: {
                              from: product?.slug,
                              elementToScroll: "rating-div",
                            },
                          });
                    }}
                    className="text-2xl text-blue-500 hover:text-blue-700 mr-0.5 cursor-pointer"
                  />
                  <span className="text-lg text-blue-500 mt-1">
                    {arg.numberOfLikes.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rating;
