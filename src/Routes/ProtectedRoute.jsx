import { Navigate, Outlet } from "react-router-dom";
import useLoginAuthStore from "../Store/useLoginAuthStore.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useLoginAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
