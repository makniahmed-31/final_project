import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "../../components/cards/ProductCard";
import LocalSearch from "../../components/forms/LocalSearch";
import { getProductsByCount, removeProduct } from "../../JS/actions/product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("delete ? ")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };
  const searchedKey = (keyword) => (product) =>
  product.title.toLowerCase().includes(keyword);

  return (
    <div className="fluid">
      <div className="row">
        <div className="col-md-2">
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.filter(searchedKey(keyword)).map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <ProductCard handleRemove={handleRemove} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
