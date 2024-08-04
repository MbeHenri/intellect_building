import React from "react";
import { PostSimple as Post } from "../../../models/post";
import { formatDate } from "../../../utils/function";
import { Link } from "react-router-dom";
import useSite from "../../../providers/Site/hooks";

interface Props {
  post: Post;
}

const PostItemCard: React.FC<Props> = ({ post }) => {
  const { scrollToTopTarget } = useSite();
  return (
    <>
      <div className="news-block-three col">
        <div className="inner-box">
          <div className="image">
            <Link
              to={"/blog/" + post.uuid}
              onClick={() => {
                scrollToTopTarget && scrollToTopTarget(100);
              }}
            >
              <img src={post.img} alt="" />
            </Link>
          </div>
          <div className="lower-content">
            <ul className="post-meta">
              <li>{post.publisher}</li>
              <li>{formatDate(post.date)}</li>
              <li>{`Comment ${post.nbreComment}`}</li>
            </ul>
            <h3>
              <a href="blog-single.html">{post.title}</a>
            </h3>
            <div className="text">{post.summary}</div>

            <Link
              to={"/blog/" + post.uuid}
              className="read-more"
              onClick={() => {
                scrollToTopTarget && scrollToTopTarget(100);
              }}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItemCard;
