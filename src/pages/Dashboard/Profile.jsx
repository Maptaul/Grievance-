import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaCalendarAlt,
  FaEdit,
  FaEnvelope,
  FaKey,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider"; // Adjust the import path as needed

const Profile = () => {
  const { t } = useTranslation(); // Add translation hook
  const {
    user,
    loading: authLoading,
    resetPassword,
    displayName,
    photoURL,
    role,
  } = useContext(AuthContext); // Get the current user and loading state from AuthContext
  const [userData, setUserData] = useState(null); // State to hold the specific user's data
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!authLoading && user) {
      // Ensure auth is loaded and user exists
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://grievance-server.vercel.app/users/${user.email}`
          );
          if (!response.ok) {
            throw new Error(t("fetch_user_data_error")); // Translate error message
          }
          const data = await response.json();
          setUserData(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchUserData();
    } else if (!authLoading && !user) {
      setError(t("no_user_logged_in")); // Translate error message
      setLoading(false);
    }
  }, [user, authLoading, t]); // Add t to dependencies

  const handleForgotPassword = () => {
    if (!resetPassword) {
      Swal.fire({
        icon: "error",
        title: t("auth_context_missing"),
        text: t("reset_unavailable"),
      });
      return;
    }
    Swal.fire({
      title: t("forgot_password"),
      input: "email",
      inputLabel: t("enter_email"),
      inputPlaceholder: user?.email || t("name_placeholder"),
      inputValue: user?.email || "",
      showCancelButton: true,
      confirmButtonText: t("send_reset_link"),
      cancelButtonText: t("cancel"),
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage(t("email_required"));
          return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          Swal.showValidationMessage(t("invalid_email"));
          return;
        }
        return resetPassword(email)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: t("reset_email_sent"),
              text: t("check_email_reset"),
              timer: 3000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: t("reset_failed"),
              text: error.message,
            });
          });
      },
    });
  };

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <p className="text-center text-red-500">
          {t("error")}: {error}
        </p>
      </div>
    );
  }

  // Default fallback data based on your server structure
  const defaultUser = {
    name: displayName || t("unknown_user"),
    email: user?.email || "unknown@example.com",
    photo: photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    role: role || "citizen",
    createdAt: t("unknown_date"),
  };

  // Merge fetched user data with defaults
  const profileData = { ...defaultUser, ...userData };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b pb-8 mb-8">
          <div className="avatar">
            <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden shadow-lg">
              <img
                src={profileData.photo}
                alt={t("profile_alt")}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
              <FaUser className="inline text-primary" /> {profileData.name}
            </h1>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="btn btn-primary mt-4 ml-2 inline-flex items-center gap-2 hover:underline font-medium mt-2"
              aria-label={t("forgot_password")}
            >
              <FaEdit /> {t("forgot_password")}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("profile_information")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 shadow flex items-center gap-4">
              <FaUser className="text-2xl text-primary" />
              <div>
                <div className="text-gray-600 text-sm">{t("full_name")}</div>
                <div className="text-lg font-semibold text-gray-800">
                  {profileData.name}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 shadow flex items-center gap-4">
              <FaEnvelope className="text-2xl text-primary" />
              <div>
                <div className="text-gray-600 text-sm">
                  {t("email_address")}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {profileData.email}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 shadow flex items-center gap-4">
              <FaKey className="text-2xl text-primary" />
              <div>
                <div className="text-gray-600 text-sm">{t("role")}</div>
                <div className="text-lg font-semibold text-gray-800">
                  {profileData.role === "citizen"
                    ? t("citizen")
                    : t(profileData.role)}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 shadow flex items-center gap-4">
              <FaCalendarAlt className="text-2xl text-primary" />
              <div>
                <div className="text-gray-600 text-sm">{t("joined")}</div>
                <div className="text-lg font-semibold text-gray-800">
                  {profileData.createdAt &&
                  profileData.createdAt !== t("unknown_date")
                    ? new Date(profileData.createdAt).toLocaleDateString()
                    : t("unknown_date")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
