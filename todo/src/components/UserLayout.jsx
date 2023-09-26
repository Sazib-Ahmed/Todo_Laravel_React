import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
//import axiosClient from "../axios-client.js";
//import {useEffect} from "react";

export default function UserLayout() {
  const {user, token} = useStateContext();
  if (!token) {
  //if (!token ) {

    return <Navigate to="/login"/>
  }

  return (
    <div>
      <h1>User Layout</h1>

      <Outlet />
    </div>
  )
}
