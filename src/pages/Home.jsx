import React from "react";
import Banner from "../Components/Banner";
import ComplaintCategory from "../Components/ComplaintCategory";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto">
      <section>
        <Banner />
      </section>
      <section>
        <ComplaintCategory />
      </section>
    </div>
  );
};

export default Home;
