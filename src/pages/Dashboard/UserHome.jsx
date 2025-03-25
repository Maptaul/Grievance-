import React, { useEffect, useState } from "react";
import { FaClock, FaFileAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserHome = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingReviews: 0,
    profileCompletion: 85,
  });
  const [showAllComplaints, setShowAllComplaints] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/complaints")
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
        const total = data.length;
        const pending = data.filter(
          (complaint) => complaint.status === "Pending"
        ).length;
        setStats((prev) => ({
          ...prev,
          totalComplaints: total,
          pendingReviews: pending,
        }));
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  const handleViewAllComplaints = () => {
    setShowAllComplaints(!showAllComplaints);
  };

  // Helper function to format location
  const formatLocation = (location) => {
    if (!location) return "Not specified";
    if (
      typeof location === "object" &&
      location.latitude &&
      location.longitude
    ) {
      return `${location.latitude}, ${location.longitude}`;
    }
    return "Invalid location";
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Here's your dashboard overview for today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <FaFileAlt className="text-2xl text-amber-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm uppercase">
                Total Complaints
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.totalComplaints}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <FaClock className="text-2xl text-amber-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm uppercase">Pending Reviews</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.pendingReviews}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <FaUser className="text-2xl text-amber-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm uppercase">
                Profile Completion
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stats.profileCompletion}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <button className="bg-amber-400 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors">
              Submit New Complaint
            </button>
          </Link>
          <button
            onClick={handleViewAllComplaints}
            className="bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showAllComplaints ? "Hide All Complaints" : "View All Complaints"}
          </button>
        </div>
      </div>

      {/* All Complaints Table */}
      {showAllComplaints && (
        <div className="mt-8 bg-amber-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            All Complaints
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700">
              <thead>
                <tr className="bg-amber-200 text-left">
                  <th className="p-3 rounded-tl-lg">Complaint ID</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">File URL</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="border-b border-amber-200 hover:bg-amber-50"
                  >
                    <td className="p-3">#{complaint._id.slice(-4)}</td>
                    <td className="p-3">{complaint.category}</td>
                    <td className="p-3">{complaint.name}</td>
                    <td className="p-3">{complaint.description}</td>
                    <td className="p-3">
                      {complaint.fileUrl ? (
                        <a
                          href={complaint.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:underline"
                        >
                          View File
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-3">
                      {formatLocation(complaint.location)}
                    </td>
                    <td className="p-3">{complaint.status}</td>
                    <td className="p-3">
                      {new Date(complaint.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Recent Activity Table */}
      <div className="mt-8 bg-amber-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700">
            <thead>
              <tr className="bg-amber-200 text-left">
                <th className="p-3 rounded-tl-lg">Serial</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice(0, 3).map((complaint, index) => (
                <tr
                  key={complaint._id}
                  className="border-b border-amber-200 hover:bg-amber-50"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{complaint.name}</td>
                  <td className="p-3">
                    {new Date(complaint.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
