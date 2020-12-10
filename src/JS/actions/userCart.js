import axios from "axios";

export const userCart = async (products, cartTotal, ordredBy, userAddress,userPhone) => {
  return await axios.post(`${process.env.REACT_APP_API}/order`, {
    products,
    cartTotal,
    ordredBy,
    userAddress,
    userPhone,
  });
};

export const getUserOrder = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/order`, {
    headers: {
      authtoken,
    },
  });
};
