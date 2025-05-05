import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <main className=" min-h-screen">
        <section className="pt-24 md:pt-20 pb-5 text-center">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 text-lg">
                Reach out to us for any inquiries or assistance. We're here to
                help you with our e-Services and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-md p-8 text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-md p-8 text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaPhone className="text-blue-600 text-xl mr-3" />
                    <p className="text-gray-800">
                      Phone: <a href="tel:+8801234567890">+880 123 456 7890</a>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 text-xl mr-3" />
                    <p className="text-gray-800">
                      Email:{" "}
                      <a href="mailto:support@eservices.com">
                        support@eservices.com
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-600 text-xl mr-3" />
                    <p className="text-gray-800">
                      Address: Chattogram City Corporation, Chattogram,
                      Bangladesh
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8551362531143!2d91.82484629999999!3d22.3590981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275a8c7f0c33%3A0x6b3b4785e8c9c4f7!2sChittagong%20City%20Corporation!5e0!3m2!1sen!2sbd!4v1741508227253!5m2!1sen!2sbd"
                    width="100%"
                    height="200"
                    className="rounded-lg border-0 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
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
