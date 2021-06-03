import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_ITEM_QTY,
  CLEAR_CART,
} from "./shopping-types";

let initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = state.find((item) =>
        item._id === action.payload._id ? true : false
      );
      return item
        ? state.map((arg) =>
            arg._id === action.payload._id
              ? {
                  ...arg,
                  qty:
                    arg.qty < 10 && arg.quantity > arg.qty
                      ? arg.qty + 1
                      : arg.qty,
                }
              : arg
          )
        : [...state, { ...action.payload, qty: 1 }];
    case REMOVE_FROM_CART:
      return state.filter((item) => item._id !== action.payload._id);
    case ADJUST_ITEM_QTY:
      return state.map((item) =>
        item._id === action.payload.product._id
          ? { ...item, qty: action.payload.value }
          : item
      );
    case CLEAR_CART:
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
