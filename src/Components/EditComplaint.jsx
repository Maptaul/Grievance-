import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiFile, FiImage, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const EditComplaint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state?.complaint; // Get complaint data from navigation state
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null); // State for photo file
  const [photoPreview, setPhotoPreview] = useState(complaint?.fileUrl || ""); // State for photo preview
  const [comment, setComment] = useState(complaint?.comment || ""); // State for comment
  const [uploading, setUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null); // Ref for file input

  useEffect(() => {
    if (!complaint) {
      setError("No complaint data found.");
      return;
    }
  }, [complaint]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        Swal.fire(
          "Invalid File Type",
          "Please upload a valid image (JPEG/PNG).",
          "error"
        );
        return;
      }

      if (file.size > maxSize) {
        Swal.fire(
          "File Too Large",
          "The file size should not exceed 10MB.",
          "error"
        );
        return;
      }

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(complaint?.fileUrl || ""); // Revert to original fileUrl if exists
  };

  const handleUpdate = async () => {
    try {
      setUploading(true);
      let fileUrl = complaint?.fileUrl || "";

      // Upload photo to ImgBB if a new photo is selected
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          formData
        );
        fileUrl = imgResponse.data.data.display_url;
      }

      // Prepare update data
      const updateData = {
        status: "Resolved",
        fileUrl,
        comment,
      };

      // Send update to server
      const response = await fetch(
        `https://grievance-server.vercel.app/complaints/${complaint._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) throw new Error("Failed to update complaint");

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Complaint Resolved",
        text: "The complaint has been updated and marked as Resolved!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate back to AdminHome
      navigate("/dashboard/AdminHome");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update complaint. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/AdminHome"); // Navigate back to AdminHome
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 md:p-8 min-h-screen bg-amber-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Complaint</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Complaint Details */}
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Complaint Details
          </h2>
          <p>
            <strong>ID:</strong> {complaint._id}
          </p>
          <p>
            <strong>Category:</strong> {complaint.category}
          </p>
          <p>
            <strong>Title:</strong> {complaint.name}
          </p>
          <p>
            <strong>Status:</strong> {complaint.status}
          </p>
          <p>
            <strong>User Email:</strong> {complaint.email || "N/A"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(
              complaint.createdAt || complaint.timestamp
            ).toLocaleString()}
          </p>
          {complaint.description && (
            <p>
              <strong>Description:</strong> {complaint.description}
            </p>
          )}
          {complaint.location && (
            <p>
              <strong>Location:</strong>{" "}
              {complaint.location.latitude.toFixed(4)},{" "}
              {complaint.location.longitude.toFixed(4)}
            </p>
          )}
        </div>

        {/* Photo Upload Section */}
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Upload Photo
          </h2>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors w-full"
          >
            <FiImage className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm text-gray-700">Choose Photo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          {(photo || photoPreview) && (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFile className="text-gray-500" />
                <span className="text-sm font-medium">
                  {photo ? photo.name : "Existing Photo"}
                </span>
              </div>
              <button
                type="button"
                onClick={removePhoto}
                className="text-red-500 hover:text-red-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
          {photoPreview && (
            <div className="mt-4">
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="max-w-full h-auto rounded-md"
                style={{ maxHeight: "300px" }}
              />
            </div>
          )}
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Comment</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Add your comment here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            onClick={handleUpdate}
            disabled={uploading}
          >
            {uploading ? "Updating..." : "Update"}
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            disabled={uploading}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComplaint;
