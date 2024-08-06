import { Link } from "react-router-dom";
import { ProductSimple } from "../../../../models/product";

interface Props {
  product: ProductSimple;
  handleDelete: () => void;
}

const CartProductItem: React.FC<Props> = ({ product, handleDelete }) => {
  return (
    <div className="cart-product">
      <div className="inner">
        <div className="cross-icon" onClick={handleDelete}>
          <span className="icon fa fa-remove"></span>
        </div>
        <div className="image">
          <img src={product.img} alt="" />
        </div>
        <h3>
          <Link to={`/training/${product.uuid}`}>{product.name}</Link>
        </h3>
        <div className="quantity-text">{product.quantity}</div>
        <div className="price">{`$${product.price}`}</div>
      </div>
    </div>
  );
};

export default CartProductItem;
