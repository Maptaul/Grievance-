import { useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminHome = () => {
  const { user, role } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingComplaints: 0,
    ongoingComplaints: 0,
    resolvedComplaints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role === "administrative") {
      const fetchData = async () => {
        try {
          // Fetch users
          const usersResponse = await fetch("http://localhost:3000/users");
          if (!usersResponse.ok) throw new Error("Failed to fetch users");
          const users = await usersResponse.json();

          // Fetch complaints
          const complaintsResponse = await fetch(
            "http://localhost:3000/complaints"
          );
          if (!complaintsResponse.ok)
            throw new Error("Failed to fetch complaints");
          const complaints = await complaintsResponse.json();

          // Calculate stats based on fetched data
          setStats({
            totalUsers: users.length,
            pendingComplaints: complaints.filter((c) => c.status === "Pending")
              .length,
            ongoingComplaints: complaints.filter((c) => c.status === "Ongoing")
              .length,
            resolvedComplaints: complaints.filter(
              (c) => c.status === "Resolved"
            ).length,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {role === "administrative" && (
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src={user?.photoURL || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-amber-300 object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {user?.displayName || "Admin"}
              </h2>
              <p className="mt-1 text-gray-600">
                Your administrative dashboard for managing system activity.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Total Users Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors">
              <div className="p-3 bg-amber-200 rounded-full">
                <FaUsers className="text-3xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.totalUsers}
                </p>
              </div>
            </div>

            {/* Pending Complaints Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors">
              <div className="p-3 bg-amber-200 rounded-full">
                <FaExclamationTriangle className="text-3xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Pending Complaints
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.pendingComplaints}
                </p>
              </div>
            </div>

            {/* Ongoing Complaints Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors">
              <div className="p-3 bg-amber-200 rounded-full">
                <FaClock className="text-3xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Ongoing Complaints
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.ongoingComplaints}
                </p>
              </div>
            </div>

            {/* Resolved Complaints Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors">
              <div className="p-3 bg-amber-200 rounded-full">
                <FaCheckCircle className="text-3xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">
                  Resolved Complaints
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.resolvedComplaints}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
