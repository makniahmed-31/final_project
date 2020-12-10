import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { showReducer } from "./showReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  show: showReducer,
});

export default rootReducer;
