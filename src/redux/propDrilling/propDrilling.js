import { BURGER_ON, BURGER_OFF, ABSOLUTE, HIDDEN, PATH } from "./prop-types";

const reducer = (state = null, action) => {
  switch (action.type) {
    case BURGER_ON:
      return action.payload;
    case BURGER_OFF:
      return action.payload;
    case ABSOLUTE:
      return { ...state, payload: action.payload };
    case HIDDEN:
      return { ...state, payload: action.payload };
    case PATH:
      return { ...state, path: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
