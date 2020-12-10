import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar } from "../JS/actions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSingleProduct();
  }, [match.params.slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRating = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingRating && setStar(existingRating.star);
      console.log(star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(match.params.slug).then((res) => {
      setProduct(res.data);
    });
  };

  const handleStarClick = (newRating, name) => {
    // console.log("newRating", newRating, "name", name);
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating_click", res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          star={star}
          product={product}
          handleStarClick={handleStarClick}
        />
      </div>
      <div className="row col-7">
        <ul className="list-group">
          <li className="list-group-item" style={{ background: "#e9ecef" }}>
            Description
            <span className="label label-default label-pill pull-xs-right">
              {product.description}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
