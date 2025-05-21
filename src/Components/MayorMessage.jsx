import { useTranslation } from "react-i18next";
import mayor from "/src/assets/mayor.jpg";

const MayorMessage = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-[48px] sm:pt-[56px] bg-[#f4f4f4] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center pb-5">
          <h2 className="text-3xl font-semibold">
            {t("mayor_message_header")}
          </h2>
        </div>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center ">
          {/* Image */}
          <div className="text-center">
            <img
              src={mayor}
              alt={t("mayor_image_alt")}
              className="w-[60%] mx-auto rounded-[20px]"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-xl mb-5">
              <span className="text-[#640D5F] block text-2xl py-1">
                {t("mayor_name")}
              </span>
              <span dangerouslySetInnerHTML={{ __html: t("mayor_title") }} />
            </h3>
            <p className="italic text-lg text-justify whitespace-normal">
              {t("mayor_message")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MayorMessage;
