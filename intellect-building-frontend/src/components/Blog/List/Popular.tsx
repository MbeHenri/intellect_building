import { useMemo } from "react";
import { Link } from "react-router-dom";

const PopularPostList: React.FC = () => {
  const popular_posts = useMemo(
    () => [
      {
        uuid: "qsdqsqsdqsdqsd",
        img: "https://via.placeholder.com/200x100",
        publisher: "Admin",
        date: new Date(),
        nbreComment: 3,
        title: "Sawmall Treak Truned into Furniture.",
        description: `We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charm of pleasure of...`,
      },
      {
        uuid: "qsdstaetqsdqsd",
        img: "https://via.placeholder.com/200x100",
        publisher: "Admin",
        date: new Date(),
        nbreComment: 7,
        title: "We Are Leading Antique Furniture Restorers.",
        description: `We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charm of pleasure of...`,
      },
      {
        uuid: "qsdqsqsdqsdqsd",
        img: "https://via.placeholder.com/200x100",
        publisher: "Admin",
        date: new Date(),
        nbreComment: 3,
        title: "Sawmall Treak Truned into Furniture.",
        description: `We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charm of pleasure of...`,
      },
    ],
    []
  );

  return (
    <>
      {/* <!-- Popular Posts --> */}

      <div className="sidebar-widget popular-posts">
        <div className="sidebar-title">
          <h2>Popular post</h2>
        </div>
        <div className="widget-content">
          {popular_posts.map((post, i) => {
            return (
              <article key={`post-${i}`} className="post">
                <figure className="post-thumb">
                  <img src={post.img} alt="" />
                  <Link to={"/blog/" + post.uuid} className="overlay-box">
                    <span className="icon fa fa-link"></span>
                  </Link>
                </figure>
                <div className="text">
                  <a href="blog-single.html">{post.title}</a>
                </div>
                <div className="post-info">{`${post.date}`}</div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PopularPostList;
