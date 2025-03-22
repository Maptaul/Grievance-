import React from "react";
import { FaMousePointer } from "react-icons/fa";
import { Link } from "react-router-dom"; // Fixed import issue

const Banner = () => {
  return (
    <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow-md flex flex-col md:flex-row justify-between items-center">
      {/* Text Section */}
      <div className="w-full md:w-8/12 ">
        <p className="text-lg leading-relaxed text-center">
          Welcome to the <b>Central Grievance Platform</b> of the{" "}
          <b>Chittagong City Corporation, Bangladesh</b> is dedicated to
          ensuring transparency, accountability, and responsiveness in
          government services.
          {/* <Link to="/" className="text-blue-600 font-semibold hover:underline">
            please click here...
          </Link> */}
        </p>
      </div>

      {/* Button Section */}
      <div className="w-full md:w-4/12 flex justify-center  ">
        <Link
          to="/submit-complaint"
          className="flex items-center bg-white border border-gray-300 rounded-full px-5 py-3 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 relative"
        >
          <span className="text-purple-700 font-semibold text-md">
            Submit Grievance
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
