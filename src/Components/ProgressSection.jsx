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
    src: "https://www.youtube.com/embed/ZefMpEmmSVU?si=ZSknVheaGIQCr0Np",
    titleKey: "progress_video3_title",
  },
  {
    src: "https://www.youtube.com/embed/4KF5pvzkAhA?si=xmlMxAb6s1i7145G",
    titleKey: "progress_video4_title",
  },
  {
    src: "https://www.youtube.com/embed/4KF5pvzkAhA?si=CAZJV-uu01e_5LRk",
    titleKey: "progress_video5_title",
  },
  {
    src: "https://www.youtube.com/embed/RmGWRHWPAWc?si=9FWu4zMHgKoOSTER",
    titleKey: "progress_video6_title",
  },
  {
    src: "https://www.youtube.com/embed/Y_SSik5mXPU?si=XhJiRAf0xRxJ98vR",
    titleKey: "progress_video7_title",
  },
  {
    src: "hhttps://www.youtube.com/embed/cG_H39QWKjI?si=6AcptH7krqE_ee8l",
    titleKey: "progress_video8_title",
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
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videosToShow = showAll ? VIDEO_LIST : VIDEO_LIST.slice(0, visibleCount);

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
            <div className="w-full h-[200px]  aspect-video" key={video.src}>
              <iframe
                src={video.src}
                title={t(video.titleKey)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-[200px]  aspect-video rounded-lg shadow"
              ></iframe>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && VIDEO_LIST.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => setShowAll(true)}
            >
              {t("view_more_videos")}
            </button>
          </div>
        )}

        {/* DaisyUI Modal for all videos */}
        {showAll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[100vh]">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowAll(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">
                {t("all_videos")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {VIDEO_LIST.map((video) => (
                  <div
                    className="w-full h-[200px] aspect-video"
                    key={video.src}
                  >
                    <iframe
                      src={video.src}
                      title={t(video.titleKey)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-[200px] aspect-video rounded-lg shadow"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressSection;
