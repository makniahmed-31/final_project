import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../JS/actions/authaction";
import { LOGGED_IN_USER } from "../../JS/constants/actionTypes";

const PreRegister = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailFormRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem('emailFormRegistration'));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation email
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log("RESULT",result);
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailFormRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user,"idTokenResult",idTokenResult)
        
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
    
        })
        .catch(err => console.log(err));
  
        history.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        type="password"
        value={password}
        placeholder="Password"
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default PreRegister;
