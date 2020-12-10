import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, ADD_TO_CART } from "../../JS/constants/actionTypes";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user, cart } = useSelector((state) => ({ ...state }));
  // console.log(user);

  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logOut = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    localStorage.removeItem("cart");
    dispatch({
      type: ADD_TO_CART,
      payload: [],
    });
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ background: "#203040", color: "white" }}
    >
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>
      </Item>

      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop" style={{ color: "white" }}>
          Shop
        </Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart" style={{ color: "white" }}>
          <Badge count={cart.length} size="small" offset={[-9, -15]} />
          Cart
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link style={{ color: "white" }} to="/register">
            Register
          </Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link style={{ color: "white" }} to="/login">
            Login
          </Link>
        </Item>
      )}

      {user && (
        <SubMenu
          className="float-right"
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link style={{ color: "white" }} to="/user/history">
                Dashboard
              </Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logOut}>
            LogOut
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
