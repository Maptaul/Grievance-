import banner from "/src/assets/finalvideo.mp4";

const BannerSection = () => {
  return (
    <section className="relative pt-20 mt-3 max-w-7xl mx-auto w-full rounded-md h-[510px] overflow-hidden">
      <div>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={banner}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.img
              title="Chittagong City Corporation Logo"
              src="https://i.ibb.co.com/BWyt7Dk/ccc.png"
              alt="Chittagong City Corporation Logo"
              className="w-24 h-24 mb-4 rounded-full shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.h1
              className="text-white text-4xl text-center md:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Welcome to the Central Grievance Platform <br /> of the Chittagong
              City Corporation
            </motion.h1>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};

export default BannerSection;

// import React from "react";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Placeholder CDN images (replace with local images)
// const banners = [
//   "https://i.ibb.co.com/v6b37bJ6/banner5.jpg",
//   "https://i.ibb.co.com/Xxpc2mZ4/banner7.jpg",
//   "https://i.ibb.co.com/ds2JFG4K/banner6.jpg",
//   "https://i.ibb.co.com/F4kS1dBg/banner1.jpg",
//   "https://i.ibb.co.com/Xxmdkv44/banner2.jpg",
//   "https://i.ibb.co.com/NgGbydjd/banner3.jpg",
//   "https://i.ibb.co.com/4ZgpTSyx/banner4.jpg",
// ];

// // Placeholder logo (replace with local logo)
// // For src/assets: import logo from "@/assets/ccc_new_logo.png";
// // For public/assets: use "/assets/ccc_new_logo.png"
// const logo = "https://i.ibb.co.com/BWyt7Dk/ccc.png";

// const BannerSection = () => {
//   return (
//     <section className="relative max-w-7xl mx-auto w-full mt-4 rounded-lg overflow-hidden">
//       {/* Swiper Slider */}
//       <Swiper
//         modules={[Autoplay]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         loop={true}
//         spaceBetween={0}
//         slidesPerView={1}
//         className="h-[450px] w-full"
//       >
//         {banners.map((img, i) => (
//           <SwiperSlide key={i}>
//             <img src={img} alt={`Banner ${i + 1}`} className="w-full h-full " />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Overlay Logo + Text */}
//       <div className="absolute p-1 inset-0 flex flex-row items-center gap-2  bg-black/50 text-white  z-10">
//         <img
//           src={logo}
//           alt="Chittagong City Corporation Logo"
//           className="w-20 h-20 mb-4 rounded-full shadow-md"
//         />
//         <h1 className="text-2xl md:text-4xl font-bold drop-shadow-md">
//           Chittagong City Corporation
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default BannerSection;
