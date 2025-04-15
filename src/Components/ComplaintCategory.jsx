import { motion } from "framer-motion"; // Import Framer Motion
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../i18n";
import Loading from "./Loading";

const ComplaintCategory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [languageChanged, setLanguageChanged] = useState(false);

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
    const handleLanguageChange = () => setLanguageChanged((prev) => !prev);
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // Framer Motion variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Framer Motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Framer Motion variants for icons
  const iconVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  // Framer Motion variants for buttons
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-12 px-2  w-11/12 mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-center mb-8"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {t("select_complaint_category")}
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {complaints.map((item, index) => {
          const categoryKey = item.category.toLowerCase().replace(/\s+/g, "_");
          const translatedCategory = t(`category.${item.category}`, {
            defaultValue: item.category,
          });

          return (
            <motion.div
              key={index}
              className="card bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-teal-500"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <div className="flex flex-col items-center text-center">
                <motion.span
                  className="text-5xl mb-4 text-teal-600"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {item.icon}
                </motion.span>
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  {translatedCategory}
                </p>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Link
                    to={{
                      pathname: "/submit-complaint",
                      search: `?category=${encodeURIComponent(item.category)}`,
                    }}
                    className="btn bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {t("make_complaint")}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplaintCategory;
