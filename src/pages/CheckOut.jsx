import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrder } from "../JS/actions/userCart";
import UserNav from "../components/nav/UserNav";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Payment from "./user/Payment";

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getUserOrder(user.token).then((res) => {
      // console.log("res", res);
      setProducts(res.data.products);
      setUserEmail(res.data.ordredBy);
      setTotal(res.data.cartTotal);
      setUserAddress(res.data.userAddress);
      setUserPhone(res.data.userPhone);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {products.length > 0 ? "User purchase order" : "No purchase order"}
          </h4>
          <div className="m-5 p-3 card">
            <div className="col text-center">
              <h4>{products.length > 0 ? "User details" : ""}</h4>
            </div>
            <table className="table table-bordered mt-5">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {userEmail} </td>
                  <td> {userPhone}</td>
                  <td> {userAddress} </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="m-5 p-3 card">
            <h4>Order details</h4>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Color</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Shipping</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <b>{p.title}</b>
                    </td>
                    <td>${p.price}</td>
                    <td>{p.brand}</td>
                    <td>{p.color}</td>
                    <td> {p.count}</td>
                    <td>
                      {" "}
                      {p.shipping === "Yes" ? (
                        <CheckCircleOutlined className="text-success" />
                      ) : (
                        <CloseCircleOutlined className="text-danger" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col">
                <p>
                  <u>Total</u> : <b>${total}</b>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Payment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
