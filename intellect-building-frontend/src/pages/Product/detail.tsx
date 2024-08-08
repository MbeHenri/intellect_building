import { useParams } from "react-router-dom";
import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";
import ProductComplete from "../../components/Product/Item/Complete";

function ProductDetail() {
  const { uuid } = useParams<Record<string, string>>();

  return (
    <div className="page-wrapper">
      <Header currentPage="product" />
      <TitleSection page="Training Detail" />
      <ProductComplete uuid={`${uuid}`} />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default ProductDetail;
