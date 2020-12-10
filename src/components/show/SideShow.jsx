import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { THE_END } from "../../JS/constants/actionTypes";

const SideShow = () => {
  const { show, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <Drawer
      closable={false}
      title={`Cart/ ${cart.length} Product(s)`}
      className="text-center"
      onClose={() => {
        dispatch({ type: THE_END });
      }}
      visible={show}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            <>
              <img src={p.images[0].url} className="img-show" />
              <p className="text-center bg-secondary text-light">
                {p.title} x {p.count}{" "}
              </p>
            </>
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() => dispatch({ type: THE_END })}
          className="text-center btn btn-primary btn-raised ant-btn-block "
        >
          {" "}
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideShow;
