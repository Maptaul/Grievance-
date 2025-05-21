import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiFile, FiImage, FiMapPin, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Ensure SweetAlert2 is installed and properly imported
import Loading from "./Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const EditComplaint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state?.complaint;
  const [error, setError] = useState(null);
  const [updatePhoto, setUpdatePhoto] = useState(null);
  const [updatePhotoPreview, setUpdatePhotoPreview] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [updateLocation, setUpdateLocation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!complaint) {
      setError("No complaint data found.");
      return;
    }
    console.log("Original Image URL:", complaint.fileUrl);
    console.log("History:", complaint.history);
    console.log(
      "History Image URLs:",
      complaint.history?.map((entry) => entry.fileUrl)
    );
  }, [complaint]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 10 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        Swal.fire("Invalid File Type", "Please upload JPEG/PNG.", "error");
        return;
      }
      if (file.size > maxSize) {
        Swal.fire("File Too Large", "Max size is 10MB.", "error");
        return;
      }
      setUpdatePhoto(file);
      setUpdatePhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setUpdatePhoto(null);
    setUpdatePhotoPreview("");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUpdateLocation(newLocation);
          Swal.fire({
            icon: "success",
            title: "Location Captured",
            html: `Latitude: ${newLocation.latitude.toFixed(
              4
            )}<br>Longitude: ${newLocation.longitude.toFixed(4)}`,
            timer: 2000,
            showConfirmButton: false,
          });
        },
        () => {
          Swal.fire("Location Error", "Enable location services.", "error");
        }
      );
    } else {
      Swal.fire("Unsupported", "Geolocation not supported.", "error");
    }
  };

  const handleUpdateAndResolve = async () => {
    try {
      setUploading(true);
      let newFileUrl = null;
      if (updatePhoto) {
        const formData = new FormData();
        formData.append("image", updatePhoto);
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          formData
        );
        newFileUrl = imgResponse.data.data.display_url;
      }
      const updateData = {
        status: "Resolved",
        newFileUrl,
        newDescription: updateDescription || undefined,
        newComment: updateComment || undefined,
        newLocation: updateLocation || undefined,
      };
      const response = await fetch(
        `http://localhost:3000/complaints/${complaint._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );
      if (!response.ok) throw new Error("Failed to update complaint");
      await Swal.fire({
        icon: "success",
        title: "Complaint Resolved",
        text: "Information updated and complaint marked as resolved!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard/AdminHome");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", "Failed to update complaint.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/AdminHome");
  };

  const formatLocation = (loc) => {
    if (!loc || !loc.latitude || !loc.longitude) return "N/A";
    return `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!complaint) {
    return <Loading />;
  }

  const isResolved = complaint.status === "Resolved";

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          .animate-slide-in { animation: slideIn 0.5s ease-out; }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hover-scale:hover { transform: scale(1.03); transition: transform 0.2s ease; }
          .hover-pulse:hover { animation: pulse 0.3s; }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-slide-in">
          {isResolved ? "View Complaint" : "Edit Complaint"}
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8 animate-slide-in">
          {/* Complaint Details */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 mb-6">
              Complaint Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Complaint ID", value: complaint._id || "N/A" },
                { label: "Category", value: complaint.category || "N/A" },
                { label: "Title", value: complaint.name || "N/A" },
                { label: "Status", value: complaint.status || "N/A" },
                { label: "User Email", value: complaint.email || "N/A" },
                {
                  label: "Created At",
                  value:
                    complaint.createdAt || complaint.timestamp
                      ? new Date(
                          complaint.createdAt || complaint.timestamp
                        ).toLocaleString()
                      : "N/A",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover-scale border border-gray-200"
                >
                  <p className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <p className="text-lg text-gray-800 font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
              {complaint.description && (
                <div className="p-4 bg-gray-50 rounded-lg md:col-span-2 hover-scale border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    Original Description
                  </p>
                  <p className="text-lg text-gray-800">
                    {complaint.description}
                  </p>
                </div>
              )}
              {complaint.location && (
                <div className="p-4 bg-gray-50 rounded-lg hover-scale border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    Original Location
                  </p>
                  <p className="text-lg text-gray-800">
                    {formatLocation(complaint.location)}
                  </p>
                </div>
              )}
              {complaint.comment && (
                <div className="p-4 bg-gray-50 rounded-lg md:col-span-2 hover-scale border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    Original Comment
                  </p>
                  <p className="text-lg text-gray-800">{complaint.comment}</p>
                </div>
              )}
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Original Image
                </h3>
                {complaint.fileUrl && complaint.fileUrl.trim() !== "" ? (
                  <img
                    src={complaint.fileUrl}
                    alt="Original Complaint"
                    className="max-w-full h-auto rounded-lg border-2 border-gray-200 shadow-md mx-auto"
                    style={{ maxHeight: "300px" }}
                    onError={() =>
                      console.log(
                        "Failed to load Original Image:",
                        complaint.fileUrl
                      )
                    }
                  />
                ) : (
                  <p className="text-lg text-gray-500 italic bg-gray-50 p-4 rounded-lg text-center">
                    No Original Image Available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Update History */}
          <div>
            <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 mb-6">
              Update History
            </h2>
            {complaint.history && complaint.history.length > 0 ? (
              [...complaint.history].reverse().map((entry, index) => (
                <div
                  key={index}
                  className="mb-8 border-l-4 border-teal-500 pl-4"
                >
                  <h3 className="text-xl font-semibold text-teal-600 mb-4">
                    Update #{index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg hover-scale border border-gray-200">
                      <p className="text-sm text-gray-600 font-medium">
                        Updated At
                      </p>
                      <p className="text-lg text-gray-800">
                        {entry.timestamp
                          ? new Date(entry.timestamp).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                    {entry.description && (
                      <div className="p-4 bg-gray-50 rounded-lg md:col-span-2 hover-scale border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">
                          Updated Description #{index + 1}
                        </p>
                        <p className="text-lg text-gray-800">
                          {entry.description}
                        </p>
                      </div>
                    )}
                    {entry.comment && (
                      <div className="p-4 bg-gray-50 rounded-lg md:col-span-2 hover-scale border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">
                          Updated Comment #{index + 1}
                        </p>
                        <p className="text-lg text-gray-800">{entry.comment}</p>
                      </div>
                    )}
                    {entry.location && (
                      <div className="p-4 bg-gray-50 rounded-lg hover-scale border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">
                          Updated Location #{index + 1}
                        </p>
                        <p className="text-lg text-gray-800">
                          {formatLocation(entry.location)}
                        </p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Updated Image #{index + 1}
                      </h3>
                      {entry.fileUrl && entry.fileUrl.trim() !== "" ? (
                        <img
                          src={entry.fileUrl}
                          alt={`Updated Complaint ${index + 1}`}
                          className="max-w-full h-auto rounded-lg border-2 border-gray-200 shadow-md mx-auto"
                          style={{ maxHeight: "200px" }}
                          onError={() =>
                            console.log(
                              "Failed to load Updated Image:",
                              entry.fileUrl
                            )
                          }
                        />
                      ) : (
                        <p className="text-lg text-gray-500 italic bg-gray-50 p-4 rounded-lg text-center">
                          No Updated Image Available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-500 italic bg-gray-50 p-4 rounded-lg text-center">
                No Update History Available
              </p>
            )}
          </div>

          {/* Update Section */}
          {!isResolved && (
            <div>
              <h2 className="text-2xl font-semibold text-center text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-3 mb-6">
                Update and Resolve
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Photo
                  </h3>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full flex flex-col items-center justify-center p-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg hover-pulse"
                  >
                    <FiImage className="w-8 h-8 mb-2" />
                    <span className="text-lg font-medium">Choose Photo</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  {updatePhoto && (
                    <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between mt-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <FiFile className="text-gray-500 w-6 h-6" />
                        <span className="text-lg font-medium text-gray-800">
                          {updatePhoto.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                  {updatePhotoPreview && (
                    <img
                      src={updatePhotoPreview}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg border-2 border-gray-200 shadow-md mt-4 mx-auto"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Description
                  </h3>
                  <textarea
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    rows="5"
                    placeholder="Add update description..."
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Comment
                  </h3>
                  <textarea
                    value={updateComment}
                    onChange={(e) => setUpdateComment(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    rows="5"
                    placeholder="Add update comment..."
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Location
                  </h3>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover-pulse"
                  >
                    <FiMapPin className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      {updateLocation ? "Update Location" : "Add Location"}
                    </span>
                  </button>
                  {updateLocation && (
                    <div className="p-4 bg-gray-50 rounded-lg mt-4 border border-gray-200">
                      <p className="text-lg text-gray-800">
                        <strong>Location:</strong>{" "}
                        {formatLocation(updateLocation)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isResolved && (
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-lg hover-pulse disabled:opacity-50"
                onClick={handleUpdateAndResolve}
                disabled={uploading}
              >
                {uploading ? "Updating..." : "Update and Resolve"}
              </button>
            )}
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 px-6 rounded-lg hover-pulse disabled:opacity-50"
              onClick={handleBack}
              disabled={uploading}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComplaint;
