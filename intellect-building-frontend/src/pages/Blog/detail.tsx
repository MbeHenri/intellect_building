import { useParams } from "react-router-dom";
import BlogDetailComponent from "../../components/Blog/Detail";
import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";

function BlogDetail() {
  const { uuid } = useParams<Record<string, string>>();

  return (
    <div className="page-wrapper">
      <Header currentPage="blog" />
      <TitleSection page="Latest News" />
      <BlogDetailComponent uuid={uuid ?? ""} />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default BlogDetail;
