import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users (citizens only) on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://grievance-server.vercel.app/users?role=citizen"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user suspension
  const handleSuspendUser = async (email, currentSuspendedStatus) => {
    const action = currentSuspendedStatus ? "unsuspend" : "suspend";
    const result = await Swal.fire({
      icon: "warning",
      title: `Are you sure you want to ${action} this user?`,
      text: currentSuspendedStatus
        ? "This will restore the user's ability to perform actions."
        : "This will prevent the user from performing any actions.",
      showCancelButton: true,
      confirmButtonColor: currentSuspendedStatus ? "#10B981" : "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: currentSuspendedStatus
        ? "Yes, unsuspend!"
        : "Yes, suspend!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://grievance-server.vercel.app/users/${email}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ suspended: !currentSuspendedStatus }),
          }
        );
        if (!response.ok) throw new Error(`Failed to ${action} user`);

        setUsers(
          users.map((user) =>
            user.email === email
              ? { ...user, suspended: !currentSuspendedStatus }
              : user
          )
        );

        Swal.fire({
          icon: "success",
          title: currentSuspendedStatus ? "User Unsuspended" : "User Suspended",
          text: `The user has been ${action}ed successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(`Error ${action}ing user:`, err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to ${action} user. Please try again.`,
        });
      }
    }
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Citizens</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Photo
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Email
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                Role
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
            {users.map((user) => (
              <tr
                key={user.email}
                className="border-b border-gray-300 hover:bg-gray-300"
              >
                <td className="py-3 px-4 text-gray-800">
                  <img
                    src={user.photo || "https://via.placeholder.com/40"}
                    alt={user.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/40")
                    }
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {user.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-800">{user.email}</td>
                <td className="py-3 px-4 text-gray-800">Citizen</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      user.suspended
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {user.suspended ? "Suspended" : "Active"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      handleSuspendUser(user.email, user.suspended)
                    }
                    className={`${
                      user.suspended
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white py-1 px-3 rounded-md transition-colors`}
                  >
                    {user.suspended ? "Unsuspend" : "Suspend"}
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

export default ManageUsers;
