import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const SignUp = () => {
  const {
    createUser,
    googleSignIn,
    updateUserProfile,
    user,
    displayName,
    photoURL,
  } = useContext(AuthContext);
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
      toast.success(t("image_uploaded_successfully"));
    } catch (error) {
      toast.error(t("submission_failed"));
    }
  };

  // Handle email/password sign-up
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, image || data.photo);

      const newUser = {
        name: data.name,
        email: data.email.toLowerCase(),
        photo: image || "https://via.placeholder.com/150",
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

      const googleUser = {
        name: user.displayName,
        email: user.email.toLowerCase(),
        photo: user.photoURL || "https://via.placeholder.com/150",
        role: "citizen",
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
    <section
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto py-6 w-full">
        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-md bg-white/90">
          {/* Left Panel */}
          <div className="bg-[#640D5F] md:w-1/2 flex flex-col justify-center items-center text-center text-white">
            <img
              src="https://i.ibb.co/BWyt7Dk/ccc.png"
              alt={t("logo_alt_ccc", {
                defaultValue: "Chattogram City Corporation Logo",
              })}
              className="w-40 mb-8"
            />
            <h2 className="text-2xl font-semibold mb-4">
              {t("chattogram_city_corporation")}
            </h2>
            <p className="text-base text-gray-200">{t("grievance_portal")}</p>
          </div>
          {/* Right Panel */}
          <div className="bg-gray-50 md:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-2 text-center text-[#4A2C5A]">
              {t("register_account")}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2"
              aria-label={t("signup_form", {
                defaultValue: "Registration Form",
              })}
              autoComplete="off"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-base font-medium text-gray-900"
                >
                  {t("full_name")}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: t("name_required") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white shadow-md"
                  placeholder={t("name_placeholder")}
                  required
                  aria-required="true"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  {t("email_address")}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: t("email_required") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white shadow-md"
                  placeholder={t("email_placeholder")}
                  required
                  aria-required="true"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  {t("profile_image")}
                </label>
                <input
                  id="image"
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:px-4 file:py-2 hover:file:bg-gray-200 shadow-md"
                  aria-label={t("upload_profile_image")}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  {t("select_role")}
                </label>
                <select
                  id="role"
                  {...register("role", { required: t("role_required") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white shadow-md"
                  required
                  aria-required="true"
                >
                  <option value="">{t("select_role_placeholder")}</option>
                  <option value="citizen">{t("citizen")}</option>
                  {/* <option value="employee">{t("employee")}</option>
                  <option value="administrative">{t("administrative")}</option> */}
                </select>
                {errors.role && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: t("password_required"),
                      minLength: {
                        value: 6,
                        message: t("password_min_length"),
                      },
                    })}
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A2C5A] focus:border-[#4A2C5A] transition-all bg-white pr-12 shadow-md"
                    placeholder={t("password_placeholder")}
                    required
                    aria-required="true"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#4A2C5A] focus:outline-none"
                    aria-label={
                      showPassword ? t("hide_password") : t("show_password")
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#640D5F] text-white rounded-lg font-medium hover:bg-[#3A1F45] transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label={t("register_account")}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin inline-block"></span>
                ) : (
                  t("register_account")
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-600 text-sm">{t("or")}</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-2 bg-white border border-[#4A2C5A] text-[#4A2C5A] rounded-lg font-medium hover:bg-[#640D5F] hover:text-white transition-all flex items-center justify-center gap-2 shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
                aria-label={t("sign_in_with_google")}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-[#4A2C5A] rounded-full animate-spin inline-block"></span>
                ) : (
                  <>
                    <FaGoogle /> {t("sign_in_with_google")}
                  </>
                )}
              </button>
            </form>

            {/* User Info Display */}
            {user && (
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={photoURL || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-800">{displayName}</span>
              </div>
            )}

            <p className="text-center text-sm mt-2 text-gray-600">
              {t("already_registered")}{" "}
              <Link
                to="/login"
                className="text-[#4A2C5A] hover:underline font-medium"
              >
                {t("login")}
              </Link>
            </p>

            <div className="text-center text-xs mt-6 opacity-70">
              {t("innovated_by")}{" "}
              <a
                href="https://www.jionex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block align-middle transition-all duration-200 hover:scale-105 hover:opacity-90"
                aria-label={t("innovated_by_link_aria", {
                  defaultValue: "Visit Jionex website, innovated by",
                })}
              >
                <img
                  src="https://i.ibb.co/XMXd54n/jionex-logo.png"
                  alt={t("logo_alt")}
                  className="inline h-6 ml-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
