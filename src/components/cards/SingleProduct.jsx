import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductListItems from "./ProductListItems";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, SHOW_TIME } from "../../JS/constants/actionTypes";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../JS/actions/rating";

const SingleProduct = ({ product, handleStarClick, star }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Click to add");

  const { images, title, _id } = product;
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
        payload: unique,
      });
    }
  };

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
        </Carousel>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} className="text-success">
                {" "}
                <ShoppingCartOutlined className="" />
                <br /> Add to Cart
              </a>
              ,
            </Tooltip>,
            <Link to="/" className="text-info">
              {" "}
              <HeartOutlined />
              <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={product._id}
                numberOfStars={5}
                rating={star}
                changeRating={handleStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
