import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../JS/actions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryUpdate = ({ history, match }) => {
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        toast.error("Loading category Failed ");
      });
  };

  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setName("");
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };



  return (
    <div className="fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit}
          name={name} setName={setName} /> 
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
