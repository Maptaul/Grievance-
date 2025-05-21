import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Providers/AuthProvider";

const Employees = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const { createUser, role } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/users?role=employee"
        );
        if (!response.ok) throw new Error(t("fetch_error"));
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [t]);

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.success) return data.data.url;
      throw new Error(t("upload_error"));
    } catch (err) {
      toast.error(t("upload_error"));
      return null;
    }
  };

  const handleAddEmployee = async (data) => {
    let photoUrl = data.photo;
    if (photoFile) {
      photoUrl = await handlePhotoUpload(photoFile);
      if (!photoUrl) return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          designation: data.designation,
          mobileNumber: data.mobileNumber,
          email: data.email,
          department: data.department,
          password: data.password,
          photo: photoUrl || "https://via.placeholder.com/150",
          role: "employee",
          suspended: false,
        }),
      });
      if (!response.ok) throw new Error(t("add_error"));

      const addedEmployee = await response.json();
      setEmployees([...employees, addedEmployee]);

      reset();
      setPhotoFile(null);
      setShowPassword(false);
      document.getElementById("add_employee_modal").close();

      toast.success(t("add_success"));
    } catch (err) {
      toast.error(t("add_error"));
    }
  };

  const handleSuspendEmployee = async (email, currentSuspendedStatus) => {
    const action = currentSuspendedStatus ? "unsuspend" : "suspend";
    const result = await Swal.fire({
      icon: "warning",
      title: t("confirm_action", { action }),
      text: currentSuspendedStatus ? t("unsuspend_text") : t("suspend_text"),
      showCancelButton: true,
      confirmButtonColor: currentSuspendedStatus ? "#10B981" : "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: currentSuspendedStatus
        ? t("yes_unsuspend")
        : t("yes_suspend"),
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/users/${email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ suspended: !currentSuspendedStatus }),
        });
        if (!response.ok) throw new Error(t(`fail_${action}`));

        setEmployees(
          employees.map((employee) =>
            employee.email === email
              ? { ...employee, suspended: !currentSuspendedStatus }
              : employee
          )
        );

        toast.success(t(`${action}_success`));
      } catch (err) {
        toast.error(t(`fail_${action}`));
      }
    }
  };

  if (loading) return <Loading message={t("loading")} />;
  if (error) return <p className="text-center text-red-600 text-xl">{error}</p>;

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          .animate-fade-in { animation: fadeIn 0.5s ease-in; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hover-scale:hover { transform: scale(1.03); transition: transform 0.2s ease; }
          @media (max-width: 640px) {
            .table-container { overflow-x: auto; }
            .modal-box { width: 90%; max-height: 80vh; overflow-y: auto; }
            .input, .btn { width: 100%; margin-bottom: 0.5rem; }
          }
          @media (min-width: 641px) {
            .modal-box { max-width: 500px; }
          }
        `}
      </style>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
          {t("manage_employees")}
        </h1>
        <button
          className="btn bg-gray-600 text-white hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg shadow-md hover-scale"
          onClick={() =>
            document.getElementById("add_employee_modal").showModal()
          }
        >
          {t("add_employee")}
        </button>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block table-container overflow-x-auto bg-white rounded-lg shadow-lg animate-fade-in">
        <table className="table w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("photo")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("name")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("designation")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("department")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("mobile")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-sm sm:text-base font-semibold uppercase tracking-wider">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.email}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-3 sm:py-3 sm:px-4">
                  <img
                    src={employee.photo || "https://via.placeholder.com/50"}
                    alt={t("employee_photo_alt", { name: employee.name })}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-800 text-sm sm:text-base">
                  {employee.name || "N/A"}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-800 text-sm sm:text-base">
                  {employee.designation || "N/A"}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-800 text-sm sm:text-base">
                  {employee.department || "N/A"}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-800 text-sm sm:text-base">
                  {employee.mobileNumber || "N/A"}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      employee.suspended
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {employee.suspended ? t("suspended") : t("active")}
                  </span>
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-4">
                  <button
                    onClick={() =>
                      handleSuspendEmployee(employee.email, employee.suspended)
                    }
                    className={`btn btn-xs px-2 sm:px-3 py-1 ${
                      employee.suspended ? "btn-success" : "btn-error"
                    } text-white rounded-md hover-scale`}
                  >
                    {employee.suspended ? t("unsuspend") : t("suspend")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card View */}
      <div className="block md:hidden space-y-2">
        {employees.map((employee) => (
          <div
            key={employee.email}
            className="bg-gray-50 p-2 sm:p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                {employee.name || "N/A"}
              </span>
              <span
                className={`inline-block px-1 sm:px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  employee.suspended
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {employee.suspended ? t("suspended") : t("active")}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("photo")}:</span>{" "}
              <img
                src={employee.photo || "https://via.placeholder.com/50"}
                alt={t("employee_photo_alt", { name: employee.name })}
                className="inline-block w-8 h-8 rounded-full object-cover border border-gray-300"
              />
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("designation")}:</span>{" "}
              {employee.designation || "N/A"}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("department")}:</span>{" "}
              {employee.department || "N/A"}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("mobile")}:</span>{" "}
              {employee.mobileNumber || "N/A"}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-medium">{t("actions")}:</span>{" "}
              <button
                onClick={() =>
                  handleSuspendEmployee(employee.email, employee.suspended)
                }
                className={`btn btn-xs px-2 py-1 ${
                  employee.suspended ? "btn-success" : "btn-error"
                } text-white rounded-md hover-scale inline-flex items-center`}
              >
                {employee.suspended ? t("unsuspend") : t("suspend")}
              </button>
            </p>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      <dialog
        id="add_employee_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 mb-4">
            {t("add_new_employee")}
          </h3>
          <form
            onSubmit={handleSubmit(handleAddEmployee)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                {t("name")}
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: t("name_required") })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
                placeholder={t("name")}
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="designation"
                className="block text-base font-medium text-gray-700"
              >
                {t("designation")}
              </label>
              <input
                id="designation"
                type="text"
                {...register("designation", {
                  required: t("designation_required"),
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
                placeholder={t("designation")}
                required
              />
              {errors.designation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-base font-medium text-gray-700"
              >
                {t("mobile")}
              </label>
              <input
                id="mobileNumber"
                type="tel"
                {...register("mobileNumber", {
                  required: t("mobile_required"),
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
                placeholder={t("mobile")}
                required
              />
              {errors.mobileNumber && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: t("email_required") })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
                placeholder={t("email")}
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-base font-medium text-gray-700"
              >
                {t("department")}
              </label>
              <input
                id="department"
                type="text"
                {...register("department", {
                  required: t("department_required"),
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
                placeholder={t("department")}
                required
              />
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-base font-medium text-gray-700"
              >
                {t("photo")}
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700"
              >
                {t("password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: t("password_required"),
                    minLength: { value: 6, message: t("password_min_length") },
                  })}
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white pr-12 shadow-sm"
                  placeholder={t("password_placeholder")}
                  required
                  aria-required="true"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
            <div className="modal-action flex justify-between">
              <button
                type="submit"
                className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md shadow-md hover-scale"
              >
                {t("save")}
              </button>
              <form method="dialog">
                <button className="btn bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-md shadow-md hover-scale">
                  {t("cancel")}
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Employees;
