import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCamera,
  FiFile,
  FiImage,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const SubmitComplaint = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [ward, setWard] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const { user, role } = useContext(AuthContext);

  const wards = [
    { en: "South Pahartali", bn: "দক্ষিণ পাহাড়তলী", value: "Ward-1" },
    { en: "Jalalabad", bn: "জালালাবাদ", value: "Ward-2" },
    { en: "Panchlaish", bn: "পাঁচলাইশ", value: "Ward-3" },
    { en: "Chandgaon", bn: "চান্দগাঁও", value: "Ward-4" },
    { en: "Mohra", bn: "মোহরা", value: "Ward-5" },
    { en: "East Madarbari", bn: "পূর্ব মাদারবাড়ী", value: "Ward-6" },
    { en: "West Madarbari", bn: "পশ্চিম মাদারবাড়ী", value: "Ward-7" },
    { en: "Shulakbahar", bn: "শুলকবহর", value: "Ward-8" },
    { en: "North Pahartali", bn: "উত্তর পাহাড়তলী", value: "Ward-9" },
    { en: "North Kattali", bn: "উত্তর কাট্টলী", value: "Ward-10" },
    { en: "South Kattali", bn: "দক্ষিণ কাট্টলী", value: "Ward-11" },
    { en: "Saraipara", bn: "সরাইপাড়া", value: "Ward-12" },
    { en: "Pahartali", bn: "পাহাড়তলী", value: "Ward-13" },
    { en: "Lalkhan Bazar", bn: "লালখান বাজার", value: "Ward-14" },
    { en: "Bagmoniram", bn: "বাগমনিরাম", value: "Ward-15" },
    { en: "Chakbazar", bn: "চকবাজার", value: "Ward-16" },
    { en: "West Bakalia", bn: "পশ্চিম বাকলিয়া", value: "Ward-17" },
    { en: "East Bakalia", bn: "পূর্ব বাকলিয়া", value: "Ward-18" },
    { en: "South Bakalia", bn: "দক্ষিণ বাকলিয়া", value: "Ward-19" },
    { en: "Dewan Bazar", bn: "দেওয়ান বাজার", value: "Ward-20" },
    { en: "Jamalkhan", bn: "জামালখান", value: "Ward-21" },
    { en: "Enayet Bazar", bn: "এনায়েত বাজার", value: "Ward-22" },
    { en: "North Pathantuli", bn: "উত্তর পাঠানটুলী", value: "Ward-23" },
    { en: "North Agrabad", bn: "উত্তর আগ্রাবাদ", value: "Ward-24" },
    { en: "Rampur", bn: "রামপুর", value: "Ward-25" },
    { en: "North Halishahar", bn: "উত্তর হালিশহর", value: "Ward-26" },
    { en: "South Agrabad", bn: "দক্ষিণ আগ্রাবাদ", value: "Ward-27" },
    { en: "Pathantuli", bn: "পাঠানটুলী", value: "Ward-28" },
    { en: "West Madarbari", bn: "পশ্চিম মাদারবাড়ী", value: "Ward-29" },
    { en: "East Madarbari", bn: "পূর্ব মাদারবাড়ী", value: "Ward-30" },
    { en: "Alkaran", bn: "আলকরণ", value: "Ward-31" },
    { en: "Andarkilla", bn: "আন্দরকিল্লা", value: "Ward-32" },
    { en: "Firingee Bazar", bn: "ফিরিঙ্গী বাজার", value: "Ward-33" },
    { en: "Patharghata", bn: "পাথরঘাটা", value: "Ward-34" },
    { en: "Boxirhat", bn: "বক্সিরহাট", value: "Ward-35" },
    { en: "Gosaildanga", bn: "গোসাইলডাঙ্গা", value: "Ward-36" },
    {
      en: "North Middle Halishahar",
      bn: "উত্তর মধ্য হালিশহর",
      value: "Ward-37",
    },
    {
      en: "South Middle Halishahar",
      bn: "দক্ষিণ মধ্য হালিশহর",
      value: "Ward-38",
    },
    { en: "South Halishahar", bn: "দক্ষিণ হালিশহর", value: "Ward-39" },
    { en: "North Potenga", bn: "উত্তর পতেঙ্গা", value: "Ward-40" },
    { en: "South Potenga", bn: "দক্ষিণ পতেঙ্গা", value: "Ward-41" },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "application/pdf",
    ];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type)) {
      Swal.fire(
        t("invalid_file_type"),
        t("please_upload_valid_files"),
        "error"
      );
      return;
    }

    if (selectedFile.size > maxSize) {
      Swal.fire(t("file_too_large"), t("max_file_size"), "error");
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
            title: t("location_captured"),
            html: `${t("latitude")}: ${position.coords.latitude.toFixed(4)}<br>
                  ${t("longitude")}: ${position.coords.longitude.toFixed(4)}`,
            timer: 2000,
            showConfirmButton: false,
          });
        },
        (error) => {
          Swal.fire(t("location_error"), t("enable_location"), "error");
          console.error("Location error:", error);
        }
      );
    } else {
      Swal.fire(
        t("unsupported_feature"),
        t("geolocation_unsupported"),
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      Swal.fire(t("missing_info"), t("provide_description"), "error");
      return;
    }

    if (!file) {
      Swal.fire(t("missing_info"), t("upload_media"), "error");
      return;
    }

    if (!ward) {
      Swal.fire(t("missing_info"), t("select_ward"), "error");
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!mobileNumber || !phoneRegex.test(mobileNumber)) {
      Swal.fire(t("missing_info"), t("provide_valid_mobile"), "error");
      return;
    }

    if (!user?.email) {
      Swal.fire(t("error"), t("please_login_to_submit"), "error");
      return;
    }

    try {
      let fileUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          formData
        );
        fileUrl = imgResponse.data.data.display_url;
      }

      const selectedWard = wards.find(
        (w) => (i18n.language === "bn" ? w.bn : w.en) === ward
      );
      const wardValue = selectedWard ? selectedWard.value : null;

      if (!selectedCategory) {
        throw new Error(t("category_required"));
      }

      const complaintData = {
        category: selectedCategory,
        name: isAnonymous ? t("anonymous") : name,
        description,
        fileUrl,
        location,
        ward: wardValue,
        status: t("status_pending"),
        employeeId: null,
        timestamp: new Date().toISOString(),
        email: user.email,
        mobileNumber,
      };

      console.log("Submitting complaint data:", complaintData);

      const response = await fetch(
        "https://grievance-server.vercel.app/complaints",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(complaintData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `${t(
            "failed_to_submit_complaint"
          )} Server responded with: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("Server response:", responseData);

      Swal.fire({
        icon: "success",
        title: t("complaint_submitted"),
        html: `
          <div class="text-left">
            <p class="font-semibold">${t("category_label")}: ${t(
          `category.${selectedCategory}`
        )}</p>
            <p class="mt-2">${t("complaint_received")}</p>
            ${
              location
                ? `<p class="mt-2 text-sm">${t(
                    "location_label"
                  )}: ${location.latitude.toFixed(
                    4
                  )}, ${location.longitude.toFixed(4)}</p>`
                : ""
            }
            ${
              ward
                ? `<p class="mt-2 text-sm">${t("ward_label")}: ${ward}</p>`
                : ""
            }
            <p class="mt-2 text-sm">${t("mobile_label")}: ${mobileNumber}</p>
          </div>
        `,
        confirmButtonColor: "#3B82F6",
      });

      setName("");
      setDescription("");
      setFile(null);
      setLocation(null);
      setWard(null);
      setIsAnonymous(false);
      setMobileNumber("");
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire(
        t("error"),
        t("submission_failed") + (error.message ? `: ${error.message}` : ""),
        "error"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-4 p-4 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        {selectedCategory && (
          <div className="mt-4">
            <span className="font-bold text-lg bg-blue-100 text-fuchsia-600 px-4 py-2 rounded-full inline-block mt-2">
              {t("category_label")}: {t(`category.${selectedCategory}`)}
            </span>
          </div>
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {t("report_issue")}
        </h1>
        <p className="text-gray-600 text-sm">{t("improve_community")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">
              {t("submit_anonymously")}
            </span>
          </label>
        </div>

        {!isAnonymous && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {t("your_name")}
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name_placeholder")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {t("description_label")}*
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-4 text-gray-400" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("description_placeholder")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {t("mobile_label")}*
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder={t("mobile_placeholder")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("add_media")}*
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiCamera className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm text-gray-700">{t("take_photo")}</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FiImage className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm text-gray-700">{t("choose_file")}</span>
            </button>
          </div>

          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            // Removed required attribute
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*, video/*, application/pdf"
            onChange={handleFileChange}
            className="hidden"
            // Removed required attribute
          />

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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            {t("ward_label")}*
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={ward || ""}
                onChange={(e) => setWard(e.target.value || null)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">{t("select_ward")}</option>
                {wards.map((ward) => (
                  <option
                    key={ward.value}
                    value={i18n.language === "bn" ? ward.bn : ward.en}
                  >
                    {i18n.language === "bn" ? ward.bn : ward.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={getLocation}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiMapPin className="text-blue-600" />
                <span className="text-sm font-medium">
                  {location ? t("update_location") : t("add_location")}
                </span>
              </button>
              {location && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <FiMapPin className="inline mr-2 text-blue-600" />
                    {location.latitude.toFixed(4)},{" "}
                    {location.longitude.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={role !== "citizen"}
          >
            {t("submit_complaint")}
          </button>
          {role !== "citizen" && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {t("only_citizens_can_submit")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
