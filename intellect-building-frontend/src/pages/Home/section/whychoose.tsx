import React from "react";
import background from "../../../assets/images/backgroud/6.jpeg";

const WhyChooseSection: React.FC = () => {
  return (
    <>
      {/* <!-- Fluid Section Two --> */}
      <section className="fluid-section-two">
        <div className="outer-container clearfix">
          {/* <!--Image Column--> */}
          <div
            className="image-column"
            style={{ backgroundImage: `url(${background})` }}
          >
            <figure className="image-box">
              <img src={`${background}`} alt="" />
            </figure>
          </div>

          {/* <!--Content Column--> */}
          <div className="content-column">
            <div className="inner-column">
              {/* <!-- Sec Title --> */}
              <div className="sec-title">
                <h2>Why You Choose Us</h2>
                <div className="separate"></div>
              </div>
              <div className="text">
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and charms of pleasure of the
                moment, so blinded by desire, that they cannot foresee the pain
                and trouble.
              </div>
              <div className="row clearfix">
                <div className="column col-md-6 col-sm-6 col-xs-12">
                  <ul className="list-style-one">
                    <li>
                      <span className="icon flaticon-art-and-design"></span>
                      Greate Technology
                    </li>
                    <li>
                      <span className="icon flaticon-sketch"></span>Free
                      Consultation
                    </li>
                  </ul>
                </div>
                <div className="column col-md-6 col-sm-6 col-xs-12">
                  <ul className="list-style-one">
                    <li>
                      <span className="icon flaticon-graphic-tool"></span>
                      Quality Products
                    </li>
                    <li>
                      <span className="icon flaticon-stopwatch"></span>24/7
                      Customer Support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseSection;
