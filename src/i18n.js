import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next) // Initialize i18next
  .use(LanguageDetector) // Detect browser language
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          complainant_login: "Complainant Login",
          admin_login: "Admin Login",
          dashboard: "Dashboard",
          logout: "Logout"
        }
      },
      bn: {
        translation: {
          home: "হোম",
          complainant_login: "অভিযোগকারীর লগইন",
          admin_login: "অ্যাডমিন লগইন",
          dashboard: "ড্যাশবোর্ড",
          logout: "লগআউট"
        }
      }
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
