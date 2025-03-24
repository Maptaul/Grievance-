import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-80 min-h-full bg-amber-100">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings">Settings</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-amber-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
