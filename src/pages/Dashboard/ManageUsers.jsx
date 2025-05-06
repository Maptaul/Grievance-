import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://grievance-server.vercel.app/users"
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

  // Handle role change
  const handleRoleChange = async (email, newRole) => {
    try {
      const response = await fetch(
        `https://grievance-server.vercel.app/users/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!response.ok) throw new Error("Failed to update role");

      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: `User role has been changed to "${newRole}" successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error updating role:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user role. Please try again.",
      });
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (email) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action will permanently delete the user. Do you want to proceed?",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://grievance-server.vercel.app/users/${email}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete user");

        setUsers(users.filter((user) => user.email !== email));

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "User Deleted",
          text: "The user has been deleted successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error deleting user:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user. Please try again.",
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>
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
                <td className="py-3 px-4">
                  <select
                    value={user.role || "citizen"}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                    className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="citizen">Citizen</option>
                    <option value="administrative">Administrative</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteUser(user.email)}
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

export default ManageUsers;
