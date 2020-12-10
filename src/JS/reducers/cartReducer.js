import { ADD_TO_CART } from "../constants/actionTypes";

let initialState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return payload;
    default:
      return state;
  }
};
