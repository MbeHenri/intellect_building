import { ProductSimple } from "../../models/product";
import { useEffect, useState } from "react";
import useService from "../../providers/Service/hooks";
import { useLoading, usePagination } from "../../utils/hooks";
import useSite from "../../providers/Site/hooks";
import ProductItem from "./Item";

const NBRE_PER_PAGE = 6;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductSimple[]>([]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getTrainings()
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading]);

  const total = products.length;

  const { nbrePage, currentPage, goTo, results } = usePagination(
    products,
    NBRE_PER_PAGE,
    total
  );

  const { scrollToTopTarget } = useSite();

  return (
    <>
      <div className="sidebar-page-container">
        <div className="auto-container">
          {/* <!--Shop Single--> */}
          <div className="shop-section">
            {/* <!--Sort By--> */}
            <div className="items-sorting">
              <div className="row clearfix">
                <div className="results-column col-md-6 col-sm-6 col-xs-12">
                  {/* <!-- Search --> */}
                  <div className="search-box">
                    <div className="form-group">
                      <input
                        type="search"
                        name="search-field"
                        value=""
                        placeholder="Search......"
                      />
                      <button type="submit">
                        <span className="icon fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="select-column pull-right col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <select name="sort-by">
                      <option>Default Sorting</option>
                      <option>By Order</option>
                      <option>By Price</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {results.map((product, i) => {
                return <ProductItem key={`prod-${i}`} product={product} />;
              })}
            </div>

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
                      currentPage > 1 &&
                        scrollToTopTarget &&
                        scrollToTopTarget();
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
        </div>
      </div>
    </>
  );
};

export default ProductList;
