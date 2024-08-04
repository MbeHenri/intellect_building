import React from "react";
import background from "../../../assets/images/backgroud/pattern-7.png";

const ServiceSection: React.FC = () => {
  return (
    <>
      {/* <!-- What We Section --> */}
      <section className="what-we-section">
        <div
          className="pattern-layer"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="auto-container">
          <div className="row clearfix">
            {/* <!-- Title Column --> */}
            <div className="title-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* <!-- Sec Title --> */}
                <div className="sec-title">
                  <h2>What We Do</h2>
                  <div className="separate"></div>
                </div>
                <div className="text">
                  <p>
                    Furniture restoration offers you two huge benefits an
                    opportunity to create a new style for your home without
                    overspending and a chance to preserve the value of your
                    furniture, especially if you have antiques.
                  </p>
                  <p>
                    We regularly import fine antique pieces that are sold at
                    trade prices.
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Blocks Column --> */}
            <div className="blocks-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="row clearfix">
                  {/* <!-- Services Block Two --> */}
                  <div className="services-block-two col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="icon-box">
                        <span className="icon flaticon-chair"></span>
                      </div>
                      <h3>
                        <a href="services-detail.html">Furniture Remodeling</a>
                      </h3>
                      <div className="text">
                        We also done furniture remodeling, our experts are help
                        you remodeling your broken furnitures with in...
                      </div>
                    </div>
                  </div>

                  {/* <!-- Services Block Two --> */}
                  <div className="services-block-two col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInRight"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="icon-box">
                        <span className="icon flaticon-sketch"></span>
                      </div>
                      <h3>
                        <a href="services-detail.html">General Carpentry</a>
                      </h3>
                      <div className="text">
                        Professionals work with a variety of all materials, in a
                        variety of settings indoor and outdoor, urban and all
                        rural...
                      </div>
                    </div>
                  </div>

                  {/* <!-- Services Block Two --> */}
                  <div className="services-block-two col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="icon-box">
                        <span className="icon flaticon-saw"></span>
                      </div>
                      <h3>
                        <a href="services-detail.html">Manufactur Furniture</a>
                      </h3>
                      <div className="text">
                        Hang pieces with frames touching horizontally, Start out
                        on a longer wall and continue hanging small our artwork
                        ...
                      </div>
                    </div>
                  </div>

                  {/* <!-- Services Block Two --> */}
                  <div className="services-block-two col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInRight"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="icon-box">
                        <span className="icon flaticon-paint-palette"></span>
                      </div>
                      <h3>
                        <a href="services-detail.html">Hang Paintings</a>
                      </h3>
                      <div className="text">
                        Professionals work with a variety of all materials, in a
                        variety of settings–indoor and outdoor, urban and all
                        rural…
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End What We Section --> */}
    </>
  );
};

export default ServiceSection;
