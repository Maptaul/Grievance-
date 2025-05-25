import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const ViewResolvedComplaint = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        const [complaintRes, employeesRes] = await Promise.all([
          fetch(`http://localhost:3000/complaints/${id}`),
          fetch("http://localhost:3000/users"),
        ]);
        if (!complaintRes.ok) {
          const errorText = await complaintRes.text();
          throw new Error(
            `Failed to fetch complaint: ${complaintRes.status} - ${errorText}`
          );
        }
        if (!employeesRes.ok) {
          const errorText = await employeesRes.text();
          throw new Error(
            `Failed to fetch employees: ${employeesRes.status} - ${errorText}`
          );
        }
        const complaintData = await complaintRes.json();
        const users = await employeesRes.json();
        setEmployees(users.filter((emp) => emp.role === "employee"));
        setComplaint(complaintData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id, t]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <Loading />;
  if (error || !complaint)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">
          {t("error")}: {error || t("complaint_not_found")}
        </p>
      </div>
    );

  const assignedEmployee =
    employees.find((emp) => emp._id === complaint.employeeId)?.name ||
    t("not_applicable");

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .hover-pulse:hover { animation: pulse 0.3s; }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 animate-fade-in">
          {t("view_resolved_complaint")}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
          <div className="space-y-6">
            {/* Complaint Details Section */}
            <div>
              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-4 py-2 rounded-t-lg mb-2 shadow">
                <span className="text-lg font-semibold tracking-wide">
                  {t("complaint_details")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-b-lg shadow space-y-2 md:space-y-0">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("id")}
                  </p>
                  <p className="text-gray-900 font-medium">{complaint._id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("category_tab")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {complaint.category || t("na")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("title")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {complaint.title || t("na")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("status")}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      complaint.status === "Resolved"
                        ? "bg-emerald-100 text-emerald-700"
                        : complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t(`status_${complaint.status.toLowerCase()}`, {
                      defaultValue: complaint.status,
                    })}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("email")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {complaint.email || t("na")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("timestamp")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {complaint.timestamp
                      ? new Date(complaint.timestamp).toLocaleString()
                      : t("na")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("assigned_employee")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {assignedEmployee}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("location")}
                  </p>
                  <div className="flex items-center text-gray-900 font-medium">
                    {complaint.location &&
                    typeof complaint.location === "object" &&
                    complaint.location.latitude &&
                    complaint.location.longitude ? (
                      <a
                        href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FaMapMarkerAlt className="mr-1" />
                        {t("view_on_map")}
                      </a>
                    ) : typeof complaint.location === "string" ? (
                      complaint.location
                    ) : (
                      t("na")
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("ward_no")}
                  </p>
                  <p className="text-gray-900 font-medium">
                    {complaint.ward || t("na")}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    {t("description")}
                  </p>
                  <p className="text-gray-900">
                    {complaint.description || t("na")}
                  </p>
                </div>
              </div>
            </div>

            {complaint.fileUrl && (
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {t("original_image")}:
                </p>
                <img
                  src={complaint.fileUrl}
                  alt={t("original_image")}
                  className="w-96 h-96 rounded-lg shadow-sm"
                />
              </div>
            )}
            {/* History Section */}
            {complaint.history && complaint.history.length > 0 && (
              <div>
                <div className="bg-amber-500 text-white px-4 py-2 rounded-t-lg mb-2">
                  {t("history")}
                </div>
                <div className="space-y-4">
                  {complaint.history.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm border border-emerald-500"
                    >
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-semibold text-gray-900">
                            {t("updated_at")}:
                          </span>{" "}
                          <span className="text-gray-500">
                            {entry.timestamp
                              ? new Date(entry.timestamp).toLocaleString()
                              : t("na")}
                          </span>
                        </div>
                        {entry.description && (
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {t("description")}:
                            </span>{" "}
                            <span className="text-gray-500">
                              {entry.description}
                            </span>
                          </div>
                        )}
                        {entry.comment && (
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {t("comment")}:
                            </span>{" "}
                            <span className="text-gray-500">
                              {entry.comment}
                            </span>
                          </div>
                        )}
                        {entry.fileUrl && (
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {t("file")}:
                            </span>
                            <img
                              src={entry.fileUrl}
                              alt={t("updated_image")}
                              className="w-96 h-96  rounded-lg shadow-sm mt-2"
                            />
                          </div>
                        )}
                        {!entry.fileUrl && (
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {t("file")}:
                            </span>{" "}
                            <span className="text-gray-500">
                              {t("no_updated_image_available")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Back Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleBackClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-6 rounded-md hover-pulse focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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

export default ViewResolvedComplaint;
