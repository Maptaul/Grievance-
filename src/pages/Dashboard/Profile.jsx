import React, { useEffect, useState, useContext } from "react";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider"; // Adjust the import path as needed

const Profile = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // Get the current user and loading state from AuthContext
  const [userData, setUserData] = useState(null); // State to hold the specific user's data
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!authLoading && user) { // Ensure auth is loaded and user exists
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${user.email}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
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
      setError("No user is logged in");
      setLoading(false);
    }
  }, [user, authLoading]); // Depend on user and authLoading to re-fetch if they change

  if (authLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Default fallback data based on your server structure
  const defaultUser = {
    name: "Unknown User",
    email: user?.email || "unknown@example.com",
    photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    role: "citizen",
    createdAt: "Unknown Date",
  };

  // Merge fetched user data with defaults
  const profileData = { ...defaultUser, ...userData };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl">
        {/* Header */}
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={profileData.photo} alt="Profile" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-base-content/70">{profileData.email}</p>
              {/* Using email as no username field */}
              <button className="btn btn-primary mt-4">Edit Profile</button>
            </div>
          </div>

          {/* Bio and Info */}
          <div className="mt-6">
            <p className="text-xl font-bold mb-4">
              {profileData.role === "citizen" ? "Citizen" : profileData.role}
            </p>{" "}
            {/* Using role as bio substitute */}
            <div className="flex flex-wrap gap-4 text-lg text-base-content/70">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i> Not specified{" "}
                {/* No location field */}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar"></i> Joined{" "}
                {new Date(profileData.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-envelope"></i> {profileData.email}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats shadow my-6 w-full">
            <div className="stat">
              <div className="stat-value">N/A</div> {/* No posts data */}
              <div className="stat-title">Posts</div>
            </div>
            <div className="stat">
              <div className="stat-value">N/A</div> {/* No followers data */}
              <div className="stat-title">Followers</div>
            </div>
            <div className="stat">
              <div className="stat-value">N/A</div> {/* No following data */}
              <div className="stat-title">Following</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn btn-outline">View Posts</button>
            <button className="btn btn-outline">Message</button>
            <button className="btn btn-outline">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;