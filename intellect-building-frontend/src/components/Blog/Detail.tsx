import { useEffect, useState } from "react";
import { Category } from "../../models/category";
import PopularPostList from "./List/Popular";
import Search from "./Search";
import PostComplete from "./Item/Complete";
import useService from "../../providers/Service/hooks";
import { useLoading } from "../../utils/hooks";
import Post from "../../models/post";

interface Props {
  uuid: string;
}

const BlogDetail: React.FC<Props> = ({ uuid }) => {
  const [post, setPost] = useState<null | Post>(null);
  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getPost(uuid)
      .then((post) => {
        setPost(post);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading, uuid]);

  const [currentSeachText, setCurrentSeachText] = useState("");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const handleCategory = (category: Category) => {
    setCurrentCategory(category);
  };
  const handleSubmit = async () => {};

  return (
    <>
      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            {/* <!-- Content Side --> */}
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              {post ? <PostComplete post={post} /> : null}
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
    </>
  );
};

export default BlogDetail;
