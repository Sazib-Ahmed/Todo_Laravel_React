import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

export default function Signup() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.data && response.data.message) {
          setMessage(response.data.message);
          if (response.data.data && response.data.data.email) {
            setEmailError(response.data.data.email[0]);
          } else {
            setEmailError("");
          }
          if (response.data.data && response.data.data.password) {
            setPasswordError(response.data.data.password[0]);
          } else {
            setPasswordError("");
          }
        } else {
          setMessage("An error occurred. Please try again later.");
          setEmailError("");
          setPasswordError("");
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          {emailError && (
            <div className="alert">
              <p>{emailError}</p>
            </div>
          )}
          <input ref={passwordRef} type="password" placeholder="Password" />
          {passwordError && (
            <div className="alert">
              <p>{passwordError}</p>
            </div>
          )}
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Repeat Password"
          />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
