import React, { useEffect, useState } from "react";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading complaints...</p>
      </div>
    );
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Complaints</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-amber-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                ID
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Category
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                File
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Location
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b hover:bg-amber-50">
                <td className="py-3 px-4 text-gray-800">{complaint._id}</td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.category}
                </td>
                <td className="py-3 px-4 text-gray-800">{complaint.name}</td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.description}
                </td>
                <td className="py-3 px-4">
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
                <td className="py-3 px-4 text-gray-800">
                  {complaint.location
                    ? `${complaint.location.latitude}, ${complaint.location.longitude}`
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">{complaint.status}</td>
                <td className="py-3 px-4 text-gray-800">
                  {new Date(complaint.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllComplaints;
