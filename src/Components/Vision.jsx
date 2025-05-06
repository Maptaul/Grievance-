import React from "react";
import image4 from "/src/assets/image4.jpg"; 

const Vision = () => {
  return (
    <section className="max-w-7xl mx-auto pt-[100px] md:pt-[50px]" id="vision">
      <div
        className="bg-cover bg-center rounded-[40px] p-5"
        style={{ backgroundImage: `url(${image4})` }} 
      >
        <div className="max-w-3xl mx-auto text-center p-16 bg-white/90 rounded-[30px]">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            To transform Chattogram into a globally recognized smart and
            sustainable city that leverages cutting-edge technology, promotes
            environmental stewardship, and ensures inclusive growth for all its
            citizens.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Vision;
