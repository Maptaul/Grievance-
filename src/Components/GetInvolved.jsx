import React from "react";
import image5 from "/src/assets/image5.jpg";

const GetInvolved = () => {
  return (
    <section id="get-involved" className="py-[100px] md:py-[50px] bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center pb-[50px] md:pb-[30px]">
          <h2 className="text-4xl font-bold mb-4">Get Involved</h2>
          <p className="text-gray-700  mx-auto">
            Transforming Chattogram into a smart and sustainable city is a
            collective effort. Here’s how you can contribute:
          </p>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[20px] items-center">
          {/* Image */}
          <div className="rounded-[20px] overflow-hidden">
            <img
              src={image5}
              alt="Get Involved"
              className="w-full object-cover rounded-[20px]"
            />
          </div>

          {/* List */}
          <div>
            <ul className="list-none space-y-[15px] text-gray-800">
              <li>
                <span className="font-bold text-[#640D5F]">Residents</span>:
                Adopt sustainable practices, participate in community programs,
                and stay informed about city initiatives.
              </li>
              <li>
                <span className="font-bold text-[#640D5F]">Businesses</span>:
                Invest in green technologies, support local innovation, and
                collaborate with the government on smart city projects.
              </li>
              <li>
                <span className="font-bold text-[#640D5F]">
                  Government and NGOs
                </span>
                : Partner with stakeholders to implement policies and programs
                that drive sustainable development.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
