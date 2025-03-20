import React, { useState } from "react";
import { FiFile, FiMail, FiMapPin, FiUser, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const SubmitComplaint = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          Swal.fire({
            icon: "success",
            title: "Location Captured",
            text: `Latitude: ${position.coords.latitude.toFixed(
              4
            )}, Longitude: ${position.coords.longitude.toFixed(4)}`,
            timer: 2000,
            showConfirmButton: false,
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Location Error",
            text: "Could not retrieve your location.",
          });
          console.error("Error getting location:", error);
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Unsupported Feature",
        text: "Geolocation is not supported by your browser.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const complaintData = {
      name: isAnonymous ? "Anonymous" : name,
      description,
      file,
      location,
    };

    console.log("Submitted Complaint:", complaintData);

    Swal.fire({
      icon: "success",
      title: "Complaint Submitted!",
      text: "Your complaint has been successfully recorded.",
      showConfirmButton: true,
    });

    // Reset form after submission
    setName("");
    setDescription("");
    setFile(null);
    setLocation(null);
    setIsAnonymous(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl rounded-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Report an Issue
        </h2>
        <p className="text-gray-600">Help us make our city better</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anonymous Toggle */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  isAnonymous ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                    isAnonymous ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </div>
            <span className="text-gray-700 font-medium">
              Submit Anonymously
            </span>
          </label>
        </div>

        {/* Name Input */}
        {!isAnonymous && (
          <div className="relative">
            <FiUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-0 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        )}

        {/* Description */}
        <div className="relative">
          <FiMail className="absolute top-4 left-4 text-gray-400" />
          <textarea
            placeholder="Describe your complaint in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-0 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-40"
            required
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <label className="cursor-pointer">
            <div className="space-y-2">
              <FiFile className="inline-block text-3xl text-gray-400" />
              <div className="text-gray-600">
                {file ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm">(Image, Video, PDF - Max 10MB)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*,video/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={getLocation}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <FiMapPin className="text-blue-500" />
            {location ? "Update Location" : "Add Current Location"}
          </button>

          {location && (
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm font-medium text-gray-700">
                <FiMapPin className="inline-block mr-2 text-blue-500" />
                Location captured:{" "}
                <span className="text-green-600">
                  {location.latitude.toFixed(4)},{" "}
                  {location.longitude.toFixed(4)}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition hover:scale-[1.01]"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
