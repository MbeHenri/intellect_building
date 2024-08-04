import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import HomeSlider from "./section/brand";
import PostSection from "../../components/Blog/PostSection";
import ServiceSection from "./section/service";
import TeamSection from "./section/team";
import WhyChooseSection from "./section/whychoose";
import ScroolToTop from "../../components/ScroolToTop";

function Home() {
  return (
    <div className="page-wrapper">
      <Header currentPage="home" />
      <HomeSlider />
      <ServiceSection />
      <WhyChooseSection />
      <TeamSection />
      <PostSection />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Home;
