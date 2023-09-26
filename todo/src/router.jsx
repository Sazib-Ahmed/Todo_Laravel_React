import {createBrowserRouter, Navigate} from "react-router-dom";
import AdminDashboard from "./views/admin/Dashboard.jsx";
import UserDashboard from "./views/user/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import AdminLayout from "./components/AdminLayout";
import GuestLayout from "./components/GuestLayout";
import UserLayout from "./components/UserLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/admin/dashboard"/>
      },
      {
        path: '/admin/dashboard',
        element: <AdminDashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ]
  },
  // {
  //   path: '/',
  //   element: <UserLayout/>,
  //   children: [
  //     {
  //       path: '/',
  //       element: <Navigate to="/users"/>
  //     },
  //     {
  //       path: '/dashboard',
  //       element: <Dashboard/>
  //     },
  //     {
  //       path: '/users',
  //       element: <Users/>
  //     },
  //     {
  //       path: '/users/new',
  //       element: <UserForm key="userCreate" />
  //     },
  //     {
  //       path: '/users/:id',
  //       element: <UserForm key="userUpdate" />
  //     }
  //   ]
  // },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
