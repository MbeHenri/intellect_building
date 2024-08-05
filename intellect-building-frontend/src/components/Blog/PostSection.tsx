import React, { useEffect, useState } from "react";
import PostItemCard from "./Item/Card";
import { PostSimple } from "../../models/post";
import useService from "../../providers/Service/hooks";
import { useLoading } from "../../utils/hooks";

const PostSection: React.FC = () => {
  const [posts, setPosts] = useState<PostSimple[]>([]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getPosts(2)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading]);

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
