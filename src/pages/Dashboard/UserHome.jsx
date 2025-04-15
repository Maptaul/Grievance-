import React, { useContext, useEffect, useState } from "react";
import { FaClock, FaFileAlt, FaUser } from "react-icons/fa";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingReviews: 0,
    profileCompletion: 85,
  });
  const [loading, setLoading] = useState(true);
  const [showAllComplaints, setShowAllComplaints] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/complaints/user/${user.email}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch user complaints");
          return response.json();
        })
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user complaints:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleViewAllComplaints = () => {
    setShowAllComplaints(!showAllComplaints);
  };

  const formatLocation = (location) => {
    if (!location) return "Not specified";
    if (
      typeof location === "object" &&
      location.latitude &&
      location.longitude
    ) {
      return `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(
        2
      )}`;
    }
    return "Invalid location";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Welcome Back, {user?.displayName || "User"}!
        </h1>
        <p className="text-lg text-gray-500">
          Your dashboard overview at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-4 bg-amber-50 rounded-full mr-4">
              <FaFileAlt className="text-3xl text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Total Complaints
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.totalComplaints}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-4 bg-amber-50 rounded-full mr-4">
              <FaClock className="text-3xl text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Pending Reviews
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.pendingReviews}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-4 bg-amber-50 rounded-full mr-4">
              <FaUser className="text-3xl text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Profile Completion
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.profileCompletion}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* All Complaints Table */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            All Your Complaints
          </h2>
          <button
            onClick={handleViewAllComplaints}
            className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            {showAllComplaints ? "Hide" : "Show All"}
          </button>
        </div>
        {showAllComplaints && (
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-amber-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="p-4 rounded-tl-lg">Complaint ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">File</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="bg-gray-50 hover:bg-amber-50 transition-colors duration-200 rounded-lg shadow-sm"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      #{complaint._id.slice(-4)}
                    </td>
                    <td className="p-4 text-gray-700">{complaint.category}</td>
                    <td className="p-4 text-gray-700">{complaint.name}</td>
                    <td className="p-4 text-gray-600 truncate max-w-xs">
                      {complaint.description}
                    </td>
                    <td className="p-4">
                      {complaint.fileUrl ? (
                        <a
                          href={complaint.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-700">
                      {formatLocation(complaint.location)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          complaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : complaint.status === "Ongoing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(complaint.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Activity Table */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-amber-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-4 rounded-tl-lg">Serial</th>
                <th className="p-4">Title</th>
                <th className="p-4 rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.slice(0, 3).map((complaint, index) => (
                <tr
                  key={complaint._id}
                  className="bg-gray-50 hover:bg-amber-50 transition-colors duration-200 rounded-lg shadow-sm"
                >
                  <td className="p-4 text-gray-800 font-medium">{index + 1}</td>
                  <td className="p-4 text-gray-700">{complaint.name}</td>
                  <td className="p-4 text-gray-600">
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
