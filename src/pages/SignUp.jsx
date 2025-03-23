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
    reset,
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

  // Password validation
  const validatePassword = (password) => {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const minLength = 6;

    if (!upperCase.test(password))
      return "At least one uppercase letter required";
    if (!lowerCase.test(password))
      return "At least one lowercase letter required";
    if (password.length < minLength) return "Minimum 6 characters required";
    return true;
  };

  // Form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create user
      const userCredential = await createUser(data.email, data.password);

      // Update profile with image URL from state
      await updateUserProfile(data.name, image || data.photo);

      // Prepare user data
      const newUser = {
        name: data.name,
        email: data.email,
        photo: image || data.photo,
        role: data.role,
        createdAt: new Date().toISOString(),
      };

      // Save to database
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

  // Google sign-in handler
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "citizen",
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

      toast.success("Google registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
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

      <div className="w-full md:w-1/2 max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              {...register("role", { required: "Role selection is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Role</option>
              <option value="citizen">Citizen</option>
              <option value="administrative">Administrative</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { validate: validatePassword })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
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
          onClick={handleGoogleLogin}
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
