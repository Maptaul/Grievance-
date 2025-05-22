import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Added for location icon
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const AllComplaints = () => {
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

  // Handle resolve action
  const handleResolve = async (id) => {
    const complaint = complaints.find((c) => c._id === id);
    if (complaint.status !== "Ongoing") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid status transition",
      });
      return;
    }
    try {
      const updatedHistory = [
        ...(complaint.history || []),
        {
          status: "Resolved",
          timestamp: new Date().toISOString(),
        },
      ];

      const response = await fetch(
        `https://grievance-server.vercel.app/complaints/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "Resolved",
            history: JSON.stringify(updatedHistory),
          }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }
      const updatedComplaints = complaints.filter((c) => c._id !== id);
      setComplaints(updatedComplaints);
      setSelectedComplaint(null);
      Swal.fire({
        icon: "success",
        title: "Status updated to Resolved",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Truncate ID to 6 words with Read More
  const truncateId = (id) => {
    const words = id.split("-");
    return words.length > 6
      ? words.slice(0, 6).join("-") +
          " <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert(\"" +
          id +
          "\")'>Read More</a>"
      : id;
  };

  // Truncate Description to 300 characters with Read More
  const truncateDescription = (desc) => {
    return desc && desc.length > 300
      ? desc.slice(0, 300) +
          " <a href='#' class='text-blue-600 hover:underline' onclick='event.preventDefault(); alert(\"" +
          desc +
          "\")'>Read More</a>"
      : desc || "N/A";
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
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

      {/* Mobile: Card View */}
      <div className="block md:hidden space-y-4">
        {sortedComplaints.length > 0 ? (
          sortedComplaints.map((complaint, index) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">
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
              <p className="text-sm text-gray-700">
                <span className="font-medium">ID:</span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: truncateId(complaint._id),
                  }}
                />
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                {complaint.name || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Category:</span>{" "}
                {complaint.category || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Timestamp:</span>{" "}
                {complaint.timestamp
                  ? new Date(complaint.timestamp).toLocaleString()
                  : "N/A"}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleView(complaint._id)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No complaints available</p>
        )}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                ID
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Category
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Description
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
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedComplaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b border-gray-300 hover:bg-gray-300"
              >
                <td
                  className="py-3 px-4 text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: truncateId(complaint._id),
                  }}
                />
                <td className="py-3 px-4 text-gray-800">
                  {complaint.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.category || "N/A"}
                </td>
                <td
                  className="py-3 px-4 text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(complaint.description),
                  }}
                />
                <td className="py-3 px-4">
                  {complaint.location ? (
                    <a
                      href={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaMapMarkerAlt className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.status || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {complaint.timestamp
                    ? new Date(complaint.timestamp).toLocaleString()
                    : "N/A"}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="btn bg-blue-500 text-white hover:bg-blue-600"
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
          <p className="text-gray-600 text-center mt-4">
            No complaints available
          </p>
        )}
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Complaint
          </h2>

          {/* Complaint Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
              Complaint Details
            </h3>
            <div className="bg-gray-100 p-4 rounded-b-md space-y-2">
              <p>
                <span className="font-medium">ID:</span>{" "}
                {selectedComplaint?._id || "N/A"}
              </p>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedComplaint?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {selectedComplaint?.category || "N/A"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedComplaint?.status || "N/A"}
              </p>
              <p>
                <span className="font-medium">User Email:</span>{" "}
                {selectedComplaint?.email || "Anonymous"}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {selectedComplaint?.timestamp
                  ? new Date(selectedComplaint.timestamp).toLocaleString()
                  : "N/A"}
              </p>
              <div>
                <span className="font-medium">Location:</span>{" "}
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
                  "N/A"
                )}
              </div>
              {selectedComplaint?.fileUrl && (
                <div className="image-container">
                  <span className="font-medium">Original Image:</span>{" "}
                  <img
                    src={selectedComplaint.fileUrl}
                    alt="Original"
                    className="mt-2 max-w-full h-auto border rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Update History */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white bg-red-500 p-2 rounded-t-md">
              Update History
            </h3>
            <div className="bg-gray-100 p-4 rounded-b-md space-y-4">
              {selectedComplaint?.history?.length > 0 ? (
                selectedComplaint.history.map((update, index) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-medium">Update #{index + 1}</h4>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {update.status || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Updated At:</span>{" "}
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                    {update.fileUrl && (
                      <div className="image-container mt-2">
                        <span className="font-medium">
                          Updated Image #{index + 1}:
                        </span>{" "}
                        <img
                          src={update.fileUrl}
                          alt={`Updated Image ${index + 1}`}
                          className="mt-1 max-w-full h-auto border rounded-md"
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
              {selectedComplaint?.status === "Ongoing" && (
                <button
                  onClick={() => handleResolve(selectedComplaint._id)}
                  className="btn bg-red-500 text-white hover:bg-red-600"
                >
                  Resolve
                </button>
              )}
              <button
                onClick={closeModal}
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Back
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllComplaints;
