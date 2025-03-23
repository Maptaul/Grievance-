import { Menu } from "lucide-react";
import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/original.png";
import { AuthContext } from "../Providers/AuthProvider"; // Import your auth context

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext); // Get user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navOptions = (
    <div className="flex flex-wrap gap-4">
      {!user ? (
        <>
          <Link
            to="/login"
            className="px-6 py-2 btn btn-outlines hover:btn-primary transition"
          >
            Complainant Login
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 btn btn-outlines hover:btn-primary transition"
          >
            Administrative Login
          </Link>
        </>
      ) : null}
    </div>
  );

  return (
    <nav className="navbar w-11/12 mx-auto sticky top-0 z-10  bg-base-200 bg-opacity-30  p-4 flex items-center justify-between">
      {/* Left Side - Logo and Menu */}
      <div className="flex items-center space-x-2">
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-4">
          <FaHome className="text-3xl" />
          <img className="w-40 md:w-60" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-4">
        <ul className="menu menu-horizontal px-1 text-xl flex space-x-4">
          {navOptions}
        </ul>
      </div>

      {/* Right Side - Profile */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-12 rounded-full">
                <img
                  src={user?.photoURL || user} // Use user's photo or default image
                  alt="User"
                  referrerPolicy="no-referrer" // For Google images
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 bg-opacity-30 shadow-md rounded-box mt-3 w-auto p-4"
            >
              <li className="text-center mb-2 rounded-md bg-[#e9e2e222]">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="bg-[#e9e2e222]" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 bg-base-200 bg-opacity-30 shadow-md p-4 space-y-2 grid grid-cols-1 md:hidden">
          <ul className="menu menu-vertical text-lg">{navOptions}</ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
