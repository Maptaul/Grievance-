import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import loginLottie from "../assets/lottie/login.json";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);
  console.log("Location object:", location);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: t("login_successful"), // Use translation for "Login Successful"
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      Swal.fire({
        title: t("login_successful"), // Use translation for "Login Successful"
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="min-h-screen md:flex justify-center items-center">
      <div className="text-center lg:text-left w-96">
        <Lottie animationData={loginLottie}> </Lottie>
      </div>
      <div className="card bg-base-200 w-full max-w-lg p-10 text-black shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("complainant_login_override")} {/* Translated "Please Login" */}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {t("name_placeholder_override")}
              </span>{" "}
              {/* Translated "Email" */}
            </label>
            <input
              name="email"
              type="email"
              placeholder={t("name_placeholder")} // Translated placeholder
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {t("description_placeholder_override")}
              </span>{" "}
              {/* Translated "Password" */}
            </label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder={t("description_label_override")} // Translated placeholder
                className="input input-bordered w-full"
                required
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {/* Login Button */}
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">
              {t("submit_complaint_override")} {/* Translated "Login" */}
            </button>
          </div>
        </form>
        {/* Google Login Button */}
        <div className="divider my-4">{t("or")}</div> {/* Translated "OR" */}
        <div className="text-center gap-2">
          <button className="btn btn-outline mr-4" onClick={handleGoogleLogin}>
            <FaGoogle className="mr-2" /> {t("login_with_google")}{" "}
            {/* Translated "Login with Google" */}
          </button>
        </div>
        {/* Register Link */}
        <p className="text-center font-medium mt-5">
          {t("dont_have_account")} {/* Translated "Don’t have an account?" */}
          <Link className="text-blue-500 hover:underline" to="/signUp">
            {t("register")} {/* Translated "Register" */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
