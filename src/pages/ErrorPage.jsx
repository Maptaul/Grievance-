import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="text-center animate-fade-in">
        {/* <img
          src="https://i.ibb.co/W32SjWD/image.png"
          alt="Error Illustration"
          className="w-[350px] h-[220px] mx-auto rounded-lg shadow-lg mb-6 border-4 border-blue-100"
        /> */}
        <h1 className="text-8xl font-extrabold text-blue-500 drop-shadow mb-2">
          404
        </h1>
        <p className="mt-2 text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-lg text-gray-500 max-w-xl mx-auto">
          The page you are looking for does not exist, has been moved, or you
          may have mistyped the address.
        </p>
      </div>
      <div className="mt-10">
        <button
          className="btn btn-primary px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
