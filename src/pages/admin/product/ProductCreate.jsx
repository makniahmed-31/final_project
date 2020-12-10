import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../JS/actions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../JS/actions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "New technologies 2020",
  price: "",
  quantity: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Acer",
    "Hector-del-Amo",
    "ZeroDate",
    "Sony",
    "Xiaomi",
    "HollyDrone",
  ],
  color: "",
  brand: "",
};
const ProductCreate = () => {
  const loadCategories = () => {
    getCategories()
      .then((c) => {
        setValues({ ...values, categories: c.data });
      })
      .catch((err) => {
        toast.error("Loading categories Failed ");
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //   console.log(e.target.name,"==>>",e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      // console.log("SUB OPTIONS ON CTG CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
        <br/>
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />
          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <FileUpload
              setLoading={setLoading}
              values={values}
              setValues={setValues}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
