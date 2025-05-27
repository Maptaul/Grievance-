import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
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
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const FORMAL_COLORS = ["#1e3a8a", "#4b5563", "#6b7280", "#9ca3af"]; // navy-900, gray-600, gray-500, gray-400

const EmployeeHome = () => {
  const { user, role } = useContext(AuthContext);
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    assignedComplaints: 0,
    pendingComplaints: 0,
    ongoingComplaints: 0,
    resolvedComplaints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [complaintsRes, employeesRes] = await Promise.all([
          fetch("https://grievance-server.vercel.app/complaints"),
          fetch("https://grievance-server.vercel.app/users"),
        ]);
        if (!complaintsRes.ok) throw new Error(t("error_fetch_complaints"));
        if (!employeesRes.ok) throw new Error(t("error_fetch_employees"));
        const complaintsData = await complaintsRes.json();
        let filteredComplaints = complaintsData.filter(
          (complaint) => complaint.status === "Resolved"
        );
        setComplaints(filteredComplaints);
        setStats({
          assignedComplaints: filteredComplaints.length,
          pendingComplaints: filteredComplaints.filter(
            (c) => c.status === t("status_pending")
          ).length,
          ongoingComplaints: filteredComplaints.filter(
            (c) =>
              c.status === t("status_viewed") ||
              c.status === t("status_assigned")
          ).length,
          resolvedComplaints: filteredComplaints.filter(
            (c) => c.status === t("status_resolved")
          ).length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [t]);

  // Process chart data
  const categoryData = complaints.reduce((acc, complaint) => {
    const category = complaint.category || t("category_others");
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = Object.entries(categoryData).map(
    ([name, complaints]) => ({ name, complaints })
  );

  const statusChartData = [
    { name: t("status_pending"), value: stats.pendingComplaints },
    { name: t("status_ongoing"), value: stats.ongoingComplaints },
    { name: t("status_resolved"), value: stats.resolvedComplaints },
  ];

  if (loading) {
    return <Loading message={t("loading")} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
        <p className="text-red-500 text-xl font-semibold">
          {t("error")}: {error}
        </p>
      </div>
    );
  }

  // Fallback user data
  const defaultUser = {
    name: user?.displayName || user?.email?.split("@")[0] || t("employee"),
    photo: user?.photoURL || "https://via.placeholder.com/80",
  };
  const profileData = defaultUser;

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50 font-poppins">
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
        `}
      </style>
      {role === "employee" && (
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gray-200 p-4 rounded-lg shadow-sm flex items-center space-x-3 animate-fade-in">
            <img
              src={profileData.photo}
              alt={t("profile_image_alt")}
              className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {t("welcome_employee")}, {profileData.name}!
              </h2>
              <p className="mt-1 text-gray-600 text-base">
                {t("manage_tasks_message")}
              </p>
            </div>
          </div>

          {/* Stats Cards (Static Display) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: t("assigned_complaints"),
                value: stats.assignedComplaints,
                icon: <FaUsers className="text-3xl text-gray-600" />,
                bgColor: "bg-gray-100",
              },
              {
                title: t("pending_complaints"),
                value: stats.pendingComplaints,
                icon: (
                  <FaExclamationTriangle className="text-3xl text-red-500" />
                ),
                bgColor: "bg-gray-100",
              },
              {
                title: t("ongoing_complaints"),
                value: stats.ongoingComplaints,
                icon: <FaClock className="text-3xl text-blue-500" />,
                bgColor: "bg-gray-100",
              },
              {
                title: t("resolved_complaints"),
                value: stats.resolvedComplaints,
                icon: <FaCheckCircle className="text-3xl text-green-500" />,
                bgColor: "bg-gray-100",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm ${card.bgColor} text-gray-800 animate-fade-in border border-gray-200`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-200 rounded-full">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{card.title}</h3>
                    <p className="text-2xl font-semibold">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("complaint_analytics")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bar Chart: Complaints by Category */}
              <div className="bg-white p-4 rounded-lg shadow-sm animate-fade-in">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  {t("complaints_by_category")}
                </h3>
                {categoryChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={categoryChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderColor: "#e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="complaints" fill="#1e3a8a" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">{t("no_category_data")}</p>
                )}
              </div>

              {/* Pie Chart: Complaint Status Distribution */}
              <div className="bg-white p-4 rounded-lg shadow-sm animate-fade-in">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
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
                            fill={FORMAL_COLORS[index % FORMAL_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderColor: "#e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">{t("no_status_data")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHome;
