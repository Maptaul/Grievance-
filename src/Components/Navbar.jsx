import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbWorld } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to the <details> element

  // Load saved language
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.open &&
        !dropdownRef.current.contains(event.target)
      ) {
        dropdownRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <header
      className="top-0 w-full bg-white shadow-lg z-50 py-2"
      style={{ position: "fixed" }}
    >
      {/* Note: Add padding-top (e.g., pt-16 or pt-20) to the main content container in App.jsx to prevent content from being hidden under the fixed navbar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          {/* Hamburger Menu and Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <details className="dropdown" ref={dropdownRef}>
              <summary className="btn btn-ghost btn-circle p-1 sm:p-2 text-gray-600 hover:text-teal-600">
                <RxHamburgerMenu
                  size={24}
                  aria-label={t("open_menu")}
                  className="sm:w-7 sm:h-7"
                />
              </summary>
              <ul className="menu dropdown-content bg-white rounded-box z-10 w-48 sm:w-52 p-2 shadow-lg border border-gray-200 mt-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-800 font-medium hover:bg-teal-100 hover:text-teal-600 px-4 py-2 rounded-lg text-sm sm:text-base"
                    onClick={() => dropdownRef.current.removeAttribute("open")}
                  >
                    {t("Home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locations"
                    className="text-gray-800 font-medium hover:bg-teal-100 hover:text-teal-600 px-4 py-2 rounded-lg text-sm sm:text-base"
                    onClick={() => dropdownRef.current.removeAttribute("open")}
                  >
                    {t("office_locations")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-800 font-medium hover:bg-teal-100 hover:text-teal-600 px-4 py-2 rounded-lg text-sm sm:text-base"
                    onClick={() => dropdownRef.current.removeAttribute("open")}
                  >
                    {t("contact")}
                  </Link>
                </li>
                {user ? (
                  <li>
                    <Link
                      to="/complaint-category"
                      className="text-gray-800 font-medium hover:bg-teal-100 hover:text-teal-600 px-4 py-2 rounded-lg text-sm sm:text-base"
                      onClick={() =>
                        dropdownRef.current.removeAttribute("open")
                      }
                    >
                      {t("complaints")}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </details>
            <Link to="/" className="flex items-center">
              <img
                src="https://i.ibb.co.com/BWyt7Dk/ccc.png"
                alt="Logo"
                className="h-8 sm:h-10 md:h-12 object-contain"
              />
            </Link>
          </div>

          {/* Centered Welcome Text */}
          <div className="flex-1 flex justify-center items-center px-2">
            <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-center">
              <span className="block sm:hidden">{t("ccc")}</span>
              <span className="hidden sm:block">{t("welcome_to_ccc")}</span>
            </span>
          </div>

          {/* Buttons and Dropdowns */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-[#640D5F] text-white font-bold py-1 px-3 sm:py-2 sm:px-5 rounded-lg text-xs sm:text-sm"
              >
                {t("dashboard")}
              </Link>
            ) : (
              <Link
                to="/complaint-category"
                className="bg-[#640D5F] text-white font-bold py-1 px-3 sm:py-2 sm:px-5 rounded-lg text-xs sm:text-sm"
              >
                {t("complaints")}
              </Link>
            )}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-[#640D5F] hover:bg-teal-700 text-white p-1 sm:p-2"
                aria-label={t("language")}
              >
                <TbWorld className="text-lg sm:text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-white rounded-lg w-36 sm:w-40 mt-2 border border-gray-100"
              >
                <li>
                  <button
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 text-sm"
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 text-sm"
                    onClick={() => changeLanguage("bn")}
                  >
                    🇧🇩 বাংলা
                  </button>
                </li>
              </ul>
            </div>
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-teal-50 p-1"
                  aria-label={t("user_menu")}
                >
                  <div className="w-6 sm:w-8 rounded-full border border-gray-200">
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
                  className="dropdown-content menu p-2 shadow-lg bg-white rounded-lg w-36 sm:w-40 mt-2 border border-gray-100"
                >
                  <li>
                    <button
                      className="px-3 sm:px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 text-sm"
                      onClick={handleLogout}
                    >
                      {t("logout")}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#640D5F] text-white font-bold py-1 px-3 sm:py-2 sm:px-5 rounded-lg text-xs sm:text-sm"
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
