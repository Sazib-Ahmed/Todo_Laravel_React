import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter ([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <signup/>
  },
  {
    path: "/user",
    element: <User/>
  },
  {
    path: "/*",
    element: <NotFound/>
  },



])

export default router
