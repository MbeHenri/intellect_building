import React, { useMemo } from "react";
import PostItemCard from "./Item/Card";

const PostSection: React.FC = () => {
  const posts = useMemo(
    () => [
      {
        uuid: "qsdqsqsdqsdqsd",
        img: "https://via.placeholder.com/200x100",
        publisher: "Admin",
        date: new Date(),
        nbreComment: 3,
        title: "Sawmall Treak Truned into Furniture.",
        summary: `We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charm of pleasure of...`,
      },
      {
        uuid: "qsdstaetqsdqsd",
        img: "https://via.placeholder.com/200x100",
        publisher: "Admin",
        date: new Date(),
        nbreComment: 7,
        title: "We Are Leading Antique Furniture Restorers.",
        summary: `We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charm of pleasure of...`,
      },
    ],
    []
  );

  return (
    <>
      <section className="news-section">
        <div className="auto-container">
          <div className="sec-title centered">
            <h2>Our Latest News</h2>
            <div className="separate"></div>
          </div>
          <div className="news-carousel-two row">
            {posts.map((post, i) => {
              return <PostItemCard key={`post-${i}`} post={post} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSection;
