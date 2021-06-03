import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";

const FavoriteToast = ({ Type }) => {
  return (
    <div className="flex flex-wrap justify-around items-center">
      {Type === "empty" && (
        <IoMdHeartEmpty className="text-blue-600 text-4xl" />
      )}
      {Type === "full" && <AiFillHeart className="text-red-600 text-4xl" />}
      <span>
        Prod. a fost {Type === "empty" ? "eliminat de" : "adaugat"} la Favorite
      </span>
    </div>
  );
};

export default FavoriteToast;
