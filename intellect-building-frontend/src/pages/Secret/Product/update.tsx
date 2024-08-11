import { useParams } from "react-router-dom";
import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import Private from "../../../components/Private";
import PrivateProductItemComplete from "../../../components/Private/Product/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretProductUpdate() {
  const { uuid } = useParams<Record<string, string>>();
  return (
    <Private>
      <div className="page-wrapper">
        <Header currentPage="product" />
        <TitleSection page="Training Detail" />
        <PrivateProductItemComplete uuid={`${uuid}`} />
        <FooterSection />
        <ScroolToTop />
      </div>
    </Private>
  );
}

export default SecretProductUpdate;
