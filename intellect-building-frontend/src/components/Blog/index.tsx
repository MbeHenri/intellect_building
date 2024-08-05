import { useCallback, useEffect, useState } from "react";
import Search from "./Search";
import { Category } from "../../models/category";
import PostList from "./List";
import PopularPostList from "./List/Popular";
import { PostSimple } from "../../models/post";
import useService from "../../providers/Service/hooks";
import { useLoading } from "../../utils/hooks";

const Blog: React.FC = () => {
  const [currentSeachText, setCurrentSeachText] = useState("");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleCategory = useCallback((category: Category) => {
    setCurrentCategory(category);
  }, []);

  const handleSubmit = useCallback(async () => {}, []);

  const [posts, setPosts] = useState<PostSimple[]>([]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

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

  return (
    <div className="sidebar-page-container">
      <div className="auto-container">
        <div className="row clearfix">
          {/* <!-- Content Side --> */}
          <div className="content-side col-lg-8 col-md-12 col-sm-12">
            <PostList posts={posts} />
          </div>

          {/* <!-- Sidebar Side --> */}
          <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
            <aside className="sidebar">
              <div className="sidebar-inner">
                {/* <!-- Search block --> */}
                <Search
                  currentCategory={currentCategory}
                  currentSearchText={currentSeachText}
                  handleCategory={handleCategory}
                  handleSearchText={(text) => {
                    setCurrentSeachText(text);
                  }}
                  handleSubmit={handleSubmit}
                />
                {/* <!-- Popular Post --> */}
                <PopularPostList />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
