import { useLocation, Navigate } from "react-router-dom";
import authApi from "./../services/authService";

function RequireAuth({ children }) {
  const location = useLocation();
  const auth = authApi.getCurrentUser();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
