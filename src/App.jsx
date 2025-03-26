import { Route, Routes } from "react-router-dom";
import "./App.css";
import ComplaintCategory from "./Components/ComplaintCategory";
import Dashboard from "./Layouts/Dashboard";
import Root from "./Layouts/Root";
import AdminHome from "./pages/Dashboard/AdminHome";
import ManageComplaints from "./pages/Dashboard/ManageComplaints";
import ManageUsers from "./pages/Dashboard/ManageUsers";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import UserHome from "./pages/Dashboard/UserHome"; // Added UserHome import
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SubmitComplaint from "./pages/SubmitComplaint";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/complaint-category" element={<ComplaintCategory />} />
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
          <Route index element={<UserHome />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          {/* Admin Routes */}
          <Route path="AdminHome" element={<AdminHome />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-complaints" element={<ManageComplaints />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
