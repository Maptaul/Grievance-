import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { FaMousePointer } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center">
      {/* Text Section */}
      <div className="w-full md:w-8/12 mb-10">
        <p className="text-xl leading-relaxed text-center">
          {t("welcome_message")} {/* Translatable text */}
        </p>
      </div>

      {/* Button Section */}
      <div className="w-full md:w-4/12 flex justify-center">
        <Link
          to="/submit-complaint"
          className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 relative"
        >
          <span className="text-purple-700 font-semibold text-md">
            {t("submit_grievance")} {/* Translatable button text */}
          </span>
          <span className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center ml-2">
            <FaMousePointer className="text-white text-lg" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
