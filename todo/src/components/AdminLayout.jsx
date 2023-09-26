import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
//import axiosClient from "../axios-client.js";
//import {useEffect} from "react";

export default function AdminLayout() {
  const {user, token} = useStateContext();
  if (!token) {
    return <Navigate to="/login"/>
  }

  return (
    <div>
      <h1>Admin Layout</h1>

      <Outlet/>
    </div>
  )
}
