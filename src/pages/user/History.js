import React from "react";
import LeftBar from "./LeftBar";
import Profile from "./Profile";

const History = () => {
  return (
    <>
      <div className="w-full bg-gray-200 flex justify-center">
        <div className=" my-12 flex justify-around">
          <LeftBar />
          <Profile />
        </div>
      </div>
    </>
  );
};

export default History;
