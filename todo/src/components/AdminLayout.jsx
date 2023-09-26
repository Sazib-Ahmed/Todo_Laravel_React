import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function AdminLayout() {
  const { user, token, role } = useStateContext();

  // Check if there is no token or the role is not "admin"
  if (!token || role !== "admin") {
    // Redirect to the appropriate route (e.g., login or unauthorized)
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  );
}
