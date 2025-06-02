import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ClipLoader color="#6D28D9" size={50} />
      {/* <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p> */}
    </div>
  );
};

export default Loading;
