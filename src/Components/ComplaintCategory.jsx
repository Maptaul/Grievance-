import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ComplaintCategory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((response) => response.json())
      .then((data) => setComplaints(data), setLoading(false))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Select Complaint Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {complaints.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-4xl mb-2">{item.icon}</span>
            <p className="text-lg font-semibold text-center">{item.category}</p>
            <Link
              to={{
                pathname: "/submit-complaint",
                search: `?category=${encodeURIComponent(item.category)}`,
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
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
