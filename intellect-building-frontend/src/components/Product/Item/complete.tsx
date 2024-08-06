import { useEffect, useState } from "react";
import useService from "../../../providers/Service/hooks";
import { useLoading } from "../../../utils/hooks";
import Product from "../../../models/product";
import parse from "html-react-parser";
import useCart from "../../../providers/Cart/hooks";

interface Props {
  uuid: string;
}

const ProductComplete: React.FC<Props> = ({ uuid }) => {
  const [tab, setTab] = useState<"descript" | "moreinfo">("descript");

  const [product, setProduct] = useState<Product | null>(null);

  const { addProduct, inCart } = useCart();

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getTraining(uuid)
      .then((product) => {
        setProduct(product);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading, uuid]);

  if (product) {
    return (
      <>
        <section className="shop-single-section">
          <div className="auto-container">
            {/* <!--Shop Single--> */}
            <div className="shop-page product-details">
              <div className="basic-details">
                <div className="row clearfix">
                  <div className="image-column col-lg-7 col-md-12 col-sm-12">
                    <img
                      src={product.img}
                      className="w-100"
                      style={{ height: "25rem" }}
                      alt=""
                    />
                  </div>

                  {/* <!--Info Column--> */}
                  <div className="info-column col-lg-5 col-md-12 col-sm-12">
                    <div className="details-header">
                      <h2>{product.name}</h2>
                      <div className="item-price">{`Price: $${product.price}`}</div>
                    </div>

                    <div className="text">
                      <p>{product.summary}</p>
                    </div>

                    <div className="other-options">
                      <div className="clearfix">
                        {product.quantity ? (
                          <div className="pull-left">
                            <div className="item-quantity">
                              <div className="input-group bootstrap-touchspin">
                                <span
                                  className="input-group-addon bootstrap-touchspin-prefix"
                                  style={{ display: "none" }}
                                ></span>
                                <input
                                  className="quantity-spinner form-control"
                                  type="text"
                                  value={`${product.quantity}`}
                                  name="quantity"
                                  onChange={(e) => {
                                    e.preventDefault();
                                    const newq = parseInt(e.target.value);
                                    if (!isNaN(newq) && newq > 0) {
                                      setProduct({
                                        ...product,
                                        quantity: newq,
                                      });
                                    }
                                  }}
                                  style={{ display: "block" }}
                                />
                                <span
                                  className="input-group-addon bootstrap-touchspin-postfix"
                                  style={{ display: "none" }}
                                ></span>
                                <span className="input-group-btn-vertical">
                                  <button
                                    className="btn btn-default bootstrap-touchspin-up py-0 mb-1"
                                    type="button"
                                    onClick={() => {
                                      product.quantity &&
                                        setProduct({
                                          ...product,
                                          quantity: product.quantity + 1,
                                        });
                                    }}
                                  >
                                    <i className="glyphicon glyphicon-chevron-up"></i>
                                  </button>
                                  <button
                                    className="btn btn-default bootstrap-touchspin-down py-0"
                                    type="button"
                                    onClick={() => {
                                      if (product.quantity) {
                                        const newq = product.quantity - 1;
                                        if (newq > 0) {
                                          setProduct({
                                            ...product,
                                            quantity: newq,
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    <i className="glyphicon glyphicon-chevron-down"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {!inCart(product) ? (
                          <div className="pull-left">
                            {/* <!--Btns Box--> */}
                            <div className="btns-box">
                              <button
                                type="button"
                                className="theme-btn btn-style-two add-to-cart"
                                onClick={() => {
                                  addProduct(product);
                                }}
                              >
                                <span className="txt">Add To Cart</span>
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <ul className="shop-list">
                      <li>
                        <a href="share">SHARE</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!--Product Info Tabs--> */}
              <div className="product-info-tabs">
                {/* <!--Product Tabs--> */}
                <div className="prod-tabs tabs-box">
                  {/* <!--Tab Btns--> */}
                  <ul className="tab-btns tab-buttons clearfix">
                    <li
                      className={
                        "tab-btn" + (tab === "descript" ? " active-btn" : "")
                      }
                      onClick={() => {
                        setTab("descript");
                      }}
                    >
                      Description
                    </li>
                    <li
                      className={
                        "tab-btn" + (tab === "moreinfo" ? " active-btn" : "")
                      }
                      onClick={() => {
                        setTab("moreinfo");
                      }}
                    >
                      Additional Information
                    </li>
                  </ul>

                  {/*  <!--Tabs Container--> */}
                  <div className="tabs-content">
                    {/* <!--Tab / Active Tab--> */}
                    <div className={tab === "descript" ? "d-block" : "d-none"}>
                      <div className="content">
                        {parse(product.description)}
                      </div>
                    </div>

                    {/* <!--Tab / Active Tab--> */}
                    <div
                      className={tab === "moreinfo" ? "d-block" : "d-none"}
                      id="prod-info"
                    >
                      <div className="content">
                        <p>{parse(product.infos)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return <></>;
};

export default ProductComplete;
