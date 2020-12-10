import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { updateSub, getSub } from "../../../JS/actions/sub";
import { getCategories } from "../../../JS/actions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubUpdate = ({ match, history }) => {
  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Loading categories Failed ");
      });
  };
  const loadSub = () => {
    getSub(match.params.slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((err) => {
        toast.error("Loading subs Failed ");
      });
  };

  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(match.params.slug,{ name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/sub");
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
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update sub category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              onChange={(e) => setParent(e.target.value)}
              name="category"
              className="form-control"
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
