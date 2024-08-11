import { useParams } from "react-router-dom";
import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import Private from "../../../components/Private";
import PrivatePostItemComplete from "../../../components/Private/Post/Item/Complete";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretPostUpdate() {
  const { uuid } = useParams<Record<string, string>>();
  return (
    <Private>
      <div className="page-wrapper">
        <Header currentPage="blog" />
        <TitleSection page="Post Detail" />
        <PrivatePostItemComplete uuid={`${uuid}`} />
        <FooterSection />
        <ScroolToTop />
      </div>
    </Private>
  );
}

export default SecretPostUpdate;
