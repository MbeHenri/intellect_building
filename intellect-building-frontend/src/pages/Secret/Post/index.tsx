import FooterSection from "../../../components/Footer/section";
import Header from "../../../components/Header";
import ProfilePostList from "../../../components/Profile/Post/list";
import ScroolToTop from "../../../components/ScroolToTop";
import TitleSection from "../../../components/Title/section";

function SecretPost() {
  return (
    <div className="page-wrapper">
      <Header currentPage="blog" />
      <TitleSection page="Posts" />
      <ProfilePostList />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default SecretPost;
