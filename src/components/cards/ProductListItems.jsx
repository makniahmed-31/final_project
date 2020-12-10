import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category,quantity, subs, brand, color, shipping, sold } = product;

  // console.log(product);
  return (
    <ul className="list-group">
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Category{" "}
        <span className="label label-default label-pill pull-xs-right">
          { category && category.name}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Sub categories{" "}
        { subs && subs.map((s) => (
          <span
            key={s._id}
            className="label label-default label-pill pull-xs-right"
          >
            {s.name}{" "}
          </span>
        ))}
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item" style={{ background: "#e9ecef" }}>
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
