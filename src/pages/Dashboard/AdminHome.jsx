import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminHome = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div>
      <h2>Welcome, {user?.displayName}</h2>
      {role === "administrative" && (
        <p>Administrative dashboard content here.</p>
      )}
    </div>
  );
};

export default AdminHome;
