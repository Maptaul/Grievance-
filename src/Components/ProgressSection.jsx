import React from "react";

const ProgressSection = () => {
  return (
    <section className="pt-[100px] md:pt-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center mb-[50px] md:mb-[30px] text-3xl font-semibold">
          Chattogram’s Progress Under Leadership
        </h2>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video 1 */}
          <div className="w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/O4ctN7FdHQk"
              title="এমন কোন স্প্রে আমি চাইনা যা দিলে মশা লাফ দিয়ে উঠে যাবে: ডাঃ শাহাদাত হোসেন | Dr. Shahadat Hossain"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="videos">
            <iframe
              src="https://www.youtube.com/embed/KacMxL8ylsE"
              title="সিটি করপোরেশনে রাজনীতির আলাপ নিয়ে আসবেন না : ডাঃ শাহাদাত হোসেন | Dr. Shahadat Hossain | Channel 24"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
