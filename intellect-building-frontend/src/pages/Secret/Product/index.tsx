import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import Private from "../../../components/Private";
import PrivateProductList from "../../../components/Private/Product/list";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretProduct() {
  return (
    <Private>
      <div className="page-wrapper">
        <Header currentPage="product" />
        <TitleSection page="Trainings" />
        <PrivateProductList />
        <FooterSection />
        <ScroolToTop />
      </div>
    </Private>
  );
}

export default SecretProduct;
