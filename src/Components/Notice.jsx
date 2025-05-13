import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import notices from "/public/notice.json";

const Notice = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f4f4f4] mt-[48px] sm:mt-[56px]">
      <Marquee className="bg-white">
        {notices.map((project, index) => (
          <div
            key={project.id}
            className="flex items-center justify-between w-full py-3 px-3 sm:px-4 gap-6 sm:gap-8 font-bold"
          >
            <Link
              to={project.link}
              className={`text-sm sm:text-base ${
                index % 2 === 1 ? "text-[#f144f7]" : "text-gray-800"
              } whitespace-nowrap`}
            >
              {t(project.title_key)}
            </Link>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Notice;