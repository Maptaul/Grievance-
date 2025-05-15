import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";

const Footer = () => {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const navItems = [
    { key: "Home", path: "/" },
    { key: "contact", path: "/contact" },
    { key: "grievance_portal", path: "/complaint-category" },
  ];

  return (
    <footer className="bg-gray-800 text-sm text-white mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-300">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img
              src="https://i.ibb.co/BWyt7Dk/ccc.png"
              alt={t("logo_alt_ccc", {
                defaultValue: "Chattogram City Corporation Logo",
              })}
              className="h-30"
            />
          </div>

          {/* Navigation Section */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">
              {t("navigation_title", { defaultValue: "Quick Link" })}
            </h3>
            <ul className="list-none">
              {navItems.map((item) => (
                <li key={item.key} className="mb-2">
                  <Link
                    to={item.path}
                    className="hover:text-[#640D5F] font-medium transition-colors duration-200"
                    aria-label={t("navigate_to", {
                      page: t(item.key),
                      defaultValue: `Navigate to ${t(item.key)} page`,
                    })}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">
              {t("footer_contact_title", { defaultValue: "Contact" })}
            </h3>
            <ul className="list-none">
              <li className="mb-1 font-medium">
                {t("chattogram_city_corporation")}
              </li>
              <li className="mb-1">{t("nagar_bhaban")}</li>
              <li className="mb-1">
                {t("batail_hill_tigerpass", {
                  defaultValue: "Batail Hill, Tigerpass, Chattogram",
                })}
              </li>
              <li className="mb-1">
                {t("phone_label", { defaultValue: "Phone" })}:{" "}
                <a href="tel:02333388817" className="hover:text-[#640D5F]">
                  {t("phone_1", { defaultValue: "02333388817" })}
                </a>
                ,{" "}
                <a href="tel:02333388818" className="hover:text-[#640D5F]">
                  {t("phone_2", { defaultValue: "02333388818" })}
                </a>
                ,{" "}
                <a href="tel:02333388819" className="hover:text-[#640D5F]">
                  {t("phone_3", { defaultValue: "02333388819" })}
                </a>
              </li>
              <li className="mb-1">
                {t("email_label", { defaultValue: "Email" })}:{" "}
                <a
                  href="mailto:info@ccc.gov.bd"
                  className="hover:text-[#640D5F]"
                >
                  {t("info_ccc_email", { defaultValue: "info@ccc.gov.bd" })}
                </a>
                ,{" "}
                <a
                  href="mailto:programmer@ccc.gov.bd"
                  className="hover:text-[#640D5F]"
                >
                  {t("programmer_ccc_email", {
                    defaultValue: "programmer@ccc.gov.bd",
                  })}
                </a>
              </li>
              <li>
                {t("fax_label", { defaultValue: "Fax" })}:{" "}
                {t("fax_number", { defaultValue: "02333388803" })}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm py-4">
          <p className="text-center md:text-left">
            {t("footer_copyright", {
              year: currentYear,
              defaultValue: `Copyright © ${currentYear} - All rights reserved by Chattogram City Corporation`,
            })}
          </p>

          <div className="flex items-center mt-2 md:mt-0">
            <span className="mr-2">{t("innovated_by")} </span>
            <a
              href="https://www.jionex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 hover:opacity-90"
              aria-label={t("innovated_by_link_aria", {
                defaultValue: "Visit Jionex website, innovated by",
              })}
            >
              <img
                src="https://i.ibb.co/TM90bP8L/jionex-logo-white.png"
                alt={t("logo_alt")}
                className="h-6"
              />
            </a>
          </div>
        </div>
      </div>
      <Chatbot />
    </footer>
  );
};

export default Footer;
