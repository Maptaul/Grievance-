import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../i18n"; // Import i18n to listen for language change
import Loading from "./Loading";

const ComplaintCategory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [languageChanged, setLanguageChanged] = useState(false); // State to force re-render

  useEffect(() => {
    fetch("https://grievance-server.vercel.app/category")
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

  useEffect(() => {
    // Listen for language change and force re-render
    const handleLanguageChange = () => setLanguageChanged((prev) => !prev);
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        {t("select_complaint_category")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {complaints.map((item, index) => {
          // Convert category name to match translation keys
          const categoryKey = item.category.toLowerCase().replace(/\s+/g, "_");
          const translatedCategory = t(`category.${item.category}`, {
            defaultValue: item.category, // Fallback if translation not found
          });

          return (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <span className="text-4xl mb-2">{item.icon}</span>
              <p className="text-lg font-semibold text-center">
                {translatedCategory}
              </p>
              <Link
                to={{
                  pathname: "/submit-complaint",
                  search: `?category=${encodeURIComponent(item.category)}`,
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t("make_complaint")}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplaintCategory;
