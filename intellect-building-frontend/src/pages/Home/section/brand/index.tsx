import React from "react";
import backgound_1 from "../../../../assets/images/backgroud/2.jpeg";
import "./index.css";

const HomeSlider: React.FC = () => {
  return (
    <>
      {/* <!--Main Slider--> */}
      <section className="main-slider style-two">
        <div className="main-slider-carousel">
          <div
            className="slide active brand"
            style={{ backgroundImage: `url(${backgound_1})` }}
          >
            <div className="auto-container">
              <div className="content">
                <h2>
                  We Give Solution <br /> To Need Your Carpanter
                </h2>
                <div className="text">
                  From 1999, we have worked tirelessly to earan our reputation
                  for quality <br /> and dependability in all wooden products we
                  offer.
                </div>
                <div className="link-box">
                  <a href="about.html" className="theme-btn btn-style-one">
                    <span className="txt">Request Call Back</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Scroll Dwwn Btn--> */}
        <div
          className="mouse-btn-down scroll-to-target"
          data-target=".what-we-section"
        ></div>
      </section>
      {/* <!--End Main Slider--> */}
    </>
  );
};

export default HomeSlider;
