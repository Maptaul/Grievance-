import { useTranslation } from "react-i18next";
import data from "/public/data.json"; // Adjust the path as necessary

const KeyPillarsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="key" className="pt-[48px] sm:pt-[56px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center pb-12 sm:pb-8">
          <h2 className="text-3xl font-semibold whitespace-normal">
            {t("key_pillars_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((category, index) => (
            <div
              key={index}
              className="rounded-[20px] overflow-hidden shadow-[0_10px_21.25px_3.75px_rgba(0,0,0,0.06)] bg-white"
            >
              <div className="text-center">
                <img
                  src={category.image}
                  alt={t(category.altKey)}
                  className="w-full h-[200px] object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-center text-[#640D5F] font-extrabold text-lg mb-4 whitespace-normal">
                  {t(category.titleKey)}
                </h3>
                <ul className="list-disc pl-5">
                  {category.items.map((itemKey, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="mb-2 text-[15px] whitespace-normal"
                    >
                      {t(itemKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyPillarsSection;
