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

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(() => {});
    setIsOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setIsOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md"
      style={{ position: "-webkit-sticky", position: "sticky" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={28} />
            </button>
            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <FaHome className="text-2xl mr-2 text-teal-600" />
              <img className="h-8 md:h-9" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-ghost text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-lg px-4 py-2 font-semibold text-base"
                >
                  {t("complainant_login")}
                </Link>
                <Link
                  to="/login"
                  className="btn btn-ghost text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-lg px-4 py-2 font-semibold text-base"
                >
                  {t("admin_login")}
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="btn btn-ghost text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-lg px-4 py-2 font-semibold text-base"
              >
                {t("dashboard")}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-teal-600 hover:bg-teal-700 text-white"
              >
                <TbWorld className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-white rounded-lg w-40 mt-2 border border-gray-100"
              >
                <li>
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changeLanguage("bn")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    🇧🇩 বাংলা
                  </button>
                </li>
              </ul>
            </div>

            {user && (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-teal-50"
                >
                  <div className="w-10 rounded-full border border-gray-200">
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
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-lg w-40 mt-2 border border-gray-100"
                >
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      {t("logout")}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 md:hidden">
          <div className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-xl p-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img className="h-10" src={logo} alt="Logo" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-teal-600"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-800 font-semibold hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                  >
                    {t("complainant_login")}
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-800 font-semibold hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                  >
                    {t("admin_login")}
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                >
                  {t("dashboard")}
                </Link>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {t("language")}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => changeLanguage("bn")}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                  >
                    🇧🇩 বাংলা
                  </button>
                </div>
              </div>

              {user && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
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
