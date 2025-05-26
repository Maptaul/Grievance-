import Banner from "../Components/Banner";
import GetInvolved from "../Components/GetInvolved";
import KeyPillarsSection from "../Components/KeyPillarsSection";
import MayorMessage from "../Components/MayorMessage";
import Notice from "../Components/Notice";
import OngoingProjects from "../Components/OngoingProjects";
import Oss from "../Components/oss";
import ProgressSection from "../Components/ProgressSection";
import Vision from "../Components/Vision";
import Welcome from "../Components/Welcome";

const Home = () => {
  return (
    <div className="">
      <section>
        <Banner />
      </section>
      <section>
        <Notice />
      </section>
      <section>
        <MayorMessage />
      </section>
      <section>
        <Welcome />
      </section>
      <section>
        <Vision />
      </section>
      <section>
        <ProgressSection />
      </section>
      <section>
        <KeyPillarsSection />
      </section>
      <section>
        <OngoingProjects />
      </section>
      <section>
        <Oss />
      </section>
      <section>
        <GetInvolved />
      </section>
    </div>
  );
};

export default Home;
