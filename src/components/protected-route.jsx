import { useAuth } from "../services/auth";
import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ element }) => {
  let auth = useAuth();

  return auth.user ? element : <Navigate to="/login" replace />;
};
