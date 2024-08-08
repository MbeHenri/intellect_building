const PostItemCardSkeleton: React.FC = () => {
  return (
    <>
      <div className="news-block-three col">
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
            <div className="read-more skeleton-box skeleton-text"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItemCardSkeleton;
