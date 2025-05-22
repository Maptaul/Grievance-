import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const ResolvedComplaints = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        // Role-based filtering
        if (role === "citizen" || role === "employee") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) => complaint.email === user.email
          );
        }

        setComplaints(filteredComplaints);
        const users = await employeesRes.json();
        setEmployees(users.filter((emp) => emp.role === "employee"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [t, role, user]);

  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortBy === "none") return 0;
    if (sortBy === "category") {
      const valueA = a.category ?? "";
      const valueB = b.category ?? "";
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      const dateA = new Date(a.timestamp ?? 0);
      const dateB = new Date(b.timestamp ?? 0);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
  });

  const toggleSort = () =>
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");

  const handleViewClick = (complaint) => {
    navigate(`/dashboard/editComplaint/${complaint._id}`, {
      state: { complaint },
    });
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <p className="text-red-600 text-lg font-medium">
          {t("error")}: {error}
        </p>
      </div>
    );

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
          .hover-pulse:hover { animation: pulse 0.3s; }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .map-container iframe {
            width: 100%;
            height: 200px;
            border: 0;
            border-radius: 8px;
          }
          @media (max-width: 768px) {
            .modal-content { max-width: 90%; width: 100%; padding: 1rem; }
            .grid-cols-1-md { grid-template-columns: 1fr; }
            .table-responsive { display: block; overflow-x: auto; white-space: nowrap; }
            .button-full { width: 100%; margin-bottom: 0.5rem; }
            .image-container img { max-width: 100%; height: auto; }
            .map-container iframe { height: 150px; }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .modal-content { max-width: 80%; padding: 1.5rem; }
            .image-container img { max-width: 100%; height: auto; }
            .map-container iframe { height: 180px; }
          }
          @media (min-width: 1025px) {
            .modal-content { max-width: 40%; min-width: 600px; max-width: 700px; padding: 2rem; }
            .image-container img { max-width: 100%; height: auto; }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in">
          {t("resolved_complaints")}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl shadow-lg animate-fade-in">
          <div className="w-full sm:w-auto">
            <label className="text-gray-700 font-semibold mr-2">
              {t("sort_by")}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
            >
              <option value="none">{t("none")}</option>
              <option value="category">{t("category")}</option>
              <option value="timestamp">{t("timestamp")}</option>
            </select>
          </div>
          <button
            onClick={toggleSort}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200 w-full sm:w-auto"
          >
            {sortDirection === "asc" ? t("sort_desc") : t("sort_asc")}
          </button>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4">
          {sortedComplaints.length > 0 ? (
            sortedComplaints.map((complaint, index) => (
              <div
                key={complaint._id}
                className="bg-white p-4 rounded-lg shadow-lg slide-in"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-800 font-medium">
                    {t("serial")}: {index + 1}
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        complaint.status === "Resolved"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {t(`status_${complaint.status.toLowerCase()}`, {
                      defaultValue: complaint.status,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{t("category_tab")}:</span>{" "}
                  {complaint.category || t("na")}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{t("title")}:</span>{" "}
                  {complaint.title || t("na")}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{t("file")}:</span>{" "}
                  {complaint.fileUrl ? (
                    <a
                      href={complaint.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {t("view_file")}
                    </a>
                  ) : (
                    t("na")
                  )}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{t("timestamp")}:</span>{" "}
                  {complaint.timestamp
                    ? new Date(complaint.timestamp).toLocaleString()
                    : t("na")}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() => handleViewClick(complaint)}
                    className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover-glow flex items-center w-full justify-center"
                  >
                    <FaEye className="mr-1" /> {t("view")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              {t("no_pending_complaints")}
            </p>
          )}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block">
          {sortedComplaints.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
              <div className="table-responsive overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-amber-400 to-orange-500 sticky top-0">
                    <tr>
                      {[
                        "s_no",
                        "category_tab",
                        "ward_no",
                        "status",
                        "assigned_employee",
                        "file",
                        "timestamp",
                        "actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 text-left text-white font-semibold text-sm uppercase tracking-wider"
                        >
                          {t(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedComplaints.map((complaint, index) => {
                      const assignedEmployee =
                        employees.find(
                          (emp) => emp._id === complaint.employeeId
                        )?.name || t("not_applicable");
                      return (
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
                            {complaint.category || t("not_applicable")}
                          </td>
                          <td className="py-4 px-4 text-gray-800">
                            {complaint.ward || t("not_applicable")}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800`}
                            >
                              {t(`status_${complaint.status.toLowerCase()}`, {
                                defaultValue: complaint.status,
                              })}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-800">
                            {assignedEmployee}
                          </td>
                          <td className="py-4 px-4">
                            {complaint.fileUrl ? (
                              <a
                                href={complaint.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {t("view_file")}
                              </a>
                            ) : (
                              t("not_applicable")
                            )}
                          </td>
                          <td className="py-4 px-4 text-gray-800">
                            {complaint.timestamp
                              ? new Date(complaint.timestamp).toLocaleString()
                              : t("not_applicable")}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewClick(complaint)}
                                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-1 px-3 rounded-md hover-pulse flex items-center"
                              >
                                <FaEye className="mr-1" /> {t("view")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              {t("no_resolved_complaints")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResolvedComplaints;
