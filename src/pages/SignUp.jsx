import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
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
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create user
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, image || data.photo);

      // Save to database
      const newUser = {
        name: data.name,
        email: data.email,
        photo: image || data.photo,
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

      if (!response.ok) throw new Error("Database save failed");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
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
              Select Role
            </label>
            <select
              {...register("role", { required: "Role selection is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              <option value="">Select Role</option>
              <option value="citizen">Citizen</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg"
          >
            {isSubmitting ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={() => googleSignIn()}
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
