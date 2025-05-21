import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaHome,
  FaMapMarkedAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isComplaintsDropdownOpen, setIsComplaintsDropdownOpen] =
    useState(false);
  const { user, role, logOut, loading } = useContext(AuthContext);
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
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHome className="mr-2 text-lg" />
          <span className="md:inline">{t("user_home")}</span>
        </NavLink>
      </li>
      <li>
        <div className="relative">
          <button
            onClick={() =>
              setIsComplaintsDropdownOpen(!isComplaintsDropdownOpen)
            }
            className="flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-gray-800 w-full text-left"
          >
            <GrCompliance className="mr-2 text-lg" />
            <span className="md:inline">{t("my_complaints")}</span>
            {isComplaintsDropdownOpen ? (
              <FaAngleUp className="ml-auto" />
            ) : (
              <FaAngleDown className="ml-auto" />
            )}
          </button>
          {isComplaintsDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/pending"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("pending_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/viewed"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("viewed_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/assigned"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("assigned_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/ongoing"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("ongoing_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/resolved"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("resolved_complaints")}</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/dashboard/ManageComplaints/AllComplaints"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("pending_complaints")}</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/AllComplaints"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("all_complaints")}</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </li>
      <li>
        <NavLink
          to="/dashboard/Profile"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUser className="mr-2 text-lg" />
          <span className="md:inline">{t("profile")}</span>
        </NavLink>
      </li>
    </>
  );

  // Administrative and Employee Menu (shared base)
  const adminAndEmployeeMenu = (
    <>
      <li>
        <NavLink
          to={
            role === "administrative"
              ? "/dashboard/AdminHome"
              : "/dashboard/EmployeeHome"
          }
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHome className="mr-2 text-lg" />
          <span className="md:inline">
            {role === "administrative" ? t("admin_home") : t("employee_home")}
          </span>
        </NavLink>
      </li>
      <li>
        <div className="relative">
          <button
            onClick={() =>
              setIsComplaintsDropdownOpen(!isComplaintsDropdownOpen)
            }
            className="flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-gray-800 w-full text-left"
          >
            <TbReport className="mr-2 text-lg" />
            <span className="md:inline">{t("complaints")}</span>
            {isComplaintsDropdownOpen ? (
              <FaAngleUp className="ml-auto" />
            ) : (
              <FaAngleDown className="ml-auto" />
            )}
          </button>
          {isComplaintsDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/pending"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("pending_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/viewed"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("viewed_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/assigned"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("assigned_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/ongoing"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("ongoing_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/resolved"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("resolved_complaints")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageComplaints/AllComplaints"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsComplaintsDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline">{t("all_complaints")}</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </li>
      <li>
        <NavLink
          to="/dashboard/WardWiseView"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaMapMarkedAlt className="mr-2 text-lg" />
          <span className="md:inline">{t("ward_wise_view")}</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/Profile"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUser className="mr-2 text-lg" />
          <span className="md:inline">{t("profile")}</span>
        </NavLink>
      </li>
    </>
  );

  // Add "Manage Users" and "Employees" for administrative role only
  const adminSpecificMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/ManageUsers"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUser className="mr-2 text-lg" />
          <span className="md:inline">{t("manage_users")}</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/Employees"
          onClick={() => setIsSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUser className="mr-2 text-lg" />
          <span className="md:inline">{t("employees")}</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-2 bg-blue-500 fixed bottom-4 right-4 rounded-full shadow-lg z-50"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-lg text-white" />
        ) : (
          <FaBars className="text-lg text-white" />
        )}
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-56 bg-gray-200 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-56 md:static md:h-auto md:min-h-screen`}
      >
        <div className="p-4 h-full flex flex-col">
          <h1 className="text-xl font-bold text-center mb-6 text-gray-800">
            {role === "administrative"
              ? t("admin_dashboard")
              : role === "employee"
              ? t("employee_dashboard")
              : t("user_dashboard")}
          </h1>
          <nav className="flex-1">
            <ul className="space-y-1 text-base font-bold">
              {/* Conditionally render menu based on role */}
              {role === "citizen" ? (
                citizenMenu
              ) : (
                <>
                  {adminAndEmployeeMenu}
                  {role === "administrative" && adminSpecificMenu}
                </>
              )}

              {/* Common Menu Items */}
              <div className="my-4 border-t border-gray-300"></div>
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <FaHome className="mr-2 text-lg" />
                  <span className="md:inline">{t("home")}</span>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-gray-800 w-full text-left"
                >
                  <IoLogOutOutline className="mr-2 text-lg" />
                  <span className="md:inline">{t("logout")}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6 md:p-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
