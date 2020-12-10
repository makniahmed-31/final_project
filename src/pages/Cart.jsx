import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";
import { ADD_TO_CART } from "../JS/constants/actionTypes";
import { toast } from "react-toastify";
import {
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { userCart } from "../JS/actions/userCart";

const Cart = ({ history }) => {
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((value, nextValue) => {
      return value + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleQtnChange = (p, e) => {
    //   console.log(e.target.value);
    //   console.log(p);
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Available Quantity is ${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count; //??
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      });
    }
  };

  const handleRemove = (p) => {
    let cart = [];
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((product, i) => {
      if (product._id === p._id) {
        cart.splice(i, 1);
      }
    });
    // console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const saveOrder = () => {
    // console.log("cart :>> ", cart);
    if (userAddress && userPhone) {
      const cartTotal = cart.reduce(
        (value, nextValue) => value + nextValue.count * nextValue.price,
        0
      );
      let ordredBy = user.email;
      // console.log('cartTotal', cartTotal)
      // console.log('ordredBy :>> ', ordredBy);
      userCart(cart, cartTotal, ordredBy, userAddress, userPhone)
        .then((res) => {
          console.log("CART POST RES", res);
          if (res.data) {
            localStorage.removeItem("cart");
            dispatch({
              type: ADD_TO_CART,
              payload: [],
            });
            history.push("/checkout");
          }
        })
        .catch((err) => {
          console.log("cart save err", err);
        });
    } else {
      toast.error("Enter your address && phone number please");
    }
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product(s)</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/">Continue Shopping</Link>{" "}
            </p>
          ) : (
            <table className="table table-border">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Color</th>
                  <th scope="col">count</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              {cart.map((p) => (
                <tbody key={p._id}>
                  <tr>
                    <td>
                      <div style={{ width: "80px", height: "auto" }}>
                        <ModalImage
                          large={p.images[0].url}
                          small={p.images[0].url}
                        />
                      </div>
                    </td>
                    <td>{p.title}</td>
                    <td>${p.price}</td>
                    <td>{p.brand}</td>
                    <td>{p.color}</td>
                    <td>
                      <input
                        onChange={(e) => handleQtnChange(p, e)}
                        value={p.count}
                        className="form-control "
                        type="number"
                      />
                    </td>
                    <td className="text-center">
                      {p.shipping === "Yes" ? (
                        <CheckCircleOutlined className="text-success" />
                      ) : (
                        <CloseCircleOutlined className="text-danger" />
                      )}
                    </td>
                    <td className="text-danger text-center">
                      <CloseOutlined onClick={() => handleRemove(p)} />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Product(s)</p>
          {cart.map((c, i) => (
            <div key={c._id}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}{" "}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {cart.length && (
            <>
              {" "}
              <input
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Your address please"
                required
                type="text"
                className="form-control"
              />
              <hr />
              <input
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="Your phone number please"
                required
                type="text"
                className="form-control"
              />
              <hr />
            </>
          )}
          {user ? (
            <button
              disabled={!cart.length}
              onClick={saveOrder}
              className="btn btn-sm btn-primary mt-2 btn-raised text-white"
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link to="/login">Login to Checkout</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
