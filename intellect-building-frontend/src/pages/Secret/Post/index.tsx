import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import Private from "../../../components/Private";
import PrivatePostList from "../../../components/Private/Post/list";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretPost() {
  return (
    <Private>
      <div className="page-wrapper">
        <Header currentPage="blog" />
        <TitleSection page="Posts" />
        <PrivatePostList />
        <FooterSection />
        <ScroolToTop />
      </div>
    </Private>
  );
}

export default SecretPost;
