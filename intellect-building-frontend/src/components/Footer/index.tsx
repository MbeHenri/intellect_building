import React from "react";
import backgound from "../../assets/images/backgroud/map-pattern.png";
import logo from "../../assets/images/logo.png";
import useSite from "../../providers/Site/hooks";

const Footer: React.FC = () => {
  const site = useSite();
  return (
    <>
      <footer
        className="main-footer"
        style={{ backgroundImage: `url(${backgound})` }}
      >
        <div className="footer-social-box">
          <div className="auto-container">
            <ul className="social-nav">
              <li>
                <a href="/">
                  <span className="fa fa-facebook-f"></span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="fa fa-twitter"></span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="fa fa-vk"></span>
                </a>
              </li>
              <li>
                <a href={site.linkLinkedIn}>
                  <span className="fa fa-linkedin"></span>
                </a>
              </li>
              <li>
                <a href="/">
                  <span className="fa fa-instagram"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="auto-container">
          <div className="widgets-section">
            <div className="row clearfix">
              {/* <!-- Footer Column --> */}
              <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                <div className="footer-widget logo-widget">
                  <div className="logo">
                    <a href="index-2.html">
                      <img src={logo} alt="" />
                    </a>
                  </div>
                  <div className="text">
                    Our professionalism, good service and trust to the home
                    repair maintenance business. We take immense pride in
                    sending some of the most of professional seds handymen to
                    yours that aren't workings every day.
                  </div>
                </div>
              </div>

              {/* <!-- Footer Column --> */}
              <div className="footer-column col-lg-6 col-md-6 col-sm-12">
                <div className="footer-widget links-widget">
                  <div className="footer-title">
                    <h4>Contact Us</h4>
                  </div>
                  <ul className="contact-link">
                    <li>
                      <span>Call:</span> {site.phone}
                    </li>
                    <li>
                      <span>Write:</span> {site.email}
                    </li>
                    <li>
                      <span>Find Us:</span> {site.city},{site.country}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="footer-bottom">
          <div className="auto-container">
            <div className="clearfix">
              <div className="pull-right">
                <div
                  className="scroll-to-top scroll-to-target"
                  data-target="html"
                >
                  Back To Top
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </footer>
    </>
  );
};

export default Footer;
