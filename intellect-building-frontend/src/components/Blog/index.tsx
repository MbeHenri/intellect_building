import { useMemo, useState } from "react";
import Search from "./Search";
import { Category } from "../../models/category";
import PostList from "./List";
import PopularPostList from "./List/Popular";

const Blog: React.FC = () => {
  const [currentSeachText, setCurrentSeachText] = useState("");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleCategory = (category: Category) => {
    setCurrentCategory(category);
  };

  const handleSubmit = async () => {};

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
