import { PostSimple as Post } from "../../../models/post";
import { PostItem } from "../Item";
import { usePagination } from "../../../utils/hooks";
import useSite from "../../../providers/Site/hooks";

interface Props {
  posts: Array<Post>;
}
const NBRE_PER_PAGE = 3;

const PostList: React.FC<Props> = ({ posts }) => {
  const { nbrePage, currentPage, goTo, results } = usePagination(
    posts,
    NBRE_PER_PAGE,
    posts.length
  );

  const { scrollToTopTarget } = useSite();

  return (
    <>
      <div className="blog-classic">
        {/* List of publications */}
        {results.map((post, i) => {
          return <PostItem key={`post-${i}`} post={post} />;
        })}

        {/* <!--Post Share Options--> */}
        <div className="styled-pagination text-center">
          <ul className="clearfix">
            <li className="prev">
              <a
                href={
                  currentPage > 1
                    ? "blog?page=" + (currentPage - 1)
                    : "blog?page=1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  currentPage > 1 && scrollToTopTarget && scrollToTopTarget();
                  goTo(currentPage - 1);
                }}
              >
                <span className="fa fa-angle-left"></span>
              </a>
            </li>
            {currentPage - 1 > 1 ? <li>...</li> : null}

            {Array(3)
              .fill(0)
              .map((_, i) => {
                const page = currentPage + i - 1;

                if (page >= 1 && page <= nbrePage) {
                  return (
                    <li
                      key={`link-${i}`}
                      className={page === currentPage ? "active" : ""}
                    >
                      <a
                        href={"blog?page=" + page}
                        onClick={(e) => {
                          e.preventDefault();
                          if (page !== currentPage) {
                            scrollToTopTarget && scrollToTopTarget();
                            goTo(page);
                          }
                        }}
                      >
                        {page}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            {currentPage + 1 < nbrePage ? <li>...</li> : null}

            <li className="next">
              <a
                href={
                  currentPage < nbrePage
                    ? "blog?page=" + (currentPage + 1)
                    : "blog?page=" + nbrePage
                }
                onClick={(e) => {
                  e.preventDefault();
                  currentPage < nbrePage &&
                    scrollToTopTarget &&
                    scrollToTopTarget();
                  goTo(currentPage + 1);
                }}
              >
                <span className="fa fa-angle-right"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PostList;
