import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (user && !loading) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
