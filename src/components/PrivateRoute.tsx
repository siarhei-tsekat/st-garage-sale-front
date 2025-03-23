import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ publicPage = false }: { publicPage?: boolean }) => {
  const { user } = useAuthStore();

  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
