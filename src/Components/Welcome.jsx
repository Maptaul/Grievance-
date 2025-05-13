import { useTranslation } from "react-i18next";
import image1 from "/src/assets/image1.jpg";
import image2 from "/src/assets/image2.jpg";
import image3 from "/src/assets/image3.jpg";

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-[48px] sm:pt-[56px] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">{t("welcome_title")}</h2>
            <p className="text-gray-700 text-justify leading-relaxed whitespace-normal">
              {t("welcome_description")}
            </p>
          </div>

          {/* Image Section */}
          <div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <img
                src={image1}
                alt={t("welcome_image_alt")}
                className="h-[200px] w-full object-cover rounded-[20px]"
              />
              <img
                src={image2}
                alt={t("welcome_image_alt")}
                className="h-[200px] w-full object-cover rounded-[20px]"
              />
            </div>
            <img
              src={image3}
              alt={t("welcome_image_alt")}
              className="h-[300px] w-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
