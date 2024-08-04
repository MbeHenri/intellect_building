import { useMemo } from "react";
import { Category } from "../../models/category";

interface Props {
  handleSearchText: (searchText: string) => void;
  handleCategory: (category: Category) => void;
  handleSubmit: Function;
  currentCategory: Category | null;
  currentSearchText: string;
}

const Search: React.FC<Props> = ({
  handleCategory,
  handleSearchText,
  handleSubmit,
  currentSearchText,
  currentCategory,
}) => {
  const categories = useMemo(
    () => [
      {
        uuid: "1",
        title: "Handmade Furniture",
        totalPosts: 3,
      },
      {
        uuid: "12",
        title: "General Carpentry",
        totalPosts: 5,
      },
      {
        uuid: "13",
        title: "Office Renevation",
        totalPosts: 5,
      },
      {
        uuid: "14",
        title: "Kitchen Modeling",
        totalPosts: 25,
      },
    ],
    []
  );

  return (
    <>
      {/*  <!-- Search --> */}
      <div className="sidebar-widget search-box">
        <div className="form-group">
          <input
            type="search"
            name="search-field"
            value={currentSearchText}
            placeholder="Search......"
            onChange={(e) => {
              e.preventDefault();
              handleSearchText(e.target.value);
              
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button onClick={(e) => {}}>
            <span className="icon fa fa-search"></span>
          </button>
        </div>
      </div>

      {/* <!-- Categories Widget --> */}
      <div className="sidebar-widget categories-widget">
        <div className="sidebar-title">
          <h2>Categories</h2>
        </div>
        <div className="widget-content">
          <ul className="blog-cat-two">
            {categories.map((cat, i) => {
              return (
                <li
                  key={`cat-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategory(cat);
                  }}
                  className={
                    currentCategory && cat.uuid === currentCategory.uuid
                      ? "active"
                      : ""
                  }
                >
                  <a href="/">
                    {cat.title}
                    <span>( {cat.totalPosts} )</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
