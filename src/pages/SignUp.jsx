import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import registrationLottie from "../assets/lottie/register.json";
import { AuthContext } from "../Providers/AuthProvider";

const SignUp = () => {
  const { createUser, googleSignIn, updateUserProfile, githubSignIn } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Password validation function
  const validatePassword = (password) => {
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const minLength = 6;

    if (!upperCase.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowerCase.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }
    return true;
  };

  // Handle standard registration
  const onSubmit = async (data) => {
    const { name, email, photo, password, role } = data;

    try {
      // Create user with Firebase
      const userCredential = await createUser(email, password);
      const createdUser = userCredential.user;

      // Update user profile
      await updateUserProfile(name, photo);

      // Save user data to the database
      const newUser = {
        name,
        email,
        photo,
        role,
        createdAt: new Date().toISOString(),
      };
      const response = await fetch(
        "https://learn-bridge-server-two.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        console.log("user added to the database");
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Error during registration. Please try again.");
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const result = await googleSignIn();
      const user = result.user;

      if (user) {
        // Extract user data
        const { displayName: name, email, photoURL: photo } = user;

        // Prepare user data
        const newUser = {
          name,
          email,
          photo,
          role: "student", // Default role; adjust as needed
          createdAt: new Date().toISOString(),
        };

        // Save user data to the database
        const response = await fetch(
          "https://learn-bridge-server-two.vercel.app/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        );

        if (response.ok) {
          toast.success("Google sign-in successful and data saved!");
          navigate("/");
        } else {
          throw new Error("Failed to save user data.");
        }
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Error during Google sign-in. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      // Sign in with GitHub
      const result = await githubSignIn();
      const user = result.user;

      if (user) {
        // Extract user data
        const name = user.displayName || "GitHub User";
        const email = user.email || null; // GitHub email may be null
        const photo = user.photoURL || "https://via.placeholder.com/150";

        // Ensure email is present
        if (!email) {
          toast.error(
            "GitHub account email is not available. Please use another method."
          );
          return;
        }

        // Prepare user data
        const newUser = {
          name,
          email,
          photo,
          role: "student",
          createdAt: new Date().toISOString(),
        };

        // Save user data to the database
        const response = await fetch(
          "https://learn-bridge-server-two.vercel.app/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        );

        const responseData = await response.json();
        console.log("📩 Server Response:", responseData);

        if (response.ok) {
          toast.success("✅ User registered successfully!");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          toast.error(`❌ Error: ${responseData.message}`);
        }
      }
    } catch (error) {
      console.error("GitHub Login Error:", error);
      toast.error("Error during GitHub sign-in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen md:flex justify-center items-center mb-10">
      <div className="text-center lg:text-left w-96">
        <Lottie animationData={registrationLottie} loop />
      </div>
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-md p-10 text-black">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Photo URL"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Select Role
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              {...register("role", { required: "Role selection is required" })}
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="citizen">Citizen</option>
              <option value="administrative">Administrative</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter password"
                {...register("password", { validate: validatePassword })}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 flex items-center justify-center border rounded-lg hover:bg-gray-100"
          >
            <FaGoogle className="mr-2 text-red-500" /> Register with Google
          </button>
        </div>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link className="text-blue-500 font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
