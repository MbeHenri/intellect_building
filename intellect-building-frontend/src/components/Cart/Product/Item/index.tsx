import { Link } from "react-router-dom";
import { ProductSimple } from "../../../../models/product";
import placehoderImage from "../../../../assets/images/placeholder/2.jpeg";
import { useCallback } from "react";
import useSite from "../../../../providers/Site/hooks";

interface Props {
  product: ProductSimple;
  handleDelete: () => void;
}

const CartProductItem: React.FC<Props> = ({ product, handleDelete }) => {
  const { scrollToTopTarget } = useSite();
  const toTop = useCallback(() => {
    scrollToTopTarget && scrollToTopTarget(100);
  }, [scrollToTopTarget]);
  return (
    <div className="cart-product">
      <div className="inner">
        <div className="cross-icon" onClick={handleDelete}>
          <span className="icon fa fa-remove"></span>
        </div>
        <div className="image">
          <img
            src={product.img === "" ? placehoderImage : product.img}
            alt=""
          />
        </div>
        <h3>
          <Link onClick={toTop} to={`/training/${product.uuid}`}>
            {product.name}
          </Link>
        </h3>
        <div className="quantity-text">{product.quantity}</div>
        <div className="price">{`$${product.price}`}</div>
      </div>
    </div>
  );
};

export default CartProductItem;
