import { useTranslation } from "react-i18next";
import image5 from "/src/assets/image5.jpg";

const GetInvolved = () => {
  const { t } = useTranslation();

  return (
    <section
      id="get-involved"
      className="pt-[48px] sm:pt-[56px] bg-white mb-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center pb-12 sm:pb-8">
          <h2 className="text-4xl font-bold mb-4 whitespace-normal">
            {t("get_involved_title")}
          </h2>
          <p className="text-gray-700 mx-auto whitespace-normal">
            {t("get_involved_description")}
          </p>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[20px] items-center">
          {/* Image */}
          <div className="rounded-[20px] overflow-hidden">
            <img
              src={image5}
              alt={t("get_involved.image_alt")}
              className="w-full object-cover rounded-[20px]"
            />
          </div>

          {/* List */}
          <div>
            <ul className="list-none space-y-[15px] text-gray-800">
              <li className="whitespace-normal">
                <span className="font-bold text-[#640D5F]">
                  {t("get_involved.residents.title")}
                </span>
                : {t("get_involved.residents.description")}
              </li>
              <li className="whitespace-normal">
                <span className="font-bold text-[#640D5F]">
                  {t("get_involved.businesses.title")}
                </span>
                : {t("get_involved.businesses.description")}
              </li>
              <li className="whitespace-normal">
                <span className="font-bold text-[#640D5F]">
                  {t("get_involved.government_ngos.title")}
                </span>
                : {t("get_involved.government_ngos.description")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
