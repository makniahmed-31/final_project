import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../JS/actions/product";
import { getCategories, getCategorySubs } from "../../../JS/actions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { getProduct,updateProduct } from "../../../JS/actions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";




const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
  subs: [],
  shipping: "",
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

const ProductUpdate = ({ match, history }) => {


  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([])
const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });
    
    setSelectedCategory(e.target.value)
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CTG CLICK", res);
      setSubOptions(res.data);
    });
    if(values.category._id === e.target.value){
      loadProduct();
    }
    setArrayOfSubIds([]);
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Loading categories Failed ");
      });
  };

  const loadProduct = () => {
    getProduct(match.params.slug)
      .then((res) => {
        // console.log('the Product :>> ', res.data);
        setValues({ ...values, ...res.data });
        // console.log("values ====", values);
        getCategorySubs(res.data.category._id)
        .then(res=>{
          setSubOptions(res.data);
        });
        let arr =[];
        res.data.subs.map(s=>{
          arr.push(s._id)
        });
        // console.log('arr', arr)
        setArrayOfSubIds((prev)=>arr);
      })
      .catch((err) => {
        // console.log("Product load failed :>> ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(match.params.slug, values, user.token)
    .then(res=>{
      setLoading(false);
      toast.success(`"${res.data.title}" is updated`);
      history.push("/admin/products")
    }).catch(err=>{
            setLoading(false)
              console.log(err);
        toast.error(err.response.data.err);

    })

  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //   console.log(e.target.name,"==>>",e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
                    {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}

          {/* {JSON.stringify(values)} */}
          <div className="p-3">
            <FileUpload
              setLoading={setLoading}
              values={values}
              setValues={setValues}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            categories={categories}
            values={values}
            setValues={setValues}
            subOptions={subOptions}
            handleCategoryChange={handleCategoryChange}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
