import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSubs, removeSub } from "../../../JS/actions/sub";
import { getCategories } from "../../../JS/actions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  useEffect(() => {
    loadCategories();
    loadSubs();
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
  const loadSubs = () => {
    getSubs()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        toast.error("Loading subs Failed ");
      });
  };

  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [subs, setSubs] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent:category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs()
      })
      .catch((err) => {
        setName("");
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
            setLoading(false);
          }
        });
    }
  };

  const searchedKey = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword);

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
            <h4>Create sub category</h4>
          )}
          <div className="form-group">
            <label>Parent Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="form-control"
            >
              <option value="">please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
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

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searchedKey(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}{" "}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />{" "}
              </span>{" "}
              <span className="btn btn-sm float-right">
                <Link to={`/admin/sub/${s.slug}`}>
                  {" "}
                  <EditOutlined />{" "}
                </Link>
              </span>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
