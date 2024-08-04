import BlogComponent from "../../components/Blog";
import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";

function Blog() {
  return (
    <div className="page-wrapper">
      <Header currentPage="blog" />
      <TitleSection page="Latest News" />
      <BlogComponent />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Blog;
