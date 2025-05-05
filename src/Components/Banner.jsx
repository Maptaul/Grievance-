import React from "react";
import banner from "/src/assets/2Chittagong.mp4";

const BannerSection = () => {
  return (
    <section className="relative max-w-7xl mx-auto w-full h-[500px] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={banner} // Change to your video path
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl text-center md:text-4xl font-bold">
          Welcome to the Central Grievance Platform <br /> of the Chittagong
          City Corporation
        </h1>
      </div>
    </section>
  );
};

export default BannerSection;
