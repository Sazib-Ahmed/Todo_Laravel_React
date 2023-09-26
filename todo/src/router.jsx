import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/user/User";
import UserDashboard from "./pages/user/UserDashboard";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import GuestLayout from "./components/GuestLayout";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <GuestLayout/>,
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
        element: <User/>
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
        element: <Admin/>
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
