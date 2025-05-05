import { Link } from "react-router";
import Chatbot from "./Chatbot";

const Footer = () => {
  return (
    <>
      <footer className="bg-black py-24 md:py-12 mt-[100px]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white pb-5">
            <Link to="/contact" className="text-2xl font-bold">
              Contact Us
            </Link>
            <p>Have questions or ideas? We’d love to hear from you!</p>
          </div>
          <ul className="text-center list-none">
            <li className="text-gray-500">
              <span className="font-black text-[#640D5F]">Email</span>:{" "}
              contact@jionex.com
            </li>
            <li className="text-gray-500">
              <span className="font-black text-[#640D5F]">Phone</span>:{" "}
              +971569258166
            </li>
            <li className="text-gray-500">
              <span className="font-black text-[#640D5F]">Address</span>: IPL
              City Centre, 4th Floor, 162 O.R. Nizam Rd, Chattogram-4317,
              Bangladesh.
            </li>
          </ul>
          <p className="text-center text-gray-400 mt-8">
            Copyright © 2025 - All rights reserved by Chittagong City
            Corporation
          </p>
        </div>
      </footer>
      <Chatbot />
    </>
  );
};

export default Footer;
