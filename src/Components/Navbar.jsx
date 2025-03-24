import { Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/original.png";
import { AuthContext } from "../Providers/AuthProvider";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Load the stored language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout error:", error));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Save selection
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section - Logo and Mobile Menu */}
          <div className="flex items-center">
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <FaHome className="text-2xl mr-2 text-blue-600" />
              <img className="h-8 md:h-10" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("complainant_login")}
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {t("admin_login")}
                </Link>
              </>
            )}
          </div>

          {/* Right Section - Language & Profile */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <TbWorld className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <button onClick={() => changeLanguage("en")}>
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button onClick={() => changeLanguage("bn")}>🇧🇩 বাংলা</button>
                </li>
              </ul>
            </div>

            {/* Profile Dropdown */}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <Link to="/dashboard">{t("dashboard")}</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>{t("logout")}</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <img className="w-32" src={logo} alt="Logo" />
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                  >
                    {t("complainant_login")}
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                  >
                    {t("admin_login")}
                  </Link>
                </>
              )}

              <div className="border-t pt-4">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => changeLanguage("bn")}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    🇧🇩 বাংলা
                  </button>
                </div>
              </div>

              {user && (
                <div className="border-t pt-4">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    {t("dashboard")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
