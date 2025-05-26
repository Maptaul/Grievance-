import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaClock, FaFileAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingReviews: 0,
    profileCompletion: 85,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://grievance-server.vercel.app/complaints/user/${user.email}`)
        .then((response) => {
          if (!response.ok) throw new Error(t("failed_to_fetch_complaints"));
          return response.json();
        })
        .then((data) => {
          setComplaints(data);
          const total = data.length;
          const pending = data.filter(
            (complaint) => complaint.status === t("status_pending")
          ).length;
          setStats((prev) => ({
            ...prev,
            totalComplaints: total,
            pendingReviews: pending,
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error(t("error_fetching_complaints"), error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, t]);

  const formatLocation = (location) => {
    if (
      !location ||
      typeof location !== "object" ||
      !location.latitude ||
      !location.longitude
    ) {
      return null;
    }
    return { lat: location.latitude, lng: location.longitude };
  };

  const formatCategory = (category) => {
    const categoryKey = `category.${category}`.toLowerCase();
    return t(categoryKey, { defaultValue: category || t("category_unknown") });
  };

  const openGoogleMap = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <Loading message={t("loading")} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-1 sm:mb-2 tracking-tight">
          {t("welcome_back")}, {user?.displayName || t("user")}!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          {t("dashboard_overview")}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        <div className="bg-gray-200 p-2 sm:p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full mr-2 sm:mr-3">
              <FaFileAlt className="text-lg sm:text-xl md:text-2xl text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">
                {t("total_complaints")}
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {stats.totalComplaints}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-2 sm:p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full mr-2 sm:mr-3">
              <FaClock className="text-lg sm:text-xl md:text-2xl text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">
                {t("pending_reviews")}
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {stats.pendingReviews}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-2 sm:p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-full mr-2 sm:mr-3">
              <FaUser className="text-lg sm:text-xl md:text-2xl text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 uppercase tracking-wide">
                {t("profile_completion")}
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {stats.profileCompletion}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* All Complaints Section */}
      <div className="mt-4 sm:mt-6 md:mt-8 bg-gray-200 p-2 sm:p-3 md:p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            {t("all_your_complaints")}
          </h2>
        </div>
        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-gray-700 border-separate border-spacing-y-1 sm:border-spacing-y-2">
            <thead>
              <tr className="bg-gray-300 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-800 uppercase tracking-wider">
                <th className="p-2 sm:p-3 md:p-4 rounded-tl-lg">
                  {t("complaint_id")}
                </th>
                <th className="p-2 sm:p-3 md:p-4">{t("category_tab")}</th>
                <th className="p-2 sm:p-3 md:p-4">{t("title")}</th>
                <th className="p-2 sm:p-3 md:p-4">{t("description")}</th>
                <th className="p-2 sm:p-3 md:p-4">{t("file")}</th>
                <th className="p-2 sm:p-3 md:p-4">{t("location")}</th>
                <th className="p-2 sm:p-3 md:p-4">{t("status")}</th>
                <th className="p-2 sm:p-3 md:p-4 rounded-tr-lg">{t("date")}</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => {
                const locationData = formatLocation(complaint.location);
                return (
                  <tr
                    key={complaint._id}
                    className="bg-gray-50 hover:bg-gray-300 transition-colors duration-200 rounded-lg shadow-sm"
                  >
                    <td className="p-2 sm:p-3 md:p-4 text-gray-800 font-medium">
                      #{complaint._id.slice(-4)}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-gray-700">
                      {formatCategory(complaint.category)}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-gray-700">
                      {complaint.name}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-gray-600 truncate max-w-xs">
                      {complaint.description}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4">
                      {complaint.fileUrl ? (
                        <a
                          href={complaint.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {t("view_file")}
                        </a>
                      ) : (
                        <span className="text-gray-400">{t("na")}</span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4">
                      {locationData ? (
                        <button
                          onClick={() =>
                            openGoogleMap(locationData.lat, locationData.lng)
                          }
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <FaMapMarkerAlt className="mr-1" /> {t("view_map")}
                        </button>
                      ) : (
                        <span className="text-gray-400">
                          {t("location_not_specified")}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3 md:p-4">
                      <span
                        className={`inline-block px-1 sm:px-2 md:px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-medium ${
                          complaint.status === t("status_pending")
                            ? "bg-yellow-100 text-yellow-800"
                            : complaint.status === t("status_ongoing")
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {t(`status_${complaint.status.toLowerCase()}`, {
                          defaultValue: complaint.status,
                        })}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3 md:p-4 text-gray-600">
                      {new Date(complaint.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: Card View */}
        <div className="block md:hidden space-y-2">
          {complaints.map((complaint) => {
            const locationData = formatLocation(complaint.location);
            return (
              <div
                key={complaint._id}
                className="w-[400px] bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="text-gray-800 font-medium text-sm sm:text-base">
                    #{complaint._id.slice(-4)}
                  </span>
                  <span
                    className={`inline-block px-1 sm:px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      complaint.status === t("status_pending")
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === t("status_ongoing")
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {t(`status_${complaint.status.toLowerCase()}`, {
                      defaultValue: complaint.status,
                    })}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-medium">{t("category_tab")}:</span>{" "}
                  {formatCategory(complaint.category)}
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-medium">{t("title")}:</span>{" "}
                  {complaint.name}
                </p>
                <p className="text-sm sm:text-base text-gray-600 truncate">
                  <span className="font-medium">{t("description")}:</span>{" "}
                  {complaint.description}
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-medium">{t("file")}:</span>{" "}
                  {complaint.fileUrl ? (
                    <a
                      href={complaint.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {t("view_file")}
                    </a>
                  ) : (
                    <span className="text-gray-400">{t("na")}</span>
                  )}
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-medium">{t("location")}:</span>{" "}
                  {locationData ? (
                    <button
                      onClick={() =>
                        openGoogleMap(locationData.lat, locationData.lng)
                      }
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FaMapMarkerAlt className="mr-1" /> {t("view_map")}
                    </button>
                  ) : (
                    <span className="text-gray-400">
                      {t("location_not_specified")}
                    </span>
                  )}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">{t("date")}:</span>{" "}
                  {new Date(complaint.timestamp).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
