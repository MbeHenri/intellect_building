import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfileProductItemComplete from "../../../components/Profile/Product/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretProductAdd() {
  return (
    <div className="page-wrapper">
      <Header currentPage="product" />
      <TitleSection page="Training Detail" />
      <ProfileProductItemComplete />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretProductAdd;
