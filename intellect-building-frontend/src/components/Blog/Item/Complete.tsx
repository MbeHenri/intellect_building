import React from "react";
import Post from "../../../models/post";
import CommentHandler from "../Comment/Handler";
import { formatDate } from "../../../utils/function";
import parse from "html-react-parser";

interface Props {
  post: Post;
}

const PostComplete: React.FC<Props> = ({ post }) => {
  return (
    <>
      <div className="news-detail">
        <div className="inner-box">
          <div className="image">
            <img src={post.img} alt="" />
          </div>
          <div className="lower-content">
            <ul className="post-meta">
              <li>{post.publisher.login}</li>
              <li>{formatDate(post.date)}</li>
              <li>{`Comment ${post.comments.length}`}</li>
            </ul>
            <h3>{post.title}</h3>
            <div className="text">{parse(post.content)}</div>
          </div>

          {/* <!--post-share-options--> */}
          <div className="post-share-options clearfix">
            <div className="pull-right">
              <ul className="social-icon-three">
                <li className="share">Share Now:</li>
                <li>
                  <a href="/">
                    <span className="fa fa-facebook-f"></span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span className="fa fa-google-plus"></span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span className="fa fa-pinterest-p"></span>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span className="fa fa-whatsapp"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- Author Box --> */}
          <div className="author-box">
            <div className="author-inner">
              <div className="thumb">
                <img src={post.publisher.img} alt="" />
              </div>
              <h4 className="name">{`About ${post.publisher.name}`}</h4>
              <ul className="social-icon clearfix">
                <li>
                  <a href="/">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
              <div className="text">{post.publisher.description}</div>
            </div>
          </div>

          {/* <!--New Posts--> */}
          {post.nextPost && post.previousPost ? (
            <div className="news-posts">
              <div className="clearfix">
                {post.previousPost ? (
                  <div className="pull-left prev-post">
                    <h4>
                      <a href="/">{post.previousPost.summary}</a>
                    </h4>
                    <a className="arrow" href="/">
                      <span className="fa fa-angle-double-left"></span> prev
                      article
                    </a>
                  </div>
                ) : null}

                {post.nextPost ? (
                  <div className="pull-right next-post">
                    <h4>
                      <a href="/">{post.nextPost.summary}</a>
                    </h4>
                    <a className="arrow" href="/">
                      next article
                      <span className="fa fa-angle-double-right"></span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <CommentHandler comments={post.comments} uuidPost={post.uuid} />
    </>
  );
};

export default PostComplete;
