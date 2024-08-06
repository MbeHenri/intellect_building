import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ProductList from "../../components/Product";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";

function Product() {
  return (
    <div className="page-wrapper">
      <Header currentPage="product" />
      <TitleSection page="Trainings" />
      <ProductList />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Product;
