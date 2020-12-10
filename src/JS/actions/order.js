import axios from "axios";



export const getOrdersCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/orders/total`);
  };

export const getOrders = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/orders`);
  };