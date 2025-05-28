import { useContext, useEffect, useState } from "react";
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
  const [complaintCounts, setComplaintCounts] = useState({
    pending: 0,
    assigned: 0,
    viewed: 0,
    ongoing: 0,
    resolved: 0,
    all: 0,
    my: 0, // for employee/citizen
  });

  useEffect(() => {
    const fetchComplaintCounts = async () => {
      try {
        const response = await fetch(
          "https://grievance-server.vercel.app/complaints"
        );
        if (!response.ok) throw new Error(t("error_fetch_complaints"));
        const data = await response.json();
        let counts = {
          pending: 0,
          assigned: 0,
          viewed: 0,
          ongoing: 0,
          resolved: 0,
          all: 0,
          my: 0,
        };
        if (role === "citizen") {
          counts.pending = data.filter(
            (c) => c.status === "Pending" && c.email === user.email
          ).length;
          counts.viewed = data.filter(
            (c) => c.status === "Viewed" && c.email === user.email
          ).length;
          counts.assigned = data.filter(
            (c) => c.status === "Assigned" && c.email === user.email
          ).length;
          counts.ongoing = data.filter(
            (c) => c.status === "Ongoing" && c.email === user.email
          ).length;
          counts.resolved = data.filter(
            (c) => c.status === "Resolved" && c.email === user.email
          ).length;
          counts.all = data.filter((c) => c.email === user.email).length;
        } else if (role === "employee") {
          counts.pending = data.filter((c) => c.status === "Pending").length;
          counts.viewed = data.filter((c) => c.status === "Viewed").length;
          counts.assigned = data.filter(
            (c) => c.status === "Assigned" && c.employeeId === user._id
          ).length;
          counts.ongoing = data.filter(
            (c) => c.status === "Ongoing" && c.employeeId === user._id
          ).length;
          counts.resolved = data.filter(
            (c) => c.status === "Resolved" && c.employeeId === user._id
          ).length;
          counts.all = data.filter((c) => c.employeeId === user._id).length;
        } else if (role === "administrative") {
          counts.pending = data.filter((c) => c.status === "Pending").length;
          counts.viewed = data.filter((c) => c.status === "Viewed").length;
          counts.assigned = data.filter((c) => c.status === "Assigned").length;
          counts.ongoing = data.filter((c) => c.status === "Ongoing").length;
          counts.resolved = data.filter((c) => c.status === "Resolved").length;
          counts.all = data.length;
        }
        setComplaintCounts(counts);
      } catch (err) {
        console.error("Error fetching complaint counts:", err.message);
      }
    };
    fetchComplaintCounts();
  }, [t, user, role]);

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
            <span className="md:inline">
              {t("my_complaints")} ({complaintCounts.all})
            </span>
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
                  <span className="md:inline">
                    {t("pending_complaints")} ({complaintCounts.pending})
                  </span>
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
                  <span className="md:inline">
                    {t("viewed_complaints")} ({complaintCounts.viewed})
                  </span>
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
                  <span className="md:inline">
                    {t("assigned_complaints")} ({complaintCounts.assigned})
                  </span>
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
                  <span className="md:inline">
                    {t("ongoing_complaints")} ({complaintCounts.ongoing})
                  </span>
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
                  <span className="md:inline">
                    {t("resolved_complaints")} ({complaintCounts.resolved})
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/AllComplaints"
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
                  <span className="md:inline">
                    {t("all_complaints")} ({complaintCounts.all})
                  </span>
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
            <span className="md:inline">
              {role === "employee" ? t("my_complaints") : t("complaints")}
              {role === "citizen" && ` (${complaintCounts.pending})`}
              {role === "employee" && ` (${complaintCounts.assigned})`}
            </span>
            {isComplaintsDropdownOpen ? (
              <FaAngleUp className="ml-auto" />
            ) : (
              <FaAngleDown className="ml-auto" />
            )}
          </button>
          {isComplaintsDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              {role === "administrative" ? (
                <>
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
                      <span className="md:inline">
                        {t("pending_complaints")} ({complaintCounts.pending})
                      </span>
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
                      <span className="md:inline">
                        {t("viewed_complaints")} ({complaintCounts.viewed})
                      </span>
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
                      <span className="md:inline">
                        {t("assigned_complaints")} ({complaintCounts.assigned})
                      </span>
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
                      <span className="md:inline">
                        {t("ongoing_complaints")} ({complaintCounts.ongoing})
                      </span>
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
                      <span className="md:inline">
                        {t("resolved_complaints")} ({complaintCounts.resolved})
                      </span>
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
                      <span className="md:inline">
                        {t("all_complaints")} ({complaintCounts.all})
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : role === "employee" ? (
                <>
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
                      <span className="md:inline">
                        {t("assigned_complaints")} ({complaintCounts.assigned})
                      </span>
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
                      <span className="md:inline">
                        {t("ongoing_complaints")} ({complaintCounts.ongoing})
                      </span>
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
                      <span className="md:inline">
                        {t("resolved_complaints")} ({complaintCounts.resolved})
                      </span>
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
                      <span className="md:inline">
                        {t("all_complaints")} ({complaintCounts.all})
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : null}
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
        className="md:hidden p-3 bg-blue-500 fixed bottom-4 right-4 rounded-full shadow-lg z-50"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-3xl text-white" />
        ) : (
          <FaBars className="text-3xl text-white" />
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
      <div className="flex-shrink-0 bg-gray-200 shadow-md md:shadow-none md:w-56">
        <div
          className={`w-56 mt-16 bg-gray-200 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out ${
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
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6 md:p-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
