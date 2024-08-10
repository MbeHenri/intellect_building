import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfileProductItemComplete from "../../../components/Profile/Product/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretProductUpdate() {
  return (
    <div className="page-wrapper">
      <Header currentPage="product" />
      <TitleSection page="Training Detail" />
      <ProfileProductItemComplete uuid="10" />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretProductUpdate;
