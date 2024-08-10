const ProductCompleteSkeleton: React.FC = () => {
  return (
    <section className="shop-single-section">
      <div className="auto-container">
        <div className="shop-page product-details">
          <div className="basic-details">
            <div className="row clearfix">
              <div className="image-column col-lg-7 col-md-12 col-sm-12">
                <div
                  className="skeleton-box"
                  style={{ height: "25rem", width: "100%" }}
                >
                  <div
                    className="skeleton shimmer"
                    style={{ height: "100%" }}
                  ></div>
                </div>
              </div>

              <div className="info-column col-lg-5 col-md-12 col-sm-12">
                <div className="details-header">
                  <h2
                    className="skeleton-box skeleton-text"
                    style={{ width: "60%" }}
                  >
                    {" "}
                  </h2>
                  <div
                    className="item-price skeleton-box skeleton-text"
                    style={{ width: "40%" }}
                  ></div>
                  <ul className="shop-list">
                    <li
                      className="skeleton-box skeleton-text"
                      style={{ width: "20%" }}
                    ></li>
                  </ul>
                </div>

                <div className="text">
                  <p
                    className="skeleton-box skeleton-text"
                    style={{ width: "100%", height: "2rem" }}
                  ></p>
                  <p
                    className="skeleton-box skeleton-text"
                    style={{ width: "80%", height: "2rem" }}
                  ></p>
                </div>

                <div className="other-options">
                  <div className="clearfix">
                    <div className="pull-left">
                      <div
                        className="item-quantity skeleton-box"
                        style={{ width: "100%", height: "2.5rem" }}
                      ></div>
                    </div>
                    <div className="pull-left">
                      <div
                        className="btns-box skeleton-box"
                        style={{ width: "60%", height: "3rem" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-info-tabs">
            <div className="prod-tabs tabs-box">
              <ul className="tab-btns tab-buttons clearfix">
                <li
                  className="tab-btn skeleton-box skeleton-text"
                  style={{ width: "40%" }}
                ></li>
                <li
                  className="tab-btn skeleton-box skeleton-text"
                  style={{ width: "60%" }}
                ></li>
              </ul>

              <div className="tabs-content">
                <div className="d-block">
                  <div
                    className="content skeleton-box"
                    style={{ width: "100%", height: "5rem" }}
                  ></div>
                </div>
                <div className="d-none">
                  <div
                    className="content skeleton-box"
                    style={{ width: "100%", height: "5rem" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCompleteSkeleton;
