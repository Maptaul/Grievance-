import React from "react";

const MayorMessage = () => {
  return (
    <section className="py-[100px] mt-[100px] bg-[#f4f4f4] md:py-[50px] md:mt-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center pb-5">
          <h2 className="text-3xl font-semibold">
            A Message from the City Mayor
          </h2>
        </div>

        {/* Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="text-center">
            <img
              src="/src/assets/mayor.jpg"
              alt="Mayor"
              className="w-[60%] mx-auto rounded-[20px]"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-xl mb-5">
              <span className="text-[#640D5F] block text-2xl py-1">
                Dr. Shahadat Hossain
              </span>
              Honorable Mayor <br />
              Chittagong City Corporation
            </h3>
            <p className="italic text-lg text-justify">
              &#34;Chattogram is not just a city; it is the heartbeat of
              Bangladesh&#39;s economy and a symbol of resilience and progress.
              As we embark on this ambitious journey to transform our city into
              a smart and sustainable urban center, I am committed to ensuring
              that every citizen benefits from this transformation. Together, we
              will build a city that is not only technologically advanced but
              also environmentally responsible and socially inclusive. Let us
              work hand in hand to create a brighter, greener, and smarter
              future for Chattogram.&#34;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MayorMessage;
