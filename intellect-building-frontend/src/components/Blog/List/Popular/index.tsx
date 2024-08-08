import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useService from "../../../../providers/Service/hooks";
import { useLoading } from "../../../../utils/hooks";
import { PostSimple } from "../../../../models/post";
import placeholder from "../../../../assets/images/placeholder/2.jpeg";
import EmptyLayer from "../../../EmptyLayer";

const PopularPostList: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<PostSimple[]>([]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading, loading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getPopularPosts(3)
      .then((posts) => {
        setPopularPosts(posts);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading]);

  if (loading) {
    return <></>;
  }

  if (popularPosts.length > 0) {
    return <EmptyLayer text="no popular posts" />;
  }

  return (
    <>
      {/* <!-- Popular Posts --> */}
      <div className="sidebar-widget popular-posts">
        <div className="sidebar-title">
          <h2>Popular post</h2>
        </div>
        <div className="widget-content">
          {popularPosts.map((post, i) => {
            return (
              <article key={`post-${i}`} className="post">
                <figure className="post-thumb">
                  <img src={post.img === "" ? placeholder : post.img} alt="" />
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
