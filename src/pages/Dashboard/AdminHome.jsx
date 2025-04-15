import { useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
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
  const [viewMode, setViewMode] = useState("stats");
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "administrative") {
      const fetchData = async () => {
        try {
          const usersResponse = await fetch(
            "https://grievance-server.vercel.app/users"
          );
          if (!usersResponse.ok) throw new Error("Failed to fetch users");
          const users = await usersResponse.json();

          const complaintsResponse = await fetch(
            "https://grievance-server.vercel.app/complaints"
          );
          if (!complaintsResponse.ok)
            throw new Error("Failed to fetch complaints");
          const complaintsData = await complaintsResponse.json();

          setComplaints(complaintsData);
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
    setViewMode("pending");
  };

  const handleOngoingClick = () => {
    setViewMode("ongoing");
  };

  const handleResolvedClick = () => {
    setViewMode("resolved");
  };

  const handleBackToStats = () => {
    setViewMode("stats");
  };

  const handleViewClick = (complaint) => {
    navigate(`/dashboard/editComplaint/${complaint._id}`, {
      state: { complaint },
    });
  };

  const handleEditClick = async (complaint) => {
    try {
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

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Complaint status changed to Ongoing!`,
        timer: 2000,
        showConfirmButton: false,
      });

      const updatedComplaints = complaints.map((c) =>
        c._id === complaint._id ? { ...c, status: "Ongoing" } : c
      );
      setComplaints(updatedComplaints);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hover-scale:hover { transform: scale(1.03); transition: transform 0.2s ease; }
          .hover-pulse:hover { animation: pulse 0.3s; }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      {role === "administrative" && (
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-xl shadow-lg flex items-center space-x-4 animate-fade-in">
            <img
              src={user?.photoURL || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white object-cover transform hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-md">
                Welcome, {user?.displayName || "Admin"}
              </h2>
              <p className="mt-1 text-amber-100 text-lg">
                Manage system activity with ease and efficiency.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {viewMode === "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Users",
                  value: stats.totalUsers,
                  icon: <FaUsers className="text-4xl text-teal-600" />,
                  gradient: "from-teal-400 to-teal-600",
                },
                {
                  title: "Pending Complaints",
                  value: stats.pendingComplaints,
                  icon: (
                    <FaExclamationTriangle className="text-4xl text-red-600" />
                  ),
                  gradient: "from-red-400 to-red-600",
                  onClick: handlePendingClick,
                },
                {
                  title: "Ongoing Complaints",
                  value: stats.ongoingComplaints,
                  icon: <FaClock className="text-4xl text-blue-600" />,
                  gradient: "from-blue-400 to-blue-600",
                  onClick: handleOngoingClick,
                },
                {
                  title: "Resolved Complaints",
                  value: stats.resolvedComplaints,
                  icon: <FaCheckCircle className="text-4xl text-green-600" />,
                  gradient: "from-green-400 to-green-600",
                  onClick: handleResolvedClick,
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-md hover-scale cursor-pointer bg-gradient-to-br ${card.gradient} text-white animate-fade-in`}
                  onClick={card.onClick}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white bg-opacity-30 rounded-full">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="text-3xl font-bold">{card.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Complaints Tables */}
          {["pending", "ongoing", "resolved"].includes(viewMode) &&
            complaints.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                <button
                  className="mb-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover-pulse"
                  onClick={handleBackToStats}
                >
                  Back to Dashboard
                </button>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-amber-400 to-orange-500 sticky top-0">
                      <tr>
                        {[
                          "Serial",
                          "Category",
                          "Title",
                          "Status",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="py-3 px-4 text-left text-white font-semibold text-sm uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {complaints
                        .filter(
                          (complaint) =>
                            complaint.status ===
                            viewMode.charAt(0).toUpperCase() + viewMode.slice(1)
                        )
                        .map((complaint, index) => (
                          <tr
                            key={complaint._id}
                            className={`hover:bg-amber-50 transition-colors ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="py-4 px-4 text-gray-800">
                              {index + 1}
                            </td>
                            <td className="py-4 px-4 text-gray-800">
                              {complaint.category}
                            </td>
                            <td className="py-4 px-4 text-gray-800">
                              {complaint.name}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                  complaint.status === "Pending"
                                    ? "bg-red-200 text-red-800"
                                    : complaint.status === "Ongoing"
                                    ? "bg-blue-200 text-blue-800"
                                    : "bg-green-200 text-green-800"
                                }`}
                              >
                                {complaint.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() =>
                                  viewMode === "pending"
                                    ? handleEditClick(complaint)
                                    : handleViewClick(complaint)
                                }
                                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-1 px-3 rounded-md hover-pulse flex items-center"
                              >
                                <FaEye className="mr-1" /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
