import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
  const { user, token, roles } = useStateContext();

  if (token && roles === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }
  if (token && roles === "user") {
    return <Navigate to="/user/dashboard" />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}
