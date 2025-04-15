import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");

      setComplaints(
        complaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: newStatus } : complaint
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Complaint status has been changed to "${newStatus}" successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update complaint status. Please try again.",
      });
    }
  };

  // Handle complaint deletion
  const handleDeleteComplaint = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will permanently delete the complaint. Do you want to proceed?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/complaints/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete complaint");

        setComplaints(complaints.filter((complaint) => complaint._id !== id));

        Swal.fire({
          icon: "success",
          title: "Complaint Deleted",
          text: "The complaint has been deleted successfully!",
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
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Complaints
      </h1>
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
                Name
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
                <td className="py-3 px-4">
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint._id, e.target.value)
                    }
                    className="p-2 border rounded-md bg-amber-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Resolved">Resolved</option>
                  </select>
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
    </div>
  );
};

export default ManageComplaints;
