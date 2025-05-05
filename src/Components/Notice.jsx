import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import notices from "/public/notice.json";

const Notice = () => {
  return (
    <section className="w-full bg-[#f4f4f4] mt-[70px] md:mt-[50px]">
      <Marquee className="bg-white">
        {notices.map((project, index) => (
          <div
            key={project.id}
            className="flex items-center justify-between w-full py-5 px-[15px] gap-[30px] font-bold"
          >
            <Link
              to="#"
              className={`${
                index % 2 === 1 ? "text-[#f144f7]" : "text-gray-800"
              }`}
            >
              {project.title}
            </Link>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Notice;
