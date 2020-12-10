import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { ADD_TO_CART, SHOW_TIME } from "../../JS/constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { showAverage } from "../../JS/actions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Click to add");
  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({ ...product, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: ADD_TO_CART,
        payload: unique,
      });
      dispatch({
        type: SHOW_TIME,
      });
    }
  };
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        hoverable
        cover={
          <img
            src={
              product.images && product.images.length
                ? product.images[0].url
                : ""
            }
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link className="text-info" to={`/product/${product.slug}`}>
            <EyeOutlined />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} className="text-success">
              <ShoppingCartOutlined />
              <br /> Add to Cart
            </a>
            ,
          </Tooltip>,
        ]}
      >
        {" "}
        <Meta
          title={product.title}
          description={`${
            product.description && product.description.substring(0, 10)
          }...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
