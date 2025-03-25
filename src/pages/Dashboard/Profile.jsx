import React from "react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    email: "jane.doe@example.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    bio: "Web developer | Coffee enthusiast | Lifelong learner",
    location: "San Francisco, CA",
    joined: "March 2020",
    stats: {
      posts: 145,
      followers: 892,
      following: 245,
    },
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Profile Card */}
      <div className="card bg-base-100 shadow-xl">
        {/* Header */}
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.avatar} alt="Profile" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-base-content/70">{user.username}</p>
              <button className="btn btn-primary mt-4">Edit Profile</button>
            </div>
          </div>

          {/* Bio and Info */}
          <div className="mt-6">
            <p className="text-lg mb-4">{user.bio}</p>
            <div className="flex flex-wrap gap-4 text-base-content/70">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i> {user.location}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar"></i> Joined {user.joined}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-envelope"></i> {user.email}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="stats shadow my-6 w-full">
            <div className="stat">
              <div className="stat-value">{user.stats.posts}</div>
              <div className="stat-title">Posts</div>
            </div>
            <div className="stat">
              <div className="stat-value">{user.stats.followers}</div>
              <div className="stat-title">Followers</div>
            </div>
            <div className="stat">
              <div className="stat-value">{user.stats.following}</div>
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
