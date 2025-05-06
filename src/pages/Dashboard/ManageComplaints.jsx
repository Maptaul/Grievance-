import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://grievance-server.vercel.app/complaints"
        );
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
      const response = await fetch(
        `https://grievance-server.vercel.app/complaints/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
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
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
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

  // Sorting logic with null/undefined handling
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortBy === "none") return 0; // Maintain original order
    const valueA = String(
      sortBy === "category" ? a.category ?? "" : a.status ?? ""
    );
    const valueB = String(
      sortBy === "category" ? b.category ?? "" : b.status ?? ""
    );
    return sortDirection === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Complaints
      </h1>
      <div className="mb-4 bg-gray-200 p-4 rounded-lg border border-gray-300 flex gap-4 items-center">
        <div>
          <label htmlFor="sortBy" className="text-gray-800 font-semibold mr-2">
            Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="none">None</option>
            <option value="category">Category</option>
            <option value="status">Status</option>
          </select>
        </div>
        <button
          onClick={toggleSortDirection}
          className="p-2 bg-gray-200 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-300 transition-colors"
        >
          {sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Serial
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Category
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedComplaints.map((complaint, index) => (
              <tr
                key={complaint._id}
                className="border-b border-gray-300 hover:bg-gray-300"
              >
                <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.category || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">{complaint.name}</td>
                <td className="py-3 px-4">
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint._id, e.target.value)
                    }
                    className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteComplaint(complaint._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
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
