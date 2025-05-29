import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import i18n from "../i18n";

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
        console.error(t("error_fetching_data"), error);
        setLoading(false);
      });
  }, [t]);

  useEffect(() => {
    const handleLanguageChange = () => setLanguageChanged((prev) => !prev);
    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

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
        <Loading message={t("loading")} />
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="pt-15 pb-12 text-center">
        <div className="">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("select_complaint_category")}
          </motion.h1>
          <p className="text-gray-600 text-lg">{t("choose_category_below")}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    {/* Show icon from server if available */}
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.category}
                        className="w-48 h-24 object-contain rounded-md mx-auto mb-2"
                        style={{
                          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
                        }}
                      />
                    )}
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
