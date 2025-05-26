import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "./Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const ViewOngoingComplaint = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const complaint = state?.complaint;
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaintData, setComplaintData] = useState(complaint);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://grievance-server.vercel.app/users"
        );
        if (!response.ok) throw new Error(t("error_fetch_employees"));
        const users = await response.json();
        setEmployees(users.filter((emp) => emp.role === "employee"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [t]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData
      );
      if (res.data.success) {
        setPhoto(res.data.data.display_url);
        toast.success(t("image_uploaded_successfully"));
      } else {
        throw new Error(t("submission_failed"));
      }
    } catch (error) {
      toast.error(t("submission_failed"));
    }
  };

  const handleMarkAsResolved = async (id) => {
    if (role !== "employee") {
      Swal.fire({
        icon: "error",
        title: t("unauthorized"),
        text: t("only_employees_can_update_status"),
      });
      return;
    }
    if (complaintData.status !== "Ongoing") {
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
      const updatedHistory = [
        ...(complaintData.history || []),
        {
          status: "Resolved",
          timestamp: new Date().toISOString(),
          fileUrl: photo,
          description,
          comment,
        },
      ];

      // Optimistically update local state
      setComplaintData((prev) => ({
        ...prev,
        status: "Resolved",
        history: updatedHistory,
      }));

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
        throw new Error(`${t("error_update_status")}: ${errorText}`);
      }

      // Add a slight delay to ensure backend sync
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success(t("complaint_resolved_successfully"));
      // After resolving, go back to previous page
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/dashboard/OngoingComplaints");
      }
    } catch (err) {
      // Revert optimistic update on failure
      setComplaintData(complaint);
      Swal.fire({ icon: "error", title: t("error"), text: err.message });
    }
  };

  const closePage = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/dashboard/ManageComplaints/ongoing");
    }
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
  if (!complaintData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <p className="text-red-600 text-lg font-medium">
          {t("complaint_not_found")}
        </p>
      </div>
    );
  }

  const history = Array.isArray(complaintData.history)
    ? complaintData.history
    : complaintData.history
    ? JSON.parse(complaintData.history)
    : [];

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
              {complaintData._id || t("not_applicable")}
            </p>
            <p>
              <span className="font-medium">{t("title")}:</span>{" "}
              {complaintData.title || t("not_applicable")}
            </p>
            <p>
              <span className="font-medium">{t("category_tab")}:</span>{" "}
              {complaintData.category || t("not_applicable")}
            </p>
            <p>
              <span className="font-medium">{t("status")}:</span>{" "}
              {complaintData.status || t("not_applicable")}
            </p>
            <p>
              <span className="font-medium">{t("user_email")}:</span>{" "}
              {complaintData.email || t("anonymous")}
            </p>
            <p>
              <span className="font-medium">{t("assigned_employee")}:</span>{" "}
              {employees.find((emp) => emp._id === complaintData.employeeId)
                ?.name || t("not_applicable")}
            </p>
            <p>
              <span className="font-medium">{t("created_at")}:</span>{" "}
              {complaintData.timestamp
                ? new Date(complaintData.timestamp).toLocaleString()
                : t("not_applicable")}
            </p>
            <div>
              <span className="font-medium">{t("location")}:</span>{" "}
              {complaintData.location ? (
                <div className="mt-2">
                  <a
                    href={`https://www.google.com/maps?q=${complaintData.location.latitude},${complaintData.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center mt-2"
                  >
                    <FaMapMarkerAlt className="mr-1" />
                    {t("view_on_map")}
                  </a>
                </div>
              ) : (
                t("not_applicable")
              )}
            </div>
            {complaintData.fileUrl && complaintData.fileUrl[0] && (
              <div className="image-container">
                <span className="font-medium">{t("original_image")}:</span>{" "}
                <img
                  src={complaintData.fileUrl[0]}
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
            {history?.length > 0 ? (
              history.map((update, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-medium">
                    {t("update")} #{index + 1}
                  </h4>
                  <p>
                    <span className="font-medium">{t("status")}:</span>{" "}
                    {update.status || t("not_applicable")}
                  </p>
                  <p>
                    <span className="font-medium">{t("updated_at")}:</span>{" "}
                    {new Date(update.timestamp).toLocaleString()}
                  </p>
                  {update.description && (
                    <p>
                      <span className="font-medium">{t("description")}:</span>{" "}
                      {update.description}
                    </p>
                  )}
                  {update.comment && (
                    <p>
                      <span className="font-medium">{t("comment")}:</span>{" "}
                      {update.comment}
                    </p>
                  )}
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

        {role === "employee" && complaintData.status === "Ongoing" && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white bg-teal-500 p-2 rounded-t-md">
                {t("photo")}
              </h3>
              <div className="bg-gray-100 p-4 rounded-b-md">
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    {t("profile_image")}
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:px-4 file:py-2 hover:file:bg-gray-200 shadow-md"
                    aria-label={t("upload_profile_image")}
                  />
                </div>
                {photo && (
                  <div className="mt-2">
                    <span className="font-medium">{t("uploaded_image")}:</span>{" "}
                    <a
                      href={photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {t("view_uploaded_image")}
                    </a>
                  </div>
                )}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {role === "employee" && complaintData.status === "Ongoing" && (
            <button
              onClick={() => handleMarkAsResolved(complaintData._id)}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors button-full"
            >
              {t("resolve")}
            </button>
          )}
          <button
            onClick={closePage}
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
        </div>
      </div>
    </div>
  );
};

export default ViewOngoingComplaint;
