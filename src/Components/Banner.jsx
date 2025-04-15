import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaMousePointer } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  const { t } = useTranslation();

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.4 },
    },
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } },
  };

  const iconVariants = {
    hover: { rotate: 12, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="mt-8 card bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-xl p-8 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Text Section */}
      <motion.div className="w-full mb-8 text-center" variants={textVariants}>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed drop-shadow-md">
          {t("welcome_message")}
        </p>
      </motion.div>

      {/* Button Section */}
      <motion.div
        className="w-full flex justify-center"
        variants={buttonVariants}
        whileHover="hover"
      >
        <Link
          to="/submit-complaint"
          className="btn bg-gradient-to-r from-purple-600 to-indigo-600 border-none text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-transform flex items-center gap-3"
        >
          <span className="font-semibold text-lg">{t("submit_grievance")}</span>
          <motion.span
            className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center"
            variants={iconVariants}
            whileHover="hover"
          >
            <FaMousePointer className="text-white text-xl" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
