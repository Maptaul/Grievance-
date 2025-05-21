import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const ViewedComplaints = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");

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
        let viewedComplaints = data.filter((c) => c.status === "Viewed");

        // Role-based filtering
        if (role === "citizen") {
          viewedComplaints = viewedComplaints.filter(
            (complaint) => complaint.email === user.email
          );
        }
        // Employees see all Viewed complaints (no filter applied)

        setComplaints(viewedComplaints);
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

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
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

      console.log("Assigning complaint:", {
        complaintId,
        employeeId,
        status: "Assigned",
      });
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
      Swal.fire({
        icon: "success",
        title: t("status_assigned"),
        text: t("complaint_assigned_success"),
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error assigning complaint:", err.message);
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: err.message,
      });
    }
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setShowAssignDropdown(false);
  };

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
        `}
      </style>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 slide-in">
          {t("viewed_complaints")}
        </h1>
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
        {sortedComplaints.length > 0 ? (
          <>
            {/* Desktop: Table View */}
            <div className="hidden md:block bg-white p-6 rounded-xl shadow-lg slide-in">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-teal-500 to-blue-600 sticky top-0">
                    <tr>
                      {[
                        "serial",
                        "category",
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
                            onClick={() => handleView(complaint)}
                            className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover-glow flex items-center hover:bg-blue-700"
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
                    <span className="font-medium">{t("category")}:</span>{" "}
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
                      onClick={() => handleView(complaint)}
                      className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover-glow flex items-center w-full justify-center hover:bg-blue-700"
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

        {/* Modal for Complaint Details */}
        {selectedComplaint && (
          <div className=" inset-0  bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-lg w-full mx-4 slide-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {t("complaint_details")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {t("basic_information")}
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">{t("category")}:</span>{" "}
                        {selectedComplaint.category || t("na")}
                      </p>
                      <p>
                        <span className="font-medium">{t("title")}:</span>{" "}
                        {selectedComplaint.name || t("na")}
                      </p>
                      <p>
                        <span className="font-medium">{t("ward_no")}:</span>{" "}
                        {selectedComplaint.ward || t("na")}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {t("status_timeline")}
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <span className="font-medium">{t("status")}:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-sm ${
                            selectedComplaint.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedComplaint.status === "Viewed"
                              ? "bg-blue-100 text-blue-800"
                              : selectedComplaint.status === "Assigned"
                              ? "bg-purple-100 text-purple-800"
                              : selectedComplaint.status === "Ongoing"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {t(
                            `status_${selectedComplaint.status.toLowerCase()}`,
                            { defaultValue: selectedComplaint.status }
                          )}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">{t("submitted")}:</span>{" "}
                        {selectedComplaint.timestamp
                          ? new Date(
                              selectedComplaint.timestamp
                            ).toLocaleString()
                          : t("na")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {t("description")}
                    </h3>
                    <p className="whitespace-pre-wrap">
                      {selectedComplaint.description || t("no_description")}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {t("attachments_location")}
                    </h3>
                    <div className="space-y-2">
                      <p>
                        {selectedComplaint.fileUrl ? (
                          <a
                            href={selectedComplaint.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {t("view_attached_file")}
                          </a>
                        ) : (
                          <span className="text-gray-400">
                            {t("no_attachments")}
                          </span>
                        )}
                      </p>
                      {selectedComplaint.location && (
                        <p>
                          <a
                            href={`https://www.google.com/maps?q=${selectedComplaint.location.latitude},${selectedComplaint.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {t("view_location_map")}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {role === "administrative" && (
                    <div className="relative w-full sm:w-auto">
                      <button
                        onClick={() =>
                          setShowAssignDropdown(!showAssignDropdown)
                        }
                        className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        {t("assign_complaint")}
                      </button>
                      {showAssignDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-full sm:w-64 border rounded-md shadow-lg bg-white z-10 max-h-48 overflow-y-auto">
                          {employees.length > 0 ? (
                            employees.map((emp) => (
                              <button
                                key={emp._id}
                                onClick={() =>
                                  handleAssign(selectedComplaint._id, emp._id)
                                }
                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-b last:border-b-0"
                              >
                                {emp.name} ({emp.role})
                              </button>
                            ))
                          ) : (
                            <p className="px-4 py-2 text-gray-500">
                              {t("no_employees_available")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={closeModal}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    {t("close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewedComplaints;
