import React, { useRef, useState } from "react";
import {
  FiCamera,
  FiFile,
  FiImage,
  FiMail,
  FiMapPin,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const SubmitComplaint = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // File validation
    const validTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "application/pdf",
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type)) {
      Swal.fire(
        "Invalid File Type",
        "Please upload JPEG, PNG, MP4, or PDF files",
        "error"
      );
      return;
    }

    if (selectedFile.size > maxSize) {
      Swal.fire("File Too Large", "Maximum file size is 10MB", "error");
      return;
    }

    setFile(selectedFile);
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
            title: "Location Captured!",
            html: `Latitude: ${position.coords.latitude.toFixed(4)}<br>
                  Longitude: ${position.coords.longitude.toFixed(4)}`,
            timer: 2000,
            showConfirmButton: false,
          });
        },
        (error) => {
          Swal.fire(
            "Location Error",
            "Please enable location services",
            "error"
          );
          console.error("Location error:", error);
        }
      );
    } else {
      Swal.fire("Unsupported Feature", "Geolocation not supported", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      Swal.fire("Missing Information", "Please provide a description", "error");
      return;
    }

    const complaintData = {
      category: selectedCategory,
      name: isAnonymous ? "Anonymous" : name,
      description,
      file,
      location,
      timestamp: new Date().toISOString(),
    };

    console.log("Submitted complaint:", complaintData);

    Swal.fire({
      icon: "success",
      title: "Complaint Submitted!",
      html: `
        <div class="text-left">
          <p class="font-semibold">Category: ${selectedCategory}</p>
          <p class="mt-2">We've received your complaint and will process it shortly.</p>
          ${
            location
              ? `<p class="mt-2 text-sm">Location: ${location.latitude.toFixed(
                  4
                )}, ${location.longitude.toFixed(4)}</p>`
              : ""
          }
        </div>
      `,
      confirmButtonColor: "#3B82F6",
    });

    // Reset form
    setName("");
    setDescription("");
    setFile(null);
    setLocation(null);
    setIsAnonymous(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-4 p-4 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        {selectedCategory && (
          <div className="mt-4">
            <span className="font-bold text-lg bg-blue-100 text-fuchsia-600 px-4 py-2 rounded-full inline-block mt-2">
              Selected Category: {selectedCategory}
            </span>
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Report an Issue
        </h1>
        <p className="text-gray-600 text-sm">Help improve our community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Anonymous Toggle */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">
              Submit Anonymously
            </span>
          </label>
        </div>

        {/* Name Field */}
        {!isAnonymous && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Your Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        )}

        {/* Description Field */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-4 text-gray-400" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              required
            />
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Add Media</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiCamera className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm text-gray-700">Take Photo</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FiImage className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm text-gray-700">Choose File</span>
            </button>
          </div>

          {/* Hidden Inputs */}
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*, video/*, application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* File Preview */}
          {file && (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFile className="text-gray-500" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Location Section */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={getLocation}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FiMapPin className="text-blue-600" />
            <span className="text-sm font-medium">
              {location ? "Update Location" : "Add Current Location"}
            </span>
          </button>

          {location && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <FiMapPin className="inline mr-2 text-blue-600" />
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default SubmitComplaint;
