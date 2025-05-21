import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading, role } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && role && !roles.includes(role)) {
    return <Navigate to="/dashboard" />; // Redirect to dashboard for unauthorized roles
  }

  return children;
};

export default PrivateRoute;
