import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "./Loading";

const ViewComplaint = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [complaint, setComplaint] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Multi-step dropdown states
  // const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [designationSearch, setDesignationSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintData = location.state?.complaint;
        if (!complaintData) {
          throw new Error(t("complaint_not_found"));
        }
        setComplaint(complaintData);

        const employeesResponse = await fetch("http://localhost:3000/users");
        if (!employeesResponse.ok)
          throw new Error(t("failed_to_fetch_employees"));
        const users = await employeesResponse.json();
        const employeeList = users.filter((emp) => emp.role === "employee");
        setEmployees(employeeList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.state, t]);

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
        throw new Error(`${t("failed_to_assign_complaint")}: ${errorText}`);
      }

      await Swal.fire({
        icon: "success",
        title: t("assigned"),
        text: t("complaint_assigned_success"),
        timer: 1500,
        showConfirmButton: false,
      });

      // Try to go back in history, fallback to pending complaints page
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/dashboard/ManageComplaints/pending");
      }
    } catch (err) {
      console.error("Error assigning complaint:", err.message);
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: `${t("failed_to_assign_complaint")}: ${err.message}`,
      });
    }
  };

  // const resetAssignDropdown = () => {
  //   setSelectedDepartment(null);
  //   setSelectedDesignation(null);
  //   setDepartmentSearch("");
  //   setDesignationSearch("");
  //   setEmployeeSearch("");
  // };

  // const closeDropdown = () => {
  //   setShowAssignDropdown(false);
  //   resetAssignDropdown();
  // };

  const goBack = () => {
    navigate("/dashboard/ManageComplaints/pending");
  };

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

  if (loading) {
    return <Loading />;
  }

  if (error || !complaint) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-100">
        <p className="text-red-600 text-lg font-medium">
          {t("error")}: {error || t("complaint_not_found")}
        </p>
      </div>
    );
  }

  // Handle multiple files (fallback to single fileUrl if files array is not present)
  const attachedFiles = complaint.files
    ? complaint.files
    : complaint.fileUrl
    ? [{ url: complaint.fileUrl, name: "Attached File" }]
    : [];

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
        <button
          onClick={goBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors mb-4"
        >
          {t("back")}
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg slide-in">
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

          <div className="space-y-6 text-gray-700">
            {/* Basic Information */}
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("basic_information")}
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">{t("category_tab")}:</span>{" "}
                  {complaint.category || t("na")}
                </p>
                <p>
                  <span className="font-medium">{t("title")}:</span>{" "}
                  {complaint.name || t("na")}
                </p>
                <p>
                  <span className="font-medium">{t("ward_no")}:</span>{" "}
                  {complaint.ward || t("na")}
                </p>
              </div>
            </div>

            {/* Status & Timeline */}
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("status_timeline")}
              </h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium">{t("status")}:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm ${
                      complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === "Viewed"
                        ? "bg-blue-100 text-blue-800"
                        : complaint.status === "Assigned"
                        ? "bg-purple-100 text-purple-800"
                        : complaint.status === "Ongoing"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {t(`status_${complaint.status.toLowerCase()}`, {
                      defaultValue: complaint.status,
                    })}
                  </span>
                </p>
                <p>
                  <span className="font-medium">{t("submitted")}:</span>{" "}
                  {complaint.timestamp
                    ? new Date(complaint.timestamp).toLocaleString()
                    : t("na")}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("description")}
              </h3>
              <p className="whitespace-pre-wrap">
                {complaint.description || t("no_description")}
              </p>
            </div>

            {/* Attachments & Location */}
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("attachments_location")}
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">
                    {t("view_attached_file")}:
                  </span>
                  {attachedFiles.length > 0 ? (
                    <ul className="list-disc justify-center pl-5 mt-1">
                      {attachedFiles.map((file, index) => (
                        <li key={index}>
                          <a
                            href={file.url}
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
                            {file.name || `File ${index + 1}`}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 ml-2">
                      {t("no_attachments")}
                    </span>
                  )}
                </div>
                {complaint.location && (
                  <div>
                    <a
                      href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center ml-2"
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
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {role === "administrative" && (
                <>
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("assign_modal").showModal()
                    }
                    type="button"
                  >
                    {t("assign_complaint")}
                  </button>
                  <dialog
                    id="assign_modal"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg mb-2">
                        {t("assign_complaint")}
                      </h3>
                      {/* Assignment Dropdown Steps (copied from dropdown) */}
                      <div className="space-y-4">
                        {/* Step 1: Select Department */}
                        {!selectedDepartment && (
                          <div>
                            <h4 className="text-base font-semibold mb-2">
                              {t("select_department")}
                            </h4>
                            <input
                              type="text"
                              placeholder={t("search_department")}
                              value={departmentSearch}
                              onChange={(e) =>
                                setDepartmentSearch(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {filteredDepartments.length > 0 ? (
                              filteredDepartments.map((dept) => (
                                <button
                                  key={dept}
                                  onClick={() => setSelectedDepartment(dept)}
                                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-b last:border-b-0"
                                >
                                  {dept}
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-gray-500">
                                {t("no_departments_found")}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Step 2: Select Designation */}
                        {selectedDepartment && !selectedDesignation && (
                          <div>
                            <button
                              onClick={() => {
                                setSelectedDepartment(null);
                                setDepartmentSearch("");
                              }}
                              className="text-gray-600 hover:text-gray-800 mb-2"
                            >
                              ← {t("back")}
                            </button>
                            <h4 className="text-base font-semibold mb-2">
                              {t("select_designation")}
                            </h4>
                            <input
                              type="text"
                              placeholder={t("search_designation")}
                              value={designationSearch}
                              onChange={(e) =>
                                setDesignationSearch(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {filteredDesignations.length > 0 ? (
                              filteredDesignations.map((desg) => (
                                <button
                                  key={desg}
                                  onClick={() => setSelectedDesignation(desg)}
                                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-b last:border-b-0"
                                >
                                  {desg}
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-gray-500">
                                {t("no_designations_found")}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Step 3: Select Employee */}
                        {selectedDepartment && selectedDesignation && (
                          <div>
                            <button
                              onClick={() => {
                                setSelectedDesignation(null);
                                setDesignationSearch("");
                              }}
                              className="text-gray-600 hover:text-gray-800 mb-2"
                            >
                              ← {t("back")}
                            </button>
                            <h4 className="text-base font-semibold mb-2">
                              {t("select_employee")}
                            </h4>
                            <input
                              type="text"
                              placeholder={t("search_employee")}
                              value={employeeSearch}
                              onChange={(e) =>
                                setEmployeeSearch(e.target.value)
                              }
                              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {filteredEmployeeNames.length > 0 ? (
                              filteredEmployeeNames.map((emp) => (
                                <button
                                  key={emp._id}
                                  onClick={() =>
                                    handleAssign(complaint._id, emp._id)
                                  }
                                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-b last:border-b-0"
                                >
                                  {emp.name}
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-gray-500">
                                {t("no_employees_found")}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="modal-action mt-4">
                        <form method="dialog">
                          <button className="btn">{t("close")}</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </>
              )}

              <button
                onClick={goBack}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                {t("back")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
