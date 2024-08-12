import { useCallback, useEffect, useState } from "react";
import { PostSimple } from "../../../models/post";
import EmptyLayer from "../../EmptyLayer";
import { useLoading } from "../../../utils/hooks";
import useService from "../../../providers/Service/hooks";
import PrivatePostItemRow from "./Item";
import { Link } from "react-router-dom";
import PrivatePostRowSkeleton from "./Item/Skeleton";
import useSite from "../../../providers/Site/hooks";

const PrivatePostList: React.FC = () => {
  const [posts, setPosts] = useState<PostSimple[]>([]);

  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading, loading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getPosts()
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

  const handleDelete = useCallback(
    (product: PostSimple) => {
      setPosts(posts.filter((p) => p.uuid !== product.uuid));
    },
    [posts]
  );

  if (loading) {
    return (
      <section className="cart-section">
        <div className="auto-container">
          <div className="cart-outer">
            <div className="table-outer">
              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th className="prod-column">Publication</th>
                    <th>Publisher</th>
                    <th>Summary</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {Array(2).map((_, i) => {
                    return <PrivatePostRowSkeleton key={i} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="auto-container">
        {/* <!--Cart Outer--> */}
        {posts.length > 0 ? (
          <div className="cart-outer">
            <div className="table-outer">
              <div className="pull-right">
                <Link
                  onClick={toTop}
                  to="add"
                  className="theme-btn btn-style-two"
                >
                  <span className="txt">
                    <span className="fa fa-plus pr-2"></span>Add
                  </span>
                </Link>
              </div>

              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th className="prod-column">Post</th>
                    <th>Publisher</th>
                    <th>Summary</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((product, i) => {
                    return (
                      <PrivatePostItemRow
                        handleDelete={() => handleDelete(product)}
                        post={product}
                        key={i}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyLayer text="no product" />
        )}
      </div>
    </section>
  );
};

export default PrivatePostList;
