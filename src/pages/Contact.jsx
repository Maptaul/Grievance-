import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmissionStatus("success");
    setTimeout(() => setSubmissionStatus(null), 3000); // Clear after 3s
  };

  return (
    <>
      <main className="min-h-screen">
        <section className="py-16 sm:py-12 text-center">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t("contact_title")}
              </h1>
              <p className="text-gray-600 text-lg whitespace-normal">
                {t("contact_description")}
              </p>
            </div>

            {submissionStatus === "success" && (
              <div className="max-w-3xl mx-auto mb-6 text-green-600 font-semibold">
                {t("contact_form_success")}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-md p-8 text-left">
                <h2
                  className="text-2xl font-bold text-gray-800 mb-6"
                  role="heading"
                  aria-level="2"
                >
                  {t("contact_form_heading")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact_form.name_placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#640D5F]"
                    required
                    aria-label={t("contact_form.name_label")}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact_form.email_placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#640D5F]"
                    required
                    aria-label={t("contact_form.email_label")}
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact_form.subject_placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#640D5F]"
                    required
                    aria-label={t("contact_form.subject_label")}
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact_form.message_placeholder")}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#640D5F] resize-none"
                    required
                    aria-label={t("contact_form.message_label")}
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#640D5F] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#4a0947] transition-colors"
                    aria-label={t("contact_form_submit_label")}
                  >
                    {t("contact_form_submit")}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-md p-8 text-left">
                <h2
                  className="text-2xl font-bold text-gray-800 mb-6"
                  role="heading"
                  aria-level="2"
                >
                  {t("contact_info_heading")}
                </h2>
                <div className="space-y-4">
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
                      <a
                        href="tel:02333388817"
                        className="hover:text-[#640D5F]"
                      >
                        {t("phone_1", { defaultValue: "02333388817" })}
                      </a>
                      ,{" "}
                      <a
                        href="tel:02333388818"
                        className="hover:text-[#640D5F]"
                      >
                        {t("phone_2", { defaultValue: "02333388818" })}
                      </a>
                      ,{" "}
                      <a
                        href="tel:02333388819"
                        className="hover:text-[#640D5F]"
                      >
                        {t("phone_3", { defaultValue: "02333388819" })}
                      </a>
                    </li>
                    <li className="mb-1">
                      {t("email_label", { defaultValue: "Email" })}:{" "}
                      <a
                        href="mailto:info@ccc.gov.bd"
                        className="hover:text-[#640D5F]"
                      >
                        {t("info_ccc_email", {
                          defaultValue: "info@ccc.gov.bd",
                        })}
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
                <div className="mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48818.870990924726!2d91.7761292743164!3d22.3443623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275c1e17be6b%3A0x3800d2f36b60300c!2sChattogram%20City%20Corporation!5e1!3m2!1sen!2sbd!4v1746514689526!5m2!1sen!2sbd"
                    width="100%"
                    height="200"
                    className="rounded-lg border-0 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t("contact_map_title")}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
