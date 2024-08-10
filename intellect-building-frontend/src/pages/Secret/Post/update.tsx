import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfilePostItemComplete from "../../../components/Profile/Post/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretPostUpdate() {
  return (
    <div className="page-wrapper">
      <Header currentPage="blog" />
      <TitleSection page="Post Detail" />
      <ProfilePostItemComplete uuid="10" />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretPostUpdate;
