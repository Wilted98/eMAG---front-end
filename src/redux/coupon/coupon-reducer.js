import { COUPON_APPLIED } from "./coupon-types";

const reducer = (state = null, action) => {
  switch (action.type) {
    case COUPON_APPLIED:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
