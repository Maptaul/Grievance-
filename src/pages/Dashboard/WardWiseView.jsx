import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa"; // Added for location icon
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider"; // Adjust the import path as needed

const WardWiseView = () => {
  const { t } = useTranslation(); // Add translation hook
  const { user, role } = useContext(AuthContext); // Access role and user from AuthContext
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null); // State for selected complaint
  const [employeeWard, setEmployeeWard] = useState(null); // State to store employee's ward

  // Fetch complaints and employee ward on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all complaints
        const response = await fetch(
          "https://grievance-server.vercel.app/complaints"
        );
        if (!response.ok) throw new Error(t("fetch_complaints_error")); // Translate error
        const data = await response.json();
        // console.log("Fetched complaints data:", data); // Debug: Log all complaints

        let filteredComplaints = data;

        // Fetch employee's ward if role is "employee"
        if (role === "employee" && user?.email) {
          const userResponse = await fetch(
            `https://grievance-server.vercel.app/users/${user.email}`
          );
          if (!userResponse.ok) throw new Error(t("fetch_user_data_error"));
          const userData = await userResponse.json();
          setEmployeeWard(userData.ward || null); // Assume ward is stored in user data

          // Filter for employee: ward, status, and employeeId with fallback
          filteredComplaints = data.filter((complaint) => {
            const complaintEmployeeId = complaint.employeeId?.toString() || "";
            const userId = user._id?.toString() || "";
            const isAssignedToEmployee =
              complaintEmployeeId === userId || !complaintEmployeeId; // Fallback if no employeeId
            const isRelevantStatus = [
              "Assigned",
              "Ongoing",
              "Resolved",
            ].includes(complaint.status);
            const isEmployeeWard =
              !employeeWard || complaint.ward === employeeWard; // Allow if ward is unset

            // console.log("Employee Filter:", {
            //   complaintId: complaint._id,
            //   complaintEmployeeId,
            //   userId,
            //   userRole: role,
            //   userEmail: user.email,
            //   status: complaint.status,
            //   ward: complaint.ward,
            //   employeeWard,
            //   isAssignedToEmployee,
            //   isRelevantStatus,
            //   isEmployeeWard,
            // });

            return isAssignedToEmployee && isRelevantStatus && isEmployeeWard;
          });

          if (filteredComplaints.length === 0) {
            console.warn(
              "No complaints assigned to employee:",
              user._id,
              "Role:",
              role,
              "User:",
              user,
              "EmployeeWard:",
              employeeWard
            );
          }
        } else {
          // For administrative role, keep all complaints (no filtering)
          filteredComplaints = data;
        }

        setComplaints(filteredComplaints);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [t, role, user?.email, user?._id]); // Add dependencies

  // Group complaints by ward
  const groupedComplaints = complaints.reduce((acc, complaint) => {
    const ward = complaint.ward || t("unknown_ward"); // Translate "Unknown Ward"
    if (!acc[ward]) acc[ward] = [];
    acc[ward].push(complaint);
    return acc;
  }, {});

  // Sorting logic with null/undefined and timestamp handling
  const sortComplaints = (complaints) => {
    return [...complaints].sort((a, b) => {
      if (sortBy === "none") return 0;

      if (sortBy === "category") {
        const valueA = String(a.category ?? "");
        const valueB = String(b.category ?? "");
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Timestamp sorting
      let dateA, dateB;
      try {
        dateA = a.timestamp ? new Date(a.timestamp) : new Date(0); // Fallback to epoch
        dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime()))
          throw new Error(t("invalid_date_error")); // Translate error
      } catch {
        // Fallback: Extract date and time from string
        const getDateTime = (timestamp) => {
          if (!timestamp) return [t("default_date"), t("default_time")];
          const [date, time] = timestamp.split("T");
          return [
            date || t("default_date"),
            time?.split("Z")[0] || t("default_time"),
          ];
        };
        const [dateStrA, timeStrA] = getDateTime(a.timestamp);
        const [dateStrB, timeStrB] = getDateTime(b.timestamp);
        const valueA = `${dateStrA} ${timeStrA}`;
        const valueB = `${dateStrB} ${timeStrB}`;
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Handle ward click
  const handleWardClick = (ward) => {
    setSelectedWard(ward);
  };

  // Handle back button
  const handleBack = () => {
    setSelectedWard(null);
    setSortBy("none"); // Reset sorting
    setSortDirection("asc");
  };

  // Handle view action
  const handleView = (id) => {
    const complaint = complaints.find((c) => c._id === id);
    const history = complaint.history || [
      { status: complaint.status, timestamp: new Date().toISOString() },
    ];
    setSelectedComplaint({ ...complaint, history });
    document.getElementById("my_modal_5").showModal();
  };

  // Handle resolve action
  const handleResolve = async (id) => {
    const complaint = complaints.find((c) => c._id === id);
    if (complaint.status !== "Ongoing") {
      Swal.fire({
        icon: "error",
        title: t("error_title"),
        text: t("invalid_status_transition"),
      });
      return;
    }
    try {
      const updatedHistory = [
        ...(complaint.history || []),
        {
          status: "Resolved",
          timestamp: new Date().toISOString(),
        },
      ];

      const response = await fetch(
        `https://grievance-server.vercel.app/complaints/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "Resolved",
            history: JSON.stringify(updatedHistory),
          }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${t("failed_update_status")}: ${errorText}`);
      }
      setComplaints(
        complaints.map((c) =>
          c._id === id
            ? { ...c, status: "Resolved", history: updatedHistory }
            : c
        )
      );
      setSelectedComplaint(null);
      Swal.fire({
        icon: "success",
        title: t("status_updated_to_resolved"),
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: t("error_title"), text: err.message });
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedComplaint(null);
  };

  // Truncate ID to 6 words with Read More
  const truncateId = (id) => {
    const words = id.split("-");
    return words.length > 6
      ? words.slice(0, 6).join("-") +
          ` <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert("${id}")'>${t(
            "read_more"
          )}</a>`
      : id;
  };

  // Truncate Description to 300 characters with Read More
  const truncateDescription = (desc) => {
    return desc && desc.length > 300
      ? desc.slice(0, 300) +
          ` <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert("${desc}")'>${t(
            "read_more"
          )}</a>`
      : desc || "N/A";
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600">
          {t("error")}: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("ward_wise_complaints")}
      </h1>
      {Object.keys(groupedComplaints).length === 0 ? (
        <p className="text-gray-800">{t("no_complaints_available")}</p>
      ) : selectedWard ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedWard}
            </h2>
            <button
              onClick={handleBack}
              className="p-2 bg-gray-200 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-300 transition-colors"
            >
              {t("back_to_wards")}
            </button>
          </div>
          <div className="mb-4 bg-gray-200 p-4 rounded-lg border border-gray-300 flex gap-4 items-center">
            <div>
              <label
                htmlFor="sortBy"
                className="text-gray-800 font-semibold mr-2"
              >
                {t("sort_by")}
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="none">{t("sort_none")}</option>
                <option value="category">{t("sort_category")}</option>
                <option value="timestamp">{t("sort_timestamp")}</option>
              </select>
            </div>
            <button
              onClick={toggleSortDirection}
              className="p-2 bg-gray-200 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-300 transition-colors"
            >
              {sortDirection === "asc"
                ? t("sort_descending")
                : t("sort_ascending")}
            </button>
          </div>

          {/* Mobile: Card View */}
          <div className="block md:hidden space-y-4">
            {sortComplaints(groupedComplaints[selectedWard]).length > 0 ? (
              sortComplaints(groupedComplaints[selectedWard]).map(
                (complaint, index) => (
                  <div
                    key={complaint._id}
                    className="bg-white p-4 rounded-lg shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800 font-medium">
                        {t("s_no")}: {index + 1}
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            complaint.status === "Assigned"
                              ? "bg-yellow-400"
                              : complaint.status === "Ongoing"
                              ? "bg-blue-400"
                              : complaint.status === "Resolved"
                              ? "bg-green-400"
                              : "bg-gray-400"
                          }`}
                        ></span>
                        {complaint.status || "N/A"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{t("id")}:</span>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: truncateId(complaint._id),
                        }}
                      />
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{t("name")}:</span>{" "}
                      {complaint.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{t("category_tab")}:</span>{" "}
                      {complaint.category || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{t("timestamp")}:</span>{" "}
                      {complaint.timestamp
                        ? new Date(complaint.timestamp).toLocaleString()
                        : "N/A"}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleView(complaint._id)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        {t("view")}
                      </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-600 text-center">
                {t("no_complaints_available")}
              </p>
            )}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("id")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("category_tab")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("name")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("description")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("file")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("location")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("status")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("timestamp")}
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortComplaints(groupedComplaints[selectedWard]).map(
                  (complaint) => (
                    <tr
                      key={complaint._id}
                      className="border-b border-gray-300 hover:bg-gray-300"
                    >
                      <td className="py-3 px-4 text-gray-800">
                        {complaint._id || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {complaint.category || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {complaint.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {complaint.description || "N/A"}
                      </td>
                      <td className="py-3 px-4">
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
                          "N/A"
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {complaint.location ? (
                          <a
                            href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaMapMarkerAlt className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {complaint.status || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {complaint.timestamp
                          ? new Date(complaint.timestamp).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="btn bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => handleView(complaint._id)}
                        >
                          {t("view")}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedComplaints).map(([ward, wardComplaints]) => (
            <div
              key={ward}
              onClick={() => handleWardClick(ward)}
              className="p-6 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-colors cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800">{ward}</h2>
              <p className="text-gray-700">
                {wardComplaints.length}{" "}
                {wardComplaints.length === 1 ? t("complaint") : t("complaints")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Complaint Details */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            {t("complaint")}
          </h2>

          {/* Complaint Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
              {t("complaint_details")}
            </h3>
            <div className="bg-gray-100 p-4 rounded-b-md space-y-2">
              <p>
                <span className="font-medium">{t("id")}:</span>{" "}
                {selectedComplaint?._id || "N/A"}
              </p>
              <p>
                <span className="font-medium">{t("name")}:</span>{" "}
                {selectedComplaint?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">{t("category")}:</span>{" "}
                {selectedComplaint?.category || "N/A"}
              </p>
              <p>
                <span className="font-medium">{t("status")}:</span>{" "}
                {selectedComplaint?.status || "N/A"}
              </p>
              <p>
                <span className="font-medium">{t("user_email")}:</span>{" "}
                {selectedComplaint?.email || t("anonymous")}
              </p>
              <p>
                <span className="font-medium">{t("created_at")}:</span>{" "}
                {selectedComplaint?.timestamp
                  ? new Date(selectedComplaint.timestamp).toLocaleString()
                  : "N/A"}
              </p>
              <div>
                <span className="font-medium">{t("location")}:</span>{" "}
                {selectedComplaint?.location ? (
                  <a
                    href={`https://www.google.com/maps?q=${selectedComplaint.location.latitude},${selectedComplaint.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {t("view_on_map")}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              {selectedComplaint?.fileUrl && (
                <div className="image-container">
                  <span className="font-medium">{t("original_image")}:</span>{" "}
                  <img
                    src={selectedComplaint.fileUrl}
                    alt={t("original_alt")}
                    className="mt-2 max-w-full h-auto border rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Update History */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
              {t("update_history")}
            </h3>
            <div className="bg-gray-100 p-4 rounded-b-md space-y-4">
              {selectedComplaint?.history?.length > 0 ? (
                selectedComplaint.history.map((update, index) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-medium">
                      {t("update")} #{index + 1}
                    </h4>
                    <p>
                      <span className="font-medium">{t("status")}:</span>{" "}
                      {update.status || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">{t("updated_at")}:</span>{" "}
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                    {update.fileUrl && (
                      <div className="image-container mt-2">
                        <span className="font-medium">
                          {t("updated_image")} #{index + 1}:
                        </span>{" "}
                        <img
                          src={update.fileUrl}
                          alt={t("updated_image_alt", { index: index + 1 })}
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

          {/* Actions */}
          <div className="modal-action">
            <form method="dialog">
              {selectedComplaint?.status === "Ongoing" && (
                <button
                  onClick={() => handleResolve(selectedComplaint._id)}
                  className="btn bg-red-500 text-white hover:bg-red-600"
                >
                  {t("resolve")}
                </button>
              )}
              <button
                onClick={closeModal}
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                {t("back")}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default WardWiseView;
