import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ComplaintCategory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("../../public/category.json") // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Select Complaint Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {complaints.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-base-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <span className="text-4xl">{item.icon}</span>
            <p className="mt-2 text-lg font-semibold">{item.category}</p>
            <Link
              to={`/submit-complaint?category=${encodeURIComponent(
                item.category
              )}`}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Make a Complaint
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintCategory;
