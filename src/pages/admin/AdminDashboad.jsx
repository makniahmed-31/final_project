import { Layout, Menu } from "antd";
import {
  UserSwitchOutlined,
  DollarCircleFilled,
  ShoppingCartOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Progress } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import dashboard from "../../images/dashboard.png";
import create from "../../images/create.png";
import update from "../../images/update.png";
import deleting from "../../images/delete.png";
import product from "../../images/product.png";
import category from "../../images/category.png";
import subcategory from "../../images/subcategory.png";
import check from "../../images/check.png";
import products from "../../images/products.png";
import orders from "../../images/orders.png";
import users from "../../images/group.png";
import password from "../../images/password.png";
import PiChart from "../../components/cards/PiChart";
import { getUsersCount } from "../../JS/actions/user";
import { getProductsCount } from "../../JS/actions/product";
import { getOrdersCount, getOrders } from "../../JS/actions/order";
import { useEffect, useState } from "react";

const { Footer, Sider, Content } = Layout;
const AdminDashboad = () => {
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [usersTotal, setUsersTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getTotalOrders();
    getTotalUsers();
    getTotalProducts();
    getAllOrders();
  }, []);

  const getTotalOrders = () => {
    setLoading(true);

    getOrdersCount().then((res) => {
      // console.log("res.data :>> ", res.data);
      setOrdersTotal(res.data);
      setLoading(false);
    });
  };
  const getTotalUsers = () => {
    setLoading(true);

    getUsersCount().then((res) => {
      // console.log("res.data :>> ", res.data);
      setUsersTotal(res.data);
      setLoading(false);
    });
  };
  const getTotalProducts = () => {
    setLoading(true);

    getProductsCount().then((res) => {
      // console.log("res.data :>> ", res.data);
      setProductsTotal(res.data);
      setLoading(false);
    });
  };
  const getAllOrders = () => {
    setLoading(true);

    getOrders().then((res) => {
      // console.log("res.data :>> ", res.data);
      setAllOrders(res.data);
      setLoading(false);
    });
  };

  const getTotal = () => {
    return allOrders.reduce((value, nextValue) => {
      return value + nextValue.cartTotal;
    }, 0);
  };

  return (
    <div>
      <Layout>
        <Sider style={{ background: "#fff" }}>
          <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
            <Menu.Item key="Dashboard">
              <img src={dashboard} style={{ width: 37, height: 37 }} />{" "}
              Dashboard
            </Menu.Item>
            <SubMenu
              style={{ background: "#203040", color: "white" }}
              title={
                <span>
                  <img src={check} style={{ width: 37, height: 37 }} />{" "}
                  <span>Check</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                <Menu.Item key="All Products">
                  <Link to="/admin/products">
                    {" "}
                    <span>
                      <img src={products} style={{ width: 37, height: 37 }} />{" "}
                      <span>All Products</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="orders">
                  <Link to="/admin/orders">
                    {" "}
                    <span>
                      <img src={orders} style={{ width: 37, height: 37 }} />{" "}
                      <span>All Orders</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="users">
                  <Link to="/admin/users">
                    {" "}
                    <span>
                      <img src={users} style={{ width: 37, height: 37 }} />{" "}
                      <span>All Users</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              style={{ background: "#203040", color: "white" }}
              title={
                <span>
                  <img src={create} style={{ width: 37, height: 37 }} />{" "}
                  <span>Create</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                <Menu.Item key="product">
                  <Link to="/admin/product">
                    {" "}
                    <span>
                      <img src={product} style={{ width: 37, height: 37 }} />{" "}
                      <span>Product</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="category">
                  <Link to="/admin/category">
                    {" "}
                    <span>
                      <img src={category} style={{ width: 37, height: 37 }} />{" "}
                      <span>Category</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="sub">
                  <Link to="/admin/sub">
                    {" "}
                    <span>
                      <img
                        src={subcategory}
                        style={{ width: 37, height: 37 }}
                      />{" "}
                      <span>Subcategory</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              style={{ background: "#203040", color: "white" }}
              title={
                <span>
                  <img src={update} style={{ width: 37, height: 37 }} />{" "}
                  <span>Update</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                <Menu.Item key="location1">
                  <Link to="/admin/product">
                    {" "}
                    <span>
                      <img src={product} style={{ width: 37, height: 37 }} />{" "}
                      <span>Product</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="location2">
                  <Link to="/admin/category">
                    {" "}
                    <span>
                      <img src={category} style={{ width: 37, height: 37 }} />{" "}
                      <span>Category</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="location2">
                  <Link to="/admin/sub">
                    {" "}
                    <span>
                      <img
                        src={subcategory}
                        style={{ width: 37, height: 37 }}
                      />{" "}
                      <span>Subcategory</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              style={{ background: "#203040", color: "white" }}
              title={
                <span>
                  <img src={deleting} style={{ width: 37, height: 37 }} />{" "}
                  <span>Delete</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                <Menu.Item key="location1">
                  <Link to="/admin/products">
                    {" "}
                    <span>
                      <img src={product} style={{ width: 37, height: 37 }} />{" "}
                      <span>Product</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="location2">
                  <Link to="/admin/category">
                    {" "}
                    <span>
                      <img src={category} style={{ width: 37, height: 37 }} />{" "}
                      <span>Category</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="location2">
                  <Link to="/admin/sub">
                    {" "}
                    <span>
                      <img
                        src={subcategory}
                        style={{ width: 37, height: 37 }}
                      />{" "}
                      <span>Subcategory</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              style={{ background: "#203040", color: "white" }}
              title={
                <span>
                  <img src={password} style={{ width: 37, height: 37 }} />{" "}
                  <span>Password</span>
                </span>
              }
            >
              <Menu.ItemGroup>
                <Menu.Item key="location1">
                  <Link to="/user/password">
                    <span>
                      <img src={password} style={{ width: 37, height: 37 }} />{" "}
                      <span>Change Password</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <div
                className="container-fluid mt-3"
                style={{ fontWeight: "700" }}
              >
                <div className="row justify-content-between">
                  <div
                    className="col-md-3 mb-5 p-3 card"
                    style={{ background: "#fa6e22", color: "white" }}
                  >
                    <div className="row justify-content-between ">
                      <div className="col-md-6">{ordersTotal} </div>
                      <div className="col-md-3">
                        <ShoppingCartOutlined
                          style={{ fontSize: "20px", color: "white" }}
                        />
                      </div>
                    </div>
                    <div className="row m-2">
                      <Progress
                        percent={50}
                        size="small"
                        status="active"
                        showInfo={false}
                        trailColor="#f8a02d"
                      />
                    </div>
                    <div className="row justify-content-between ">
                      <div className="col-md-8">Total Orders</div>
                      <div className="col-md-3">
                        <ArrowUpOutlined />{" "}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-3 mb-5 p-3 card"
                    style={{ background: "#33b87a", color: "white" }}
                  >
                    <div className="row justify-content-between ">
                      <div className="col-md-6">${getTotal()} </div>
                      <div className="col-md-3">
                        <DollarCircleFilled
                          style={{ fontSize: "20px", color: "white" }}
                        />
                      </div>
                    </div>
                    <div className="row m-2">
                      <Progress
                        percent={30}
                        size="small"
                        status="active"
                        showInfo={false}
                        trailColor="#19b48b"
                      />
                    </div>
                    <div className="row justify-content-between ">
                      <div className="col-md-8">Total Revenue</div>
                      <div className="col-md-3">
                        <ArrowUpOutlined />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-3 mb-5 p-3 card"
                    style={{ background: "#f32950", color: "white" }}
                  >
                    <div className="row justify-content-between ">
                      <div className="col-md-6">{usersTotal} </div>
                      <div className="col-md-3">
                        <UserSwitchOutlined
                          style={{ fontSize: "20px", color: "white" }}
                        />
                      </div>
                    </div>
                    <div className="row m-2">
                      <Progress
                        percent={70}
                        size="small"
                        status="active"
                        showInfo={false}
                        trailColor="#fb5716"
                      />
                    </div>
                    <div className="row justify-content-between ">
                      <div className="col-md-8">Total Users</div>
                      <div className="col-md-3">
                        <ArrowUpOutlined />{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row card mb-3" style={{ background: "#fff" }}>
                  <PiChart
                    usersTotal={usersTotal}
                    productsTotal={productsTotal}
                    ordersTotal={ordersTotal}
                    allOrders={allOrders}
                  />
                </div>
              </div>
            </Content>
            <Footer className="text-center " style={{ background: "#fff" }}>
              M@k_Shop | All Rights Reserved © {new Date().getFullYear()}{" "}
              Copyright:
              <a className="text-info" href="/">
                {" "}
                M@k_Shop.com
              </a>
            </Footer>{" "}
          </Layout>
        )}
      </Layout>
    </div>
  );
};

export default AdminDashboad;
