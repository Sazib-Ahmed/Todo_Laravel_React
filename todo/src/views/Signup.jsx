import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="wrapper">
    <div className="logo">
      <img
        src="../../public/todo.png"
        alt="Todo"
      />
    </div>
    <div className="text-center mt-4 name">Sign Up</div>
    {errors && (
      <div className="alert alert-danger">
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
    )}
    <form className="p-3 mt-3" onSubmit={onSubmit}>
      <div className="form-field d-flex align-items-center">
        <span className="far fa-user"></span>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Full Name"
          ref={nameRef}
          className="form-control" // Bootstrap class
        />
      </div>
      <div className="form-field d-flex align-items-center">
        <span className="far fa-envelope"></span>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          ref={emailRef}
          className="form-control" // Bootstrap class
        />
      </div>
      <div className="form-field d-flex align-items-center">
        <span className="fas fa-key"></span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          className="form-control" // Bootstrap class
        />
      </div>
      <div className="form-field d-flex align-items-center">
        <span className="fas fa-key"></span>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Repeat Password"
          ref={passwordConfirmationRef}
          className="form-control" // Bootstrap class
        />
      </div>
      <button className="btn btn-primary mt-3" type="submit">
        Sign Up
      </button>
    </form>
    <div className="text-center fs-6">
      Already registered? <Link to="/login">Login</Link>
    </div>
  </div>
  )
}
