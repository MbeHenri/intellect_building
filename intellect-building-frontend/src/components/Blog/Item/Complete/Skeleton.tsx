const PostCompleteSkeleton: React.FC = () => {
  return (
    <>
      <div className="news-detail">
        <div className="inner-box">
          <div className="image skeleton-box">
            <div className="skeleton shimmer"></div>
          </div>
          <div className="lower-content">
            <ul className="post-meta">
              <li className="skeleton-box skeleton-text"></li>
              <li className="skeleton-box skeleton-text"></li>
              <li className="skeleton-box skeleton-text"></li>
            </ul>
            <h3 className="skeleton-box skeleton-text"> </h3>
            <div className="text skeleton-box skeleton-text"></div>
          </div>

          <div className="post-share-options clearfix">
            <div className="pull-right">
              <ul className="social-icon-three">
                <li
                  className="skeleton-box skeleton-text"
                  style={{ width: "100px" }}
                ></li>
                <li className="skeleton-box skeleton-icon"></li>
                <li className="skeleton-box skeleton-icon"></li>
                <li className="skeleton-box skeleton-icon"></li>
                <li className="skeleton-box skeleton-icon"></li>
                <li className="skeleton-box skeleton-icon"></li>
              </ul>
            </div>
          </div>

          <div className="author-box">
            <div className="author-inner">
              <div className="thumb skeleton-box">
                <div className="skeleton shimmer"></div>
              </div>
              <h4 className="name skeleton-box skeleton-text"> </h4>
              <ul className="social-icon clearfix">
                <li className="skeleton-box skeleton-icon"></li>
              </ul>
              <div className="text skeleton-box skeleton-text"></div>
            </div>
          </div>

          <div className="news-posts">
            <div className="clearfix">
              <div className="pull-left prev-post">
                <h4 className="skeleton-box skeleton-text"> </h4>
                <div
                  className="skeleton-box skeleton-text"
                  style={{ width: "150px" }}
                ></div>
              </div>
              <div className="pull-right next-post">
                <h4 className="skeleton-box skeleton-text"> </h4>
                <div
                  className="skeleton-box skeleton-text"
                  style={{ width: "150px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for comments */}
      <div
        className="skeleton-box skeleton-text"
        style={{ height: "50px", marginTop: "20px" }}
      ></div>
    </>
  );
};

export default PostCompleteSkeleton;
