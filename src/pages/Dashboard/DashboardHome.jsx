import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const DashboardHome = () => {
  const { user, role } = useContext(AuthContext);

  return (
    <div className="min-h-screen  flex items-center justify-center p-6 md:p-8">
      <div className="bg-gradient-to-r from-amber-200 to-amber-400 p-8 rounded-xl shadow-lg max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome, {user?.displayName || "User"}!
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          {role === "administrative"
            ? "Ready to manage and resolve community issues? Dive into your dashboard!"
            : "Your space to report and track community concerns. Let’s get started!"}
        </p>
        <div className="mt-6">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-amber-300 mx-auto shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
