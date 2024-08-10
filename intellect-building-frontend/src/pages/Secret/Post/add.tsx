import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfilePostItemComplete from "../../../components/Profile/Post/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretPostAdd() {
  return (
    <div className="page-wrapper">
      <Header currentPage="blog" />
      <TitleSection page="Post Detail" />
      <ProfilePostItemComplete />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretPostAdd;
