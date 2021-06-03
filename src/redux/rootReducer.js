import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import propDrilling from "./propDrilling/propDrilling";
import couponReducer from "./coupon/coupon-reducer";
import cartReducer from "./shopping/shopping-reducer";
import favoriteReducer from "./favorite/favorite-reducer";

const rootReducer = combineReducers({
  user: authReducer,
  propsD: propDrilling,
  cart: cartReducer,
  favorite: favoriteReducer,
  coupon: couponReducer,
});

export default rootReducer;
