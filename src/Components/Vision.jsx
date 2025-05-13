import React from "react";
import { useTranslation } from "react-i18next";
import image4 from "/src/assets/image4.jpg";

const Vision = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto pt-[48px] sm:pt-[56px]" id="vision">
      <div
        className="bg-cover bg-center rounded-[40px] p-5"
        style={{ backgroundImage: `url(${image4})` }}
      >
        <div className="max-w-3xl mx-auto text-center p-16 bg-white/90 rounded-[30px]">
          <h2 className="text-3xl font-bold mb-6">{t("vision_title")}</h2>
          <p className="text-gray-700 text-lg whitespace-normal">
            {t("vision_description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Vision;