import { useTranslation } from "react-i18next";

const ProgressSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-[48px] sm:pt-[56px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center mb-12 sm:mb-8 text-3xl font-semibold whitespace-normal">
          {t("progress_title")}
        </h2>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video 1 */}
          <div className="w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/O4ctN7FdHQk"
              title={t("progress_video1_title")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/KacMxL8ylsE"
              title={t("progress_video2_title")}
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
