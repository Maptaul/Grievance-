import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const COLORS = ["#ff6f61", "#640D5F", "#0f766e", "#f59e0b", "#4b5563"]; // Adjusted colors for 5 statuses: red-500, purple-900, teal-600, amber-500, gray-600

const AdminHome = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingComplaints: 0,
    viewedComplaints: 0,
    assignedComplaints: 0,
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
          const usersResponse = await fetch("http://localhost:3000/users");
          if (!usersResponse.ok) throw new Error(t("error_fetch_users"));
          const users = await usersResponse.json();

          const complaintsResponse = await fetch(
            "http://localhost:3000/complaints"
          );
          if (!complaintsResponse.ok)
            throw new Error(t("error_fetch_complaints"));
          const complaintsData = await complaintsResponse.json();

          setComplaints(complaintsData);
          setStats({
            totalUsers: users.length,
            pendingComplaints: complaintsData.filter(
              (c) => c.status === "Pending"
            ).length,
            viewedComplaints: complaintsData.filter(
              (c) => c.status === "Viewed"
            ).length,
            assignedComplaints: complaintsData.filter(
              (c) => c.status === "Assigned"
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
  }, [role, t]);

  // Process chart data
  const categoryData = complaints.reduce((acc, complaint) => {
    const category = complaint.category || t("others");
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = Object.entries(categoryData).map(
    ([name, complaints]) => ({
      name,
      complaints,
    })
  );

  const statusChartData = [
    { name: t("pending"), value: stats.pendingComplaints },
    { name: t("viewed"), value: stats.viewedComplaints },
    { name: t("assigned"), value: stats.assignedComplaints },
    { name: t("ongoing"), value: stats.ongoingComplaints },
    { name: t("resolved"), value: stats.resolvedComplaints },
  ].filter((entry) => entry.value > 0); // Remove zero values for cleaner pie chart

  const handlePendingClick = () => {
    setViewMode("pending");
  };

  const handleViewedClick = () => {
    setViewMode("viewed");
  };

  const handleAssignedClick = () => {
    setViewMode("assigned");
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
        `http://localhost:3000/complaints/${complaint._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Viewed" }),
        }
      );

      if (!response.ok) throw new Error(t("error_update_complaint_status"));

      await Swal.fire({
        icon: "success",
        title: t("status_updated"),
        text: t("complaint_status_changed_to_viewed"),
        timer: 2000,
        showConfirmButton: false,
      });

      const updatedComplaints = complaints.map((c) =>
        c._id === complaint._id ? { ...c, status: "Viewed" } : c
      );
      setComplaints(updatedComplaints);
      navigate(`/dashboard/editComplaint/${complaint._id}`, {
        state: { complaint },
      });
    } catch (err) {
      console.error("Error updating complaint:", err);
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("failed_to_update_complaint_status"),
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">
          {t("error")}: {error}
        </p>
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
              alt={t("profile_alt")}
              className="w-20 h-20 rounded-full border-4 border-white object-cover transform hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-md">
                {t("welcome")}, {user?.displayName || t("admin")}
              </h2>
              <p className="mt-1 text-amber-100 text-lg">
                {t("manage_system_activity")}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {viewMode === "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                // {
                //   title: t("total_users"),
                //   value: stats.totalUsers,
                //   icon: <FaUsers className="text-4xl text-teal-600" />,
                //   gradient: "from-teal-400 to-teal-600",
                // },
                {
                  title: t("pending_complaints"),
                  value: stats.pendingComplaints,
                  icon: (
                    <FaExclamationTriangle className="text-4xl text-red-600" />
                  ),
                  gradient: "from-red-400 to-red-600",
                },
                {
                  title: t("viewed_complaints"),
                  value: stats.viewedComplaints,
                  icon: <FaEye className="text-4xl text-purple-600" />,
                  gradient: "from-purple-400 to-purple-600",
                },
                {
                  title: t("assigned_complaints"),
                  value: stats.assignedComplaints,
                  icon: <FaUsers className="text-4xl text-yellow-600" />,
                  gradient: "from-yellow-400 to-yellow-600",
                },
                {
                  title: t("ongoing_complaints"),
                  value: stats.ongoingComplaints,
                  icon: <FaClock className="text-4xl text-blue-600" />,
                  gradient: "from-blue-400 to-blue-600",
                },
                {
                  title: t("resolved_complaints"),
                  value: stats.resolvedComplaints,
                  icon: <FaCheckCircle className="text-4xl text-green-600" />,
                  gradient: "from-green-400 to-green-600",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-md bg-gradient-to-br ${card.gradient} text-white animate-fade-in`}
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
          {["pending", "viewed", "assigned", "ongoing", "resolved"].includes(
            viewMode
          ) &&
            complaints.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                <button
                  className="mb-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg hover-pulse"
                  onClick={handleBackToStats}
                >
                  {t("back_to_dashboard")}
                </button>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-amber-400 to-orange-500 sticky top-0">
                      <tr>
                        {[
                          t("serial"),
                          t("category"),
                          t("title"),
                          t("status"),
                          t("actions"),
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
                                    : complaint.status === "Viewed"
                                    ? "bg-purple-200 text-purple-800"
                                    : complaint.status === "Assigned"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : complaint.status === "Ongoing"
                                    ? "bg-blue-200 text-blue-800"
                                    : "bg-green-200 text-green-800"
                                }`}
                              >
                                {t(complaint.status.toLowerCase())}
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
                                <FaEye className="mr-1" /> {t("view")}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* Charts Section */}
          {viewMode === "stats" && (
            <div className="space-y-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {t("complaint_analytics")}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart: Complaints by Category */}
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {t("complaints_by_category")}
                  </h3>
                  {categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={categoryChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="complaints" fill="#640D5F" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500">{t("no_category_data")}</p>
                  )}
                </div>

                {/* Pie Chart: Complaint Status */}
                <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {t("complaint_status_distribution")}
                  </h3>
                  {statusChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(0)}%)`
                          }
                          outerRadius={100}
                          dataKey="value"
                        >
                          {statusChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500">{t("no_status_data")}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
