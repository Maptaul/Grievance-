import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import registrationLottie from "../assets/lottie/register.json";
import { AuthContext } from "../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const SignUp = () => {
  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        formData
      );
      setImage(res.data.data.display_url);
      toast.success(t("image_uploaded")); // Optional success feedback
    } catch (error) {
      toast.error(t("submission_failed"));
    }
  };

  // Handle email/password sign-up
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create user in Firebase
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, image || data.photo);

      // Save to MongoDB
      const newUser = {
        name: data.name,
        email: data.email.toLowerCase(), // Normalize email
        photo: image || "https://via.placeholder.com/150", // Fallback if no image
        role: data.role,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        "https://grievance-server.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) throw new Error(t("submission_failed"));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("registration_successful"),
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || t("submission_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Save Google user to MongoDB
      const googleUser = {
        name: user.displayName,
        email: user.email.toLowerCase(), // Normalize email
        photo: user.photoURL || "https://via.placeholder.com/150", // Fallback if no photo
        role: "citizen", // Default role for Google sign-in
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        "https://grievance-server.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleUser),
        }
      );

      if (!response.ok) throw new Error(t("submission_failed"));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("registration_successful"),
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || t("submission_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4">
      <div className="w-full md:w-1/2 max-w-md mb-8 md:mb-0">
        <Lottie
          animationData={registrationLottie}
          loop
          className="rounded-lg"
        />
      </div>

      <div className="w-full md:w-1/2 max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {t("create_account")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("your_name")}
            </label>
            <input
              type="text"
              {...register("name", { required: t("name_required") })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder={t("name_placeholder")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("your_name_override")}
            </label>
            <input
              type="email"
              {...register("email", { required: t("email_required") })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder={t("name_placeholder_override")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("profile_image")}
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("select_role")}
            </label>
            <select
              {...register("role", { required: t("role_required") })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              <option value="">{t("select_role_placeholder")}</option>
              <option value="citizen">{t("citizen")}</option>
              <option value="administrative">{t("administrative")}</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("description_label_override")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: t("password_required"),
                  minLength: {
                    value: 6,
                    message: t("password_min_length"),
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder={t("description_placeholder_override")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? t("registering") : t("create_account")}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">{t("or")}</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-gray-700 font-medium">
            {t("login_with_google")}
          </span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          {t("already_have_account")}{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            {t("complainant_login_override")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
