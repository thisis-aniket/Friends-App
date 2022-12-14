import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  return sessionStorage.getItem("username") &&
    sessionStorage.getItem("password") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export { PrivateRoute };

