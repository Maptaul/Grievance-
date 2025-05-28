import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const VIDEO_LIST = [
  {
    src: "https://www.youtube.com/embed/O4ctN7FdHQk",
    titleKey: "progress_video1_title",
  },
  {
    src: "https://www.youtube.com/embed/KacMxL8ylsE",
    titleKey: "progress_video2_title",
  },
  {
    src: "https://www.youtube.com/embed/DFbHOAtvK98?si=yqVNhc6X4nWwTONn",
    titleKey: "progress_video3_title",
  },
  {
    src: "https://www.youtube.com/embed/4KF5pvzkAhA?si=dxauhb7QruGI0u2J",
    titleKey: "progress_video4_title",
  },
  {
    src: "https://www.youtube.com/embed/ceKThC76-bQ?si=pEFyv0NDN-ZZlqc3",
    titleKey: "progress_video5_title",
  },
  {
    src: "https://www.youtube.com/embed/sO7cbj1FvZg?si=xc8iOxU9Na7amMrL",
    titleKey: "progress_video6_title",
  },
];

const getVisibleCount = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
  }
  return 2;
};

const ProgressSection = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videosToShow = VIDEO_LIST.slice(0, visibleCount);

  return (
    <section className="pt-[48px] sm:pt-[56px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center mb-12 sm:mb-8 text-3xl font-semibold whitespace-normal">
          {t("progress_title")}
        </h2>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videosToShow.map((video) => (
            <div className="w-full aspect-video" key={video.src}>
              <iframe
                src={video.src}
                title={t(video.titleKey)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full aspect-video rounded-lg shadow"
              ></iframe>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {VIDEO_LIST.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-[#640D5F] text-white font-bold py-2 px-3 sm:py-2 sm:px-5 rounded-lg  sm:text-sm lg:text-x"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              {t("view_more_videos")}
            </button>
          </div>
        )}

        {/* DaisyUI Modal for all videos */}
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box w-full max-w-[98vw] sm:max-w-2xl md:max-w-3xl lg:max-w-7xl p-0 overflow-hidden bg-white rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4 border-b border-gray-100 bg-[#640D5F]">
              <h3 className="font-bold text-base sm:text-lg text-white truncate">
                {t("all_videos")}
              </h3>
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle bg-white text-[#640D5F] border-none hover:bg-gray-100"
                  aria-label="Close"
                  type="submit"
                >
                  ✕
                </button>
              </form>
            </div>
            {/* Scrollable content for mobile */}
            <div className="p-2 sm:p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {VIDEO_LIST.map((video) => (
                  <div className="w-full aspect-video" key={video.src}>
                    <iframe
                      src={video.src}
                      title={t(video.titleKey)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full aspect-video rounded-lg shadow"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default ProgressSection;
