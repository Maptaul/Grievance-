import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import EditComplaint from "./Components/EditComplaint";
import Dashboard from "./Layouts/Dashboard";
import Root from "./Layouts/Root";
import ComplaintCategory from "./pages/ComplaintCategory";
import Contact from "./pages/Contact";
import AdminHome from "./pages/Dashboard/AdminHome";
import AllComplaints from "./pages/Dashboard/AllComplaints";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ManageComplaints from "./pages/Dashboard/ManageComplaints";
import ManageMyComplaints from "./pages/Dashboard/ManageMyComplaints";
import ManageUsers from "./pages/Dashboard/ManageUsers";
import Profile from "./pages/Dashboard/Profile";
import UserHome from "./pages/Dashboard/UserHome"; // Added UserHome import
import WardWiseView from "./pages/Dashboard/WardWiseView";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OfficeLocations from "./pages/Office";
import SignUp from "./pages/SignUp";
import SubmitComplaint from "./pages/SubmitComplaint";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
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
          {/* Citizen Routes */}
          <Route index element={<DashboardHome />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path="ManageMyComplaints" element={<ManageMyComplaints />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* Admin Routes */}
          <Route path="AdminHome" element={<AdminHome />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="ManageComplaints" element={<ManageComplaints />} />
          <Route path="AllComplaints" element={<AllComplaints />} />
          <Route path="editComplaint/:id" element={<EditComplaint />} />
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
