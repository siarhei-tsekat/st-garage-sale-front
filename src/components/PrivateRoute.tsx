import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ publicPage = false }: { publicPage?: boolean }) => {
  const { username } = useAuthStore();

  if (publicPage) {
    return username ? <Navigate to="/" /> : <Outlet />;
  }

  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
