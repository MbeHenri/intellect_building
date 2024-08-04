import React from "react";
import Footer from ".";
import background from "../../assets/images/backgroud/7.jpg";

const FooterSection: React.FC = () => {
  return (
    <>
      <section
        className="call-to-action-section-three"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
        }}
      >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="title-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="experiance">
                  With over 20 years of experience
                </div>
                <h2>
                  In need of a new wardrobe, kitchen installation, renovation or
                  any other woodwork.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FooterSection;
