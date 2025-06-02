import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFastForwardCircleFill } from "react-icons/bs";
import {
  FaAngleDown,
  FaAngleUp,
  FaHome,
  FaMapMarkedAlt,
  FaUser,
} from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { IoLogOutOutline, IoPlayBackCircle } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // Add a function to refresh complaint counts
  const refreshComplaintCounts = async () => {
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
      // Refresh sidebar counts after status change
      if (window.refreshComplaintCounts) window.refreshComplaintCounts();
    } catch (err) {
      console.error("Error fetching complaint counts:", err.message);
    }
  };

  // Expose refreshComplaintCounts globally for status update pages
  useEffect(() => {
    window.refreshComplaintCounts = refreshComplaintCounts;
    return () => {
      delete window.refreshComplaintCounts;
    };
  }, [user, role, refreshComplaintCounts]);

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
            <span className="md:inline flex items-center gap-2">
              {t("my_complaints")}
              <span className="inline-block bg-blue-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-700">
                {complaintCounts.all}
              </span>
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
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("pending_complaints")}
                    <span className="inline-block bg-yellow-400 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-yellow-600">
                      {complaintCounts.pending}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/viewed"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("viewed_complaints")}
                    <span className="inline-block bg-blue-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-700">
                      {complaintCounts.viewed}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/assigned"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("assigned_complaints")}
                    <span className="inline-block bg-purple-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-purple-800">
                      {complaintCounts.assigned}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/ongoing"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("ongoing_complaints")}
                    <span className="inline-block bg-orange-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-orange-700">
                      {complaintCounts.ongoing}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/resolved"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("resolved_complaints")}
                    <span className="inline-block bg-green-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-800">
                      {complaintCounts.resolved}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ManageMyComplaints/AllComplaints"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    {t("all_complaints")}
                    <span className="inline-block bg-gray-700 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-gray-900">
                      {complaintCounts.all}
                    </span>
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
            <span className="md:inline flex items-center gap-2">
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
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("pending_complaints")}
                        <span className="inline-block bg-yellow-400 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-yellow-600">
                          {complaintCounts.pending}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/viewed"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("viewed_complaints")}
                        <span className="inline-block bg-blue-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-700">
                          {complaintCounts.viewed}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/assigned"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("assigned_complaints")}
                        <span className="inline-block bg-purple-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-purple-800">
                          {complaintCounts.assigned}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/ongoing"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("ongoing_complaints")}
                        <span className="inline-block bg-orange-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-orange-700">
                          {complaintCounts.ongoing}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/resolved"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("resolved_complaints")}
                        <span className="inline-block bg-green-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-800">
                          {complaintCounts.resolved}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/AllComplaints"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("all_complaints")}
                        <span className="inline-block bg-gray-700 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-gray-900">
                          {complaintCounts.all}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : role === "employee" ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/assigned"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("assigned_complaints")}
                        <span className="inline-block bg-purple-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-purple-800">
                          {complaintCounts.assigned}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/ongoing"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("ongoing_complaints")}
                        <span className="inline-block bg-orange-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-orange-700">
                          {complaintCounts.ongoing}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/resolved"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("resolved_complaints")}
                        <span className="inline-block bg-green-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-800">
                          {complaintCounts.resolved}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageComplaints/AllComplaints"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <span className="md:inline flex items-center gap-2">
                        {t("all_complaints")}
                        <span className="inline-block bg-gray-700 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-gray-900">
                          {complaintCounts.all}
                        </span>
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
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="flex-shrink-0 bg-gray-200 shadow-md md:shadow-none md:w-56 transition-all duration-300">
          <div
            className={`w-58 mt-16 bg-gray-200 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:w-56 md:static md:h-auto md:min-h-screen`}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-center mb-6 relative">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-xl text-left font-bold text-gray-800 w-full">
                    {role === "administrative"
                      ? t("admin_dashboard")
                      : role === "employee"
                      ? t("employee_dashboard")
                      : t("user_dashboard")}
                  </h1>
                  <button
                    className="focus:outline-none group"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Hide sidebar"
                    tabIndex={0}
                  >
                    <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      Close sidebar
                    </span>
                    <IoPlayBackCircle className="text-4xl  text-blue-600" />
                  </button>
                </div>
              </div>
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
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "flex-1" : "w-full"
        } bg-gray-100 min-h-screen p-6 md:p-8`}
      >
        {!isSidebarOpen && (
          <button
            className="mb-4 text-blue-600 focus:outline-none group"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Show sidebar"
            tabIndex={0}
          >
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Open sidebar
            </span>
            <BsFastForwardCircleFill className="text-4xl  text-blue-600" />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
