import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import EditComplaint from "./Components/EditComplaint";
import Dashboard from "./Layouts/Dashboard";
import Root from "./Layouts/Root";
import ComplaintCategory from "./pages/ComplaintCategory";
import Contact from "./pages/Contact";
import AdminHome from "./pages/Dashboard/AdminHome";
import AllComplaints from "./pages/Dashboard/AllComplaints";
import AssignedComplaints from "./pages/Dashboard/AssignedComplaints";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import EmployeeHome from "./pages/Dashboard/EmployeeHome";
import Employees from "./pages/Dashboard/Employees";
import ManageUsers from "./pages/Dashboard/ManageUsers";
import OngoingComplaints from "./pages/Dashboard/OngoingComplaints";
import PendingComplaints from "./pages/Dashboard/PendingComplaints";
import Profile from "./pages/Dashboard/Profile";
import ResolvedComplaints from "./pages/Dashboard/ResolvedComplaints";
import UserHome from "./pages/Dashboard/UserHome";
import ViewedComplaints from "./pages/Dashboard/ViewedComplaints";
import WardWiseView from "./pages/Dashboard/WardWiseView";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OfficeLocations from "./pages/Office";
import SignUp from "./pages/SignUp";
import SubmitComplaint from "./pages/SubmitComplaint";
import { AuthContext } from "./Providers/AuthProvider";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const { role } = useContext(AuthContext);

  useEffect(() => {});

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="complaint-category" element={<ComplaintCategory />} />
        <Route path="locations" element={<OfficeLocations />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="/submit-complaint"
          element={
            <PrivateRoute>
              <SubmitComplaint />
            </PrivateRoute>
          }
        />
        {/* Dashboard Route with Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Redirect based on role */}
          <Route
            index
            element={
              role === "citizen" ? (
                <Navigate to="/dashboard/UserHome" />
              ) : role === "employee" ? (
                <Navigate to="/dashboard/EmployeeHome" />
              ) : role === "administrative" ? (
                <Navigate to="/dashboard/AdminHome" />
              ) : (
                <DashboardHome />
              )
            }
          />

          {/* Citizen Routes */}
          <Route path="UserHome" element={<UserHome />} />
          <Route
            path="ManageMyComplaints"
            element={<Navigate to="/dashboard/ManageMyComplaints/pending" />}
          />
          <Route
            path="ManageMyComplaints/pending"
            element={<PendingComplaints />}
          />
          <Route
            path="ManageMyComplaints/viewed"
            element={<ViewedComplaints />}
          />
          <Route
            path="ManageMyComplaints/assigned"
            element={<AssignedComplaints />}
          />
          <Route
            path="ManageMyComplaints/ongoing"
            element={<OngoingComplaints />}
          />
          <Route
            path="ManageMyComplaints/resolved"
            element={<ResolvedComplaints />}
          />
          <Route
            path="ManageMyComplaints/allComplaints"
            element={<AllComplaints />}
          />
          <Route path="Profile" element={<Profile />} />

          {/* Admin and Employee Routes */}
          <Route path="AdminHome" element={<AdminHome />} />
          <Route path="EmployeeHome" element={<EmployeeHome />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route
            path="ManageComplaints/pending"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <PendingComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="ManageComplaints/ongoing"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <OngoingComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="ManageComplaints/viewed"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <ViewedComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="ManageComplaints/assigned"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <AssignedComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="ManageComplaints/resolved"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <ResolvedComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="ManageComplaints/AllComplaints"
            element={
              <PrivateRoute roles={["administrative", "employee"]}>
                <AllComplaints />
              </PrivateRoute>
            }
          />
          <Route
            path="Employees"
            element={
              <PrivateRoute roles={["administrative"]}>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="editComplaint/:id"
            element={
              <PrivateRoute roles={["administrative"]}>
                <EditComplaint />
              </PrivateRoute>
            }
          />
          <Route path="WardWiseView" element={<WardWiseView />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
