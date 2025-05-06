import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

const AllComplaints = () => {
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

  // Sorting logic with null/undefined and timestamp handling
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortBy === "none") return 0; // Maintain original order

    if (sortBy === "category") {
      const valueA = String(a.category ?? "");
      const valueB = String(b.category ?? "");
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // Timestamp sorting
    let dateA, dateB;
    try {
      dateA = a.timestamp ? new Date(a.timestamp) : new Date(0); // Fallback to epoch
      dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) throw new Error("Invalid date");
    } catch {
      // Fallback: Extract date and time from string
      const getDateTime = (timestamp) => {
        if (!timestamp) return ["1970-01-01", "00:00:00"];
        const [date, time] = timestamp.split("T");
        return [date || "1970-01-01", time?.split("Z")[0] || "00:00:00"];
      };
      const [dateStrA, timeStrA] = getDateTime(a.timestamp);
      const [dateStrB, timeStrB] = getDateTime(b.timestamp);
      const valueA = `${dateStrA} ${timeStrA}`;
      const valueB = `${dateStrB} ${timeStrB}`;
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return sortDirection === "asc"
      ? dateA - dateB
      : dateB - dateA;
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Complaints</h1>
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
            <option value="timestamp">Timestamp</option>
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
                ID
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Category
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                File
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Location
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedComplaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b border-gray-300 hover:bg-gray-300"
              >
                <td className="py-3 px-4 text-gray-800">{complaint._id || "N/A"}</td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.category || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.description || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {complaint.fileUrl ? (
                    <a
                      href={complaint.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
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
                <td className="py-3 px-4 text-gray-800">
                  {complaint.status || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.timestamp
                    ? new Date(complaint.timestamp).toLocaleString()
                    : "N/A"}
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