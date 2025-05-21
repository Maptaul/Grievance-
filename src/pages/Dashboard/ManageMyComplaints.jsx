import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      fetch(`http://localhost:3000/complaints/user/${user.email}`)
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg ml-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage My Complaints
      </h1>
      {complaints.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            You haven’t submitted any complaints yet.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
            onClick={() => navigate("/complaint-category")}
          >
            Submit New Complaint
          </button>
        </div>
      ) : (
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
                  Title
                </th>
                <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr
                  key={complaint._id}
                  className="border-b border-gray-300 hover:bg-gray-300"
                >
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
                          ? "bg-yellow-100 text-yellow-800"
                          : complaint.status === "Ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
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
