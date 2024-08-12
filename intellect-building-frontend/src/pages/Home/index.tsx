import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import HomeSlider from "./section/brand";
import PostSection from "../../components/Blog/PostSection";
import ServiceSection from "./section/service";
import TeamSection from "./section/team";
import WhyChooseSection from "./section/whychoose";
import ScroolToTop from "../../components/ScroolToTop";
import { useCallback, useRef } from "react";
import { customScrollTo } from "../../utils/function";

function Home() {
  const target = useRef<HTMLDivElement>(null);
  const scrollToTarget = useCallback(() => {
    if (target.current) {
      //target.current.scrollIntoView({ behavior: "smooth" });
      customScrollTo(
        target.current.getBoundingClientRect().top + window.scrollY,
        1500
      );
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Header currentPage="home" />
      <HomeSlider toWhatWeDo={scrollToTarget} />
      <ServiceSection whatWeDoRef={target} />
      <WhyChooseSection />
      <TeamSection />
      <PostSection />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Home;
