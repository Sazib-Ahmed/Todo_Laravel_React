import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/user/User";
import UserDashboard from "./pages/user/UserDashboard";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import DefaultLayout from "./components/DefaultLayout";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
    ]
  },

  {
    path: "/",
    element: <UserLayout/>,
    children: [
      {
        path: "/user",
        element: <UserDashboard/>
      },
      {
        path: "/dashboard",
        element: <UserDashboard/>
      },
    ]

  },

  {
    path: "/",
    element: <AdminLayout/>,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard/>
      },
      {
        path: "/dashboard",
        element: <AdminDashboard/>
      },
    ]

  },

  {
    path: "*",
    element: <NotFound/>
  },



])

export default router
