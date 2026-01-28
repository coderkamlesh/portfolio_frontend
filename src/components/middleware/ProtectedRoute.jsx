import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;