import { SEARCH_QUERY } from "./search-types";

const reducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
