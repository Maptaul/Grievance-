import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ManageUsers = () => {
  const { t } = useTranslation(); // Add translation hook
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users (citizens only) on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users?role=citizen"
        );
        if (!response.ok) throw new Error(t("fetch_users_error")); // Translate error
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]); // Add t to dependencies

  // Handle user suspension
  const handleSuspendUser = async (email, currentSuspendedStatus) => {
    const action = currentSuspendedStatus ? "unsuspend" : "suspend";
    const result = await Swal.fire({
      icon: "warning",
      title: t(`are_you_sure_${action}_user`),
      text: currentSuspendedStatus
        ? t("restore_user_action_message")
        : t("prevent_user_action_message"),
      showCancelButton: true,
      confirmButtonColor: currentSuspendedStatus ? "#10B981" : "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: currentSuspendedStatus
        ? t("yes_unsuspend")
        : t("yes_suspend"),
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/users/${email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ suspended: !currentSuspendedStatus }),
        });
        if (!response.ok) throw new Error(t(`failed_${action}_user`));

        setUsers(
          users.map((user) =>
            user.email === email
              ? { ...user, suspended: !currentSuspendedStatus }
              : user
          )
        );

        Swal.fire({
          icon: "success",
          title: currentSuspendedStatus
            ? t("user_unsuspended")
            : t("user_suspended"),
          text: t("user_action_success", { action: action }),
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(`Error ${action}ing user:`, err);
        Swal.fire({
          icon: "error",
          title: t("error_title"),
          text: t(`failed_${action}_user_message`),
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
        <p className="text-red-600">
          {t("error")}: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("manage_citizens")}
      </h1>

      {/* Mobile: Card View */}
      <div className="block md:hidden space-y-2">
        {users.map((user) => (
          <div
            key={user.email}
            className="bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                {user.name || t("n_a")}
              </span>
              <span
                className={`inline-block px-1 sm:px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  user.suspended
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.suspended ? t("suspended") : t("active")}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("photo")}:</span>{" "}
              <img
                src={user.photo || "https://via.placeholder.com/50"}
                alt={t("user_photo_alt", { name: user.name })}
                className="inline-block w-8 h-8 rounded-full object-cover border border-gray-300"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/50")
                }
              />
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("email")}:</span> {user.email}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("role")}:</span>{" "}
              {t("citizen_role")}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("actions")}:</span>{" "}
              <button
                onClick={() => handleSuspendUser(user.email, user.suspended)}
                className={`btn btn-xs px-2 py-1 ${
                  user.suspended ? "btn-success" : "btn-error"
                } text-white rounded-md hover-scale inline-flex items-center`}
              >
                {user.suspended ? t("unsuspend") : t("suspend")}
              </button>
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("photo")}
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("name")}
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("email")}
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("role")}
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("status")}
              </th>
              <th className="py-3 px-4 text-left text-gray-800 font-semibold">
                {t("actions")}
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
                    alt={t("user_photo_alt", { name: user.name })}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/40")
                    }
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {user.name || t("n_a")}
                </td>
                <td className="py-3 px-4 text-gray-800">{user.email}</td>
                <td className="py-3 px-4 text-gray-800">{t("citizen_role")}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      user.suspended
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {user.suspended ? t("suspended") : t("active")}
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
                    {user.suspended ? t("unsuspend") : t("suspend")}
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
