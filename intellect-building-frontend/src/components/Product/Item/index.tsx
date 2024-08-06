import { Link } from "react-router-dom";
import { ProductSimple } from "../../../models/product";

interface Props {
  product: ProductSimple;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="shop-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div className="inner-box">
          <Link to={`/training/${product.uuid}`}>
            <div className="image" style={{ height: "15rem" }}>
              <img
                src={product.img}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
              <div className="overlay-box d-none d-sm-block"></div>
            </div>
          </Link>
          <div className="lower-content clearfix">
            <div className="pull-left">
              <h6>
                <Link to={`/training/${product.uuid}`}>{product.name}</Link>
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
