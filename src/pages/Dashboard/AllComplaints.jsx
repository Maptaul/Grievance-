import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const AllComplaints = () => {
  const { user, role } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        let filteredComplaints = data;

        // Role-based filtering
        if (role === "citizen") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) => complaint.email === user.email
          );
        } else if (role === "employee") {
          filteredComplaints = filteredComplaints.filter(
            (complaint) =>
              complaint.employeeId?.toString() === user._id?.toString()
          );
        } // Administrative role shows all complaints (no additional filtering)

        setComplaints(filteredComplaints);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [role, user]);

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
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime()))
        throw new Error("Invalid date");
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

    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Handle view action
  const handleView = (id) => {
    const complaint = complaints.find((c) => c._id === id);
    const history = complaint.history || [
      { status: complaint.status, timestamp: new Date().toISOString() },
    ];
    setSelectedComplaint({ ...complaint, history });
    document.getElementById("my_modal_5").showModal();
  };

  // Close modal
  const closeModal = () => {
    setSelectedComplaint(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  // Truncate ID to 4 words with Read More
  const truncateId = (id) => {
    const words = id.split("-");
    return words.length > 4
      ? words.slice(0, 4).join("-") +
          " <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert(\"" +
          id +
          "\")'>Read More</a>"
      : id;
  };

  // Truncate Description to 300 words with Read More
  const truncateDescription = (desc) => {
    if (!desc) return "N/A";
    const words = desc.split(/\s+/);
    return words.length > 300
      ? words.slice(0, 300).join(" ") +
          " <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert(\"" +
          desc +
          "\")'>Read More</a>"
      : desc;
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .hover-pulse:hover { animation: pulse 0.3s; }
          @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
          @media (max-width: 768px) { .modal-content { max-width: 90%; width: 100%; padding: 1rem; } .grid-cols-1-md { grid-template-columns: 1fr; } .table-responsive { display: block; overflow-x: auto; white-space: nowrap; } .button-full { width: 100%; margin-bottom: 0.5rem; } .image-container img { max-width: 100%; height: auto; } }
          @media (min-width: 769px) and (max-width: 1024px) { .modal-content { max-width: 80%; padding: 1.5rem; } .image-container img { max-width: 100%; height: auto; } }
          @media (min-width: 1025px) { .modal-content { max-width: 40%; min-width: 600px; max-width: 700px; padding: 2rem; } .image-container img { max-width: 100%; height: auto; } }
        `}
      </style>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 animate-fade-in">
          All Complaints
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-6 rounded-xl shadow-lg animate-fade-in">
          <div className="w-full sm:w-auto">
            <label className="text-gray-900 font-semibold mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-auto"
            >
              <option value="none">None</option>
              <option value="category">Category</option>
              <option value="timestamp">Timestamp</option>
            </select>
          </div>
          <button
            onClick={toggleSortDirection}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200 w-full sm:w-auto"
          >
            {sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
          </button>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-4">
          {sortedComplaints.length > 0 ? (
            sortedComplaints.map((complaint, index) => (
              <div
                key={complaint._id}
                className="bg-white p-4 rounded-lg shadow-lg animate-fade-in"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900 font-medium">
                    S.No: {index + 1}
                  </span>
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        complaint.status === "Ongoing"
                          ? "bg-yellow-400"
                          : complaint.status === "Resolved"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {complaint.status || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">ID:</span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: truncateId(complaint._id),
                    }}
                  />
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {complaint.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  {complaint.category || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">
                    Description:
                  </span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: truncateDescription(complaint.description),
                    }}
                  />
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">Timestamp:</span>{" "}
                  {complaint.timestamp
                    ? new Date(complaint.timestamp).toLocaleString()
                    : "N/A"}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() => handleView(complaint._id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No complaints available</p>
          )}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-amber-500">
              <tr>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  S.No
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Timestamp
                </th>
                <th className="py-3 px-4 text-left text-white font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedComplaints.map((complaint, index) => (
                <tr
                  key={complaint._id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-900">{index + 1}</td>
                  <td
                    className="py-3 px-4 text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: truncateId(complaint._id),
                    }}
                  />
                  <td className="py-3 px-4 text-gray-900">
                    {complaint.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {complaint.category || "N/A"}
                  </td>
                  <td
                    className="py-3 px-4 text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: truncateDescription(complaint.description),
                    }}
                  />
                  <td className="py-3 px-4 text-gray-900">
                    {complaint.status || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {complaint.timestamp
                      ? new Date(complaint.timestamp).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      onClick={() => handleView(complaint._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedComplaints.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              No complaints available
            </p>
          )}
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
              Complaint
            </h2>

            {/* Complaint Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white bg-amber-500 p-2 rounded-t-md">
                Complaint Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-b-md space-y-2">
                <p>
                  <span className="font-medium text-gray-900">ID:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?._id || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?.name || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?.category || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?.status || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">User Email:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?.email || "Anonymous"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Created At:</span>{" "}
                  <span className="text-gray-500">
                    {selectedComplaint?.timestamp
                      ? new Date(selectedComplaint.timestamp).toLocaleString()
                      : "N/A"}
                  </span>
                </p>
                <div>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {selectedComplaint?.location ? (
                    <a
                      href={`https://www.google.com/maps?q=${selectedComplaint.location.latitude},${selectedComplaint.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on Map
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
                {selectedComplaint?.fileUrl && (
                  <div className="image-container">
                    <span className="font-medium text-gray-900">
                      Original Image:
                    </span>{" "}
                    <img
                      src={selectedComplaint.fileUrl}
                      alt="Original"
                      className="mt-2 max-w-xs h-auto border rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Update History */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white bg-amber-500 p-2 rounded-t-md">
                Update History
              </h3>
              <div className="bg-gray-50 p-4 rounded-b-md space-y-4">
                {selectedComplaint?.history?.length > 0 ? (
                  selectedComplaint.history.map((update, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-emerald-500 pl-4"
                    >
                      <h4 className="font-medium text-gray-900">
                        Update #{index + 1}
                      </h4>
                      <p>
                        <span className="font-medium text-gray-900">
                          Status:
                        </span>{" "}
                        <span className="text-gray-500">
                          {update.status || "N/A"}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Updated At:
                        </span>{" "}
                        <span className="text-gray-500">
                          {new Date(update.timestamp).toLocaleString()}
                        </span>
                      </p>
                      {update.fileUrl && (
                        <div className="image-container mt-2">
                          <span className="font-medium text-gray-900">
                            Updated Image #{index + 1}:
                          </span>{" "}
                          <img
                            src={update.fileUrl}
                            alt={`Updated Image ${index + 1}`}
                            className="mt-1 max-w-xs h-auto border rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No history available</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AllComplaints;
