import { useContext, useState } from "react";
import { FaBars, FaHome, FaTimes, FaUser } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { IoLogOutOutline, IoSettings } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, role, logOut, loading } = useContext(AuthContext);
  const email = user?.email || null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setIsSidebarOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <Loading />;

  // Citizen Menu
  const citizenMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/UserHome"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <FaHome className="mr-2 text-xl" />
          <span className="md:inline">User Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/ManageMyComplaints"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <GrCompliance className="mr-2 text-xl" />
          <span className="md:inline">My Complaints</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/Profile"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <FaUser className="mr-2 text-xl" />
          <span className="md:inline">Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/Settings"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <IoSettings className="mr-2 text-xl" />
          <span className="md:inline">Settings</span>
        </NavLink>
      </li>
    </>
  );

  // Administrative Menu
  const adminMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/AdminHome"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <FaHome className="mr-2 text-xl" />
          <span className="md:inline">Admin Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/ManageUsers"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <FaUser className="mr-2 text-xl" />
          <span className="md:inline">Manage Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/ManageComplaints"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <TbReport className="mr-2 text-xl" />
          <span className="md:inline">Manage Complaints</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/AllComplaints"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <TbReport className="mr-2 text-xl" />
          <span className="md:inline">All Complaints</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/Settings"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
              isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
            }`
          }
        >
          <IoSettings className="mr-2 text-xl" />
          <span className="md:inline">Settings</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-3 bg-amber-400 fixed bottom-4 right-4 rounded-full shadow-lg z-50"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-xl text-gray-800" />
        ) : (
          <FaBars className="text-xl text-gray-800" />
        )}
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-amber-200 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 bg-amber-100 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-1/5 lg:w-1/6 md:static md:h-auto md:min-h-screen`}
      >
        <div className="p-4 h-full flex flex-col">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {role === "administrative" ? "Admin Dashboard" : "User Dashboard"}
          </h1>
          <nav className="flex-1">
            <ul className="space-y-2 text-xl font-bold">
              {/* Conditionally render menu based on role */}
              {role === "administrative" ? adminMenu : citizenMenu}

              {/* Common Menu Items */}
              <div className="divider"></div>
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors ${
                      isActive ? "bg-amber-400 text-gray-900" : "text-gray-700"
                    }`
                  }
                >
                  <FaHome className="mr-2 text-xl" />
                  <span className="md:inline">Home</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 rounded-lg hover:bg-amber-300 transition-colors text-gray-700 w-full text-left"
                >
                  <IoLogOutOutline className="mr-2 text-xl" />
                  <span className="md:inline">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-amber-200 min-h-screen p-6 md:p-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
