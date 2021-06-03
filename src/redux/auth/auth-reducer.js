import { LOGGED_IN_USER, LOGGED_OUT, PROFILE_UPDATE } from "./auth-types";

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;
    case LOGGED_OUT:
      return action.payload;
    case PROFILE_UPDATE:
      return { ...state, profileImage: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
