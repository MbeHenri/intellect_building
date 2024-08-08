interface Props {
  num?: number;
}
const PopularPostListSkeleton: React.FC<Props> = ({ num }) => {
  return (
    <div className="sidebar-widget popular-posts">
      <div className="sidebar-title">
        <h2 className="skeleton-box skeleton-text" style={{ width: "50%" }}>
          {" "}
        </h2>
      </div>
      <div className="widget-content">
        {Array(num ?? 2).map((_, i) => (
          <article key={`post-skeleton-${i}`} className="post">
            <figure
              className="post-thumb skeleton-box"
              style={{ height: "80px", width: "80px" }}
            >
              <div className="skeleton shimmer"></div>
            </figure>
            <div
              className="text skeleton-box skeleton-text"
              style={{ width: "80%" }}
            ></div>
            <div
              className="post-info skeleton-box skeleton-text"
              style={{ width: "50%" }}
            ></div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PopularPostListSkeleton;
