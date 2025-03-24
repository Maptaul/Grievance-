import { Route, Routes } from "react-router-dom";
import "./App.css";
import Root from "./Layouts/Root";

import ComplaintCategory from "./Components/ComplaintCategory";

import Dashboard from "./Layouts/Dashboard";
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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
