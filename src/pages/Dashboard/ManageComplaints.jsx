import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const ManageComplaints = () => {
  const { t } = useTranslation();
  const { user, role } = useContext(AuthContext);
  const { status } = useParams(); // Get the status from the URL (pending, ongoing, resolved, AllComplaints)
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();

        // Filter complaints based on role and status
        let filteredComplaints = data;
        if (role === "employee") {
          filteredComplaints = data.filter(
            (complaint) => complaint.employeeId === user._id
          );
        }

        if (status === "pending") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) => complaint.status === "Pending"
          );
        } else if (status === "ongoing") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) =>
              complaint.status === "Viewed" || complaint.status === "Assigned"
          );
        } else if (status === "resolved") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) => complaint.status === "Resolved"
          );
        } // "AllComplaints" shows all complaints, so no filtering needed

        setComplaints(filteredComplaints);
      } catch (error) {
        Swal.fire(t("error"), t("failed_to_fetch_complaints"), "error");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user._id, role, status, t]);

  if (loading) return <div>{t("loading")}</div>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {status === "pending"
          ? t("pending_complaints")
          : status === "ongoing"
          ? t("ongoing_complaints")
          : status === "resolved"
          ? t("resolved_complaints")
          : t("all_complaints")}
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-amber-400 to-orange-500">
              <tr>
                {["Serial", "Category", "Title", "Status", "Ward"].map(
                  (header) => (
                    <th
                      key={header}
                      className="py-3 px-4 text-left text-white font-semibold text-sm uppercase tracking-wider"
                    >
                      {t(header.toLowerCase())}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complaints.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-gray-600"
                  >
                    {t("no_complaints_found")}
                  </td>
                </tr>
              ) : (
                complaints.map((complaint, index) => (
                  <tr
                    key={complaint._id}
                    className={`hover:bg-amber-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-4 text-gray-800">{index + 1}</td>
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
                            : complaint.status === "Viewed" ||
                              complaint.status === "Assigned"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-800">
                      {complaint.ward}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageComplaints;
