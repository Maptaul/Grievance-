import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const ViewedComplaints = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

  // Multi-step dropdown states for assigning complaints
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [designationSearch, setDesignationSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, employeesRes] = await Promise.all([
          fetch("http://localhost:3000/complaints"),
          fetch("http://localhost:3000/users"),
        ]);
        if (!complaintsRes.ok) throw new Error(t("error_fetch_complaints"));
        if (!employeesRes.ok) throw new Error(t("error_fetch_employees"));
        const data = await complaintsRes.json();
        let filteredComplaints = data;

        // Role-based filtering
        if (role === "citizen") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) =>
              complaint.email === user.email && complaint.status === "Pending"
          );
        } else if (role === "employee") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) =>
              complaint.employeeId === user._id &&
              complaint.status === "Assigned"
          );
        } else if (role === "administrative") {
          filteredComplaints = filteredComplaints.filter(
            (c) => c.status === "Viewed"
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

  const handleViewClick = (complaint) => {
    navigate(`/dashboard/viewComplaint/${complaint._id}`, { state: { complaint } });
  };

  const handleAssign = async (complaintId, employeeId) => {
    if (role !== "administrative") {
      Swal.fire({
        icon: "error",
        title: t("unauthorized"),
        text: t("only_admin_can_assign"),
      });
      return;
    }

    try {
      const complaintToAssign = complaints.find((c) => c._id === complaintId);
      if (complaintToAssign.status !== "Viewed") {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("cannot_assign_non_viewed_complaint"),
        });
        return;
      }

      const response = await fetch(
        `http://localhost:3000/complaints/${complaintId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Assigned", employeeId }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${t("error_assign_status")}: ${errorText}`);
      }

      const updatedComplaints = complaints.filter(
        (c) => c._id !== complaintId // Remove from Viewed list
      );
      setComplaints(updatedComplaints);
      setSelectedComplaint(null);
      setShowAssignDropdown(false);
      resetAssignDropdown();

      Swal.fire({
        icon: "success",
        title: t("status_assigned"),
        text: t("complaint_assigned_success"),
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate back after assignment
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/dashboard/ManageComplaints/viewed");
      }
    } catch (err) {
      console.error("Error assigning complaint:", err.message);
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: err.message,
      });
    }
  };

  const resetAssignDropdown = () => {
    setSelectedDepartment(null);
    setSelectedDesignation(null);
    setDepartmentSearch("");
    setDesignationSearch("");
    setEmployeeSearch("");
  };

  const closeAssignDropdown = () => {
    setShowAssignDropdown(false);
    resetAssignDropdown();
  };

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

  // Extract unique departments and designations
  const departments = [
    ...new Set(employees.map((emp) => emp.department)),
  ].filter(Boolean);
  const designations = selectedDepartment
    ? [
        ...new Set(
          employees
            .filter((emp) => emp.department === selectedDepartment)
            .map((emp) => emp.designation)
        ),
      ].filter(Boolean)
    : [];
  const filteredEmployees = selectedDesignation
    ? employees.filter(
        (emp) =>
          emp.department === selectedDepartment &&
          emp.designation === selectedDesignation
      )
    : [];

  // Search filtering
  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(departmentSearch.toLowerCase())
  );
  const filteredDesignations = designations.filter((desg) =>
    desg.toLowerCase().includes(designationSearch.toLowerCase())
  );
  const filteredEmployeeNames = filteredEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-100">
        <p className="text-red-600 text-lg font-medium">
          {t("error")}: {error}
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-tr from-teal-50 to-blue-100 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          .font-sans { font-family: 'Roboto', sans-serif; }
          .slide-in { animation: slideIn 0.6s ease-out; }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .hover-glow:hover { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          .status-dot { width: 10px; height: 10px; border-radius: 50%; }
          .dropdown-slide { animation: dropdownSlide 0.3s ease-out; }
          @keyframes dropdownSlide {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Sort and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl shadow-lg slide-in">
          <div className="w-full sm:w-auto">
            <label className="text-gray-700 font-semibold mr-2">
              {t("sort_by")}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto"
            >
              <option value="none">{t("none")}</option>
              <option value="category">{t("category")}</option>
              <option value="timestamp">{t("timestamp")}</option>
            </select>
          </div>
          <button
            onClick={toggleSort}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 w-full sm:w-auto"
          >
            {sortDirection === "asc" ? t("sort_asc") : t("sort_desc")}
          </button>
        </div>

        {/* Viewed Complaints List */}
        {sortedComplaints.length > 0 ? (
          <>
            {/* Desktop: Table View */}
            <div className="hidden md:block bg-white p-6 rounded-xl shadow-lg slide-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t("viewed_complaints")}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-teal-500 to-blue-600 sticky top-0">
                    <tr>
                      {[
                        "serial",
                        "category_tab",
                        "title",
                        "status",
                        "file",
                        "timestamp",
                        "actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 text-left text-white font-medium uppercase tracking-wide"
                        >
                          {t(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedComplaints.map((complaint, index) => (
                      <tr
                        key={complaint._id}
                        className={`hover:bg-teal-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.category || t("na")}
                        </td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.name || t("na")}
                        </td>
                        <td className="py-4 px-4">
                          <span className="flex items-center gap-2">
                            <span className={`status-dot bg-blue-400`}></span>
                            {t(`status_${complaint.status.toLowerCase()}`, {
                              defaultValue: complaint.status,
                            })}
                          </span>
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
                            t("na")
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.timestamp
                            ? new Date(complaint.timestamp).toLocaleString()
                            : t("na")}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewClick(complaint)}
                            className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover-glow flex items-center"
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

            {/* Mobile: Card View */}
            <div className="block md:hidden space-y-4">
              {sortedComplaints.map((complaint, index) => (
                <div
                  key={complaint._id}
                  className="bg-white p-4 rounded-lg shadow-lg slide-in"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800 font-medium">
                      {t("serial")}: {index + 1}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className={`status-dot bg-blue-400`}></span>
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
                    {complaint.name || t("na")}
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
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center">
            {t("no_viewed_complaints")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewedComplaints;