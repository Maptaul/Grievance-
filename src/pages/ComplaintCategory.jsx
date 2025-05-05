import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import i18n from "../i18n";

// React Icons
import {
  FaBalanceScale,
  FaBolt,
  FaBus,
  FaDog,
  FaFaucet,
  FaFire,
  FaGlobeAmericas,
  FaHospitalAlt,
  FaRoad,
  FaTools,
  FaTrashAlt,
} from "react-icons/fa";
import { MdOutlineDirectionsWalk } from "react-icons/md";

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
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const getCategoryIcon = (category) => {
    const iconProps = { className: "text-4xl text-blue-600 mb-3 mx-auto" };
    switch (category) {
      case "Electricity":
        return <FaBolt {...iconProps} />;
      case "Gas":
        return <FaFire {...iconProps} />;
      case "Water & Sewerage":
        return <FaFaucet {...iconProps} />;
      case "Road & Infrastructure":
        return <FaRoad {...iconProps} />;
      case "Sanitation & Waste Management":
        return <FaTrashAlt {...iconProps} />;
      case "Public Transport":
        return <FaBus {...iconProps} />;
      case "Environment & Pollution":
        return <FaGlobeAmericas {...iconProps} />;
      case "Law & Order":
        return <FaBalanceScale {...iconProps} />;
      case "Animal Control":
        return <FaDog {...iconProps} />;
      case "Health & Medical":
        return <FaHospitalAlt {...iconProps} />;
      case "The Sidewalk":
        return <MdOutlineDirectionsWalk {...iconProps} />;
      case "Others":
        return <FaTools {...iconProps} />;
      default:
        return <FaTools {...iconProps} />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    }),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className=" pt-15 pb-12 text-center">
        <div className="">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("select_complaint_category")}
          </motion.h1>
          <p className="text-gray-600 text-lg">{t("choose category below")}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {complaints.map((item, index) => {
              const translatedCategory = t(`category.${item.category}`, {
                defaultValue: item.category,
              });

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Link
                    to={{
                      pathname: "/submit-complaint",
                      search: `?category=${encodeURIComponent(item.category)}`,
                    }}
                    className="block bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-lg transition-all"
                  >
                    {getCategoryIcon(item.category)}
                    <h3 className="text-md font-extrabold capitalize text-gray-800">
                      {translatedCategory}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ComplaintCategory;
