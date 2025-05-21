import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const AssignedComplaints = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [employees, setEmployees] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [photo, setPhoto] = useState(null);

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
        let assignedComplaints = data.filter((c) => c.status === "Assigned");

        if (role === "citizen") {
          assignedComplaints = assignedComplaints.filter(
            (complaint) => complaint.email === user.email
          );
        }

        setComplaints(assignedComplaints);
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

  const handleView = async (id) => {
    const complaint = complaints.find((c) => c._id === id);
    if (role === "employee" && complaint.status === "Assigned") {
      try {
        const updatedHistory = [
          ...(complaint.history || []),
          { status: "Ongoing", timestamp: new Date().toISOString() },
        ];
        const response = await fetch(`http://localhost:3000/complaints/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Ongoing", history: updatedHistory }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${t("error_update_status")}: ${errorText}`);
        }
        const updatedComplaints = complaints.map((c) =>
          c._id === id
            ? { ...c, status: "Ongoing", history: updatedHistory }
            : c
        );
        setComplaints(updatedComplaints);
      } catch (err) {
        Swal.fire({ icon: "error", title: t("error"), text: err.message });
      }
    }
    const history = complaint.history || [
      { status: complaint.status, timestamp: new Date().toISOString() },
    ];
    setSelectedComplaint({ ...complaint, history });
    setPhoto(null);
  };

  const handleResolve = async (id) => {
    if (role !== "employee") {
      Swal.fire({
        icon: "error",
        title: t("unauthorized"),
        text: t("only_employees_can_update_status"),
      });
      return;
    }
    const complaint = complaints.find((c) => c._id === id);
    if (complaint.status !== "Ongoing") {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("invalid_status_transition"),
      });
      return;
    }
    if (!photo) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("photo_required"),
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("status", "Resolved");
      formData.append("photo", photo);

      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${t("error_update_status")}: ${errorText}`);
      }
      const updatedComplaints = complaints.filter((c) => c._id !== id);
      setComplaints(updatedComplaints);
      setSelectedComplaint(null);
      setPhoto(null);
    } catch (err) {
      Swal.fire({ icon: "error", title: t("error"), text: err.message });
    }
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setPhoto(null);
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
          {t("assigned_complaints")}
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
        {sortedComplaints.length > 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <div className="table-responsive overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-amber-400 to-orange-500 sticky top-0">
                  <tr>
                    {[
                      "s_no",
                      "category",
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
                      employees.find((emp) => emp._id === complaint.employeeId)
                        ?.name || t("n_a");
                    return (
                      <tr
                        key={complaint._id}
                        className={`hover:bg-amber-50 transition-colors ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="py-4 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.category || t("n_a")}
                        </td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.ward || t("n_a")}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-200 text-yellow-800`}
                          >
                            {complaint.status || t("n_a")}
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
                            t("n_a")
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-800">
                          {complaint.timestamp
                            ? new Date(complaint.timestamp).toLocaleString()
                            : t("n_a")}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleView(complaint._id)}
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
            {t("no_assigned_complaints")}
          </p>
        )}

        {selectedComplaint && (
          <div className=" inset-0  bg-opacity-75 flex items-center justify-center z-50">
            <div className="modal-content bg-white p-4 md:p-6 rounded-xl shadow-xl animate-fade-in">
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
                {t("edit_complaint")}
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
                  {t("complaint_details")}
                </h3>
                <div className="bg-gray-100 p-4 rounded-b-md space-y-2">
                  <p>
                    <span className="font-medium">{t("id")}:</span>{" "}
                    {selectedComplaint._id || t("n_a")}
                  </p>
                  <p>
                    <span className="font-medium">{t("title")}:</span>{" "}
                    {selectedComplaint.title || t("n_a")}
                  </p>
                  <p>
                    <span className="font-medium">{t("category")}:</span>{" "}
                    {selectedComplaint.category || t("n_a")}
                  </p>
                  <p>
                    <span className="font-medium">{t("status")}:</span>{" "}
                    {selectedComplaint.status || t("n_a")}
                  </p>
                  <p>
                    <span className="font-medium">{t("user_email")}:</span>{" "}
                    {selectedComplaint.email || t("anonymous")}
                  </p>
                  <p>
                    <span className="font-medium">
                      {t("assigned_employee")}:
                    </span>{" "}
                    {employees.find(
                      (emp) => emp._id === selectedComplaint.employeeId
                    )?.name || t("n_a")}
                  </p>
                  <p>
                    <span className="font-medium">{t("created_at")}:</span>{" "}
                    {selectedComplaint.timestamp
                      ? new Date(selectedComplaint.timestamp).toLocaleString()
                      : t("n_a")}
                  </p>
                  <div>
                    <span className="font-medium">{t("location")}:</span>{" "}
                    {selectedComplaint.location ? (
                      <div className="mt-2">
                        <a
                          href={`https://www.google.com/maps?q=${selectedComplaint.location.latitude},${selectedComplaint.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center mt-2"
                        >
                          <FaMapMarkerAlt className="mr-1" />
                          {t("view_on_map")}
                        </a>
                      </div>
                    ) : (
                      t("n_a")
                    )}
                  </div>
                  {selectedComplaint.fileUrl && (
                    <div className="image-container">
                      <span className="font-medium">
                        {t("original_image")}:
                      </span>{" "}
                      <img
                        src={selectedComplaint.fileUrl}
                        alt={t("original_image")}
                        className="mt-2 max-w-full h-auto border rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
                  {t("update_history")}
                </h3>
                <div className="bg-gray-100 p-4 rounded-b-md space-y-4">
                  {selectedComplaint.history?.length > 0 ? (
                    selectedComplaint.history.map((update, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-teal-500 pl-4"
                      >
                        <h4 className="font-medium">
                          {t("update")} #{index + 1}
                        </h4>
                        <p>
                          <span className="font-medium">
                            {t("updated_at")}:
                          </span>{" "}
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                        {update.fileUrl && (
                          <div className="image-container mt-2">
                            <span className="font-medium">
                              {t("updated_image")} #{index + 1}:
                            </span>{" "}
                            <img
                              src={update.fileUrl}
                              alt={t("updated_image")}
                              className="mt-1 max-w-full h-auto border rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">{t("no_history_available")}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white bg-teal-500 p-2 rounded-t-md">
                  {t("photo")}
                </h3>
                <div className="bg-gray-100 p-4 rounded-b-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="mb-2 w-full"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white bg-teal-500 p-2 rounded-t-md">
                  {t("description")}
                </h3>
                <div className="bg-gray-100 p-4 rounded-b-md">
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder={t("add_update_description")}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white bg-teal-500 p-2 rounded-t-md">
                  {t("comment")}
                </h3>
                <div className="bg-gray-100 p-4 rounded-b-md">
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder={t("add_update_comment")}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {role === "employee" && (
                  <button
                    onClick={() => handleResolve(selectedComplaint._id)}
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors button-full"
                  >
                    {t("resolve")}
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors button-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  {t("back")}
                </button>
                <button
                  onClick={() => {
                    /* Add location logic */
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors button-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 inline"
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
                  {t("add_location")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedComplaints;
