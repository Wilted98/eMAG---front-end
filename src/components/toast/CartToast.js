import React from "react";

const CartToast = ({ Image, Type }) => {
  return (
    <div className="flex flex-wrap justify-around items-center">
      {Type === "full" && (
        <img src={Image} alt="no-im4ge" className="w-7 h-7" />
      )}
      <span>
        Prod. a fost {Type === "empty" ? "eliminat din" : "adaugat in"} cos.
      </span>
    </div>
  );
};

export default CartToast;
