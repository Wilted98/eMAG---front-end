import { ADD_OR_REMOVE_FROM_FAVORITE, CLEAR_FAVORITE } from "./favorite-types";

let initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OR_REMOVE_FROM_FAVORITE:
      const item = state.find((item) =>
        item._id === action.payload._id ? true : false
      );
      return item
        ? state.filter((item) => item._id !== action.payload._id)
        : [...state, action.payload];
    case CLEAR_FAVORITE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
