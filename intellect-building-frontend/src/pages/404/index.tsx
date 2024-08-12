import { Link } from "react-router-dom";
import FooterSection from "../../components/Footer/section";
import background from "../../assets/images/backgroud/6.jpeg";
import useSite from "../../providers/Site/hooks";
import { useCallback } from "react";

function Page404() {
  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);
  return (
    <div className="page-wrapper">
      <section
        className="error-section"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="auto-container">
          <div className="content">
            <h1>404</h1>
            <h2>Oops! That page can’t be found</h2>
            <div className="text">
              Sorry, but the page you are looking for does not existing
            </div>
            <Link onClick={toTop} to="/" className="theme-btn btn-style-one">
              <span className="txt">Go to home page</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

export default Page404;
