import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfileProductList from "../../../components/Profile/Product/list";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretProduct() {
  return (
    <div className="page-wrapper">
      <Header currentPage="product" />
      <TitleSection  page="Trainings"/>
      <ProfileProductList />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretProduct;
