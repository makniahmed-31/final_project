import React, { useEffect, useState } from "react";
import {auth} from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({history}) => {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ActionCodeSettings = {
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, ActionCodeSettings);
    toast.success(
      `Email is sent to ${email}, Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem('emailFormRegistration', email);
    // clear input case if not valid
    setEmail("");

  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Your email'
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="form-control"
      />
      <br/>
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;