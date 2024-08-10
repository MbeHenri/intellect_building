const ProductItemSkeleton: React.FC = () => {
    return (
      <>
        <div className="shop-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
          <div className="inner-box">
            <div
              className="image skeleton-box"
              style={{ height: "15rem", width: "100%" }}
            >
              <div className="skeleton shimmer" style={{ height: "100%" }}></div>
            </div>
            <div className="lower-content clearfix">
              <div className="pull-left">
                <h6
                  className="skeleton-box skeleton-text"
                  style={{ width: "60%" }}
                >
                  {" "}
                </h6>
              </div>
              <div className="pull-right">
                <ul className="price">
                  <li
                    className="skeleton-box skeleton-text"
                    style={{ width: "40px" }}
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ProductItemSkeleton;
  