import { useTranslation } from "react-i18next";

const Oss = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-[48px] sm:pt-[56px]  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header */}
        <div className="text-center pb-5">
          <h2 className="text-3xl font-semibold">{t("oss_header")}</h2>
        </div>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="text-center">
            <img
              src="https://i.ibb.co/TxnDHD3f/Whats-App-Image-2025-05-26-at-11-58-20-17b2a75f.jpg"
              alt={t("oss_image_alt")}
              className="w-[60%] mx-auto rounded-[20px]"
            />
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-5">
              <span className="text-[#640D5F] block text-2xl py-1">
                {t("oss_title")}
              </span>
            </h3>
            <p className=" text-lg text-justify whitespace-normal">
              {t("oss_description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Oss;
