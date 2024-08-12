import { Link } from "react-router-dom";
import { ProductSimple } from "../../../models/product";
import placehoderImage from "../../../assets/images/placeholder/2.jpeg";
import useSite from "../../../providers/Site/hooks";
import { useCallback } from "react";

interface Props {
  product: ProductSimple;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);

  return (
    <>
      <div className="shop-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div className="inner-box">
          <Link onClick={toTop} to={`/training/${product.uuid}`}>
            <div className="image" style={{ height: "15rem" }}>
              <img
                src={product.img === "" ? placehoderImage : product.img}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
              <div className="overlay-box d-none d-sm-block"></div>
            </div>
          </Link>
          <div className="lower-content clearfix">
            <div className="pull-left">
              <h6>
                <Link onClick={toTop} to={`/training/${product.uuid}`}>
                  {product.name}
                </Link>
              </h6>
            </div>
            <div className="pull-right">
              <ul className="price">
                <li>{`$${product.price}`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
