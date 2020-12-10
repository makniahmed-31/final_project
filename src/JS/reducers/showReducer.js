import { THE_END, SHOW_TIME } from "../constants/actionTypes";

export const showReducer = (state = false, { type, payload }) => {
  switch (type) {
    case SHOW_TIME:
      return true;
    case THE_END:
      return false;

    default:
      return state;
  }
};
