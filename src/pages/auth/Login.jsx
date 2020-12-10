import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../JS/actions/authaction";
import { LOGGED_IN_USER } from "../../JS/constants/actionTypes";

const Login = ({ history }) => {
  const [email, setEmail] = useState("ahmed.hadjsaad@iit.ens.tn");
  const [password, setPassword] = useState("azerty");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email,password);
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        // history.push("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="Your email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <br />
      <Button
        type="primary"
        className="mb-3"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5" style={{ height: "79vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          {loginForm()}
          <Button
            type="danger"
            className="mb-3"
            onClick={googleLogin}
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link
            to="/Forgot/Password"
            className="float-right text-danger"
            style={{ textDecoration: "underline" }}
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
