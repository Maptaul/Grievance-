import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const ManageMyComplaints = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://grievance-server.vercel.app/complaints/user/${user.email}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch your complaints");
          return response.json();
        })
        .then((data) => {
          setComplaints(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDeleteComplaint = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will permanently delete your complaint. Do you want to proceed?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://grievance-server.vercel.app/complaints/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete complaint");

        setComplaints(complaints.filter((complaint) => complaint._id !== id));

        Swal.fire({
          icon: "success",
          title: "Complaint Deleted",
          text: "Your complaint has been deleted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error deleting complaint:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete complaint. Please try again.",
        });
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
        <button
          className="btn btn-secondary mt-4"
          onClick={() => window.location.reload()} // Retry fetch
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 min-h-screen bg-amber-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage My Complaints
      </h1>
      {complaints.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            You haven’t submitted any complaints yet.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/")} // Adjust route
          >
            Submit New Complaint
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-amber-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Serial
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id} className="border-b hover:bg-amber-50">
                  <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-800">
                    {complaint.category}
                  </td>
                  <td className="py-3 px-4 text-gray-800">{complaint.name}</td>
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        complaint.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : complaint.status === "Ongoing"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteComplaint(complaint._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyComplaints;
