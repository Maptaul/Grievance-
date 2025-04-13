import { useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
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
  const [viewMode, setViewMode] = useState("stats"); // State to track view: "stats", "pending", "ongoing", or "resolved"
  const [complaints, setComplaints] = useState([]); // State to store all complaints

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "administrative") {
      const fetchData = async () => {
        try {
          // Fetch users
          const usersResponse = await fetch(
            "https://grievance-server.vercel.app/users"
          );
          if (!usersResponse.ok) throw new Error("Failed to fetch users");
          const users = await usersResponse.json();

          // Fetch complaints
          const complaintsResponse = await fetch(
            "https://grievance-server.vercel.app/complaints"
          );
          if (!complaintsResponse.ok)
            throw new Error("Failed to fetch complaints");
          const complaintsData = await complaintsResponse.json();

          // Store all complaints for later use
          setComplaints(complaintsData);

          // Calculate stats based on fetched data
          setStats({
            totalUsers: users.length,
            pendingComplaints: complaintsData.filter(
              (c) => c.status === "Pending"
            ).length,
            ongoingComplaints: complaintsData.filter(
              (c) => c.status === "Ongoing"
            ).length,
            resolvedComplaints: complaintsData.filter(
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

  const handlePendingClick = () => {
    setViewMode("pending"); // Show pending complaints table
  };

  const handleOngoingClick = () => {
    setViewMode("ongoing"); // Show ongoing complaints table
  };

  const handleResolvedClick = () => {
    setViewMode("resolved"); // Show resolved complaints table
  };

  const handleBackToStats = () => {
    setViewMode("stats"); // Return to stats cards view
  };

  const handleEditClick = async (complaint) => {
    try {
      // Update complaint status to "Ongoing" on the server
      const response = await fetch(
        `https://grievance-server.vercel.app/complaints/${complaint._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Ongoing" }),
        }
      );

      if (!response.ok) throw new Error("Failed to update complaint status");

      // Show SweetAlert2 confirmation
      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Complaint status changed to Ongoing!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Update local state to reflect the change
      const updatedComplaints = complaints.map((c) =>
        c._id === complaint._id ? { ...c, status: "Ongoing" } : c
      );
      setComplaints(updatedComplaints);

      // Navigate to the edit page with the complaint data
      navigate(`/dashboard/editComplaint/${complaint._id}`, {
        state: { complaint },
      });
    } catch (err) {
      console.error("Error updating complaint:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update complaint status. Please try again.",
      });
    }
  };

  if (loading) {
    return <Loading />;
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
          {viewMode === "stats" && (
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

              {/* Pending Complaints Card (Clickable) */}
              <div
                className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors cursor-pointer"
                onClick={handlePendingClick}
              >
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

              {/* Ongoing Complaints Card (Clickable) */}
              <div
                className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors cursor-pointer"
                onClick={handleOngoingClick}
              >
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

              {/* Resolved Complaints Card (Clickable) */}
              <div
                className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-amber-50 transition-colors cursor-pointer"
                onClick={handleResolvedClick}
              >
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
          )}

          {/* Pending Complaints Table */}
          {viewMode === "pending" && complaints.length > 0 && (
            <div className="overflow-x-auto">
              <button
                className="btn btn-secondary mb-4"
                onClick={handleBackToStats}
              >
                Back to Dashboard
              </button>
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Serial
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints
                    .filter((complaint) => complaint.status === "Pending")
                    .map((complaint, index) => (
                      <tr
                        key={complaint._id}
                        className="border-b hover:bg-amber-50"
                      >
                        <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.category}
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-sm font-semibold">
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEditClick(complaint)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Ongoing Complaints Table */}
          {viewMode === "ongoing" && complaints.length > 0 && (
            <div className="overflow-x-auto">
              <button
                className="btn btn-secondary mb-4"
                onClick={handleBackToStats}
              >
                Back to Dashboard
              </button>
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Serial
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints
                    .filter((complaint) => complaint.status === "Ongoing")
                    .map((complaint, index) => (
                      <tr
                        key={complaint._id}
                        className="border-b hover:bg-amber-50"
                      >
                        <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.category}
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold">
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleEditClick(complaint)}
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Resolved Complaints Table */}
          {viewMode === "resolved" && complaints.length > 0 && (
            <div className="overflow-x-auto">
              <button
                className="btn btn-secondary mb-4"
                onClick={handleBackToStats}
              >
                Back to Dashboard
              </button>
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Serial
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints
                    .filter((complaint) => complaint.status === "Resolved")
                    .map((complaint, index) => (
                      <tr
                        key={complaint._id}
                        className="border-b hover:bg-amber-50"
                      >
                        <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.category}
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {complaint.name}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800 text-sm font-semibold">
                            {complaint.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHome;