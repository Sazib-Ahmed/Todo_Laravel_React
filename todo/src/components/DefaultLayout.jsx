import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout() {
  const {token, role } = useStateContext();

  // Check if there's a token and the user's role
  if (token) {
      return <Navigate to="/admin" />;
    }


  return (
    <div id="guestLayout">
      <h1>Guest Layout</h1>
      <Outlet />
    </div>
  );
}
