import { Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { motion } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Load saved language
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(() => {});
    setIsOpen(false);
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
    setIsOpen(false);
  };

  // Close menu on overlay click
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // Framer Motion variants for the Complaints button
  const buttonVariants = {
    idle: {
      scale: [1, 1.05, 1], // Gentle pulse effect
      opacity: [1, 0.7, 1], // Blinking effect
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.1,
      opacity: 1, // Ensure full opacity on hover
      backgroundColor: "#0f766e", // teal-700
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
      opacity: 1, // Ensure full opacity on tap
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <header
      className="top-0 w-full bg-white shadow-lg z-50 py-2"
      style={{ position: "-webkit-sticky", position: "sticky" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Hamburger */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t("toggle menu")}
            >
              <Menu size={28} />
            </button>
            <Link to="/" className="flex items-center ml-2 lg:ml-0">
              <img
                src="https://i.ibb.co.com/BWyt7Dk/ccc.png"
                alt="Logo"
                className="h-8 md:h-14 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex justify-center items-center col-span-3 space-x-4">
            <li>
              <Link
                to="/locations"
                className="text-gray-800 font-medium hover:text-teal-600 px-4 py-2 rounded-lg"
              >
                {t("Office Locations")}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 font-medium hover:text-teal-600 px-4 py-2 rounded-lg"
              >
                {t("contact")}
              </Link>
            </li>
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="text-gray-800 font-medium hover:text-teal-600 px-4 py-2 rounded-lg"
                >
                  {t("login")}
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-800 font-medium hover:text-teal-600 px-4 py-2 rounded-lg"
                >
                  {t("dashboard")}
                </Link>
              </li>
            )}
          </ul>

          {/* Buttons and Dropdowns */}
          <div className="flex items-center justify-end gap-4">
            <motion.div
              className="hidden lg:block"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/complaint-category"
                className="bg-[#640D5F] text-white font-bold py-2 px-5 rounded-lg"
              >
                {t("Complaints")}
              </Link>
            </motion.div>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle bg-[#640D5F] hover:bg-teal-700 text-white p-2"
                aria-label={t("select language")}
              >
                <TbWorld className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-white rounded-lg w-40 mt-2 border border-gray-100"
              >
                <li>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#640D5F] hover:text-teal-600"
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 English
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => changeLanguage("bn")}
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
                  className="btn btn-ghost btn-circle avatar hover:bg-teal-50 p-1"
                  aria-label={t("user menu")}
                >
                  <div className="w-8 rounded-full border border-gray-200">
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
                      className="px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      onClick={handleLogout}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 lg:hidden transition-opacity duration-300"
          onClick={handleOverlayClick}
        >
          <div
            className="absolute left-0 top-0 h-full w-3/4 max-w-[300px] bg-white shadow-2xl p-4 transform transition-transform duration-300 ease-in-out will-change-transform"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={t("mobile navigation menu")}
          >
            <div className="flex justify-between items-center mb-6">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img
                  className="h-10"
                  src="https://i.ibb.co.com/BWyt7Dk/ccc.png"
                  alt="Logo"
                />
              </Link>
              <button
                className="p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                onClick={() => setIsOpen(false)}
                aria-label={t("close menu")}
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-2">
              <Link
                to="/locations"
                className="block px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("Office Locations")}
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("contact")}
              </Link>
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/complaint-category"
                  className="block px-4 py-3 text-lg font-semibold text-white bg-[#640D5F] hover:bg-teal-700 rounded-xl transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t("Complaints")}
                </Link>
              </motion.div>
              {!user ? (
                <Link
                  to="/login"
                  className="block px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t("login")}
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dashboard")}
                </Link>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2 px-4">
                  {t("language")}
                </p>
                <div className="space-y-2">
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                    onClick={() => changeLanguage("en")}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                    onClick={() => changeLanguage("bn")}
                  >
                    🇧🇩 বাংলা
                  </button>
                </div>
              </div>
              {user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-teal-100 hover:text-teal-600 rounded-xl transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;