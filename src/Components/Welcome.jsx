import React from "react";
import image1 from "/src/assets/image1.jpg";
import image2 from "/src/assets/image2.jpg";
import image3 from "/src/assets/image3.jpg";

const Welcome = () => {
  return (
    <section className="pt-[100px] md:pt-[50px] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              A Smart and Sustainable City
            </h2>
            <p className="text-gray-700 text-justify leading-relaxed">
              Chattogram, the bustling port city of Bangladesh, is on a
              transformative journey to become a smart and sustainable urban
              hub. With its rich history, strategic location, and economic
              significance, Chattogram is embracing innovation, technology, and
              eco-friendly practices to enhance the quality of life for its
              residents and create a model city for the future.
            </p>
          </div>

          {/* Image Section */}
          <div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <img
                src={image1}
                alt="Chattogram"
                className="h-[200px] w-full object-cover rounded-[20px]"
              />
              <img
                src={image2}
                alt="Chattogram"
                className="h-[200px] w-full object-cover rounded-[20px]"
              />
            </div>
            <img
              src={image3}
              alt="Chattogram"
              className="h-[300px] w-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
