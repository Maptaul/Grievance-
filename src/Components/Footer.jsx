import React from "react";
import { Link } from "react-router-dom"; // Updated to react-router-dom
import { useTranslation } from "react-i18next";
import Chatbot from "./Chatbot";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-black py-16 sm:py-12 mt-12 sm:mt-14" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white pb-8 sm:pb-6">
            <Link
              to="/contact"
              className="text-2xl font-bold"
              aria-label={t("footer_contact_title")}
            >
              {t("footer_contact_title")}
            </Link>
            <p className="whitespace-normal">{t("footer_contact_description")}</p>
          </div>
          <ul className="text-center list-none" role="list">
            <li className="text-gray-400 whitespace-normal" role="listitem">
              <span className="font-black text-[#640D5F]">
                {t("footer_contact.email_label")}
              </span>
              : contact@jionex.com
            </li>
            <li className="text-gray-400 whitespace-normal" role="listitem">
              <span className="font-black text-[#640D5F]">
                {t("footer_contact.phone_label")}
              </span>
              : +971569258166
            </li>
            <li className="text-gray-400 whitespace-normal" role="listitem">
              <span className="font-black text-[#640D5F]">
                {t("footer_contact.address_label")}
              </span>
              : IPL City Centre, 4th Floor, 162 O.R. Nizam Rd, Chattogram-4317,
              Bangladesh.
            </li>
          </ul>
          <p className="text-center text-gray-300 mt-8 whitespace-normal">
            {t("footer_copyright", { year: currentYear })}
          </p>
        </div>
      </footer>
      <Chatbot />
    </>
  );
};

export default Footer;